import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

import {PersonInfo} from './personInfo'
import {PersonSettle} from './personSettle'
import {PersonAnalyze} from './personAnalyze'

class PersonIndex extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="own-header">
                    <div className="header-pic">
                        <img src="http://www.qiyipic.com/common/fix/h5-union/qimeng_logo@3x.png" />
                    </div>
                    <a href="" className="header-quit">退出登录</a>
                </div>
                <div className="own-box">
                    <div className="own-banner">
                        <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-banner.png" />
                        <div className="code-card">
                            <div className="c-code"></div>
                            <p className="c-word">我的二维码</p>
                            <p className="c-invite">我的邀请码：
                                <span className="c-mark">123415648</span>
                            </p>
                    <div className="own-icon">
                        <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-save.png"/>
                    </div>
                        </div>
                    </div>
                </div>
                <div className="mes-box">
                    <div className="mes-title">
                        <div className="title-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-persional-union/h5-union-money.png"/>
                        </div>
                        <p className="title-word">今日入账</p>
                    </div>
                    <div className="money-details">
                        今日结算返佣
                        <span className="c-mark">¥1222.00</span> 
                        已经打入您的电子钱包
                    </div>
                </div>
                <section className="m-fill"></section>
                <div className="mes-box">
                    <div className="mes-title">
                        <div className="title-pic">
                            <img src="http://www.qiyipic.com/common/fix/h5-union/h5-union-spread.png"/>
                        </div>
                        <p className="title-word">推广动态</p>
                    </div>

                    <ul className="spread-box">
                        <li>
                            <div className="c-user">2018-2-4：</div>
                            <div className="c-info">
                                您售出一张
                                <span className="c-card">
                                    “ 黄金卡 ”
                                </span>
                                ，获得佣金奖励<a href="">￥8</a>
                                
                            </div>
                        </li>
                        <li>
                            <div className="c-user">2018-2-4：</div>
                            <div className="c-info">
                                您售出一张
                                <span className="c-card">
                                    “ 黄金卡 ”
                                </span>
                                ，获得佣金奖励<a href="">￥8</a>
                                
                            </div>
                        </li>
                        <li>
                            <div className="c-user">2018-2-4：</div>
                            <div className="c-info">
                                您售出一张
                                <span className="c-card">
                                    “ 黄金卡 ”
                                </span>
                                ，获得佣金奖励<a href="">￥8</a>
                                
                            </div>
                        </li>
                        <li>
                            <div className="c-user">2018-2-4：</div>
                            <div className="c-info">
                                您售出一张
                                <span className="c-card">
                                    “ 黄金卡 ”
                                </span>
                                ，获得佣金奖励<a href="">￥8</a>
                                
                            </div>
                        </li>
                        <li>
                            <div className="c-user">2018-2-4：</div>
                            <div className="c-info">
                                您售出一张
                                <span className="c-card">
                                    “ 黄金卡 ”
                                </span>
                                ，获得佣金奖励<a href="">￥8</a>
                                
                            </div>
                        </li>
                        
                    </ul>
                </div>
                <footer className="m-list-bottom">
                        <Link to="/person/personInfo">个人信息</Link>
                        <Link to="/person/personSettle">结算管控</Link>
                        <Link to="/person/personAnalyze">业绩分析</Link>
                </footer>
            </div>
        )
    }
}

export {PersonIndex}