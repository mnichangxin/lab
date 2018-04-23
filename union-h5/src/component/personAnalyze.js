import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'
import DatePicker from 'react-mobile-datepicker'
import {stamp2Date, getPreMonth} from '../utils/parseDate'

import {OrderBox} from './orderBox'

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
            orders: []
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
    }

    handleCancel() {
        this.setState({
            isOpen: false
        })
    }

    loadList() {
        let datalist = [
            {
                orderId: '041510515',
                orderType: '黄金年卡套餐',
                orderMoney: 50,
                rebateMoney: 33,
                orderStatus: '已支付',
                orderDate: '2018/04/19'
            },
            {
                orderId: '041510515',
                orderType: '黄金年卡套餐',
                orderMoney: 50,
                rebateMoney: 33,
                orderStatus: '已支付',
                orderDate: '2018/04/20'
            },
            {
                orderId: '041510515',
                orderType: '黄金年卡套餐',
                orderMoney: 50,
                rebateMoney: 33,
                orderStatus: '已支付',
                orderDate: '2018/04/21'
            },
            {
                orderId: '041510515',
                orderType: '黄金年卡套餐',
                orderMoney: 50,
                rebateMoney: 33,
                orderStatus: '已支付',
                orderDate: '2018/04/21'
            },
            {
                orderId: '041510515',
                orderType: '黄金年卡套餐',
                orderMoney: 50,
                rebateMoney: 33,
                orderStatus: '已支付',
                orderDate: '2018/04/21'
            },
            {
                orderId: '041510515',
                orderType: '黄金年卡套餐',
                orderMoney: 50,
                rebateMoney: 33,
                orderStatus: '已支付',
                orderDate: '2018/04/21'
            }
        ]

        this.setState({
            orders: [...this.state.orders, ...datalist]
        })

        // setTimeout(() => {
        //     this.setState({
        //         render
        //     })
        // }, 10)
    }

    componentDidMount() {
        let timer = null
        let container = this.refs.container

        // 初次加载
        this.loadList()

        // 加载更多
        window.addEventListener('scroll', () => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                let top = container.getBoundingClientRect().top
                let windowHeight = window.screen.height

                if (top && top < windowHeight) {
                    this.loadList()
                }
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
                        <a className="btn-r money">返佣：<span className="c-mark">¥1888.89</span></a>
                    </div>
                    <OrderBox orders={this.state.orders} startDate={this.state.startDate} endDate={this.state.endDate} />
                </div>
                <section className="m-noInfo-tip" ref="container">下拉加载更多</section>
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