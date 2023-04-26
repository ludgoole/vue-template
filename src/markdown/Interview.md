# 前端100问 [👀](https://juejin.cn/post/6844903885488783374)

### 第 1 题：（滴滴、饿了么）写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？

https://juejin.cn/post/6963567075214884895

- 对比更准确
- 查找更快
- 避免就地复用



### 第 2 题：`['1', '2', '3'].map(parseInt)` what & why ?

https://juejin.cn/post/7046379734669721631

- `parseInt('1', 0)`，直接按照10进制解析，结果为1；
- `parseInt('2', 1)`，传入了非`2~36`的值，结果为NaN；
- `parseInt('3', 2)`，按照2进制进行解析，2进制可以解析的数字只有1和0，所以返回`NaN`。



### 第 3 题：（挖财）什么是防抖和节流？有什么区别？如何实现？

https://juejin.cn/post/6844903886264729614

```js
function debounce(fn, deley) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, deley);
    }；
}

function throttle(func, deley) {
    let run = true
    return function () {
        if (run) {
            run = false
            setTimeout(() => {
                func.apply(this, arguments)
                run = true
            }, deley)
        }
    }
}
```



### 第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

https://juejin.cn/post/6844904191610060814

+ Set 不重复 可遍历
+ WeakSet  弱引用 垃圾回收
+ Map 键值对 可遍历
+ WeakMap 弱引用 垃圾回收



### 第 5 题：介绍下深度优先遍历和广度优先遍历，如何实现？

https://juejin.cn/post/7096163014830719013

```js
/**
 * 深度优先遍历（递归）
 * @param root dom node
 */
function depthFirstTraverse1(root: Node) {
  visitNode(root)

  const childNodes = root.childNodes // .childNodes 和 .children 不一样
  if (childNodes.length) {
    childNodes.forEach((child) => {
      depthFirstTraverse1(child) // 递归
    })
  }
}

/**
 * 深度优先遍历
 * @param root dom node
 */
function depthFirstTraverse2(root: Node) {
  const stack: Node[] = []

  // 根节点压栈
  stack.push(root)

  while (stack.length > 0) {
    const curNode = stack.pop() // 出栈
    if (curNode == null) break

    visitNode(curNode)

    // 子节点压栈
    const childNodes = curNode.childNodes
    if (childNodes.length > 0) {
      // reverse 反顺序压栈
      Array.from(childNodes).reverse().forEach((child) => stack.push(child))
    }
  }
}

/**
 * 广度优先遍历
 * @param root dom node
 */
function breadthFirstTraverse(root: Node) {
  const queue: Node[] = [] // 数组 vs 链表

  // 根节点入队列
  queue.unshift(root)

  while (queue.length > 0) {
    const curNode = queue.pop()
    if (curNode == null) break

    visitNode(curNode)

    // 子节点入队
    const childNodes = curNode.childNodes
    if (childNodes.length)
      childNodes.forEach((child) => queue.unshift(child))
  }
}
```



### 第 6 题：请分别用深度优先思想和广度优先思想实现一个拷贝函数？

https://juejin.cn/post/6844903814068174861

https://juejin.cn/post/6921252523462524942



### 第 7 题：ES5/ES6 的继承除了写法以外还有什么区别？

https://juejin.cn/post/6844903924015120397

+ 继承原型 sub.prototype = Object.create(super.prototype ) | extend
+ 继承实例 sub.call(super)  | super()
+ ES6 中的子类实例可以继承原生构造函数实例的内部属性，而在 ES5 中做不到



### 第 8 题：setTimeout、Promise、Async/Await 的区别?

https://juejin.cn/post/6999991460120494117

宏任务

微任务

同步执行异步



### 第 9 题：（头条、微医）Async/Await 如何通过同步的方式实现异步?

https://juejin.cn/post/6978689182809997320

+ 协程
+ 生成器
+ 迭代器
+ Promise



### 第 10 题：（头条）异步笔试题

https://juejin.cn/post/6844903999108284430

```js
async function async1() {
    console.log('async1 start', 2);
    await async2();
    console.log('async1 end', 6);
}
async function async2() {
    console.log('async2', 3);
}
console.log('script start', 1);
setTimeout(function() {
    console.log('setTimeout', 8);
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1', 4);
    resolve();
}).then(function() {
    console.log('promise2', 7);
});
console.log('script end', 5);


script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
```



### 第 11 题：（携程）算法手写题

```js
已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

[...new Set(arr.join().split(',').sort((a,b) =>a-b))]
```



### 第 12 题：（滴滴、挖财、微医、海康）JS 异步解决方案的发展历程以及优缺点。

https://juejin.cn/post/6844903575009624077

https://juejin.cn/post/6888644410561855495

