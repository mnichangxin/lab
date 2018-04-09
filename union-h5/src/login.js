import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'whatwg-fetch'

import {Choose} from './choose'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    // 获取 Cookie
    getCookie(name) { 
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])             
        } else {
            return null             
        }
    } 

    // 绑定点击
    handleClick() {
        let P00001 = this.getCookie('P00001')
        
        if (this.state.isLogin) {
            // 判断是否绑定手机号
            fetch('https://passport.iqiyi.com/apis/user/info.action?authcookie=' + P00001)
                .then(function(res) {
                    return res.json()
                })
                .then(function(json) {
                    if (json.data.userinfo.phone.length > 0) {
                        console.log('已绑定')
                    } else {
                        console.log('未绑定')
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        } else {
            window.location.href = 'https://m.iqiyi.com/user.html#baseLogin'
        }
    }

    componentDidMount() {
        let P00001 = this.getCookie('P00001')

        // 判断是否登录
        if (P00001) {
            this.setState({
                isLogin: true
            })
        }
    }

    render() {
        let isLogin = this.state.isLogin

        return (
            <Router>
                <div className="entry-box">
                    <div className="c-top">
                        <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                    </div>
                    <div className="m-btn" onClick={this.handleClick}>
                        {isLogin ? (<Link to="/choose" className="entry-btn">申请加盟</Link>) : (<a className="entry-btn">申请加盟</a>)}
                    </div>
                    <div className="c-bottom">
                        <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-bottom.png" />
                    </div>
                    {/* <Route path="/choose" component={Choose}></Route> */}
                </div>
            </Router>
        )
    }
}

export {Login}

