// 获取应用实例并得到全局数据 - 请求主地址
const baseUrl = getApp().globalData.baseUrl;
interface RequestParams{
  header?: string
  url: string
  data?: any
  method?: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined
  showLoading?: boolean
  loadingTxt: string
}

// 封装wxRequest，让它支持async-await
const wxRequest = (params:RequestParams) => {
  let xAuthToken = wx.getStorageSync("x-auth-token") || ""
  let header = Object.assign({  
    "Content-Type": "application/json",
  }, params.header)
  if (params.url.indexOf("auth/login") === -1) { 
    (header as any).Authorization = xAuthToken;
  }
  let data = params.data || {};

  // hideLoading可以控制是否显示加载状态
  if (params.showLoading) {
    wx.showLoading({
      title: params.loadingTxt || "加载中...",
      mask: true
    }); 
  }

  if (params.url.indexOf("http") == -1) { 
    params.url = baseUrl + params.url; //防止以后不同路径来
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: params.url,
      method: params.method || "GET",
      data,
      header,
      success: (res:any) => {
        if (res && res.statusCode == 200 && res.data.code == 200) {
          resolve(res.data);
        } else {

          wx.showModal({
            content: res.data.msg || res.data.message || res.data.error,
            showCancel: false,
          });
          reject(res);
        }
      },
      fail: err => {
        if (params.url.indexOf("auth/login") >= 0) {
          reject(err);
        }
        wx.showToast({
          title: err.errMsg,
          icon: "none"
        });
        reject(err);
      },
      complete: () => {
        setTimeout(() => {
          if (params.showLoading) {
            wx.hideLoading()
          }
        }, 500);
      }
    });
  });
};

module.exports = {
  wxRequest,
};