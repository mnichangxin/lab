import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

class PersonAnalyze extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="m-box m-box-top m-box-top-green">
                    <div className="m-box-items m-box-items-full">
                        <section className="m-topSite m-borderB">
                            <a className="c-goback" onClick={()=>this.props.history.goBack()}><i className="arrow"></i></a>
                            <div className="c-content">结算管控</div>
                        </section>
                    </div>
                </div>
                <div className="account-box analyse-box">
                    <div className="balance-box">
                        <section className="m-nav">
                            <select name="">
                                <option value="">结算管控</option>
                            </select>
                        </section>
                    </div>
                    <section className=""></section>
                    <div className="m-content">
                        <ul className="mes-list">
                            <li>
                                <div className="list-two">
                                    <div className="list-left">
                                        <div className="c-name">订单号：</div>041545478478
                                    </div>
                                    <div className="list-right c-bold">
                                        黄金年卡套餐
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="c-name">订单金额：</div>
                                <div className="c-mes c-bold">￥50</div>
                            </li><li>
                                <div className="c-name">返佣金额：</div>
                                <div className="c-mes c-bold">￥33</div>
                            </li>
                        </ul>
                    </div>
                    <div className="money-box">
                        <div className="money">
                            <span className="c-mark c-normal">已支付</span>
                        </div>
                        <div className="c-six">
                            订单日期：2018/01/01
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {PersonAnalyze}