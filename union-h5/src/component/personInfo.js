import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {getCookie} from '../utils/cookie'

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
            }
        }
    }

    componentDidMount() {
        let that = this

        // 个人信息
        fetch('http://qm.vip.iqiyi.com/api/personUnionService/info.do?P00001=' + getCookie('P00001'))
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
                            identityCardCode: json.data.identityCardCode
                        }
                    })
                } else {
                    console.log('个人信息请求失败')
                }
                console.log(json)
            })
            .catch(function(err) {
                console.log(err)
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
            </div>
        )
    }
}

export {PersonInfo}