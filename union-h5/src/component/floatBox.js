/* 浮动弹窗 */
import React from 'react'

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
                        <Span text="取消" handleCancel={this.props.handleCancel} />
                        <Span text="提交" handleCancel={this.props.handleSubmit} />
                    </div>
                </div>
                <div className={this.props.undo_box_status ? 'settle-accounts' : 'settle-accounts hide'}>
                    <div className="c-title">申请结算</div>
                    <p className="c-word">是否确认撤销此申请， <br />撤销后需要重新提交结算申请</p>
                    <div className="commit">
                        <Span text="取消" handleCancel={this.props.handleCancel} />
                        <Span text="确认" handleCancel={this.props.handleNoSubmit} />
                    </div>
                </div>
            </div>
        )
    }
 }

 class Span extends React.Component {
    constructor(porps) {
        super(porps) 
        
        this.state = {
            isDown: false
        }

        this.handleOnTouchStart = this.handleOnTouchStart.bind(this)
        this.handleOnTouchEnd = this.handleOnTouchEnd.bind(this)
    }

    handleOnTouchStart() {
        this.setState({
            isDown: true
        })
    }

    handleOnTouchEnd() {
        this.setState({
            isDown: false
        })

        this.props.handleCancel()
    }

    render() {
        return (
            <span className="c-mark" className={this.state.isDown ? 'c-mark c-normal' : 'c-mark'} onTouchStart={this.handleOnTouchStart} onTouchEnd={this.handleOnTouchEnd}>{this.props.text}</span>
        )
    }
 }

 export {FloatBox}