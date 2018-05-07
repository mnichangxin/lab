/* 返回上级目录 */

const goBack = function(context, link) {
    context.props.history.push(link)
}

export {goBack}