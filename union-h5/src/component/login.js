import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            P00001: ''
        }
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

    componentDidMount() {
        let P00001 = this.getCookie('P00001')

        // 判断是否登录
        if (P00001) {
            this.setState({
                isLogin: true,
                P00001: P00001
            })
        }
    }

    render() {
        let isLogin = this.state.isLogin

        return (
            <div className="entry-box">
                <div className="c-top">
                    <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                </div>
                <div className="m-btn">
                    {isLogin ? (<Link to={{pathname: '/choose', state: {P00001: this.state.P00001}}} className="entry-btn">申请加盟</Link>) : (<a className="entry-btn" href="https://m.iqiyi.com/user.html#baseLogin">申请加盟</a>)}
                </div>
                <div className="c-bottom">
                    <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-bottom.png" />
                </div>
            </div>
        )
    }
}

export {Login}