+ callback——回调地狱，不能用 try catch 捕获错误，不能 return
+ promise——无法取消 Promise ，错误需要通过回调函数来捕获
+ generator——配合 co 函数库使用
+ async ... await——异步代码改造成同步代码



### 第 13 题：（微医）Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

+ Promise 构造函数是同步
+ then 方法是异步



### 第 14 题：（兑吧）情人节福利题，如何实现一个 new？

https://juejin.cn/post/7117180996054679559

```
function _new(constructor, ...arg) {
  var obj = {};
  obj.__proto__ = constructor.prototype;

  var res = constructor.apply(obj, arg);

  return typeof res === 'object' ? res : obj;
}

```



### 第 15 题：（网易）简单讲解一下http2的多路复用?

https://juejin.cn/post/7006508170206003230

HTTP1.1——在HTTP1.1的协议中，传输基本于文本，数据必须按顺序传输

HTTP2——二进制分帧，一个TCP连接中发送多个请求，对端可以通过帧中的标识知道属于哪个请求



### 第 16 题：谈谈你对TCP三次握手和四次挥手的理解

https://juejin.cn/post/7110591778457124894

三次握手：客户端.emit                  服务端.on  服务端.emit        客户端.on

> 呼叫请求
>
> 收到  请确认
>
> 收到

四次挥手：客户端.emit.close        服务端.on  服务端.emit        服务端.emit.close     客户端.on.close  客户端.emit.close

> 我要关闭了
>
> 收到    等我发完
>
> 发完了，可以关闭了
>
> 收到，我关闭了    你也可以关闭了



### 第 17 题：A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态

https://juejin.cn/post/6844903907185917966

等待超时，抛出异常



### 第 18 题：（微医）React 中 setState 什么时候是同步的，什么时候是异步的？

https://juejin.cn/post/6850418109636050958

同步：原生事件绑定(addEventListener)    微任务(promise)   宏任务(settimeout)

异步：主线程



### 第 19 题：React setState 笔试题，下面的代码输出什么？

```js
class Example extends React.Component {
  constructor() {
    super()
    this.state = {
      val: 0
    }
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 1 次 log 0

    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 2 次 log 0

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 3 次 log 3

      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 4 次 log 4
    }, 0)
  }

  render() {
    return null
  }
}
```



### 第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

https://juejin.cn/post/6999829253395054623

https://juejin.cn/post/6844904050010357774

https://juejin.cn/post/6844903860096466957

1. 确定首层依赖模块 dependencies和devDependencies
2. 递归获取子模块
3. 扁平化
4. 安装模块
5. 提取依赖中的`bin`文件



### 第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

>  Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()

```
Array.isArray = (arg) => {
  return Object.prototype.toString.call(arg) === '[object Array]'
}
```



### 第 22 题：介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

https://juejin.cn/post/6844903779700047885

回流——将可见DOM节点以及它对应的样式结合起来，计算它们在设备视口内的确切位置和大小的阶段，这一阶段主要是计算节点的位置和几何信息

重绘——通过构造渲染树和回流阶段，将渲染树的每个节点都转换为屏幕上的实际像素的阶段，回流一定会触发重绘

> 1. 合并多次对DOM和样式的修改，然后一次处理掉，如cssText，class
> 2. 使元素脱离文档流，批量修改DOM，将元素带回到文档中，如fragment，innnerhtml，浏览器会使用队列
> 3. 复杂动画效果,使用绝对定位让其脱离文档流或css3硬件加速，如 transform，will-change
> 4. css3硬件加速，在`GPU`渲染字体会导致抗锯齿无效，会产生字体模糊



### 第 23 题：介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

https://juejin.cn/post/7055441354054172709

观察者——双向绑定  Subject  Observer    Subject.add   Subject.notify

订阅发布——$bus     Event     Event.subscribe   Event.publish



### 第 24 题：聊聊 Redux 和 Vuex 的设计思想

https://juejin.cn/post/6998382576540844069

https://juejin.cn/post/6844904020025311246

基于 **观察者模式** 实现 **响应式更新**

Redux——使用的是不可变数据，每次都是用新的state替换旧的state，更新时会把 **所有的 reducer** 都执行一遍

Vuex——数据是可变的，直接修改 state 可以触发响应式更新，更新时会 **指定 mutation** 执行



### 第 25 题：说说浏览器和 Node 事件循环的区别

https://juejin.cn/post/6844903761949753352

```js
// 浏览器——主线程 宏任务 微任务
while (true) {
  宏任务队列.shift()
  微任务队列全部任务()
}

// Node—— 阶段1 nextTick 微任务 阶段2...阶段6
while (true) {
  loop.forEach((阶段) => {
    阶段全部任务()
    nextTick全部任务()
    microTask全部任务()
  })
  loop = loop.next
}
```



### 第 26 题：介绍模块化发展历程

> 可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、`<script type="module">` 这几个角度考虑。

