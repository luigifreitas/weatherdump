import React, { Component } from 'react'
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom"
import Websocket from 'react-websocket'
import * as rxa from '../redux/actions'
import { connect } from 'react-redux'
import request from 'superagent'
import '../styles/Decoder.scss'

const shaders = Shaders.create({
    constellation: {
        frag: GLSL`
        precision highp float;
        uniform float complex[200];
        uniform int n;

        float circle(in vec2 _st, in vec2 pos, in float _radius){
            vec2 dist = _st-vec2(pos);
            return 1.-smoothstep(_radius-(_radius*0.01),
                                 _radius+(_radius*0.01),
                                 dot(dist,dist)*4.0);
        }

        float map(float x, float in_min, float in_max, float out_min, float out_max) {
            return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        }

        void main() { 
            vec3 color = vec3(0.0);
            vec2 st = gl_FragCoord.xy/250.0;
            color = mix(color, vec3(0.12974,0.13725,0.18823), 1.0);
            
            if (n > 0) {
                for (int i=0; i < 200; i+=2) {
                    float x, y;
    
                    if (complex[i] > 127.0) {
                        x = map(complex[i], 127.0, 255.0, 1.0, 0.5);
                    } else {
                        x = map(complex[i], 0.0, 127.0, 0.5, 0.0);
                    }
    
                    if (complex[i+1] > 127.0) {
                        y = map(complex[i+1], 127.0, 255.0, 1.0, 0.5);
                    } else {
                        y = map(complex[i+1], 0.0, 127.0, 0.5, 0.0);
                    }
                    
                    vec2 pos = vec2(x, y);
                    color = mix(color, vec3(0.14901,0.40392,1.000), circle(st, pos, 0.0005));
                }
            }

            gl_FragColor = vec4(color, 1.0);
        }
    `}
});

function _base64ToArrayBuffer(base64) {
    var wordArray = window.atob(base64);
    var len = wordArray.length,
        u8_array = new Uint8Array(len),
        offset = 0, word, i
        ;
    for (i = 0; i < len; i++) {
        word = wordArray.charCodeAt(i);
        u8_array[offset++] = (word & 0xff);
    }
    return u8_array;
}

