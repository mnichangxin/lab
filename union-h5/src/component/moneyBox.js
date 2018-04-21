/* 结算记录 */
import React from 'react'
import {stamp2Date, date2Stamp} from '../utils/parseDate'

class MoneyBox extends React.Component {
    constructor(props) {
        super(props)
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
                                    <div className="c-mes">{stamp2Date(doc.startDate) + ' - ' + stamp2Date(doc.endDate)}</div>
                                </li>
                                <li>
                                    <div className="list-two">
                                        <div className="list-left">
                                            <div className="c-name">申请ID：</div>{doc.applyId}
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
                                            <span className={doc.applyStatus == '有效' ? 'c-circle green' : 'c-circle red'}></span> {doc.applyStatus}
                                        </div>
                                        <div className="list-right">
                                            <div className="c-name">结算状态：</div>
                                            <span className={doc.settleStatus == '已结算' ? 'c-circle green' : 'c-circle gray'}></span> {doc.settleStatus}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="c-name">电子钱包账户：</div>
                                    <div className="c-mes">{doc.walletAccount}</div>
                                </li>

                                <li>
                                    <div className="c-name">收款人身份证：</div>
                                    <div className="c-mes">{doc.identityCard}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="money-box">
                            <div className="money">
                                返佣金额 <span className="c-mark">￥1545.57</span>
                            </div>
                            <div className="check-btn">
                                <a className={doc.applyStatus == '有效' && doc.settleStatus == '未结算' ? 'job-btn cancel' : 'job-btn cancel hide'} onClick={this.props.handleOndo}>撤消申请</a>
                                <a className={doc.settleStatus == '已结算' ? 'job-btn' : 'job-btn disabled'} onClick={this.props.handlePerformance}>查看业绩</a>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
}

export {MoneyBox}