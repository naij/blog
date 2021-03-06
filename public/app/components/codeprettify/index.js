﻿KISSY.add('components/codeprettify/index', function (S, Brick) {
  var $ = S.all

  var CodePrettify = Brick.extend({
    bindUI: function () {
      $('pre').addClass('prettyprint linenums')
      prettyPrint()
    }
  })

  return CodePrettify
}, {
  requires: [
    'brix/core/brick'
  ]
})