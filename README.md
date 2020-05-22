# 模拟实现call、apply、bind函数

> 代码中没有用ES6+代码，因为API是ES3就有。

## call

```javascript
Function.prototype.call = function(context) {
  // 默认值是window
  var context = context || window;

  // 获取调用call的函数
  context.fn = this;

  // 获取参数
  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }

  // 执行函数，此时this指向的是context
  var result = eval('context.fn(' + args + ')');

  // 删除增加的函数属性。
  delete context.fn;

  // 返回执行的结果
  return result;
}
```

## apply

```javascript
Function.prototype.apply = function (context, arugmentArr) {
  // 默认值是window
  var context = context || window;
  // 默认值空数组不传参数
  var arugmentArr = arugmentArr || [];

  // 获取调用apply的函数
  context.fn = this;

  // 获取参数
  var args = [];
  for (var i = 0; i < arugmentArr.length; i++) {
    args.push('arugmentArr[' + i + ']');
  }

  // 执行函数，此时this指向的是context
  var result = eval('context.fn(' + args + ')');

  // 删除增加的函数属性。
  delete context.fn;

  // 返回执行的结果
  return result;
}
```

### bind

```javascript
Function.prototype.bind = function (context) {

  var self = this;

  // 拿到调用bind时传入的参数
  var args = Array.prototype.slice.call(arguments, 1);

  var Noop = function () {};

  var bindFunc = function() {
    // 组合参数
    const bindArgs = Array.prototype.slice.call(arguments);
    // 通过new运算符使用时，this 指向实例
    return self.apply(this instanceof bindFunc ? this : context, args.concat(bindArgs));
  }

  // 使用空函数Noop作为中间桥梁
  // 如果直接bindFunc.prototype = this.prototype，改变前者、后者也会改变。
  Noop.prototype = this.prototype;
  bindFunc.prototype = new Noop();

  return bindFunc;
}

```
