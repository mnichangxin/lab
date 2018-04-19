/* 下拉筛选 */
import React from 'react'

class Select extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            index: 0
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(item, index, e) {
        this.setState({
            index: index
        })

        setTimeout(() => {
            this.props.changeStatus(item)
        }, 50)
    } 

    render() {
        return (
            <div className="select">
                {
                    this.props.items.map(
                        (item, index) => {
                            return (
                                <p className={this.state.index == index ? 'c-mark' : ''} key={index} onClick={(e) => this.handleClick(item, index, e)}>{item}<i className="choosed-right"></i></p>
                            )
                        }
                    )
                }
            </div>
        )
    }
}

export {Select}