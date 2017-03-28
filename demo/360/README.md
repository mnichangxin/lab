# 2017年360前端星计划作业

## 实现技术

* HTML5 Canvas

## 原理

主要是对 `Canvas` 的应用，下面具体说下：

* 初始化，通过对尺寸规律的观察，可以轻松循环的画出9个圆，同时把位置信息记录到 `queue` 队列中

* 为画布绑定 `touchstart`, `touchmove`, `touchstart` 三个触摸事件：

1. `touchstart`: 判断是否触摸到圆形，触摸到则重绘圆，同时把当前圆在 `queue` 的位置记录到 `save` 队列中
 
2. `touchmove`: 不断判断当前位置是否触摸到圆形，

3. `touchend`:
