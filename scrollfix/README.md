# 解决 IOS 滚动不流畅和出界

## 不流畅情况

局部滚动没有滚动条，且滑动干涩

解决方法：

```css
    body {
        -webkit-overflow-scrolling: touch;
    }
    .scroll-el {
        overflow: auto; //局部滚动的dom节点
    }
```

## 出界情况

### 局部滚动

滚动到页面顶部(或底部)时,手指离开停下,再继续向下(向上)滑动就会出现

解决方法：

* [ScrollFix 库](https://github.com/joelambert/ScrollFix)
* 禁用全局滚动的默认行为，如本例

### 全局滚动

滚动到页面顶部(或底部)时继续向下(向上)滑动就会出现

解决方法：考虑把全局滚动设为局部滚动