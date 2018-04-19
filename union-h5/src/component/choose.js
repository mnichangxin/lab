import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import 'whatwg-fetch'

import {isLogin} from '../utils/isLogin'
import {getCookie} from '../utils/cookie'

class Choose extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            P00001: '',
            choose: {
                enterprise: 'enterprise-box',
                personal: 'enterprise-box'
            }
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id, e) {
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
                
                // fetch('http://10.3.74.198:8080/ocm-union-api/personUnionh5/verifyExistsPerson.do?P00001=' + this.state.P00001, {
                //        mode: 'no-cors'
                //     })
                //     .then(function(res) {
                //         // return res.text().then(function(text) {
                //         //     return text ? JSON.parse(text) : {}
                //         // })
                //         console.log(res)
                //         return res.json()
                //     })
                //     .then(function(json) {
                //         console.log(json)
                //     })
                //     .catch(function(err) {
                //         console.log(err)
                //     })

                setTimeout(() => {
                    this.props.history.push('/invite')
                }, 100)
                break
        }    
    }

    componentWillMount() {
        if (isLogin) {
            this.setState({
                P00001: getCookie('P00001')
            })
        } else {
            window.location.href = 'https://m.iqiyi.com/user.html#baseLogin'
        }
    }

    componentDidMount() {
        // 判断是否绑定手机号
        fetch('https://passport.iqiyi.com/apis/user/info.action?authcookie=' + this.state.P00001)
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.data.userinfo.phone.length > 0) {
                    console.log('已绑定，无弹框')
                } else {
                    console.log('未绑定，弹框提示')
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="entry-box">
                <div className="c-top">
                    <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-logo.png" />
                </div>
                <section className="m-choose">
                    <div className={this.state.choose.enterprise} onClick={(e) => this.handleClick('enterprise', e)}>
                        <div className="c-pic c-enterprise-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-persional.png" />
                        </div>
                        <p className="c-title">企业店员</p>
                        <div className="choose-btn">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-already.png"/>
                        </div>
                    </div>
                    <div className={this.state.choose.personal} onClick={(e) => this.handleClick('personal', e)}>
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

export default withRouter(Choose)