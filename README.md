# wechat-applet-demo-jiudao
慕课网微信小程序《旧岛》demo

#### 项目功能
1.pages/classic/classic.js中使用的是callback方式，model/classic-p.js是使用的是promise方式改写的，model/classic.js使用的是callback的方式写的，因此为了兼容calssic.js中依旧使用的callback方式

#### 课程笔记

1. 事件绑定：写法最好是`bind:tap`

2. 善用`flex`布局

3. 组件的封装性和开发性、粒度：将页面内的功能模块抽象成自定义组件，以便在不同的页面中重复使用；也可以将负载的页面拆分成多个低耦合的模块，有助于代码维护。

4. `RESTful API`:
   请求数据的方法：`get`, `post`, `put`
   获取数据用`get`， 提交数据用`post`， 更新数据用`put`

5. `Promise`请求：

   应用场景：1.异步嵌套，回调函数中嵌套（回调地狱剥夺了函数`return`的能力），多个异步等待合并，`promise`不需要层层传递`callback`

   `Promise`实质是对象，可以保存状态。`Promise`有三种状态`pending`、`fulfilled`、`rejected`，调用`resolve`将`promise`状态改为`fulfilled`（已成功），`reject`将状态改为`rejected`（已失败）。多次调用`API`使用链式调用

6. `Const`的实质：`const`实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，`const`只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

7. Es6中`module`，输出模块`export` `import`

8. 在wxml中使用的数据都要在data中进行初始化。

9. 点击组件的事件中要知道组件的状态可以使用自定义事件。使用`this.traggerEvent`激活自定义事件，然后在引用的地方进行监听。

10. 小程序中组件公用的数据---`behavior`，多继承性质，可以在多个项目中使用，注意同名变量覆盖问题。组件中的`properties`中的数据会覆盖`behavior`中的数据（子类会覆盖父类中的数据，最后一个继承父类会覆盖最开始继承的父类数据），方法的继承同数据的继承。生命周期函数不会发生覆盖现象，会进行依次调用。

11. 组件的封装，如果组件中特殊数据格式处理方式可以写在组件中，使用组件中`properties`中`observer`属性，`observer`在属性值发生改变时，运行组件数据字段监听器，用于监听 `properties` 和 `data` 的变化。监听方法中注意递归问题会导致内存泄漏，因此不要在`observer`中。

12. 组件的切换，组件的隐藏使用条件渲染的方式，或`hidden`方式，`hidden`属性添加在自定义组件标签中时会默认为组件的属性传值，因此要使用`hidden`方式需要在组件文件中的最外层容器上绑定值，而`hidden`的属性值由父组件传递。频繁切换要使用`hidden`。但是`hidden`方式不会触发组件的`detached`生命周期函数。
    `Hidden`与`wx:if`切换组件的区别，`wx:if`每次状态改变会重新渲染组件执行组件完整的生命周期，而`hidden`在初始渲染之后再次切换就不会执行组件完整的生命周期。`Wx:if`切换会进行组件的初始化，而`hidden`不会。

13. `@import` 在组件间复用样式

    模板与组件的差异：模板（`template`）只能复用wxml和`wxss`不能复用`js`代码。

14. 简化代码，箭头函数，如果箭头函数的参数只有一个可以省略()如果箭头函数只有一行是可以省略{}。

15. `Wxs`的概念与应用：`wxs`不完全等同于`javascript`，在`wxs`中不能使用`es6`语法。拥有独立的运行环境。语言写法类似于`javascript`。一般是基于`es5`的写法。

    `Wxs`运行两次的原因，先进行初始化，然后动态赋值之后会进行数据处理。

    常使用过滤器

    `&nbsp; `<text>标签上设置decode=”true”属性

16. Github推荐：airbnb/javascript  代码风格

#### 总结

课程中最大的收获主要学会了class的用法和讲师的代码技巧、思维方式和代码风格以及项目结构，整个课程中虽然也有不足之处，但是瑕不掩瑜，非常好的课程。在实际项目中也使用了这样的项目结构和部分代码技巧，减少了工作量，增强了间接性和可读性。

#### 最后最后的总结

部分代码样式和wxml是直接复制粘贴，对于样式而言每个人有每个人的写法，仅代表个人习惯。