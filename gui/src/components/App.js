import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import * as rxa from '../redux/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/App.scss'

class App extends Component {

    render() {
        return (
            <div className="App">
                {this.props.children}
                <div className="Footer">
                    <div className="Left">
                        GUI Beta 1 • <Link to="/about">About</Link>
                    </div>
                    <div className="Center">
                        WeatherDump
                    </div>
                    <div className="Right">
                        Open Satellite Project
                    </div>
                </div>
            </div>
        )
    }

}

App.propTypes = rxa.props
export default withRouter(connect(rxa.mapStateToProps)(App))
