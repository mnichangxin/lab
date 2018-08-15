<!-- 文章列表组件 -->

<template>
    <ul class="article-list">
        <Article v-for="(article, index) in article_list" v-bind:key="index" v-bind:article="article"></Article>
    </ul>
</template>

<script>
    import Article from './Article.vue'

    export default {
        name: 'ArticleList',
        components: {
            Article   
        },
        data() {
            return {
                article_list: [
                    {
                        title: '文章标题',
                        date: '2018年8月15日',
                        introduction: '文章内容文章内容文章内容文章内容文章内容文章内容',
                        category: '前端',
                        tags: [
                            '标签1',
                            '标签2',
                            '标签3'
                        ]
                    },
                    {
                        title: '文章标题',
                        date: '2018年8月15日',
                        introduction: '文章内容文章内容文章内容文章内容文章内容文章内容',
                        category: '前端',
                        tags: [
                            '标签1',
                            '标签2',
                            '标签3'
                        ]
                    },
                    {
                        title: '文章标题',
                        date: '2018年8月15日',
                        introduction: '文章内容文章内容文章内容文章内容文章内容文章内容',
                        category: '前端',
                        tags: [
                            '标签1',
                            '标签2',
                            '标签3'
                        ]
                    },
                    {
                        title: '文章标题',
                        date: '2018年8月15日',
                        introduction: '文章内容文章内容文章内容文章内容文章内容文章内容',
                        category: '前端',
                        tags: [
                            '标签1',
                            '标签2',
                            '标签3'
                        ]
                    },
                    {
                        title: '文章标题',
                        date: '2018年8月15日',
                        introduction: '文章内容文章内容文章内容文章内容文章内容文章内容',
                        category: '前端',
                        tags: [
                            '标签1',
                            '标签2',
                            '标签3'
                        ]
                    },
                    {
                        title: '文章标题',
                        date: '2018年8月15日',
                        introduction: '文章内容文章内容文章内容文章内容文章内容文章内容',
                        category: '前端',
                        tags: [
                            '标签1',
                            '标签2',
                            '标签3'
                        ]
                    }
                ]
            }
        }
    }
</script>