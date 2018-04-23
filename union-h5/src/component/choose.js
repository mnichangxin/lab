/* 身份选择 */
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import 'whatwg-fetch'

import {isLogin} from '../utils/isLogin'
import {getCookie} from '../utils/cookie'

class Choose extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            P00001: null,
            choose: {
                enterprise: 'enterprise-box',
                personal: 'enterprise-box'
            },
            bindBoxStatus: false
        }

        this.handleSelect = this.handleSelect.bind(this)
        this.handleBind = this.handleBind.bind(this)
    }

    // 处理选择
    handleSelect(id, e) {
        switch(id) {
            case 'enterprise':
                this.setState({
                    choose: {
                        enterprise: 'enterprise-box enterprise-box choosed',
                        personal: 'enterprise-box'
                    }
                })
                setTimeout(() => {
                    window.location.href = 'https://www.iqiyi.com/common/qimeng/main.html'
                }, 100)
                break
            case 'personal':
                this.setState({
                    choose: {
                        enterprise: 'enterprise-box enterprise-box',
                        personal: 'enterprise-box choosed'
                    }
                })
                
                let that = this
                
                // 申请通过/未通过 跳转逻辑
                fetch('http://qm.vip.iqiyi.com/api/personUnionService/verifyExistsPerson.do?P00001=' + this.state.P00001)
                    .then(function(res) {
                        return res.json()
                    })
                    .then(function(json) {
                        if (json.code == 'A00000') {
                            // 申请通过 -> 个人页
                            that.props.history.push('/person')
                        } else {
                            // 未申请 -> 申请页
                            that.props.history.push('/invite')
                        }
                        console.log(json)
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
                break
        }    
    }

    // 处理绑定
    handleBind() {
        this.setState({
            bindBoxStatus: false
        })
        
        window.location.href = 'https://m.iqiyi.com/m5/security/home.html'
    }

    componentDidMount() {
        let that = this

        // 判断登录
        if (isLogin()) {
            this.setState({
                P00001: getCookie('P00001')
            })
        } else {
            window.location.href = 'https://m.iqiyi.com/user.html#baseLogin'
        }

        // 判断绑定手机号
        fetch('https://passport.iqiyi.com/apis/user/info.action?authcookie=' + getCookie('P00001'))
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.data.userinfo.phone.length > 0) {
                    console.log('已绑定，无弹框')
                } else {
                    that.setState({
                        bindBoxStatus: true
                    })
                    console.log('未绑定，弹框提示，跳到安全中心')
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    render() {
        return (
            <div className={this.state.P00001 ? 'entry-box' : 'entry-box hide'}>
                <div className="c-top">
                    <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                </div>
                <section className="m-choose">
                    <div className={this.state.choose.enterprise} onClick={(e) => this.handleSelect('enterprise', e)}>
                        <div className="c-pic c-enterprise-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-persional.png" />
                        </div>
                        <p className="c-title">企业店员</p>
                        <div className="choose-btn">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-already.png"/>
                        </div>
                    </div>
                    <div className={this.state.choose.personal} onClick={(e) => this.handleSelect('personal', e)}>
                        <div className="c-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-enterprise.png" />
                        </div>
                        <p className="c-title">个人联盟</p>
                        <div className="choose-btn">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-already.png"/>
                        </div>
                    </div>
                </section>
                <div className={this.state.bindBoxStatus ? 'cover' : 'cover hide'}>
                    <div className="bind-phone">
                        <p className="c-info">您尚未绑定手机号，无法<br />申请加盟，请到个人中心绑定</p>
                        <div className="btn-box" onClick={this.handleBind}>去绑定</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Choose)