https://juejin.cn/post/6844904086697934855#heading-5

IIFE——立即执行函数，闭包

cjs——同步模块，作用域node

AMD——异步模块定义，加载完成执行回调

CMD——异步模块定义，就近依赖

UMD——AMD + cjs

webpack——jsonp 按需加载

esm——编译时加载，静态解析

module——异步加载



### 第 27 题：全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

let 和 const 声明的全局变量并没有在全局对象中，只是一个块级作用域（Script）中，直接访问即可

```
var a = 1
let b = 2
console.log(window.a)
console.log(b) // 直接访问
```



### 第 28 题：cookie 和 token 都存放在 header 中，为什么不会劫持 token？

https://juejin.cn/post/6844904031337316360

cookie——会引发CSRF攻击，原因是浏览器会自动带上cookie

token——防止CSRF攻击，原因是浏览器不会自动带上token



### 第 29 题：聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

Model ->View: 数据更新触发setter，执行notify，走update，更新watcher，刷新页面

View ->Model:  视图更新，触发input事件，更新数据，..., 刷新页面



### 第 30 题：两个数组合并成一个数组

```js
// 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']
// 合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

function MergeArr(a1, a2) {
  let j = 0
  const res = []
  for (let i = 0; i < a1.length; i++) {
    if (a2[j] && !a1[i].includes(a2[j])) {
      res.push(a2[j])
      j++
    }
    res.push(a1[i])
  }

  while (j < a2.length) {
    res.push(a2[j])
    j++
  }

  return res
}
```



### 第 31 题：改造下面的代码，使之输出0 - 9，写出你能想到的所有解法。

```
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}

// IIFE
for (var i = 0; i < 10; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}

// let
for (let i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}

//
for (var i = 0; i < 10; i++) {
  setTimeout(console.log, 1000, i);
}
```



### 第 32 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

https://juejin.cn/post/7120141908730445854#heading-11

单论修改一个`dom`节点的性能，不管`react`还是`vue`亦或是`angular`，一定是原生最快，

虚拟`dom`有原生`dom`比不了的价值，它能让研发更专注业务以及数据处理，而不是陷入繁琐的`dom`增删改查中。



### 第 33 题：下面的代码打印什么内容，为什么？

```
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();

var b = 10;
{
	const b = function () {
		b = 20;
		console.log(b);
	}
	b()
}
{
	b = 20; // 赋值无效
	console.log(b);
}
```



### 第 34 题：简单改造下面的代码，使之分别打印 10 和 20

```
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();

var b = 10;
(function b(){
    b = 20;
    console.log(window.b);
})();

var b = 10;
(function b(b){
    b = 20;
    console.log(b);
})(b);
```



### 第 35 题：浏览器缓存读取规则

> 可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？

https://juejin.cn/post/6947936223126093861

Service Worker-->Memory Cache-->Disk Cache-->Push Cache

离线>内存>磁盘>服务



### 第 36 题：使用迭代的方式实现 flatten 函数。

https://juejin.cn/post/6844904121087033357

```js
function flat(arr, DFS) {
  const ret = []
  const queen = arr.slice()
  while (queen.length > 0) {
    const cur = queen.shift()
    if (Array.isArray(cur)) {
      if (DFS) {
        for (let i = cur.length - 1; i >= 0; i--)
          queen.unshift(cur[i])
      }
      else {
        for (let i = 0; i < cur.length; i++)
          queen.push(cur[i])
      }
    }
    else {
      ret.push(cur)
    }
  }

  return ret
}
```





### 第 37 题：为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

https://www.jianshu.com/p/8d32c7d0fc9e

因为异步操作是成功还是失败不可预测，什么时候进行异步操作也不可预测；当异步操作成功或失败时, Vuex 和 Redux 就不能捕获到异步的结果从而进行相应的操作

Vuex这一限制其实也是出于代码设计考虑，action和mutation各司其事，本质上也是遵守了“单一职责”原则



### 第 38 题：（京东）下面代码中 a 在什么情况下会打印 1？

https://juejin.cn/post/7002762546440568845

```
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}

let a = {
  i: 1,
  valueOf () { // 优先valueof
    return a.i++
  },
  toString () { // toString兜底
    return a.i++
  }
}
if(a == 1 && a == 2 && a == 3) {
  console.log('1');
}


const a = [1,2,3];
// 执行join
// a == '1,2,3' // true
a.join = a.shift;
if(a == 1 && a == 2 && a == 3) {
  console.log('1');
}


```





### 第 39 题：介绍下 BFC 及其应用。

https://juejin.cn/post/6990271484514172959

BFC——块级作用域上下文 (overflow: hidden)

1. BFC彼此独立 ——解决margin合并

2. BFC内部元素不影响外部元素——清除浮动
3. BFC与浮动元素不重叠——左侧固定，右侧自适应布局



