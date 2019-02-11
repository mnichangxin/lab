/* 身份选择 */
import React from 'react'
import 'whatwg-fetch'

import {Toast} from './toast'

import {isLogin} from '../utils/isLogin'
import {getCookie} from '../utils/cookie'
import {showToast} from '../utils/toast'

class Choose extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            P00001: null,
            choose: {
                enterprise: 'enterprise-box',
                personal: 'enterprise-box'
            },

            toast: {
                toastStatus: false,
                toastText: ''
            },

            bindBoxStatus: false
        }

        this.handleSelect = this.handleSelect.bind(this)
        this.handleBind = this.handleBind.bind(this)
        this.isBindPhone = this.isBindPhone.bind(this)
    }

    // 处理选择
    handleSelect(id, e) {
        let that = this

        switch(id) {
            case 'enterprise':
                this.setState({
                    choose: {
                        enterprise: 'enterprise-box enterprise-box choosed',
                        personal: 'enterprise-box'
                    }
                }, () => {
                    this.isBindPhone(() => {
                        window.location.href = '//www.iqiyi.com/common/qimeng/main.html'
                    })
                })
                break
            case 'personal':
                this.setState({
                    choose: {
                        enterprise: 'enterprise-box enterprise-box',
                        personal: 'enterprise-box choosed'
                    }
                })
                
                // 申请通过/未通过 跳转逻辑
                fetch('//qm.vip.iqiyi.com/api/personUnionService/verifyExistsPerson.do?P00001=' + this.state.P00001, {
                        credentials: 'include'
                    })
                    .then(function(res) {
                        return res.json()
                    })
                    .then(function(json) {
                        if (json.code == 'A00000') {
                            if (json.data) {
                                // 申请通过 -> 个人页
                                that.isBindPhone(() => {
                                    that.props.history.push('/person')
                                })
                            } else {
                                // 未通过 -> 申请页
                                that.isBindPhone(() => {
                                    that.props.history.push('/invite')
                                })
                            }
                        } else {
                            showToast(that, json.message, 800)
                        }
                    })
                    .catch(function(err) {
                        showToast(that, '网络错误', 800)
                    })
                break
        }    
    }

    // 处理绑定
    handleBind() {
        this.setState({
            bindBoxStatus: false
        })
         
        window.location.href = '//m.iqiyi.com/m5/security/home.html'
    }

    isBindPhone(callback) {
        let that = this

        // 判断绑定手机号
        fetch('//passport.iqiyi.com/apis/user/info.action?authcookie=' + getCookie('P00001'))
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    if (!json.data.userinfo.phone.length) {
                        that.setState({
                            bindBoxStatus: true
                        })
                    } else {
                        if (callback) {
                            callback()
                        }
                    }
                } else {
                    showToast(that, json.msg, 800)
                }
            })
            .catch(function(err) {
                showToast(that, '网络错误', 800)
            })
    }

    componentDidMount() {
        // 判断登录
        if (isLogin()) {
            this.setState({
                P00001: getCookie('P00001')
            })
        } else {
            window.location.href = '//m.iqiyi.com/user.html#baseLogin'
        }

        this.isBindPhone()
    }

    render() {
        return (
            <div className={this.state.P00001 ? 'entry-box' : 'entry-box hide'}>
                <div className="c-top">
                    <img src="//www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                </div>
                <section className="m-choose">
                    <div className={this.state.choose.enterprise} onClick={(e) => this.handleSelect('enterprise', e)}>
                        <div className="c-pic c-enterprise-pic">
                            <img src="//www.qiyipic.com/common/fix/h5-persional-union/h5-union-persional.png" />
                        </div>
                        <p className="c-title">企业店员</p>
                        <div className="choose-btn">
                            <img src="//www.qiyipic.com/common/fix/h5-union/h5-union-already.png"/>
                        </div>
                    </div>
                    <div className={this.state.choose.personal} onClick={(e) => this.handleSelect('personal', e)}>
                        <div className="c-pic">
                            <img src="//www.qiyipic.com/common/fix/h5-persional-union/h5-union-enterprise.png" />
                        </div>
                        <p className="c-title">个人联盟</p>
                        <div className="choose-btn">
                            <img src="//www.qiyipic.com/common/fix/h5-union/h5-union-already.png"/>
                        </div>
                    </div>
                </section>
                <div className={this.state.bindBoxStatus ? 'cover' : 'cover hide'}>
                    <div className="bind-phone">
                        <p className="c-info">您尚未绑定手机号，<br />请到安全中心绑定</p>
                        <div className="btn-box" onClick={this.handleBind}>去绑定</div>
                    </div>
                </div>
                <Toast toastStatus={this.state.toast.toastStatus} toastText={this.state.toast.toastText} />
            </div>
        )
    }
}

export {Choose}