<!-- 文章项组件 -->

<template>
    <li class="article">
        <div class="article-top">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-date">
                <img class="article-date-icon" v-bind:src="date_icon_src" /> 
                <span class="article-date-text">{{ article.date }}</span>
            </div>
        </div>
        <div class="article-introduction">
            <span class="article-introduction-text">{{ article.introduction }}</span>
            <span class="article-introduction-split"></span>
        </div>
        <div class="article-bottom">
            <div class="article-category">
                <img class="article-category-icon" v-bind:src="category_icon_src" /> 
                <span class="article-category-text">{{ article.category }}</span>
            </div>
            <ul class="article-tags">
                <img class="article-tag-icon" v-bind:src="tag_icon_src" />
                <li class="article-tag" v-for="(tag, index) in article.tags" v-bind:key="index">{{ tag }}</li>
            </ul>
        </div>
    </li>
</template>

<script>
    import date_icon_src from '../assets/icon/date.png'
    import category_icon_src from '../assets/icon/category.png'
    import tag_icon_src from '../assets/icon/tag.png'

    export default {
        name: 'Article',
        props: ['article'],
        data() {
            return {
                date_icon_src: date_icon_src,
                category_icon_src: category_icon_src,
                tag_icon_src: tag_icon_src
            }
        }
    }
</script>

<style>
    .article {
        margin-top: 25px;
        background-color: #fff;
    }
    .article:hover {
        box-shadow: 0 0 10px #c5c5c5;
    }
    .article:first-child {
        margin-top: 0;
    }
    .article-top {
        padding: 20px;
        border-left: 5px solid #444444;
        overflow: hidden;
    }
    .article-title {
        float: left;
        font-size: 22px;
    }
    .article-date {
        float: right;
    }
    .article-date-icon, .article-category-icon, .article-tag-icon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    .article-date-text, .article-category-text {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
    }
    .article-date-text {
        color: #5fbcee;
    }
    .article-introduction {
        padding: 20px 20px 0;
    }
    .article-introduction-split {
        margin-top: 20px;
        display: block;
        border-radius: 50%;
        border-top: 1px solid #dadada;
    }
    .article-bottom {
        padding: 20px;
        overflow: hidden;
    }
    .article-category, .article-tags {
        float: left;
    }
    .article-category-text {
        margin-left: 5px;
        padding: 5px;
        background-color: #5fbcee;
        color: #fff;
        cursor: pointer;
    }
    .article-category-text:hover {
        background-color: #1296db;
    }
    .article-tags {
        margin-left: 20px;
    }
    .article-tag {
        display: inline-block;
        margin-left: 5px;
        padding: 5px;
        background-color: #d15c4d;
        color: #fff;
        font-size: 14px;
        vertical-align: middle;
        cursor: pointer;
    }
    .article-tag:hover {
        background-color: #d81e06;
    }
</style>