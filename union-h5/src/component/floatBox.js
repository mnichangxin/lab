/* 浮动弹窗 */
import React from 'react'

import {stamp2Date} from '../utils/parseDate'

class FloatBox extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="float-box hide" className={this.props.apply_box_status || this.props.undo_box_status ? 'float-box' : 'float-box hide'}>
                <div className={this.props.apply_box_status ? 'settle-accounts' : 'settle-accounts hide'}>
                    <div className="c-title">申请结算</div>
                    <div className="info">
                        <span className="c-bold">姓名：</span>{this.props.apply_box.applyName}
                    </div>
                    <div className="info">
                        <span className="c-bold">结算周期：</span>{stamp2Date(this.props.apply_box.applyPeriodStart)}-{stamp2Date(this.props.apply_box.applyPeriodEnd)}
                    </div> 
                    <div className="info">
                        <span className="c-bold">申请日期：</span>{stamp2Date(this.props.apply_box.applyDate)}
                    </div>
                    <div className="info">
                        <span className="c-bold">电子钱包：</span>{this.props.apply_box.elecWallet}
                    </div>
                    <p className="c-mes">您的审核预计在5-7个工作日完成</p>
                    <div className="commit">
                        <span className="c-mark c-normal" onClick={this.props.handleCancel}>取消</span>
                        <span className="c-mark" onClick={this.props.handleSubmit}>提交</span>
                    </div>
                </div>
                <div className={this.props.undo_box_status ? 'settle-accounts' : 'settle-accounts hide'}>
                    <div className="c-title">撤销申请</div>
                    <p className="c-word">是否确认撤销此申请， <br />撤销后需要重新提交结算申请</p>
                    <div className="commit">
                        <span className="c-mark c-normal" onClick={this.props.handleCancel}>取消</span>
                        <span className="c-mark" onClick={this.props.handleNoSubmit}>确认</span>
                    </div>
                </div>
            </div>
        )
    }
}

export {FloatBox}