/* 结算管控 */
import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {Select} from './select'
import {MoneyBox} from './moneyBox'
import {FloatBox} from  './floatBox'

class PersonSettle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            invite_status: false,
            settle_status: false,
            apply_box_status: false,
            undo_box_status: false,
            applyStatus: '全部',
            settleStatus: '全部',
            total_doc: [{
                startDate: 1523861711000,
                endDate: 1523861711000,
                applyId: '12345678',
                applyDate: 1523861711000,
                applyStatus: '有效',
                settleStatus: '已结算',
                walletAccount: '12345678',
                identityCard: '371329***245'   
            }, {
                startDate: 1523861711000,
                endDate: 1523861711000,
                applyId: '12345678',
                applyDate: 1523861711000,
                applyStatus: '已过期',
                settleStatus: '未结算',
                walletAccount: '12345678',
                identityCard: '371329***245'   
            }, {
                startDate: 1523861711000,
                endDate: 1523861711000,
                applyId: '12345678',
                applyDate: 1523861711000,
                applyStatus: '有效',
                settleStatus: '未结算',
                walletAccount: '12345678',
                identityCard: '371329***245'   
            }, {
                startDate: 1523861711000,
                endDate: 1523861711000,
                applyId: '12345678',
                applyDate: 1523861711000,
                applyStatus: '已撤销',
                settleStatus: '未结算',
                walletAccount: '12345678',
                identityCard: '371329***245'   
            }],
            settle_doc: []
        }

        this.handleSelect = this.handleSelect.bind(this)
        this.handleApply = this.handleApply.bind(this)
        this.handleOndo = this.handleOndo.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
    }

    reRenderBox() {
        let docs =  this.state.total_doc
        let newDocs = []

        let applyStatus =  this.state.applyStatus,
            settleStatus = this.state.settleStatus

        if (applyStatus == '全部' && settleStatus != '全部') {
            newDocs = docs.filter((doc) => {
                return doc.settleStatus == settleStatus
            })
        } else if (applyStatus != '全部' && settleStatus == '全部') {
            newDocs = docs.filter((doc) => {
                return doc.applyStatus == applyStatus
            })
        } else if (applyStatus != '全部' && settleStatus != '全部') {
            newDocs = docs.filter((doc) => {
                return doc.applyStatus == applyStatus && doc.settleStatus == settleStatus
            })
        } else {
            newDocs = docs
        }

        this.setState({
            settle_doc: newDocs
        })
    }

    changeStatus(type) {
        switch(type) {
            case '全部':
                if (this.state.invite_status) {
                    this.setState({
                        applyStatus: type
                    })
                } else {
                    this.setState({
                        settleStatus: type
                    })
                }
                break
            case '有效':
            case '已撤销':
            case '已过期':
                this.setState({
                    applyStatus: type
                })
                break
            case '已结算':
            case '未结算':
                this.setState({
                    settleStatus: type
                })         
                break   
        }
        
        this.setState({
            invite_status: false,
            settle_status: false
        })

        this.reRenderBox()
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
                break
            case 'cover_status':
                this.setState({
                    invite_status: false,
                    settle_status: false
                })
                break
        }
    }
    
    handleApply() {
        this.setState({
            apply_box_status: true
        })
    }

    handleOndo() {
        this.setState({
            undo_box_status: true
        })
    }

    handleCancel() {
        this.setState({
            apply_box_status: false,
            undo_box_status: false
        })
    }

    componentDidMount() {
        this.setState({
            settle_doc: this.state.total_doc
        })
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <div className="m-box m-box-top m-box-top-green">
                    <div className="m-box-items m-box-items-full">
                        <section className="m-topSite m-borderB">
                            <a className="c-goback" onClick={()=>this.props.history.goBack()}><i className="arrow"></i></a>
                            <div className="c-content">结算管控</div>
                        </section>
                    </div>
                </div>
                <div className={this.state.invite_status || this.state.settle_status || this.state.apply_box_status || this.state.undo_box_status ? 'account-box account-cover' : 'account-box'}>
                    <div className={this.state.invite_status || this.state.settle_status ? 'cover' : ''} onClick={(e) => this.handleSelect('cover_status', e)}></div>
                    <div className="m-nav">
                        <ul className="balance-box">
                            <li className={this.state.invite_status ? 'clicked' : ''} onClick={(e) => this.handleSelect('invite_status', e)}>
                                申请状态 <i className="select-icon"></i>
                                <Select items={['全部', '有效', '已撤销', '已过期']} changeStatus={this.changeStatus} />
                                <div className="float-fill"></div>
                            </li>
                            <li className={this.state.settle_status ? 'clicked' : ''} onClick={(e) => this.handleSelect('settle_status', e)}>
                                结算状态 <i className="select-icon"></i>
                                <Select items={['全部', '已结算', '未结算']} changeStatus={this.changeStatus} />
                                <div className="float-fill"></div>
                            </li>
                        </ul>
                        <div className="btn-r" onClick={this.handleApply}>申请结算</div>
                    </div>
                    <MoneyBox settle_doc={this.state.settle_doc} handleOndo={this.handleOndo} />
                </div>
                <FloatBox apply_box_status={this.state.apply_box_status} undo_box_status={this.state.undo_box_status} handleCancel={this.handleCancel} />
            </div>
        )
    }
}

export {PersonSettle}