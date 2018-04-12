import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

class PersonSettle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            invite_status: false,
            settle_status: false
        }

        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(id, e) {
        switch(id) {
            case 'invite_status':
                this.setState({
                    invite_status: true,
                    settle_status: false
                })
                break
            case 'settle_status':
                this.setState({
                    invite_status: false,
                    settle_status: true
                })
                this
                break
        }
    }

    render() {
        return (
            <div>
                <div className="m-box m-box-top m-box-top-green">
                    <div className="m-box-items m-box-items-full">
                        <section className="m-topSite m-borderB">
                            <a className="c-goback" onClick={()=>this.props.history.goBack()}><i className="arrow"></i></a>
                            <div className="c-content">结算管控</div>
                        </section>
                    </div>
                </div>
                <div className="account-box">
                    <div className="m-nav">
                        <ul className="balance-box">
                            <li className={this.state.invite_status ? 'clicked' : ''} onClick={(e) => this.handleSelect('invite_status', e)}>
                                申请状态 <i className="select-icon"></i>
                                <div className="select">
                                    <p className="c-mark">全部</p>
                                    <p>有效</p>
                                    <p>已撤销</p>
                                    <p>已过期</p>
                                </div>
                                <div className="float-fill"></div>
                            </li>
                            <li className={this.state.settle_status ? 'clicked' : ''} onClick={(e) => this.handleSelect('settle_status', e)}>
                                结算状态 <i className="select-icon"></i>
                                <div className="select">
                                    <p className="c-mark">全部</p>
                                    <p>已结算</p>
                                    <p>未结算</p>
                                </div>
                                <div className="float-fill"></div>
                            </li>
                        </ul>
                    </div>
                    <div className="m-content">
                        <ul className="mes-list">
                            <li>
                                <div className="c-name">结算周期：</div>
                                <div className="c-mes">2018/01/01 - 2018/03/01</div>
                            </li>
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">申请ID：</div>041545478478
                                    </div>
                                    <div className="list-right">
                                        <div className="c-name">申请日期：</div>2018/03/01
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">申请状态：</div>
                                        <span className="c-circle green"></span> 有效
                                    </div>
                                    <div className="list-right">
                                        <div className="c-name">结算状态：</div>
                                        <span className="c-circle gray"></span> 未結算
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="c-name">电子钱包账户：</div>
                                <div className="c-mes">45456484541</div>
                            </li>

                            <li>
                                <div className="c-name">收款人身份证：</div>
                                <div className="c-mes">041545478478</div>
                            </li>
                        </ul>
                    </div>
                    <div className="money-box">
                        <div className="money">
                            返佣金额 <span className="c-mark">￥1545.57</span>
                        </div>
                        <div className="check-btn">
                            <a href="" className="job-btn cancel">撤消申请</a>
                            <a href="" className="job-btn disabled">查看业绩</a>
                        </div>
                    </div>
                    <div className="m-content">
                        <ul className="mes-list">
                            <li>
                                <div className="c-name">结算周期：</div>
                                <div className="c-mes">2018/01/01 - 2018/03/01</div>
                            </li>
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">申请ID：</div>041545478478
                                    </div>
                                    <div className="list-right">
                                        <div className="c-name">申请日期：</div>2018/03/01
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">申请状态：</div>
                                        <span className="c-circle red"></span> 已失效
                                    </div>
                                    <div className="list-right">
                                        <div className="c-name">结算状态：</div>
                                        <span className="c-circle gray"></span> 未結算
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="c-name">电子钱包账户：</div>
                                <div className="c-mes">45456484541</div>
                            </li>

                            <li>
                                <div className="c-name">收款人身份证：</div>
                                <div className="c-mes">041545478478</div>
                            </li>
                        </ul>
                    </div>
                    <div className="money-box">
                        <div className="money">
                            返佣金额 <span className="c-mark">￥1545.57</span>
                        </div>
                        <div className="check-btn">
                            <a href="" className="job-btn">查看业绩</a>
                        </div>
                    </div>
                    <div className="m-content">
                        <ul className="mes-list">
                            <li>
                                <div className="c-name">结算周期：</div>
                                <div className="c-mes">2018/01/01 - 2018/03/01</div>
                            </li>
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">申请ID：</div>041545478478
                                    </div>
                                    <div className="list-right">
                                        <div className="c-name">申请日期：</div>2018/03/01
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">申请状态：</div>
                                        <span className="c-circle green"></span> 有效
                                    </div>
                                    <div className="list-right">
                                        <div className="c-name">结算状态：</div>
                                        <span className="c-circle gray"></span> 未結算
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="c-name">电子钱包账户：</div>
                                <div className="c-mes">45456484541</div>
                            </li>

                            <li>
                                <div className="c-name">收款人身份证：</div>
                                <div className="c-mes">041545478478</div>
                            </li>
                        </ul>
                    </div>
                    <div className="money-box">
                        <div className="money">
                            返佣金额 <span className="c-mark">￥1545.57</span>
                        </div>
                        <div className="check-btn">
                            <a href="" className="job-btn">查看业绩</a>
                        </div>
                    </div>
                </div>
                <div className="float-box hide">
                    <div className="settle-accounts">
                        <div className="c-title">申请结算</div>
                        <div className="info">
                            <span className="c-bold">姓名：</span>俏丽
                        </div>
                        <div className="info">
                            <span className="c-bold">结算周期：</span>2017/01/01-2018/12/31
                        </div>
                        <div className="info">
                            <span className="c-bold">申请日期：</span>45456484541
                        </div>
                        <div className="info">
                            <span className="c-bold">电子钱包：</span>45456484541
                        </div>
                        <p className="c-mes">您的审核预计在5-7个工作日完成</p>
                        <div className="commit">
                            <span className="c-mark c-normal">取消</span>
                            <span className="c-mark">提交</span>
                        </div>
                    </div>
                    <div className="settle-accounts hide">
                        <div className="c-title">申请结算</div>
                        <p className="c-word">是否确认撤销此申请，<br />撤销后需要重新提交结算申请</p>
                        <div className="commit">
                            <span className="c-mark c-normal">取消</span>
                            <span className="c-mark">提交</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {PersonSettle}