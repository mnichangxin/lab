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

        setTimeout(() => {
            if (this._isMounted) {
                this.setState({
                    toast: {
                        toastStatus: false,
                        toastText: ''
                    }
                })
            }
        }, 800)
    }

    componentDidUpdate() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <div className={this.state.toast.toastStatus ? 'ask-prompt' : 'ask-prompt hide'}>
                {
                    this.state.toast.toastText
                }
            </div>
        )
    }
 }

 export {Toast}