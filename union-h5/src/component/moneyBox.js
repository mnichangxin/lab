/* 结算记录 */
import React from 'react'
import {stamp2Date, date2Stamp} from '../utils/parseDate'

class MoneyBox extends React.Component {
    constructor(props) {
        super(props)
        
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(settleStatus, startDate, endDate) {
        this.props.handlePerformance(settleStatus, startDate, endDate)
    }

    render() {
        return (
            this.props.settle_doc.map((doc, index) => {
                return (
                    <div key={index}>
                        <div className="m-content">
                            <ul className="mes-list">
                                <li>
                                    <div className="c-name">结算周期：</div>
                                    <div className="c-mes">{stamp2Date(doc.applyPeriodStart) + ' - ' + stamp2Date(doc.applyPeriodEnd)}</div>
                                </li>
                                <li>
                                    <div className="list-two">
                                        <div className="list-left">
                                            <div className="c-name">申请ID：</div>{doc.applyCode}
                                        </div>
                                        <div className="list-right">
                                            <div className="c-name">申请日期：</div>{stamp2Date(doc.applyDate)}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="list-two">
                                        <div className="list-left">
                                            <div className="c-name">申请状态：</div>
                                            <span className={doc.applyStatus == 1 ? 'c-circle green' : 'c-circle red'}></span> {doc.applyStatus == 1 ? '有效' : (doc.applyStatus == 0 ? '已撤销' : '已过期')}
                                        </div>
                                        <div className="list-right">
                                            <div className="c-name">结算状态：</div>
                                            <span className={doc.settleStatus == 1 ? 'c-circle green' : 'c-circle gray'}></span> {doc.settleStatus == 1 ? '已结算' : '未结算'}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="c-name">电子钱包账户：</div>
                                    <div className="c-mes">{doc.elecWallet}</div>
                                </li>

                                <li>
                                    <div className="c-name">收款人身份证：</div>
                                    <div className="c-mes">{doc.identityCard}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="money-box">
                            <div className="money">
                                返佣金额 <span className="c-mark">￥{doc.commisionFee}</span>
                            </div>
                            <div className="check-btn">
                                <a className={doc.applyStatus == 1 && doc.settleStatus == 0 ? 'job-btn cancel' : 'job-btn cancel hide'} onClick={(applyCode, indexNum) => this.props.handleOndo(doc.applyCode, index)}>撤消申请</a>
                                <a className={doc.settleStatus == 1 ? 'job-btn' : 'job-btn disabled'} onClick={(settleStatus, startDate, endDate, e) => this.handleClick(doc.settleStatus, doc.applyPeriodStart, doc.applyPeriodEnd)}>查看业绩</a>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
}

export {MoneyBox}