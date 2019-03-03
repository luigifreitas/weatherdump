import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/About.scss'
import '../styles/TabView.scss'

const ABOUT = 0
const FEEDBACK = 1
const UPDATES = 2
const LICENSES = 3

class About extends Component {
    constructor(props) {
        super(props);
        this.fileUpload = React.createRef();
        this.state = {
            currentTab: ABOUT
        };
    }

    handleSelection(currentTab) {
        this.setState({ currentTab })
    }

    render() {
        const { currentTab } = this.state

        return (
            <div className="View">
                <div className="Header Reduced">
                    <h1 className="Title">
                        <div onClick={this.props.history.goBack} className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        WeatherDump
                    </h1>
                </div>
                <div className="Body About">
                    <div className="TabViewHeader">
                        <div className={currentTab == ABOUT ? "Tabs Selected" : "Tabs"} onClick={this.handleSelection.bind(this, ABOUT)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            <h3>About</h3>
                        </div>
                        <div className={currentTab == FEEDBACK ? "Tabs Selected" : "Tabs"} onClick={this.handleSelection.bind(this, FEEDBACK)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            <h3>Feedback</h3>
                        </div>
                        <div className={currentTab == UPDATES ? "Tabs Selected" : "Tabs"} onClick={this.handleSelection.bind(this, UPDATES)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download-cloud"><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>
                            <h3>Updates</h3>
                        </div>
                        <div className={currentTab == LICENSES ? "Tabs Selected" : "Tabs"} onClick={this.handleSelection.bind(this, LICENSES)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pen-tool"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
                            <h3>Licenses</h3>
                        </div>
                    </div>
                    <div className="TabViewBody">
                        <div className="LeftContainer">
                            <figure>
                                <img className="MainIcon" src="/icon_by_eucalyp.png"/>
                                <figcaption>Icon made by <a target="_blank" href="https://www.flaticon.com/authors/eucalyp">Eucalyp</a> from <a target="_blank" href="https://www.flaticon.com">Flaticon</a>.</figcaption>
                            </figure>
                        </div>
                        <div className="RightContainer">
                            <div className="AppName">WeatherDump</div>
                            <div className="AppSubtitle">by <a target="_blank" href="https://github.com/opensatelliteproject">Open Satellite Project</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default About
