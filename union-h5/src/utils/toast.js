/* Toast 封装 */

const showToast = function(context, text, interval) {
    context.setState({
        toast: {
            toastStatus: true,
            toastText: text
        }
    })
    setTimeout(() => {
        context.setState({
            toast: {
                toastStatus: false,
                toastText: ''
            }
        })
    }, interval)
}

export {showToast}