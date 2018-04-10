import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import {Login} from './src/component/login'
import Choose from './src/component/choose'
import {Invite} from './src/component/invite'
import {Person} from './src/component/person'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div style={{height: '100%'}}>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/choose" component={Choose}></Route>
                    <Route path="/invite" component={Invite}></Route>
                    <Route path="/person" component={Person}></Route>
                </div>
            </Router>    
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)