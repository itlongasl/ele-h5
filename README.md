## 项目名称：Vite + Vue3 + Pinia + Vant + TypeScript打造外卖h5项目

### 创建项目 

``` 
npm init vue 
```

### 使用Git托管代码

#### 创建Git项目（初始化）

``` 
git init 
```

#### 将初始数据添加到暂存区，并提交到git本地数据库

```
git add .
git commit -m "初始数据的提交"
```

* 扩展：
1. 查看git提交日志
```
git log
```
2. 比较文件的改动差异
```
git diff
```

### Git基本使用

#### 查看分支
```
git status
```

#### 创建分支
```
git branch 分支名
```

#### 切换分支
```
git checkout 分支名
```

#### 新建并切换到新建的分支
```
git checkout -b 分支名
```

#### 合并分支
注：当我需要将A分支合并到B分支，我需要切换到B分支，才能执行下面的命令将A合并到B
```
git merge 分支名
```

### 将代码托管到远程仓库（github）
* 在github上创建完仓库后按照步骤一步一步来：

#### 关联远程仓库
```
git remote add origin https://github.com/itlongasl/ele-h5.git
```

#### 将本地代码以分支的形式push到远程仓库
```
git push -u origin main
```

#### 当别人也在远程仓库上提交了分支时
* 使用以下命令将提交的分支拉取到本地
```
git pull origin(仓库名) master(分支名)
```

### 项目前期准备

#### Git Hooks？
* Hooks指的是一些时机的回调，Git hooks用于Git流程中时机的回调，通过Git hooks可以控制整个流程的进行，A能否进行到B，中间使用hooks控制，比如可以用于在commit提交分支时做一些代码校验处理（pre-commit）

#### husky？
* Git提供了Git Hooks，但是需要自己写脚本，还需要对Git的原理有一定的了解，对新手很不友好，这时就能使用husky快速帮我们管理Git
* 使用husky：
  				1. 校验commit信息
      		2. 运行测试代码
      		3. 校验代码格式 ...

#### 如何使用husky？

##### 安装与初始化

```
npx husky-init && npm install
如果不能执行也可使用
npx husky-init ; npm install
安装前检查是否将git初始化，是否有.git文件，如果没有，执行
git init
```

* 安装并初始化后，目录会有一个.husky文件夹

#### 使用commitlint规范commit信息

##### commitlint？
* 提交commit时，需要填写commit信息，commitlint就是用来对commit的填写做一个规范
* 为什么需要对commit提交的信息做一个规范？
在功能复杂的大型项目中，会产生大量的commit版本，这些commit记录了整个项目的开发进程
通过commit回顾项目开发进展或者回退版本，良好的commit信息能够清晰的知道当时更改需求的需求背景以及动机
* 安装
```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

* 自动配置
```
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

* 使用husky添加这个hooks
```
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```

#### 配置ESLint

##### 安装vscode扩展 ESLint

* 此扩展是当代码不符合eslint规范时会显示波浪线

##### .eslintrc.cjs中配置自己的要求

#### 创建.prettierrc.js

##### prettierrc与eslint结合使用

* .prettierrc.js里面配置自己需要的

如果.prettierrc.js文件的东西不生效，看是否是执行的是.prettierrc.json里面的

#### 安装Vant-ui

```
npm i vant
```

##### 导入Vant-ui

```
// main.ts
import 'vant/lib/index.css'
```
#### 制作底部tab栏

##### 如何引入组件
```
import { Tabbar, TabbarItem } from 'vant'
```

#### vue-router实现页面路由

##### 如何配置路由？

* 配置tab栏路由展示到App主页面
* tab栏切换的三个页面作为tab栏路由的子路由，展示在tab栏页面
具体看router文件

#### 切换tab栏时切换页面

首先router文件中配置好路由

* tabs.vue
```
import { useRoute, useRouter } from 'vue-router'

// 拿到路由
const route = useRoute();
// 拿到路由器
const router = useRouter();

// 将路由与tab栏绑定
const active = ref(route.name as string);

// Vue3 watch 第一个参数：监听对象   第二个参数：事件回调
// 对路由进行监听，路由改变就跳转
watch(active, (newValue) => {
  router.push({
    name: newValue
  });
});
```

#### 设置请求代理服务器
* vite.config.ts
```
server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000', //请求数据
      '/imgs': 'http://localhost:8000' //请求图片
    }
  }
```

#### 配置axios响应拦截
* request.ts
```
import axios from 'axios';
import { showDialog } from 'vant';

const instance = axios.create({
  baseURL: 'api',
  timeout: 5000
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  const { data: _data } = response;
  // 解构出数据
  const { data, code, msg } = _data;
  // 当code不等于0，就判断其请求失败
  if (code !== 0) {
    showDialog({
      message: msg
    }).then(() => {});
    return Promise.reject(msg);
  }
  // 请求成功返回data
  return data;
});
```

#### (重点)使用post-css实现移动端适配

##### 安装
```
npm i postcss autoprefixer postcss-pxtorem -D
```

##### 新建postcss.config.js

```
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

```

##### main.ts添加以下数据
```
// 设计稿中body的fontSize
const rootValue = 16;
// 设计稿的屏幕宽度
const rootWidth = 390;
// 获取用户设备的屏幕宽度
const deviceWidth = document.documentElement.clientWidth;
// 真实body的fontSize = 真实屏幕宽度 * 设计稿body的字体 / 设计稿屏幕宽度
document.documentElement.style.fontSize = (deviceWidth * rootValue) / rootWidth + 'px';
```



