import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './src/reducers/rootReducer'

import {Login} from './src/component/login'
import {Choose} from './src/component/choose'
import {Invite} from './src/component/invite'
import {Person} from './src/component/person'

const store = createStore(rootReducer)

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            // <Provider store={store}>
                <Router>
                    <div style={{ height: '100%', background: '#f8f8f8' }}>
                        <Route path="/" exact component={Login}></Route>
                        <Route path="/choose" component={Choose}></Route>
                        <Route path="/invite" component={Invite}></Route>
                        <Route path="/person" component={Person}></Route>
                    </div>
                </Router>
            // </Provider> 
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)