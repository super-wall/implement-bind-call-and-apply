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
