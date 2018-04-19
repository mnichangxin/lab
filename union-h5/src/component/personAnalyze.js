import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'
import DatePicker from 'react-mobile-datepicker'
import {stamp2Date} from '../utils/parseDate'


class PersonAnalyze extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: 'ios',
            isOpen: false,
            time: new Date(),
            id: '',
            startDate: stamp2Date(Date.parse(new Date())),
            endDate: stamp2Date(Date.parse(new Date()))
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
                        <a href="" className="btn-r money">返佣：<span className="c-mark">¥1888.89</span></a>
                    </div>
                    <div className="m-content">
                        <ul className="mes-list">
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">订单号：</div>041545478478
                                    </div>
                                    <div className="list-right c-bold">
                                        黄金年卡套餐
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="c-name">订单金额：</div>
                                <div className="c-mes c-bold">￥50</div>
                            </li>
                            <li>
                                <div className="c-name">返佣金额：</div>
                                <div className="c-mes c-bold">￥33</div>
                            </li>
                        </ul>
                    </div>
                    <div className="money-box">
                        <div className="money">
                            <span className="c-mark c-normal">已支付</span>
                        </div>
                        <div className="c-six">
                            订单日期：2018/01/01
                        </div>
                    </div>
                    <div className="m-content">
                        <ul className="mes-list">
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">订单号：</div>041545478478
                                    </div>
                                    <div className="list-right c-bold">
                                        黄金年卡套餐
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="c-name">订单金额：</div>
                                <div className="c-mes c-bold">￥50</div>
                            </li>
                            <li>
                                <div className="c-name">返佣金额：</div>
                                <div className="c-mes c-bold">￥33</div>
                            </li>
                        </ul>
                    </div>
                    <div className="money-box">
                        <div className="money">
                            <span className="c-mark c-normal">已支付</span>
                        </div>
                        <div className="c-six">
                            订单日期：2018/01/01
                        </div>
                    </div>
                </div>
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