### 第 40 题：在 Vue 中，子组件为何不可以修改父组件传递的 Prop

https://juejin.cn/post/6844903812776329229

因为vue设计是单向数据流，数据的流动方向只能是自上往下的方向



### 第 41 题：下面代码输出什么

```
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()

undefined  // 变量提升
10  // 顶层作用域
20  // 就近作用域
```



### 第 42 题：实现一个 sleep 函数

> 比如 sleep(1000) 意味着等待1000毫秒，可从 Promise、Generator、Async/Await 等角度实现

https://juejin.cn/post/6920492226594373639

```js
const sleep = (time) => new Promise((resolve) => {
  setTimeout(resolve, time)
})

async function run() {
  while (true) {
    console.log(1)
    await sleep(1000)
    console.log(2)
    await sleep(2000)
    console.log(3)
    await sleep(3000)
  }
}
```



### 第 43 题：使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

```js
[3, 15, 8, 29, 102, 22].sort((a, b) => a - b)
```



### 第 44 题：介绍 HTTPS 握手过程

https://juejin.cn/post/6845166891737022471

1. TCP三次握手

2. TLS握手——通过交换三个随机数，然后计算出主会话密钥



### 第 45 题：HTTPS 握手过程中，客户端如何验证证书的合法性

https://juejin.cn/post/6844903924760068103

1. 取公钥——客户端取出提前内置在手机内部的认证机构的公钥

2. 解密数字指纹——用认证机构的公钥去解密公钥证书里的数字签名 从而得到数字指纹

3. 生成数字指纹——客户端对公钥证书的服务器公钥进行 数字摘要算法 从而生成数字指纹

4. 对比数字指纹——对比客户端自己生成的数字指纹(第3步)和解密得到的数字指纹(第2步)是否一致 如果一致则公钥证书验证通过 就可以进行接下来的握手步骤了



### 第 46 题：输出以下代码执行的结果并解释为什么

https://www.jianshu.com/p/334628a813ac

```js
let obj = {
  2: 3,
  3: 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)

// push 方法根据 length 属性来决定从哪里开始插入给定的值。
// 如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。
// 当 length 不存在时，将会创建它。
// obj.push(1)  =>obj[length] = 1; obj[length]++ =>obj[2] = 1; obj[length] = 3
obj = {
  2: 1,
  3: 2,
  length: 4,
  splice: Array.prototype.splice,
  push: Array.prototype.push
}
```



### 第 47 题：双向绑定和 vuex 是否冲突

https://juejin.cn/post/7120431419964276772

严格模式下使用vueX，不是在mutation中修改会抛出错误，所以可以监听input或者change去改变

```html
<!--严格模式会抛出错误 -->
<input v-model="this.$store.state.count">

<input :value="this.$store.state.count" @input="(e) =>this.$store.commit('SET_COUNT', e.target.value)">
```



### 第 48 题：call 和 apply 的区别是什么，哪个性能更好一些

https://juejin.cn/post/6844903997183098888

call的性能比apply好，尤其是在传递给函数的参数超过三个的时候

1. **call**和**apply**都是函数原型上的方法，用于改变this的指向。

2. call传递参数，是一个一个的传递，而apply是以数组的形式给函数传递参数



### 第 49 题：为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？

https://juejin.cn/post/7065123244881215518

1. 图片——防止跨域，防止阻塞
2. gif ——体积最小
3. 1x1——尺寸最小
4. 透明——没有色彩域，不影响展示



### 第 50 题：（百度）实现 (5).add(3).minus(2) 功能。

> 例： 5 + 3 - 2，结果为 6

https://juejin.cn/post/6844903907064446984

```
Number.prototype.add = function(value) {
  let number = parseFloat(value)
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('请输入数字或者数字字符串～')
  }
  return this + number
}

Number.prototype.minus = function(value) {
  let number = parseFloat(value)
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('请输入数字或者数字字符串～')
  }
  return this - number
}

const curry = (fn, ...args) => args.length >= fn.length
    ? fn(...args)
    : (..._args) => curry(fn, ...args, ..._args);
```



### 第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？

https://juejin.cn/post/6844904071720239111

- 一次性要把监听的数据递归到底，效率太低
- 对新增的属性监听不到，无法实现响应式，需要借助Vue.$set
- 对数组的push、pop等操作需要额外的代码才能实现响应式



### 第 52 题：怎么让一个 div 水平垂直居中

https://juejin.cn/post/6847902219853889543

1. position + margin
2. position + transform
3. flex
4. table-cell + inline-block
5. padding



### 第 53 题：输出以下代码的执行结果并解释为什么

```
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)
console.log(b.x)
```

https://juejin.cn/post/6977210727891370014

