/* 数据绑定实现 */

// 节点查找
function node2Fragment(node, vm) {
    // 创建虚拟文档节点
    var fragment = document.createDocumentFragment()

    // 子节点
    var child = null

    while (child = node.firstChild) {
        compile(child, vm)

        fragment.appendChild(child)
    }

    return fragment
}

// 解析指令
function compile(node, vm) {
    var reg = /\{\{(.*)\}\}/

    // 节点类型为元素
    if (node.nodeType == 1) {
        var attr = node.attributes

        for (var i = 0, len = attr.length; i < len; i++) {
            if (attr[i].nodeName == 'v-model') {
                var name = attr[i].nodeValue
                
                node.addEventListener('input', function(e) {
                    vm[name] = e.target.value
                })

                // node.value = vm[name]
                new Watcher(vm, node, name)
            }
        }
    }

    // 节点类型为 Text
    if (node.nodeType == 3) {
        if (reg.test(node.nodeValue)) {
            var name = RegExp.$1.trim()
            
            // node.nodeValue = vm[name]
            new Watcher(vm, node, name)
        }
    }
}

//  定义通知
function defineReactive(obj, key, value) {
    var dep = new Dep()

    Object.defineProperty(obj, key, {
        get: function() {
            if (Dep.target) {
                dep.addSub(Dep.target)
            }

            return value
        },
        set: function(newValue) {
            if (newValue === value) {
                return
            } else {
                value = newValue

                dep.notify()

                console.log('newValue: ' + newValue)
            }
        }
    })
}

// 订阅通知
function observe(obj, vm) {
    Object.keys(obj).forEach(function(key) {
        defineReactive(vm, key, obj[key])
    })
}

// 主题
function Dep() {
    // 订阅者集合
    this.subs = []
}
Dep.prototype = {
    // 添加订阅者
    addSub: function(sub) {
        this.subs.push(sub)
    },
    // 发布订阅
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update()
        })
    }
}

// 观察者
function Watcher(vm, node, name) {
    Dep.target = this

    this.vm = vm
    this.node = node
    this.name = name

    // 初始化视图
    this.update()

    Dep.target = null
}
Watcher.prototype = {
    // 更新视图
    update: function() {
        if (this.node.nodeValue) {
            this.node.nodeValue = this.vm[this.name]
        } else {
            this.node.value = this.vm[this.name]
        }
    }
}

// Vue 对象
function Vue(options) {
    this.data = options.data

    observe(this.data, this)

    var el = document.getElementById(options.el),
        dom = node2Fragment(el, this)

    el.appendChild(dom)
}

// 实例化
var vm = new Vue({
    el: 'app',
    data: {
        text: 'Hello World'
    }
})