import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'whatwg-fetch'

class Choose extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="entry-box">
                <div className="c-top">
                    <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                </div>
                <section className="m-choose">
                    <div className="enterprise-box choosed">
                        <div className="c-pic c-enterprise-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-persional.png" />
                        </div>
                        <p className="c-title">企业电员</p>
                        <div className="choose-btn">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-already.png"/>
                        </div>
                    </div>
                    <div className="enterprise-box">
                        <div className="c-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-enterprise.png" />
                        </div>
                        <p className="c-title">个人联盟</p>
                        <div className="choose-btn">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-already.png"/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export {Choose}