```js
// a.x undifined
// b.x {n: 2}

let a = { n: 1 }
const b = a // b = {n: 1}

a.x = a = { n: 2 }
// a.x => a = b = {n:1, x: undefined}
// a = {n: 2} => a = {n: 2}; b = {n:1, x: undefined}
// a.x = a =>a.x = {n: 2} =>b.x = {n: 2} =>b = {n:1, x: undefined}; a = {n: 2}
```



### 第 54 题：冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？

1. 从第一个数开始，相邻两个数之间比较

2. 前者大，冒泡；后者大，跳过

3. 重复冒泡，直至浮出水面

4. 重复123

   时间复杂度为`O(n^2)`；空间复杂度为`O(1)`

```js
// [2,3,1,5,4]
// 1 =>5
// 2 =>4,5
// 3 =>3,4,5
// 4 =>2,3,4,5
// 5 =>1,2,3,4,5

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1])
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
}

function bubbleSortStrong(arr) {
  let flag = 1
  for (let i = 0; i < arr.length - 1 && flag === 1; i++) {
    flag = 0
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        flag = 1
      }
    }
  }
}
```



### 第 55 题：某公司 1 到 12 月份的销售额存在一个对象里面

> 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。

```js
Array(12)
  .fill(null)
  .map((v, i) => obj[i + 1] || v)
```



### 第 56 题：要求设计 LazyMan 类，实现以下功能。

```js
LazyMan('Tony')
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch')
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner')
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food')
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```



https://www.jianshu.com/p/8dff237d2c89

建立队列，依次执行

```
function LazyMan(name) {
  class Lazy_Man {
    constructor(name) {
      console.log(`Hi I am ${name}`)
      this.wait = time =>
        new Promise(resolve => setTimeout(resolve, time * 1000))
      this.queue = []

      this.run()
      return this
    }
    run() {
      this.wait(0).then(() => this.next())
    }
    eat(food) {
      this.queue.push(() => {
        console.log(`I am eating ${food}`)
        this.next()
      })
      return this
    }
    sleep(time) {
      this.queue.push(async () => {
        await this.wait(time)
        this.next()
      })
      return this
    }
    sleepFirst(time) {
      this.queue.unshift(async () => {
        await this.wait(time)
        this.next()
      })
      return this
    }
    next() {
      const fn = this.queue.shift()
      typeof fn === 'function' && fn()
    }
  }

  return new Lazy_Man(name)
}
```



### 第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

https://juejin.cn/post/6844904200401502215

| display        | visibility | opacity            |
| -------------- | ---------- | ------------------ |
|                |            | 可以监听事件       |
| 触发重排，重绘 | 触发重绘   |                    |
|                |            | 支持transition过渡 |



### 第 58 题：箭头函数与普通函数（function）的区别是什么？构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？

https://juejin.cn/post/7069943937577779214

| 普通函数                 | 箭头函数               |
| ------------------------ | ---------------------- |
| this指向可变，可使用call | 指向固定               |
|                          | 没有prototype，无法new |
|                          | 没有arguments          |



### 第 59 题：给定两个数组，写一个方法来计算它们的交集。

> 例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

```
const intersection = (nums1, nums2) =>nums1.filter(num => nums2.includes(num))
```



### 第 60 题：已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

```html
<img src="1.jpg" style="width:480px!important;”>
```

max-width > width

```css
img {
	max-width: 300px
}
```



### 第 61 题：介绍下如何实现 token 加密

https://juejin.cn/post/6844904137012822024

1.生成随机数，uid+ts

2.生成token，uid+ts+username+password+SHA256，对称加密生成字符串

3.返回前端  =>header携带  =>SHA256解密  =>对比userinfo



### 第 62 题：redux 为什么要把 reducer 设计成纯函数

https://juejin.cn/post/6844903729175461902

1. redux 根据reducer返回的结果进行新旧比较
2. 对象比较的方式有深比较和浅比较，浅比较性能好
3. 纯函数返回新对象，进行浅比较，从而触发更新



### 第 63 题：如何设计实现无缝轮播

https://juejin.cn/post/7117266653695442957

123  =>31231

312**3**1                             3**1**231

​       **3**1231               3123**1**

1. 将最后一张复制一份放到最前面
2. 当滚动到最后一张时，取消过渡transition，瞬间跳到最前面复制的那张上
3. 然后继续运行动画到第一张



### 第 64 题：模拟实现一个 Promise.finally

https://juejin.cn/post/6966013658727972895

```
Promise.prototype.finally = function(cb) {
  return this.then(
    value => {
      Promise.resolve(cb()).then(() => value)
    },
    reason => {
      Promise.resolve(cb()).then(() => {
        throw reason
      })
    }
  )
}
```



### 第 65 题： `a.b.c.d` 和 `a['b']['c']['d']`，哪个性能更高？

https://www.jianshu.com/p/026b25886482

 `a.b.c.d` 比 `a['b']['c']['d']` 性能高点

