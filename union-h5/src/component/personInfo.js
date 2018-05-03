import React from 'react'
import 'whatwg-fetch'

import {Toast} from './toast'

import {getCookie} from '../utils/cookie'
import {showToast} from '../utils/toast'

class PersonInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            info: {
                personName: '',
                fv: '',
                contactTel: '',
                cooperateStatus: '',
                identityCardCode: ''
            },

            toast: {
                toastStatus: false,
                toastText: ''
            }
        }
    }

    identityEncrypt(identityCardCode) {
        let head = identityCardCode.slice(0, 3),
            foot = identityCardCode.slice(-3)

        return head + 'xxxxxxxxxxxx' + foot
    }

    componentDidMount() {
        let that = this

        // 个人信息
        fetch('http://qm.vip.iqiyi.com/api/personUnionService/info.do?P00001=' + getCookie('P00001'), {
                credentials: 'include'
            })
            .then(function(res) {
                return res.json()
            })
            .then(function(json) {
                if (json.code == 'A00000') {
                    that.setState({
                        info: {
                            personName: json.data.personName,
                            fv: json.data.fv,
                            contactTel: json.data.contactTel,
                            cooperateStatus: json.data.cooperateStatus,
                            identityCardCode: that.identityEncrypt(json.data.identityCardCode)
                        }
                    })
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

    render() {
        return (
            <div>
                <div className="m-box m-box-top m-box-top-green">
                    <div className="m-box-items m-box-items-full">
                        <section className="m-topSite m-borderB">
                            <a className="c-goback" onClick={()=>this.props.history.goBack()}><i className="arrow"></i></a>
                            <div className="c-content">个人信息</div>
                        </section>
                    </div>
                </div>
                <div className="mes-box">
                    <ul className="mes-list">
                        <li>
                            <div className="c-name">姓名：</div>
                            <div className="c-mes">{this.state.info.personName}</div>
                        </li>
                        <li>
                            <div className="c-name">所属代理商：</div>
                            <div className="c-mes">{this.state.info.fv}</div>
                        </li>
                        <li>
                            <div className="c-name">联系方式：</div>
                            <div className="c-mes">{this.state.info.contactTel}</div>
                        </li>
                        <li>
                            <div className="c-name">合作状态：</div>
                            <div className="c-mes">{this.state.info.cooperateStatus ? '有效' : '无效'}</div>
                        </li>

                        <li>
                            <div className="c-name">身份证号码：</div>
                            <div className="c-mes">{this.state.info.identityCardCode}</div>
                        </li>
                    </ul>
                </div>
                <Toast toastStatus={this.state.toast.toastStatus} toastText={this.state.toast.toastText} />
            </div>
        )
    }
}

export {PersonInfo}