interface settingType{
  hasBottomBar: boolean,
  loginConfiguration: {
    useLoginPage: ()=>boolean
    usePassword: boolean
    useQuickLogin: boolean
    manyWaysForLogin: ()=>boolean
  }
}

const settings: settingType = {
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

export default settings