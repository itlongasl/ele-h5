module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      // 根节点的fontSize
      rootValue: 16,
      // 将所有css文件的px替换为rem
      propList: ['*'],
      // 禁止替换:root,因为vant-ui有使用:root定义变量
      selectorBlackList: [':root']
    }
  }
};