后者还要考虑 [ ] 中是变量的情况，

从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点



### 第 66 题：ES6 代码转成 ES5 代码的实现思路是什么

https://juejin.cn/post/6844903912688844814

1 语法转换，如箭头函数，解构

> Babel
>
> 1. 解析：解析代码字符串，生成 AST；        `acorn`
> 2. 转换：按一定的规则转换、修改 AST；    `acorn-walk`
> 3. 生成：将修改后的 AST 转换成普通代码。`escodegen`

2 新的类、新的类方法、新的实例方法，如:`Promise`, `Array.from`, `Array.prototype.find`

> polyfill



### 第 67 题：数组编程题

> 随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`。

```js
function seriesNum(_nums) {
  const res = []
  const nums = _nums.slice().sort((a, b) => a - b)
  let series = [nums[0]]
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1] - 1) {
      series.push(nums[i + 1])
    }
    else {
      res.push(series)
      series = [nums[i + 1]]
    }
  }
  return res
}
```



### 第 68 题： 如何解决移动端 Retina 屏 1px 像素问题

https://juejin.cn/post/6994196887402184734

+ 直接
  + 0.5px
+ 间接
  + 原图
    + border-image
    + background-image
  + 造图
    + box-shade
    + grandiance
  + 缩放
    + transform+scale
+ 根本
  + svg



### 第 69 题： 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。

```
function lower2upper(str) {
  if (/[^a-zA-Z]/.test(str)) return str

  let res = ''
  for (let i = 0; i < str.length; i++) {
    const code = str[i].charCodeAt()
    res +=
      code > 'Z'.charCodeAt()
        ? String.fromCharCode(code - 32)
        : String.fromCharCode(code + 32)
  }

  return res
}
```



### 第 70 题： 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

1 webpack编译

2 dev-server 构建本地服务

3 webpack重新编译

4 websocket获取最后的json和js文件，发送给客户端

5 websocket client 获取文件发起http请求

6 webpack获取最新的文件，并替换

7 浏览器热更新



### 第 71 题： 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

```js
function RK(str1, str2) {
  const sum = (str) => {
    let s = 0
    for (let i = 0; i < str.length; i++)
      s += str[i].charCodeAt()

    return s
  }
  const isEqual = (s1, s2) => {
    for (let i = 0; i < s1.length; i++) {
      if (s1[i] !== s2[i])
        return false
    }
    return true
  }

  const len1 = str1.length
  const len2 = str2.length
  let sum1 = sum(str1.substr(0, len2))
  const sum2 = sum(str2)
  for (let i = 0; i <= len1 - len2; i++) {
    if (sum1 === sum2 && isEqual(str1.substr(i, len2), str2))
      return i

    else
      sum1 = sum1 - str1[i].charCodeAt() + str1[i + len2].charCodeAt()
  }

  return -1
}
```



### 第 72 题： 为什么普通 `for` 循环的性能远远高于 `forEach` 的性能，请解释其中的原因。

1000000百万，forEach(2.592) 略优于for(2.952)

10000000千万，forEach(28.841ms) 明显优于for(12.775ms)

```
let arrs = new Array(1000000)
for: 2.952ms
forEach: 2.592ms
console.time('for')
for (let i = 0; i < arrs.length; i++) {}
console.timeEnd('for') // for: for: 2.952ms

console.time('forEach')
arrs.forEach(arr => {})
console.timeEnd('forEach') // forEach: forEach: 2.592ms
```



### 第 73 题： 介绍下 BFC、IFC、GFC 和 FFC

BFC——bolck

IFC——inline-block

FFC——flex

GFC——grid



### 第 74 题： 使用 JavaScript Proxy 实现简单的数据绑定

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="text" id="input" />
    <div id="text"></div>

    <script>
      window.proxyData = MyVue({ text: 'placeholder' }, 'text', 'input')

      function MyVue(data, el, input) {
        const effect = value => {
          document.getElementById(el).innerHTML = value
          document.getElementById(input).value = value
        }

        const proxyData = new Proxy(data, {
          get(target, key) {
            return Reflect.get(target, key)
          },
          set(target, key, value) {
            effect(value)
            return Reflect.set(target, key, value)
          }
        })

        document.getElementById(input).addEventListener('keyup', e => {
          proxyData.text = e.target.value
        })

        effect(proxyData.text)

        return proxyData
      }
    </script>
  </body>
</html>
```



### 第 75 题：数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少

> 数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 `O(1)`



### 第 76 题：输出以下代码运行结果

```js
// example 1
var a={}, b='123', c=123;
a[b]='b';
a[c]='c';
console.log(a[b]);

// 123 =>隐式转换 ’123‘
---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');
a[b]='b';
a[c]='c';
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};
a[b]='b';
a[c]='c';
console.log(a[b]);

// {key:'123'} =>隐式转换 '[object, object]'
```



