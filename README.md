# wx-app-template

基于 原生微信小程序 + typescript + vantweapp ，构建的微信小程序开发模板

### 功能配置

- 目前登录方式两种：账号密码登录，手机号快速登录，若`usePassword`与`useQuickLogin`均为`false`，则会在登录页直接跳转至首页。

- 通过配置`hasBottomBar`使得项目首页显示/隐藏底部tabbar

``` javascript
// /miniprogram/setting.ts

const settings: settingType ={
  // 是否启用首页底部bar
  hasBottomBar: true,
  // 登录相关配置
  loginConfiguration: {
    // 是否使用账号密码登录
    usePassword: false,
    // 是否使用手机快速登录
    useQuickLogin: false,
        // 是否使用登录
    useLoginPage: function () {
      return this.usePassword || this.useQuickLogin
    },
    // 是否同时存在2种及以上的登录方式
    manyWaysForLogin: function () {
      return this.usePassword && this.useQuickLogin
    }
    
  }
}
```

### 项目工具

使用公司前端工具库，@datawis/utils

### 权限控制

采用跳转前，判定是否有页面权限的方式：跳转至需要控制权限的页面，需要引用`/miniprogram/utils.ts`中的跳转方法：
``` javascript
// /miniprogram/utils.ts

/**
 * 页面跳转权限鉴定
 * @param {*} type 跳转方式，可选'reLaunch' | 'redirectTo' | 'navigateTo'
 * @param {*} url 跳转url若有参数拼接到该参数后面
 */
type navigateToType = 'reLaunch' | 'redirectTo' | 'navigateTo'
export const NavigateTo = (type: navigateToType, url: string) => {
  const pageRights = wx.getStorageSync('pageRights')
  const whiteList = ['/login/login']
  const urlWithOutParams = url.split('?')[0]
  if (whiteList.includes('/login/login')) {
    (wx as any)[type]({
      urlWithOutParams
    })
  } else {
    if (pageRights.includes(urlWithOutParams)) {
      (wx as any)[type]({
        urlWithOutParams
      })
    } else {
      AlertInfo({ type: 'showModal', title: '您暂无此页面权限' })
    }
  }
}
```