class Decoder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complex: [],
            stats: {
                TotalBytesRead: 0.0,
                TotalBytes: 0.0,
                AverageRSCorrections: [-1, -1, -1, -1],
                AverageVitCorrections: 0,
                SignalQuality: 0,
                ReceivedPacketsPerChannel: [],
                Finished: false,
                TaskName: "Starting decoder"
            },
            n: 0
        };
    }

    handleConstellation(data) {
        this.setState({ complex: _base64ToArrayBuffer(data), n: this.state.n + 1 })
    }

    handleStatistics(payload) {
        const stats = JSON.parse(payload)
        if (this.state.stats.Finished != this.props.Finished && stats.Finished) {
            this.handleFinish()
        }
        this.setState({ stats })
    }

    componentDidMount() {
        const { datalink } = this.props.match.params
        const { processDescriptor } = this.props

        request
            .post(`http://localhost:3000/${datalink}/${processDescriptor}/start/decoder`)
            .field("inputFile", this.props.demodulatedFile)
            .then((res) => {
                let { Code, Description } = res.body;
                this.props.dispatch(rxa.updateProcessId(Code))
                this.props.dispatch(rxa.updateDecodedFile(Description))
                
            })
            .catch((err, res) => {
                console.log(err.response.body)
                alert(err.response.body.Code);
                this.props.history.goBack()
            })
    }

    handleFinish() {
        if (!document.hasFocus()) {
            new Notification('Decoder Finished', {
                body: 'WeatherDump finished decoding your file.'
            })
        }
        
        this.props.dispatch(rxa.updateProcessId(null))
    }

    handleAbort() {
        const { datalink } = this.props.match.params
        const { history, processId, processDescriptor } = this.props
        history.push(`/steps/${datalink}/decoder`)

        if (processId != null && processDescriptor != null) {
            request
            .post(`http://localhost:3000/${datalink}/${processDescriptor}/abort/decoder`)
            .field("id", processId)
            .then((res) => {
                this.handleFinish()
                console.log("Process aborted.")
            })
            .catch(err => console.log(err))
        }
    }

    handleOpenDecodedFolder() {
        let filePath = this.props.decodedFile.split('/')
        filePath.pop()
        window.open(filePath.join('/'), '_blank');
    }

    goProcessor() {
        const { datalink } = this.props.match.params
        this.props.history.push(`/processor/${datalink}`)
    }

    render() {
        const { datalink } = this.props.match.params
        const { complex, n, stats } = this.state;

        let percentage = (stats.TotalBytesRead / stats.TotalBytes) * 100
        percentage = isNaN(percentage) ? 0 : percentage

        let droppedpackets = (stats.DroppedPackets / stats.TotalPackets) * 100
        droppedpackets = isNaN(droppedpackets) ? 0 : droppedpackets

        return (
            <div className="View">
                {(this.props.processId != null) ? (
                    <div>
                        <Websocket reconnect={true} url={`ws://localhost:3000/${datalink}/${this.props.processId}/constellation`}
                            onMessage={this.handleConstellation.bind(this)} />
                        <Websocket reconnect={true} debug={true} url={`ws://localhost:3000/${datalink}/${this.props.processId}/statistics`}
                            onMessage={this.handleStatistics.bind(this)} />
                    </div>        
                ) :  null}
                <div className="Header">
                    <h1 className="Title">
                        <div onClick={this.handleAbort.bind(this)} className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        </div>
                        Decoding the input file for NPOESS...
                    </h1>
                    <h2 className="Description">
                        In the decoding step, the data from the demodulator is synchronized and corrected using Error Correcting algorithms like Viterbi and Reed-Solomon. This step is computationally intensive and might take a while.
                    </h2>
                </div>
                <div className="Body Flex Decoder">
                    <div className="LeftWindow">
                        <div className="Constellation">
                            <Surface width={250} height={250}>
                                <Node shader={shaders.constellation} uniforms={{ complex, n }} />
                            </Surface>
                            <div className="Label">PSK Constellation</div>
                            <div className="ProgressBar">
                                <div className="Body">
                                    <div style={{ width: percentage + "%" }} className="Progress"></div>
                                </div>
                                <div className="Text">
                                    <div className="Description">{stats.TaskName}</div>
                                    <div className="Percentage">{percentage.toFixed(2)}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CenterWindow">
                        <div className="ReedSolomon">
                            <div className="Indicator">
                                <div className="Block">
                                    <div className="Corrections">{stats.AverageRSCorrections[0]}</div>
                                    <div className="Label">B01</div>
                                </div>
                                <div className="Block">
                                    <div className="Corrections">{stats.AverageRSCorrections[1]}</div>
                                    <div className="Label">B02</div>
                                </div>
                                <div className="Block">
                                    <div className="Corrections">{stats.AverageRSCorrections[2]}</div>
                                    <div className="Label">B03</div>
                                </div>
                                <div className="Block">
                                    <div className="Corrections">{stats.AverageRSCorrections[3]}</div>
                                    <div className="Label">B04</div>
                                </div>
                            </div>
                            <div className="Name">Reed-Solomon Corrections</div>
                        </div>
                        <div className="SignalQuality">
                            <div className="Number">{stats.SignalQuality}%</div>
                            <div className="Name">Signal Quality</div>
                        </div>
                        <div className="DroppedPackets">
                            <div className="Number">{droppedpackets.toFixed(2)}%</div>
                            <div className="Name">Dropped Packets</div>
                        </div>
                        <div className="SignalQuality">
                            <div className="Number">{stats.FrameLock ? stats.VCID : 0}</div>
                            <div className="Name">VCID</div>
                        </div>
                        <div className="DroppedPackets">
                            <div className="Number">{stats.AverageVitCorrections}/{stats.FrameBits}</div>
                            <div className="Name">Viterbi Errors</div>
                        </div>
                        <div className="LockIndicator" style={{ background: stats.FrameLock ? "#00BA8C" : "#282A37" }}>
                            {stats.FrameLock ? "LOCKED" : "UNLOCKED"}
                        </div>
                    </div>
                    <div className="RightWindow">
                        <div className="ChannelList">
                            <div className="Label">Received Packets per Channel</div>
                            {
                                stats.ReceivedPacketsPerChannel.map((received, i) => {
                                    if (received > 0) {
                                        return (
                                            <div key={i} className="Channel">
                                                <div className="VCID">{i}</div>
                                                <div className="Count">{received}</div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="ControllBox">
                        {(this.props.processId != null && this.props.decodedFile != null) ? (
                            <div onClick={this.handleAbort.bind(this)} className="Button Large Abort">Abort Decoding</div>
                        ) : (
                            <div>
                                <div onClick={this.handleOpenDecodedFolder.bind(this)} className="Button Small Open">Open Folder</div>
                                <div onClick={this.goProcessor.bind(this)} className="Button Small Next">Next Step</div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

Decoder.propTypes = rxa.props
export default connect(rxa.mapStateToProps)(Decoder)  