### 第 77 题：算法题「旋转数组」

```js
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]

const reverse = (arr, k) => {
   return arr.slice(-k).concat(arr.slice(0, -k))
}
```



### 第 78 题：Vue 的父组件和子组件生命周期钩子执行顺序是什么

父组建： beforeCreate -> created -> beforeMount

子组件： -> beforeCreate -> created -> beforeMount -> mounted

父组件： -> mounted



### 第 79 题：input 搜索如何防抖，如何处理中文输入

v-model

````js
function debounce(fn, delay) {
  let timer = null
  return function (e) {
    if (e.target.composing)
      return

    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      fn.call(this, arguments)
      timer = null
    }, delay)
  }
}

function compositionStart(e) {
  e.target.composing = true
}

function compositionEnd(e) {
  e.target.composing = false
  const event = document.createEvent('HTMLEvents')

  event.initEvent('input')
  e.target.dispatchEvent(event)
}
````



### 第 80 题：介绍下 Promise.all 使用、原理实现及错误处理

```
Promise.all = (promises) => {
    const res = []

    return new Promise((resolve, reject) => {
		 promises.forEach((promise) => {
            Promise.resolve(promise).then(data => {
            	res.push(data)
            	if (res.length === promises.length) {
            		resolve(res)
            	}
            }).catch((err) => {
            	reject(err)
            })
        })
    })
}

Promise.all([
	Promise.resolve(1),
	2,
	new Promise(resolve =>setTimeout(() => resolve(3), 100)),
	4
])
```



### 第 81 题：打印出 1 - 10000 之间的所有对称数

> 例如：121、1331 等

```js
[...Array(10000).keys()].filter((key) => {
  return key && key === +key.toString().split('').reverse().join('')
})
```



### 第 82 题：周一算法题之「移动零」

> 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
>
> 示例:
>
> ```ini
> 输入: [0,1,0,3,12]
> 输出: [1,3,12,0,0]
> 复制代码
> ```
>
> 说明:
>
> 1. 必须在原数组上操作，不能拷贝额外的数组。
> 2. 尽量减少操作次数。

```js
const removeZero = (arr) => {
  let L = 0
  let R = 0
  while (R < arr.length) {
    if (arr[R] > 0) {
      [arr[L], arr[R]] = [arr[R], arr[L]]
      L++
    }
    R++
  }

  return arr
}
```



### 第 83 题：var、let 和 const 区别的实现原理是什么

var 变量提升

let 暂时性死区

const 无法赋值



### 第 84 题：请实现一个 add 函数，满足以下功能。

> add(1); 			// 1
> add(1)(2);  	  // 3
> add(1)(2)(3)； // 6
> add(1)(2, 3);    // 6
> add(1, 2)(3);    // 6
> add(1, 2, 3);    // 6

```js
const add = (x, y, z) => x + y + z
const curry = (fn, ...args) => {
  return fn.length > args.length
    	? (...oArgs) => curry(fn, ...args, ...oArgs)
    	: fn(...args)
}
const currtAdd = curry(add)

function add(...args) {
  const fn = (val) => add.call(null, ...args, val)
  fn.toString = () => args.reduce((a, c) => a + c)
  return fn
}
```



### 第 85 题：react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别

Link：执行点击事件——阻止默认事件——路由跳转

a：链接跳转——新开SPA

、

### 第 86 题：（京东、快手）周一算法题之「两数之和」

> 给定 nums = [2, 7, 11, 15], target = 9
>
> 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

```js
const twoSum = (nums, target) => {
  const m = new Map()
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if (m.has(target - num))
      return [m.get(target - num), i]

    else
      m.set(num, i)
  }
}
```



### 第 87 题：在输入框中如何判断输入的是一个正确的网址。

```
const isUrl = urlStr => {
	try {
		const {origin, host, pathname} = new URL(urlStr)
		return origin && host && pathname
	} catch(e) {
		return false
	}
}
```



### 第 88 题：实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

```
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];

const convert = list => {
  const m = new Map()
  return list.reduce((a, c) => {
    const { id, parentId } = c

    if (parentId === 0) {
      a.push(c)
    } else if (m.has(parentId)) {
      p = m.get(parentId)
      p.children = p.children || []
      p.children.push(c)
    }

    m.set(id, c)
    return a
  }, [])
}
```



### 第 89 题：设计并实现 Promise.race()

```
Promise.race = promises => {
	return new Promise((resolve, reject) => {
		promises.forEach(promise => {
			Promise.resolve(promise).then(resolve, reject)
		})
	})
}
```



### 第 90 题：实现模糊搜索结果的关键词高亮显示

