module.exports = function *(next) {
  yield this.render('index')
}