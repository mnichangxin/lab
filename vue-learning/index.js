var app = new Vue({
    el: '#app',
    data: {
        rawHtml: '<span>This is a rawHtml</span>',
        message: 'Hello'
    },
    computed: {
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        }
    }
})