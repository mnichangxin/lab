/* 结算管控 */
import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {getCookie} from '../utils/cookie'
import {showToast} from '../utils/toast'

import {Select} from './select'
import {MoneyBox} from './moneyBox'
import {FloatBox} from  './floatBox'
import {Toast} from './toast'

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
            
            apply_box: {
                applyName: '',
                applyPeriodStart: '',
                applyPeriodEnd: '',
                applyDate: '',
                elecWallet: ''
            },

            toast: {
                toastStatus: false,
                toastText: ''
            },

            totalPages: 1,
            pageNo: 1, 
            pageSize: 3,
            total_doc: [],
            settle_doc: [],
            loadMore: true,
            applyCode: '',
            index: 0
        }

        this.handleSelect = this.handleSelect.bind(this)
        this.handleApply = this.handleApply.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOndo = this.handleOndo.bind(this)
        this.handleNoSubmit = this.handleNoSubmit.bind(this)
        this.handlePerformance = this.handlePerformance.bind(this)
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
                return (doc.settleStatus == 2 ? '已结算' : '未结算') == settleStatus
            })
        } else if (applyStatus != '全部' && settleStatus == '全部') {
            newDocs = docs.filter((doc) => {
                return (doc.applyStatus == 1 ? '有效' : (doc.applyStatus == 0 ? '已撤销' : '已过期')) == applyStatus
            })
        } else if (applyStatus != '全部' && settleStatus != '全部') {
            newDocs = docs.filter((doc) => {
                return (doc.applyStatus == 1 ? '有效' : (doc.applyStatus == 0 ? '已撤销' : '已过期')) == applyStatus && (doc.settleStatus == 2 ? '已结算' : '未结算') == settleStatus
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

    // Toast
    showToast(text) {
        this.setState({
            toast: {
                toastStatus: true,
                toastText: text
            }
        })
        setTimeout(() => {
            this.setState({
                toast: {
                    toastStatus: false,
                    toastText: ''
                }
            })
        }, 800)
    }
    
    // 结算信息弹框
    handleApply() {
        let that = this
        
        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/show.do?P00001=' + getCookie('P00001'), {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    that.setState({
                        apply_box_status: true,
                        apply_box: {
                            applyName: json.data.applyName,
                            applyPeriodStart: json.data.applyPeriodStart,
                            applyPeriodEnd: json.data.applyPeriodEnd,
                            applyDate: json.data.applyDate,
                            elecWallet: json.data.elecWallet
                        }
                    })
                } else if (json.code == 'Q00248') {
                    showToast(that, '当前不在结算周期', 800)
                } else if (json.code == 'Q00215') {
                    showToast(that, '当前没有可结算订单', 800)
                } else if (json.code == 'Q00209') {
                    showToast(that, '本月已申请过，请勿重复提交', 800)
                } else if (json.code == 'Q00214') {
                    showToast(that, '客户已离职或客户不存在', 800)
                } else {
                    showToast(that, '系统错误', 800)
                }
            })
            .catch(function(err) {
                showToast(that, '系统错误', 800)
            })
    }

    // 申请结算
    handleSubmit() {
        let that = this

        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/apply.do?P00001=' + getCookie('P00001') + '&applyPeriodStart=' + this.state.apply_box.applyPeriodStart + '&applyPeriodEnd=' + this.state.apply_box.applyPeriodEnd, {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                that.setState({
                    apply_box_status: false
                })

                if (json.code == 'A00000') {
                    showToast(that, '结算成功', 800)
                } else if (json.code == 'Q00251') {  
                    showToast(that, '客户合作状态无效或客户不存在', 800)
                } else if (json.code == 'Q00215') {
                    showToast(that, '当前没有可结算订单', 800)
                } else if (json.code == 'Q00132') {
                    showToast(that, '该结算申请无效', 800)
                } else {
                    showToast(that, '系统错误', 800)
                }
            })
            .catch(function(err) {
                showToast(that, '系统错误', 800)
            })
    }

    // 撤销结算弹框
    handleOndo(applyCode, index) {
        this.setState({
            undo_box_status: true,
            applyCode: applyCode,
            index: index
        })
    }

    // 撤销结算
    handleNoSubmit() {
        let that = this
        
        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/withdraw.do?applyCode=' + this.state.applyCode, {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    let index = that.state.index

                    that.state.settle_doc[index]['applyStatus'] = 0
                    
                    that.setState({
                        settle_doc: that.state.settle_doc
                    })

                    showToast(that, '撤销成功', 800)
                } else if (json.code == 'Q00216') {
                    showToast(that, '撤销失败', 800)
                } else if (json.code == 'Q00215') {
                    showToast(that, '当前没有可结算订单', 800)
                } else {
                    showToast(that, '系统错误', 800)
                }
            })
            .then(function() {
                that.setState({
                    undo_box_status: false
                })
            })
            .catch(function(err) {
                showToast(that, '系统错误', 800)
            })
    }

    // 查看业绩
    handlePerformance(settleStatus, startDate, endDate) {
        this.props.history.push({
            pathname: '/person/personAnalyze',
            query: {
                startDate: startDate,
                endDate: endDate
            }
        })
    }

    handleCancel() {
        this.setState({
            apply_box_status: false,
            undo_box_status: false
        })
    }
    
    // 加载列表
    loadList() {
        let that = this

        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/page.do?pageNo=' + this.state.pageNo + '&pageSize=' + this.state.pageSize, {
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
                    }
                    that.setState({
                        total_doc: [...that.state.total_doc, ...json.dataList],
                    })
                    that.reRenderBox()
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
        let container = this.refs.container

        // 初次加载
        this.loadList()

        if (this.state.settle_doc.length < 5) {
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
                        this.setState({
                            loadMore: false
                        })
                        return
                    } else {
                        this.setState({
                            loadMore: true
                        })

                        this.loadList()
                    }
                })
            }
        }

        window.addEventListener('scroll', () => {
            scorllLoad()
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
                    <MoneyBox settle_doc={this.state.settle_doc} handleOndo={this.handleOndo} handlePerformance={this.handlePerformance} />
                </div>
                <FloatBox apply_box_status={this.state.apply_box_status} undo_box_status={this.state.undo_box_status} apply_box={this.state.apply_box} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} handleOndo={this.handleOndo} handleNoSubmit={this.handleNoSubmit} />
                <Toast toastStatus={this.state.toast.toastStatus} toastText={this.state.toast.toastText} />
                <section className="m-noInfo-tip" ref="container">{this.state.loadMore ? '加载更多' : '暂无更多'}</section>
            </div>
        )
    }
}

export {PersonSettle}