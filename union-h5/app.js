import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Login} from './src/login'
import {Choose} from './src/choose'

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Login}></Route>
                    <Route path="/choose" component={Choose}></Route>
                </div>
            </Router>    
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)