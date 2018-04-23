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
            invite_box: {
                name: '',
                applyPeriod: ''
            },
            total_doc: [],
            settle_doc: []
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
    
    // 结算信息弹框
    handleApply() {
        this.setState({
            apply_box_status: true
        })
        
        fetch('http://10.3.74.198:8080/person-union-api/settlementApplyApi/show.do?uid=2271647078')
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

    // 申请结算
    handleSubmit() {
        fetch('http://10.3.74.198:8080/person-union-api/settlementApplyApi/add.do?P00001=' + getCookie('P00001') + '&applyPeriodStart=' + 1483200000000 + '&applyPeriodEnd=' + 1522505358295, {
            // method: 'POST',
            // body: JSON.stringify({
            //     applicantName: '李昶昕',
            //     applyPeriodStart: null,
            //     applyPeriodEnd: 1522505358295
            // })
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
    handleOndo() {
        this.setState({
            undo_box_status: true
        })
    }

    // 撤销结算
    handleNoSubmit() {
        fetch('http://10.3.74.198:8080/person-union-api/settlementApplyApi/withdraw.do?applyCode=123456&P00001=' + getCookie('P00001'))
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

    // 查看业绩
    handlePerformance(e) {
        if (e.target.className == 'job-btn') {
            // fetch('http://10.3.74.198:8080/person-union-api/performanceApi/h5page.do?pageSize=10&pageNo=5&startDate=1483200000000&&endDate=1522505358295&P00001=' + getCookie('P00001'))
            //     .then(function(res) {
            //         return res.json()
            //     })
            //     .then(function(json) {
            //         console.log(json)
            //     })
            //     .catch(function(err) {
            //         console.log(err)
            //     })
            this.props.history.push('/person/personAnalyze')
        }
    }

    handleCancel() {
        this.setState({
            apply_box_status: false,
            undo_box_status: false
        })
    }
    
    // 加载列表
    loadList() {
        // fetch('http://10.3.74.198:8080/person-union-api/settlementApplyApi/h5page.do?applyPeriodStart=121311&applyPeriodEnd=131311&applyCode=123456&applyStatus=1&settlementStatus=1&pageNo=1&pageSize=10')
        //     .then(function(res) {
        //         return res.json()
        //     })
        //     .then(function(json) {
        //         that.setState({
        //             total_doc: [...that.state.total_doc, ...json.datalist]
        //         })

        //         console.log(json)
        //     })
        //     .catch(function(err) {
        //         console.log(err)
        //     })

        let datalist = [{
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
        }]

        this.setState({
            total_doc: [...this.state.total_doc, ...datalist]
        })

        setTimeout(() => {
            this.reRenderBox()
        }, 10)
    }

    componentDidMount() {
        let timer = null
        let container = this.refs.container

        // 初次加载
        this.loadList()

        // 加载更多
        window.addEventListener('scroll', () => {
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(() => {
                let top = container.getBoundingClientRect().top
                let windowHeight = window.screen.height

                if (top && top < windowHeight) {
                    this.loadList()
                }
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
                <FloatBox apply_box_status={this.state.apply_box_status} undo_box_status={this.state.undo_box_status} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} handleOndo={this.handleOndo} handleNoSubmit={this.handleNoSubmit} />
                <section className="m-noInfo-tip" ref="container">下拉加载更多</section>
            </div>
        )
    }
}

export {PersonSettle}