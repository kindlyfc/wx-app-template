// pages/login/login.ts
import settings from '../../setting'
import { regUserName,regPassword  } from '@datawis/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useLoginPage: settings.loginConfiguration.useLoginPage(),
    usePassword: settings.loginConfiguration.usePassword,
    useQuickLogin: settings.loginConfiguration.useQuickLogin,
    manyWaysForLogin: settings.loginConfiguration.manyWaysForLogin(),
    showPasswordForm: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(this.data.useLoginPage)
    if (!this.data.useLoginPage) {
      wx.navigateTo({
        url: '/pages/index/index'
      }) 
    }
  },
  /**点击“账号密码登录” */
  showPassWord() {
    this.setData({showPasswordForm: true})
  },
  /**账号密码登录 */
  formSubmit(e:WechatMiniprogram.TouchEvent ) {
    const { account, password } = e.detail.value
    if (!regUserName(account)) {
      wx.showModal({
        title: '提示',
        showCancel:false,
        content: '账号为6-16位字母/数字'
      })
      return
    }
    if (!regPassword(password)) {
      wx.showModal({
        title:'提示',
        showCancel:false,
        content: '密码为6-16位字母/数字/英文字符'
       })
      return
    }
    const pageRights = [
      "pages/login/login",
      "pages/index/index",
      "pages/logs/logs",
      "pages/testpage/testpage"
    ]
    wx.setStorageSync('pageRights',pageRights)
    wx.setStorageSync('hasLogin',true)
    wx.setStorageSync('x-auth-token', '123456a')
    wx.navigateTo({url: '../index/index'})
  }
})