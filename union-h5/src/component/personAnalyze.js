import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'
import DatePicker from 'react-mobile-datepicker'

import {OrderBox} from './orderBox'
import {Toast} from './toast'

import {stamp2Date, date2Stamp, getPreMonth} from '../utils/parseDate'
import {getCookie} from '../utils/cookie'
import {showToast} from '../utils/toast'

class PersonAnalyze extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: 'ios',
            isOpen: false,
            time: new Date(),
            id: '',
            startDate: getPreMonth(),
            endDate: stamp2Date(new Date().getTime()),
            sumBounus: 0,
            totalPages: 1,
            pageNo: 1,
            pageSize: 5,
            loadMore: true,
            orders: [],
            newOrders: [],

            toast: {
                toastStatus: false,
                toastText: ''
            }
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleClick(id, e) {
        this.setState({
            isOpen: true
        })

        this.setState({
            id: id
        })
    }

    handleSelect(date) {
        this.setState({
            isOpen: false
        })
        
        if (this.state.id == 'start') {
            this.setState({
                startDate: stamp2Date(Date.parse(date))
            })
        } else {
            this.setState({
                endDate: stamp2Date(Date.parse(date))
            })
        }

        setTimeout(() => {
            this.getSumBounus(date2Stamp(this.state.startDate), date2Stamp(this.state.endDate))
        }, 50)
    }

    handleCancel() {
        this.setState({
            isOpen: false
        })
    }  

    // 加载列表
    loadList() {
        let that = this

        fetch('http://qm.vip.iqiyi.com/api/personPerformanceService/page.do?pageNo=' + this.state.pageNo + '&pageSize=' + this.state.pageSize, {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    if (json.pageInfo.currentPage == 1) {
                        that.setState({
                            totalPages: json.pageInfo.totalPages
                        })

                        that.setState({
                            orders: [...that.state.orders, ...json.dataList]
                        })
                    }
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

    // 总返佣金额
    getSumBounus(startDate, endDate) {
        let that = this

        // 总返佣金额
        fetch('http://qm.vip.iqiyi.com/api/personPerformanceService/sumBounus.do?P00001=' + getCookie('P00001') + '&settlePeriodStart=' + startDate + '&settlePeriodEnd=' + endDate, {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    that.setState({
                        sumBounus: json.data 
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

    componentDidMount() {
        let that = this
        let timer = null
        let container = this.refs.container

        let query = this.props.history.location.query

        if (query) {
            this.setState({
                startDate: stamp2Date(query.startDate),
                endDate: stamp2Date(query.endDate)
            })
        }

        // 加载默认总返佣金额
        setTimeout(() => {
            this.getSumBounus(date2Stamp(this.state.startDate), date2Stamp(this.state.endDate))
        }, 50)

        // 初次加载
        this.loadList()

        if (this.state.orders.length < 5) {
            this.setState({
                loadMore: false
            })
        }

        // 加载更多
        const scorllLoad = () => {
            let top = container.getBoundingClientRect().top
            let windowHeight = window.screen.height

            if (top && top < windowHeight) {
                this.setState({
                    pageNo: this.state.pageNo + 1,
                }, () => {
                    if (this.state.pageNo > this.state.totalPages) {
                        window.removeEventListener('scroll', scorllLoad)
                        
                        this.setState({
                            loadMore: false
                        })
                    } else {
                        this.loadList()
                    }
                })
            }
        }

        window.addEventListener('scroll', () => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                scorllLoad()
            }, 10)
        })    
    }

    render() {
        return (
            <div>
                <div className="m-box m-box-top m-box-top-green">
                    <div className="m-box-items m-box-items-full">
                        <section className="m-topSite m-borderB">
                            <a className="c-goback" onClick={()=>this.props.history.goBack()}><i className="arrow"></i></a>
                            <div className="c-content">业绩分析</div>
                        </section>
                    </div>
                </div>
                <div className="account-box analyse-box">
                    <div className="m-nav">
                        <ul className="balance-box">
                            <li onClick={(e) => this.handleClick('start', e)}>
                                {this.state.startDate} <i className="select-icon"></i>
                                <div className="float-fill"></div>
                            </li>
                            <li className="line">
                                -
                            </li>
                            <li onClick={(e) => this.handleClick('end', e)}>
                                {this.state.endDate} <i className="select-icon"></i>
                                <div className="float-fill"></div>
                            </li>
                        </ul>
                        <a className="btn-r money">返佣：<span className="c-mark">¥{this.state.sumBounus}</span></a>
                    </div>
                    <OrderBox orders={this.state.orders} startDate={this.state.startDate} endDate={this.state.endDate} />
                </div>
                <Toast toastStatus={this.state.toast.toastStatus} toastText={this.state.toast.toastText} />
                <section className="m-noInfo-tip" ref="container">{this.state.loadMore ? '下拉加载更多' : '暂无更多'}</section>
                <DatePicker
                        theme={this.state.theme}
                        value={this.state.time}
                        isOpen={this.state.isOpen}
                        onSelect={(date) => this.handleSelect(date)}
                        onCancel={this.handleCancel} />
            </div>
        )
    }
}

export {PersonAnalyze}