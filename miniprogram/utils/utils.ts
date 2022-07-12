export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

type alertType = 'showToast' | 'showModal'
type iconType = "success" | "loading" | "none" | undefined
interface alertInfoType {
  type: alertType,
  title: string,
  icon?: iconType,
  showCancel?: boolean,
  duration?: number
}
/**
 * 消息弹窗
 * @param params {
 *    type: 类型，必填
 *    title: 提示内容，必填
 *    icon: type为showToast时提示语icon，默认"none"
 *    showCancel: type为showModal时，是否显示取消按钮，默认false
 *    duration: type为showToast时，提示框持续时长，默认2000
 * }
 * @returns 
 */
export const AlertInfo = (params: alertInfoType) => {
  let { type, title, icon, showCancel, duration } = params
  if (!type || !title) {
    return new Error('type和title为必填')
  }
  // showToast 消息提示框
  if (type == "showToast") {
    wx.showToast({
      title,
      icon: icon || "none",
      duration: duration || 2000
    });
    return
  }
  // showModal 模态对话框
  if (type == "showModal") {
    return new Promise<void>((resolve, reject) => {
      wx.showModal({
        title: '温馨提示',
        content: title || "出错了",
        showCancel: showCancel || false,
        success(res) {
          if (res.confirm) {
            resolve()
          } else if (res.cancel) {
            reject()
          }
        }
      })
    })
  }
  return
};


/**
 * 判断当前用户是否已登录
 */
export function HasLogin() {
  const result = wx.getStorageSync("hasLogin")
  if (!result) {
    (AlertInfo({ type: 'showModal', title: '当前功能需要登录才能使用, 请您先登录' }) as any).then(() => {
      wx.reLaunch({
        url: "/pages/login/login"
      });
    })
  }
  return result
}

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

