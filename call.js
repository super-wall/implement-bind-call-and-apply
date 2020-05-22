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
