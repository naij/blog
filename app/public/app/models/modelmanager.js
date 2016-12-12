KISSY.add("app/models/modelmanager", function (S, BaseManager, BaseModel) {
  var Manager = BaseManager.create(BaseModel);

  Manager.registerModels([
    // 登录
    {
      name: 'login',
      url: '/api/login',
      options: {
        type: 'post'
      }
    },
    // 登出
    {
      name: 'logout',
      url: '/api/logout'
    }
  ])

  Manager.registerModels([
    // 获取文章列表
    {
      name: 'article_list',
      url: '/api/article/list'
    },
    // 获取文章列表
    {
      name: 'article_detail',
      url: '/api/article/detail'
    },
    // 根据标签获取文章列表
    {
      name: 'article_list_by_tag',
      url: '/api/article/bytag'
    },
    // 归档
    {
      name: 'archive',
      url: '/api/article/archive'
    },
    // 标签集合
    {
      name: 'article_tag_group',
      url: '/api/article/taggroup'
    }
  ])

  Manager.registerModels([
    // 标签列表
    {
      name: 'tag_list',
      url: '/api/tag/list'
    },
    // 文章列表
    {
      name: 'article_full',
      url: '/api/article/full'
    },
    // 文章添加
    {
      name: 'article_create',
      url: '/api/article/create',
      options: {
        type: 'post'
      }
    },
    // 文章编辑
    {
      name: 'article_update',
      url: '/api/article/update',
      options: {
        type: 'post'
      }
    },
    // 文章删除
    {
      name: 'article_remove',
      url: '/api/article/remove',
      options: {
        type: 'post'
      }
    },
    // 图片列表
    {
      name: 'picture_list',
      url: '/api/pic/list'
    },
    // 二维码
    {
      name: 'tool_qr',
      url: '/api/tool/qr',
      options: {
        type: 'post'
      }
    }
  ]);
  return Manager;
}, {
  requires: ["mxext/mmanager", "app/models/basemodel"]
});