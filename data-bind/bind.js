/* 数据绑定实现 */

// 节点查找
function node2Fragment(node, vm) {
    // 创建虚拟文档节点
    var fragment = document.createDocumentFragment()

    // 子节点
    var child = null

    // 遍历子节点
    while (child = node.firstChild) {
        compile(child, vm)
        
        fragment.appendChild(child)
    }

    return fragment
}

// 节点替换
function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/

    // 节点类型为元素
    if (node.nodeType == 1) {
        var attr = node.attributes

        for (var i = 0, len = attr.length; i < len; i++) {
            if (attr[i].nodeName == 'v-model') {
                var name = attr[i].nodeValue

                node.value = vm.data[name]
            }
        }
    }

    // 节点类型为 Text
    if (node.nodeType == 3) {
        if (reg.test(node.nodeValue)) {
            var name = RegExp.$1.trim()
            
            node.nodeValue = vm.data[name]
        }
    }
}

// Vue 对象
function Vue(options) {    
    this.data = options.data

    var el = document.getElementById(options.el),
        dom = node2Fragment(el, this)

    el.appendChild(dom)
}

// 实例化
var vm = new Vue({
    el: '#app',
    data: {
        text: 'Hello World'
    }
})