import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'

import {PersonIndex} from './personIndex'
import {PersonInfo} from './personInfo'
import {PersonSettle} from './personSettle'
import {PersonAnalyze} from './personAnalyze'

class Person extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/person/personInfo" component={PersonInfo}></Route>
                    <Route path="/person/personSettle" component={PersonSettle}></Route>
                    <Route path="/person/personAnalyze" component={PersonAnalyze}></Route>
                    <Route path="/" component={PersonIndex}></Route>
                </Switch>
            </Router>
        )
    }
}

export {Person}