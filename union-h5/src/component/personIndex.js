/* 个人首页 */
import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {PersonInfo} from './personInfo'
import {PersonSettle} from './personSettle'
import {PersonAnalyze} from './personAnalyze'
import {Toast} from './toast'

import {getCookie, removeCookie} from '../utils/cookie'
import {stamp2Date} from '../utils/parseDate'
import {showToast} from '../utils/toast'

class PersonIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            qrCode: '',
            code: '123456',
            rebate: 1,
            spreads: [],

            toast: {
                toastStatus: false,
                toastText: ''
            }
        }

        this.handleSave = this.handleSave.bind(this)
        this.handleQuit = this.handleQuit.bind(this)
    }

    // 下载图片
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

    // 退出登录
    handleQuit() {
        window.location.href = 'https://passport.iqiyi.com/user/logout.php?authcookie=' + getCookie('P00001') + '&agenttype=5&url=' + encodeURIComponent(location.href.split('/person')[0])
    }

    componentDidMount() {
        let that = this
        
        this.setState({
            P00001: getCookie('P00001')
        })

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
                } else if (json.code == 'Q00301') {
                    showToast(that, '参数错误', 800)
                } else if (json.code == 'Q00236') {
                    showToast(that, 'Uid 不存在', 800)
                } else if (json.code == 'Q00237') {
                    showToast(that, 'shortUrl 不能为空', 800)
                } else {
                    showToast(that, '系统错误', 800)
                }
            })
            .catch(function(err) {
                showToast(that, '系统错误', 800)
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
                } else {
                    showToast(that, '系统错误', 800)
                }
            })
            .catch(function(err) {
                showToast(that, '系统错误', 800)
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
                } else if (json.code == 'Q00301') {
                    showToast(that, '参数错误', 800)
                } else {
                    showToast(that, '系统错误', 800)
                }
            })
            .catch(function(err) {
                showToast(that, '系统错误', 800)
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
                } else if (json.code == 'Q00301') {
                    showToast(that, '参数错误', 800)
                } else {
                    showToast(that, '系统错误', 800)
                }
            })
            .catch(function(err) {
                showToast(that, '系统错误', 800)
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
                                {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXCAIAAAD+qk47AAAFE0lEQVR4nO1cTYgcRRT+epwc9iQK3jYnUU+yV1lyEDwY8AdckJwkbMCDCKtCMIcIBvWQW0ACwkIkbNDLBoI/IMTTiubgySjEXIWBJOjFNTvT3dP1noc3Wzs7VVtTXd3Th/A+5tBT/apf9Tffe/WqeugMzcDMMy1Zls01dm3cUzHGMU5j0GvS+ZGBsgAAfXvkyiyAGNnH9EoLBNc4xntgPKoFQFkQ9N2mttTu9nIlHZPbYwIhbTwWqgVAWRB4IiINMdk+kNIDMdKwIoqBagFQFgStRUStBB7oFVMspfkKQLUAKAsCT0S0JbOYC6YtBNqysVAtAMqC4CAiWi9OYsqntlpcp7WgWgCUBUHW+owQs1ka6NW6cQxUC4CyIMhqJd60TJ6Ghru4gVO61+SHsgCEV9a1nrXFLBYWV/+krdAtVAuAsiA40EZbNXnMddKmoQBqPddwe6kWAGVBUE/zaU/oBKsry19eeK2WuzMXvrt1e9DWw/QAWtuDDuPujXfOXblz7sodAEQEgIiJYapqckxkOCNTMbMxRMTMTI89fvdGPeLS0IUWVleWnzr+tBwfRQEzG+HCUkBERMbwb7//GT/CprssvI9AS+bAvSI7sIEwlwImnqGAmcL3fNR43GEE7qu77DhNgdybhwKepYBa3v3wo6O8MEMBGbIU3Lz2NoAXT31BzNI4TQGZkBbawoEWrKhcwbgI2ARUKj8sGWKGUPD95lvlKC9H+c2r65YCFqYYzEy+eAwMw7YEYta90860MFFBNTbXL60BeGNj2xAXo3zKhowxO9fOGEMvnNrsZRkxM3WrhYXCBsJXF18piqIoirwYM/Pu7t64LMZlMbj3rzGGGcPhqCiKna3TNMkQXSSGfmC9aeHauEX+3OWDBMJ4uCdfty+eBAAqxsMCwJNL+PbS68CBgVBAh9V+lHfXqXsqEOMdRYSpKmYw84eXf/1k/fm59m+e/1EoeKQiAoAIfPBg9/RnP5X5UD4fvP/5zEGZD1/e+Obhw9EkItp+UOCFp2qqVRq5Nt65xs6LALJeVu6N5LO0dMyU5Tgvej3YRpsXidn48kJMIeSOJ3Cqu3phujoqR0NpP/vuqx9/ugXgo7Nr0pj1MkhSYDY0Z8JuCx1FxEyB+Mdf/8nUMC6L5545DqDMc/m6vTMwxhAzE3hOAd0aPCwEKnCLgMy8NtMUGEOXf7hf5YV8Tp549r31l+zX67/cEwoMExMbNu4FAzHrhqp7F26vDiOC2NbIGYirceXQ289wmIJOlNAZC9MUSOLf+Pq+LBNsdSQHTCAwAKGATSdVk6vqufVP2MZbhlkKpEDcL6h5hgJjJr8/E2OfghjvMQiM0D8LHtU/xsb1sbqyXB17gpktBaIAI9liigJJiBILQoHh7J+/H8z1Xuue3ZYu5ohbtwdb50/MUCARYikg9lPw8+ZaByP0/IujFotpP4t7ykWtNUJArTG9dCceUBYEUf9r6lL/tWIk4L3WlVULgLIg8FRNLtLkmibONNmnwfpSLQDKgqAfo0CLgHGteSQmNNwrp40nppdqAVAWBE2TbVq13/BUw5WOGyyqBUBZELT/Lo6AcczU4Bo3rLUCoaFV0yEoC0A37+IIXKfWzqpn1zTpL68Wutd0CMoCsIh3cQTQcK8pxjim6NJ1hB/KArCI55QxZU+t1XctmxgXuo7wQ1kAWnwXR9piIcZ72i5uLWPVAqAsCBa419SwV9qmU9owVAuAsiD4HzvZEw2hi65EAAAAAElFTkSuQmCC" /> */}
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
                <Toast toastStatus={this.state.toast.toastStatus} toastText={this.state.toast.toastText} />
            </div>
        )
    }
}

export {PersonIndex}