```html
<!DOCTYPE html>
<html>
  <body>
    <input type="text" id="input" />
    <ul id="list"></ul>

    <script>
      const debounce = (fn, wait = 1000) => {
        let timer = null
        return (...args) => {
          if (timer) {
            clearTimeout(timer)
          }
          timer = setTimeout(() => {
            fn.call(this, ...args)
          }, wait)
        }
      }

      const highLight = (data, value) => {
        return data
          .filter(item => item.includes(value))
          .map(item => {
            return item.replace(value, `<mark>${value}</mark>`)
          })
          .map(item => {
            return `<li>${item}</li>`
          })
      }

      const data = ['武汉地铁', '武汉交通', '湖北影视']

      document.getElementById('input').addEventListener(
        'keyup',
        debounce(e => {
          document.getElementById('list').innerHTML = highLight(
            data,
            e.target.value
          )
        })
      )
    </script>
  </body>
</html>
```



### 第 91 题：介绍下 HTTPS 中间人攻击

HTTP

| 爱丽丝 | 鸽子   | 鲍勃 |
| ------ | ------ | ---- |
|        | 马洛斯 |      |

HTTPS--对称

| 爱丽丝 |      | 鸽子(加密规则)     | 鲍勃 |                |
| ------ | ---- | ------------------ | ---- | -------------- |
|        |      | 马洛斯  中间人攻击 |      |                |
| 爱丽丝 | 加密 | 鸽子               | 鲍勃 | 解密           |
|        |      | 马洛斯             |      | 正常\|狗屁不通 |

HTTPS--非对称

| 鲍勃           | 鸽子                     | 爱丽丝             |
| -------------- | ------------------------ | ------------------ |
| 爱丽丝（钥匙） | 鸽子（带锁的盒子）       | 鲍勃               |
| 鲍勃           | 鸽子（信装进盒子并上锁） | 爱丽丝（开锁看信） |
|                | 马洛斯--换盒子           |                    |

证书

| 鲍勃           | 鸽子                                    | 爱丽丝             |
| -------------- | --------------------------------------- | ------------------ |
| 爱丽丝（钥匙） | 鸽子（带锁的盒子 +  特德的签名）        | 鲍勃               |
| 鲍勃           | 鸽子（检查特德签名 + 信装进盒子并上锁） | 爱丽丝（开锁看信） |
|                | 马洛斯                                  |                    |

HTTPS + 证书

加密规则——非对称加密

普通信息——对称加密



### 第 92 题：已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

>const value = '112'
>const fn = (value) => {
>...
>}
>fn(value) // 输出 [1， 11， 112]





### 第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。

> nums1 = [1, 3]  nums2 = [2]
>
> 中位数是 2.0



### 第 94 题：vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

- 事件代理能够避免我们逐个的去给元素新增和删除事件
- 事件代理比每一个元素都绑定一个事件性能要更好

在 `v-for` 中，我们直接用一个 `for` 循环就能在模板中将每个元素都绑定上事件，并且当组件销毁时，vue 也会自动给我们将所有的事件处理器都移除掉。所以事件代理能做到的第一点 vue 已经给我们做到了

在 `v-for` 中，给元素绑定的都是相同的事件，所以除非上千行的元素需要加上事件，其实和使用事件代理的性能差别不大，所以也没必要用事件代理



### 第 95 题：模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况

+ deepCopyByHistory
+ deepCopyByMessageChannel
+ deepClone

```js
function cloneDeep(source, hash = new WeakMap()) {
  const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'
  if (!isObject(source)) return source
  if (hash.has(source)) return hash.get(source)

  const target = Array.isArray(source) ? [] : {}
  hash.set(source, target)

  	Reflect.ownKeys(source).forEach((key) => {
    target[key] = isObject(source[key]) ? cloneDeep(source[key], hash) : source[key]
  	})
  return target
}
```



### 第 96 题：介绍下前端加密的常见场景和方法



### 第 97 题：React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？



### 第 98 题：（京东）写出如下代码的打印结果

```js
function changeObjProperty(o) {
  o.siteUrl = 'http://www.baidu.com'
  o = new Object()
  o.siteUrl = 'http://www.google.com'
}

const webSite = new Object()
changeObjProperty(webSite)
console.log(webSite.siteUrl) // http://www.baidu.com
```





### 第 99 题：（bilibili）编程算法题

> 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

```js
const numberReverse = (num) => {
 	const str = String(num)
  // f(n) = f(n-1) + first
  return str.length === 1 ? str : (numberReverse(+str.slice(1)) + str[0])
}
```





### 第 100 题：（京东）请写出如下代码的打印结果

```js
function Foo() {
  Foo.a = function () {
    console.log(1)
  }
  this.a = function () {
    console.log(2)
  }
}
Foo.prototype.a = function () {
  console.log(3)
}
Foo.a = function () {
  console.log(4)
}
Foo.a() // 4
const obj = new Foo()
obj.a() // 2
Foo.a() // 1
Foo.prototype.a() // 3
```

