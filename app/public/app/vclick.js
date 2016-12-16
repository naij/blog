KISSY.add('app/vclick', function (S, Router) {
  var $ = S.all
  $('body').delegate('click', 'a', function(e) {
    var $tar = $(e.currentTarget)
    var href = $tar.attr('href')
    var ignore = $tar.attr('vclick-ignore')

    if (href && /^\/[^\/]/.test(href) && !ignore) {
      e.preventDefault()
      Router.navigate(href)
    }
  })
},  {
  requires: [
    'magix/router'
  ]
})