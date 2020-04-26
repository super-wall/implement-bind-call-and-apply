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
