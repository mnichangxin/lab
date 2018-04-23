/* 首页 */
import React from 'react'
import {Link} from 'react-router-dom'
// import {isLogin} from '../utils/isLogin'
import 'whatwg-fetch'

class Login extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     isLogin: false
        // }
    }

    // componentDidMount() {
    //     if (isLogin()) {
    //         this.setState({
    //             isLogin: true
    //         })
    //     }
    // }

    render() {
        // let isLogin = this.state.isLogin

        return (
            <div className="entry-box">
                <div className="c-top">
                    <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                </div>
                <div className="m-btn">
                    <Link to="/choose" className="entry-btn">申请加盟</Link>
                    {/* {isLogin ? (<Link to="/choose" className="entry-btn">申请加盟</Link>) : (<a className="entry-btn" href="https://m.iqiyi.com/user.html#baseLogin">申请加盟</a>)} */}
                </div>
                <div className="c-bottom">
                    <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-bottom.png" />
                </div>
            </div>
        )
    }
}

export {Login}

