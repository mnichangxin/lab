/* 申请加盟 */
import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

class Invite extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            field: {
                name: {
                    value: '',
                    status: true
                },
                code: {
                    value: '',
                    status: true
                },
                card: {
                    value: '',
                    status: true
                }
            },
            radioStatus: false,
            toastStatus: false 
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputBlur = this.handleInputBlur.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChoose = this.handleChoose.bind(this)
    }

    validateField(...names) {
        let setStatus = (name, value, status) => {
            this.setState(preState => ({
                field: Object.assign({}, preState.field, {[name]: Object.assign({}, {value: value}, {status: status})})  
            }))
        }

        names.forEach((name) => {
            let value = this.state.field[name].value

            if (name == 'name') {
                if (/^[\u4e00-\u9fa5]{2,8}$/.test(value)) {
                    setStatus(name, value, true)
                } else {
                    setStatus(name, value, false)
                }
            } else if (name == 'code') {
                fetch('http://qm.vip.iqiyi.com/api/corporate/verifyInviteCode.do', {
                    corporateInviteCode: value
                })
                .then(function(res) {
                    return res.json()
                })
                .then(function(json) {
                    if (json.code == 'A00000') {
                        setStatus(name, value, true)
                    } else {
                        setStatus(name, value, false)
                    }
                })
            } else if (name == 'card') {
                if (/^\d{17}[\dxX]$/.test(value)) {
                    setStatus(name, value, true)
                } else {
                    setStatus(name, value, false)
                }
            }
        })
    }

    handleInputChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState(preState => ({
            field: Object.assign({}, preState.field, {[name]: Object.assign({}, {value: value}, {status: preState.field[name].status})})
        }))
    }

    handleInputBlur(e) {
        let name = e.target.name

        this.validateField(name)
    }

    handleChoose() {
        let radioStatus = this.state.radioStatus

        this.setState({
            radioStatus: !radioStatus
        })
    }

    handleSubmit() {
        if (this.state.radioStatus) {
            this.validateField('name', 'code', 'card')

            setTimeout(() => {
                let name = this.state.field.name,
                    code = this.state.field.code,
                    card = this.state.field.card 

                if (name.status && code.status && card.status) {
                    fetch('', {

                    })
                    .then(function(res) {
                        
                    })
                } else {

                }
            }, 100)
        } else {
            this.setState({
                toastStatus: true
            })
            setTimeout(() => {
                this.setState({
                    toastStatus: false
                })
            }, 800)
        }
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <div className="m-box m-box-top m-box-top-green">
                    <div className="m-box-items m-box-items-full">
                        <section className="m-topSite m-borderB">
                            <a className="c-goback" onClick={()=>this.props.history.goBack()}><i className="arrow"></i></a>
                            <div className="c-content">申请加盟</div>
                        </section>
                    </div>
                </div>
                <div className="ask-box entry-box">
                    <ul className="ask-list">
                        <li>
                            <div className="ask-title">
                                <p className="title-text">申请人</p>
                                <p className={this.state.field.name.status ? 'title-wrong hide' : 'title-wrong'}>填写错误</p>
                            </div>
                            <div className={this.state.field.name.status ? 'ask-mes' : 'ask-mes ask-wrong'}>
                                <input type="text" name="name" placeholder="请输入真实姓名" value={this.state.field.name.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                            </div>
                        </li>
                        <li>
                            <div className="ask-title">
                                <p className="title-text">邀请码</p>
                                <p className={this.state.field.code.status ? 'title-wrong hide' : 'title-wrong'}>邀请码无效</p>
                            </div>
                            <div className={this.state.field.code.status ? 'ask-mes' : 'ask-mes ask-wrong'}>
                                <input type="text" name="code" placeholder="请输入邀请码" value={this.state.field.code.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                            </div>
                        </li>
                        <li>
                            <div className="ask-title">
                                <p className="title-text">身份证号码</p>
                                <p className={this.state.field.card.status ? 'title-wrong hide' : 'title-wrong'}>身份证号无效</p>
                            </div>
                            <div className={this.state.field.card.status ? 'ask-mes' : 'ask-mes ask-wrong'}>
                                <input type="text" name="card" placeholder="请输入收款人身份证" value={this.state.field.card.value} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
                            </div>
                        </li>
                    </ul>
                    <div className="agree-read">
                        <div className="choose-btn" onClick={this.handleChoose}>
                            <img src={this.state.radioStatus ? 'http://www.qiyipic.com/common/fix/h5-union/h5-union-already.png' : 'http://www.qiyipic.com/common/fix/h5-union/h5-union-null.png'} />
                        </div>
                        &nbsp;&nbsp;我已阅读并同意
                        <a href="http://www.iqiyi.com/common/qimeng/protocol.html">《奇艺盟服务协议》</a>
                        <br />
                        <a href="http://www.iqiyi.com/common/qimeng/commission.html" className="agreement">《奇艺盟会员返佣政策》</a>
                    </div>
                    
                    <div className="m-btn">
                        <a className="entry-btn" onClick={this.handleSubmit}>提交</a>
                    </div>
                    <div className={this.state.toastStatus ? 'ask-prompt' : 'ask-prompt hide'}>
                        请勾选《奇艺盟服务协议》
                        <br />《奇艺盟会员返佣政策》
                    </div>
                </div>
            </div>
        )
    }
}

export {Invite}