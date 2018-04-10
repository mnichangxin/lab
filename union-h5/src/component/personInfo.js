import React from 'react'
import {Link} from 'react-router-dom'
import 'whatwg-fetch'

class PersonInfo extends React.Component {
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
                            <div className="c-content">个人信息</div>
                        </section>
                    </div>
                </div>
                <div className="mes-box">
                    <ul className="mes-list">
                        <li>
                            <div className="c-name">姓名：</div>
                            <div className="c-mes">马巧丽</div>
                        </li>
                        <li>
                            <div className="c-name">所属代理商：</div>
                            <div className="c-mes">是个办公费</div>
                        </li>
                        <li>
                            <div className="c-name">联系方式：</div>
                            <div className="c-mes">041545478478</div>
                        </li>
                        <li>
                            <div className="c-name">合作状态：</div>
                            <div className="c-mes">有效</div>
                        </li>

                        <li>
                            <div className="c-name">身份证号码：</div>
                            <div className="c-mes">041545478478</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export {PersonInfo}