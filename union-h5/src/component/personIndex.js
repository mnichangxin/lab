import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {PersonInfo} from './personInfo'
import {PersonSettle} from './personSettle'
import {PersonAnalyze} from './personAnalyze'
import {getCookie, removeCookie} from '../utils/cookie'
import {stamp2Date} from '../utils/parseDate'

class PersonIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            qrCode: '',
            code: '123456',
            rebate: 1,
            spreads: []
        }

        this.handleSave = this.handleSave.bind(this)
        this.handleQuit = this.handleQuit.bind(this)
    }

    handleSave() {
        let canvas = document.createElement('canvas')
        let aLink = document.createElement('a') 
        let image = document.createElement('img')
        
        image.src = this.refs.image.src

        canvas.width = image.width
        canvas.height = image.height

        canvas.getContext('2d').drawImage(image, 0, 0)

        aLink.download = 'QRCode.png'
        aLink.href = canvas.toDataURL('image/png')
        
        aLink.click()
    }

    handleQuit() {
        window.location.href = 'https://passport.iqiyi.com/user/logout.php?authcookie=' + getCookie('P00001') + '&agenttype=5&url=' + encodeURIComponent(location.href.split('/person')[0])
    }

    componentDidMount() {
        this.setState({
            P00001: getCookie('P00001')
        })

        let that = this

        // 二维码
        fetch('http://qm.vip.iqiyi.com/api/personUnionService/getQRCode.do?width=100&P00001=' + getCookie('P00001'), {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    that.setState({
                        qrCode: json.data
                    })
                    console.log(json)
                } else {
                    console.log('二维码请求失败')
                }
            })
            .catch(function(err) {
                console.log(err)
            })

        // 我的邀请码
        fetch('http://qm.vip.iqiyi.com/api/personUnionService/getInviteCode.do?P00001=' + getCookie('P00001'), {
                credentials: 'include'
            })
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
        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/todayAmount.do?P00001=' + getCookie('P00001'), {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    that.setState({
                        rebate: json.data ? json.data : 0
                    })
                } else {
                    console.log('返佣金额请求失败')
                }
                console.log(json)
            })
            .catch(function(err) {
                console.log(err)
            })

        // 推广动态
        fetch('http://qm.vip.iqiyi.com/api/personUnionService/spreadOrder.do?P00001=' + getCookie('P00001'), {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    let datas = json.dataList ?  json.dataList : []
                    let datalist = []

                    // 只显示 5 条记录
                    datas.forEach((data, index) => {
                        if (index < 5) {
                            datalist.push(data)
                        }
                    })

                    that.setState({
                        spreads: datalist ? datalist : []
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
                                <img src={'data:image/png;base64,' + this.state.qrCode} ref="image" />
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
                                            <div className="c-user">{stamp2Date(spread.orderTime)}：</div>
                                            <div className="c-info">
                                                您售出一张
                                                <span className="c-card">
                                                    “ {spread.productName} ”
                                                </span>
                                                ，获得佣金奖励 <a href="javascript:;">￥{spread.personCommissionBackFee}</a>
                                            </div>
                                        </li>
                                    )
                                }
                            ))
                        }
                        {
                            this.state.spreads.length == 0 ? '' : <section className="m-noInfo-tip" ref="container">更多订单查看业绩分析</section>
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