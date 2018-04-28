/* Toast 组件 */
import React from 'react'

class Toast extends React.Component {    
    constructor(props) {
        super(props)

        this.state =  {
            toast: {
                toastStatus: false,
                toastText: ''
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            toast: {
                toastStatus: nextProps.toastStatus,
                toastText: nextProps.toastText
            }
        })
    }

    render() {
        return (
            <div className={this.state.toast.toastStatus ? 'ask-prompt' : 'ask-prompt hide'} dangerouslySetInnerHTML={{__html: this.state.toast.toastText}}></div>
        )
    }
 }

 export {Toast}