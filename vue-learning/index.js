Vue.component('button-container', {
    data: function() {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You click me {{ count }} count.</button>'
})

Vue.component('blog-post', {
    props: ['title'],
    template: '<h3>{{ title }}</h3>'
})

Vue.component('alert', {
    template: `
        <p>This is a alert component.</p>
    `
})

var app = new Vue({
    el: '#app',
    data: {
        list: [],
        item: ''
    },
    methods: {
        add: function() {
            this.list.push(this.item)
        },
        remove: function(event) {
            var index = this.list.indexOf(event.target)

            this.list.splice(index, 1)
        }
    }
})