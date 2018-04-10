import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

class Invite extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <div className="m-box m-box-top m-box-top-green">
                    <div className="m-box-items m-box-items-full">
                        <section className="m-topSite m-borderB">
                            {/* <Link className="c-goback" to={{pathname: '/choose', state: {P00001: this.state.P00001}}}><i className="arrow"></i></Link> */}
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
                                <p className="title-wrong">填写错误</p>
                            </div>
                            <div className="ask-mes ask-wrong">
                                <input type="text" name="" id="" placeholder="请输入真实姓名" value=""/>
                            </div>
                        </li>
                        <li>
                            <div className="ask-title">
                                <p className="title-text">邀请码</p>
                                <p className="title-wrong">邀请码无效</p>
                            </div>
                            <div className="ask-mes">
                                <input type="text" name="" id="" placeholder="请输入邀请码" value="" disabled="disabled"/>
                            </div>
                        </li>
                        <li>
                            <div className="ask-title">
                                <p className="title-text">身份证号码</p>
                                <p className="title-wrong">身份证格式错误</p>
                                <p className="title-bind">该身份证已绑定</p>
                            </div>
                            <div className="ask-mes">
                                <input type="text" name="" id="" placeholder="请输入收款人身份证" value="" />
                            </div>
                        </li>
                    </ul>
                    <div className="agree-read">
                        <div className="choose-btn">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-null.png" />
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-already.png" style={{display: 'none'}}/>
                        </div>
                        我已阅读并同意
                        <a href="">《奇艺盟服务协议》</a>
                        <br />
                        <a href="" className="agreement">《奇艺盟会员返佣政策》</a>
                    </div>
                    
                    <div className="m-btn">
                        <a href="" className="entry-btn">提交</a>
                    </div>
                    <div className="ask-prompt">
                        请勾选《奇艺盟服务协议》
                        <br />《奇艺盟会员返佣政策》
                    </div>
                </div>
            </div>
        )
    }
}

export {Invite}