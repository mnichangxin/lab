import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {PersonInfo} from './personInfo'
import {PersonSettle} from './personSettle'
import {PersonAnalyze} from './personAnalyze'
import {getCookie, removeCookie} from '../utils/cookie'

class PersonIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            code: '123456',
            rebate: 1,
            spreads: [
                {
                    time: '2018-2-4',
                    type: '黄金卡',
                    money: '8'
                },
                {
                    time: '2018-2-4',
                    type: '黄金卡',
                    money: '8'
                },
                {
                    time: '2018-2-4',
                    type: '黄金卡',
                    money: '8'
                }
            ]
        }

        this.handleSave = this.handleSave.bind(this)
        this.handleQuit = this.handleQuit.bind(this)
    }

    handleSave() {
        fetch('http://qm.vip.iqiyi.com/api/personUnionh5/getQRCode.do?P00001=' + getCookie('P00001'))
            .then(function(res) {
                return res.blob()
            })
            .then(function(blob) {
                let reader = new FileReader()

                reader.onload = (e) => {
                    let aLink = document.createElement('a')
        
                    aLink.download = 'QRCode.jpg'
                    aLink.href = e.target.result
                    aLink.click()
                }

                reader.readAsDataURL(blob)
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    handleQuit() {
        window.location.href = 'https://passport.iqiyi.com/user/logout.php?authcookie=' + getCookie('P00001') + '&agenttype=5&url=' + encodeURIComponent(location.href.split('/person')[0])
    }

    componentDidMount() {
        this.setState({
            P00001: getCookie('P00001')
        })

        let that = this

        // 我的邀请码
        fetch('http://qm.vip.iqiyi.com/api/personUnionh5/getInviteCode.do?P00001=' + getCookie('P00001'))
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    that.setState({
                        code: json.data
                    })
                    console.log(json)
                } else {
                    console.log('邀请码请求失败')
                }
            })
            .catch(function(err) {
                console.log(err)
            })

        // 今日入账
        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyh5/todayAmount.do?P00001=' + getCookie('P00001'))
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                console.log(json)
                if (json.code == 'A00000') {
                    that.setState({
                        rebate: json.data ? json.data : 0
                    })
                } else {
                    console.log('返佣金额请求失败')
                }
            })
            .catch(function(err) {
                console.log(err)
            })

        // 推广动态
        fetch('http://qm.vip.iqiyi.com/api/personUnionh5/spreadOrder.do?P00001=' + getCookie('P00001'))
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    that.setState({
                        spreads: json.datalist ? json.datalist : []
                    })
                } else {
                    console.log('推广动态请求失败')
                }
                console.log(json)
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <div className="own-header">
                    <div className="header-pic">
                        <img src="http://www.qiyipic.com/common/fix/h5-union/qimeng_logo@3x.png" />
                    </div>
                    <a className="header-quit" onClick={this.handleQuit}>退出登录</a>
                </div>
                <div className="own-box">
                    <div className="own-banner">
                        <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-banner.png" />
                        <div className="code-card">
                            <div className="c-code">
                                <img src={'http://10.3.74.198:8080/person-union-api/personUnionApi/getQRCode.do?width=100&P00001=' + getCookie('P00001')} />
                            </div>
                            <p className="c-word">我的二维码</p>
                            <p className="c-invite">我的邀请码：
                                <span className="c-mark">{this.state.code}</span>
                            </p>
                            <div className="own-icon" onClick={this.handleSave}>
                                <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-save.png"/>
                            </div >
                        </div>
                    </div>
                </div>
                <div className="mes-box">
                    <div className="mes-title">
                        <div className="title-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-money.png"/>
                        </div>
                        <p className="title-word">今日入账</p>
                    </div>
                    {
                        this.state.rebate == 0 
                        ? (<div className="money-details">今日无返佣提现，请进入结算管控提交申请</div>) 
                        : (<div className="money-details">今日结算返佣 <span className="c-mark"> ¥{this.state.rebate} </span> 已经打入您的电子钱包</div>)
                    }
                </div>
                <section className="m-fill"></section>
                <div className="mes-box">
                    <div className="mes-title">
                        <div className="title-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-spread.png"/>
                        </div>
                        <p className="title-word">推广动态</p>
                    </div>
                    <ul className="spread-box">
                        {
                            this.state.spreads.length == 0
                            ? (<li>您还没有推广动态，分享二维码，马上得佣金哦！</li>)
                            : (this.state.spreads.map(
                                (spread, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="c-user">{spread.time}：</div>
                                            <div className="c-info">
                                                您售出一张
                                                <span className="c-card">
                                                    “ {spread.type} ”
                                                </span>
                                                ，获得佣金奖励 <a href="javascript:;">￥{spread.money}</a>
                                            </div>
                                        </li>
                                    )
                                }
                            ))
                        }
                    </ul>
                </div>
                <footer className="m-list-bottom">
                        <Link to="/person/personInfo">个人信息</Link>
                        <Link to="/person/personSettle">结算管控</Link>
                        <Link to="/person/personAnalyze">业绩分析</Link>
                </footer>
            </div>
        )
    }
}

export {PersonIndex}