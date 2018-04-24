/* 结算管控 */
import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {getCookie} from '../utils/cookie'
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
            currentPage: 1,
            pageNo: 1,
            pageSize: 5,
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
                return (doc.settleStatus == 0 ? '已结算' : '未结算') == settleStatus
            })
        } else if (applyStatus != '全部' && settleStatus == '全部') {
            newDocs = docs.filter((doc) => {
                return (doc.applyStatus == 1 ? '有效' : (doc.applyStatus == 0 ? '已撤销' : '已过期')) == applyStatus
            })
        } else if (applyStatus != '全部' && settleStatus != '全部') {
            newDocs = docs.filter((doc) => {
                return (doc.applyStatus == 1 ? '有效' : (doc.applyStatus == 0 ? '已撤销' : '已过期')) == applyStatus && (doc.settleStatus == 0 ? '已结算' : '未结算') == settleStatus
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
        
        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/show.do', {
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
                    that.showToast('当前不在结算周期')
                } else if (json.code == 'Q00215') {
                    that.showToast('当前没有可结算订单')
                } else if (json.code == 'Q00209') {
                    that.showToast('本月已申请过，请勿重复提交')
                } else {
                    that.showToast('系统错误')
                }
                console.log(json)
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    // 申请结算
    handleSubmit() {
        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/add.do?P00001=' + getCookie('P00001') + '&applyPeriodStart=' + this.apply_box.applyPeriodStart + '&applyPeriodEnd=' + this.apply_box.applyPeriodEnd, {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                console.log(json)
            })
            .catch(function(err) {
                console.log(err)
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
                }
                console.log(json)
            })
            .then(function() {
                that.setState({
                    undo_box_status: false
                })
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    // 查看业绩
    handlePerformance() {
        this.props.history.push('/person/personAnalyze')
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

        fetch('http://qm.vip.iqiyi.com/api/personSettlementApplyService/page.do?pageNo=' + this.state.pageNo +'&pageSize=' + this.state.pageSize, {
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
                        currentPage: json.pageInfo.currentPage,
                        total_doc: [...that.state.total_doc, ...json.dataList],
                    })
                }

                console.log(json)
            })
            .then(function() {
                that.reRenderBox()
            }) 
            .catch(function(err) {
                console.log(err)
            })
    }

    componentDidMount() {
        let timer = null
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
                })

                if (this.state.currentPage > this.state.totalPages) {
                    window.removeEventListener('scroll', scorllLoad)
                    
                    this.setState({
                        loadMore: false
                    })
                } else {
                    this.loadList()
                }
            }
        }

        window.addEventListener('scroll', () => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                scorllLoad()
            }, 10)
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
                <section className={this.state.loadMore ? 'm-noInfo-tip' : 'm-noInfo-tip hide'} ref="container">下拉加载更多</section>
                <div className={this.state.toast.toastStatus ? 'ask-prompt' : 'ask-prompt hide'}>
                    {
                        this.state.toast.toastText
                    }
                </div>
            </div>
        )
    }
}

export {PersonSettle}