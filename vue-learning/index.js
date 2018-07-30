var app = new Vue({
    el: '#app',
    data: {
        list: [],
        item: ''
    },
    computed: {
        
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