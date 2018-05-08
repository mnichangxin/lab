/* 首页 */
import React from 'react'
import {Link} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="entry-box">
                <div className="c-top">
                    <img src="//www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                </div>
                <div className="m-btn">
                    <Link to="/choose" className="entry-btn">申请加盟</Link>
                </div>
                <div className="c-bottom">
                    <img src="//www.qiyipic.com/common/fix/h5-union/h5-union-bottom.png" />
                </div>
            </div>
        )
    }
}

export {Login}

