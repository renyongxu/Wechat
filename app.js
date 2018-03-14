//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({

      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.isLogin = true;
              // this.globalData.hasUserInfo = true;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            // fail : function(e){
            //   wx.showModal({
            //     title: '提示',
            //     content: '您点击了拒绝授权,将无法显示用户头像与昵称',
            //     success : function(res){
            //       if(res.confirm){
            //         wx.openSetting({
            //           success: function (res) {
            //             this.globalData.userInfo = res.userInfo
            //             this.globalData.isLogin = false;
            //           }
            //         })
            //       }
            //     }
            //   })
            // }
          })
        }
      },
      fail: res =>{
        console.log('cancle the res --'+res)
        this.globalData.isLogin = false;
        this.globalData.hasUserInfo = false;
      }

    })
    // 登录
    wx.login({
  
      success: res => {
        console.log('app13 --'+res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          var that = this;
          var a = that.globalData;
          
          wx.request({
            url: 'http://ceceapi_dev.xxwolo.com/rp/get_openid',
            method : 'POST',
            data : {
              code : res.code,
              appid : a.appid,
              secret : a.secret
            },
            success : function(res){
              
              that.globalData.openid = res.data.openid;
              
            }
          })
        }

      }
    })
    
  },
  
  globalData: {
    userInfo: null,
    appid: 'wxd0cf136456d4c9e1',
    secret: '03fb1e606d11e23234ed59bfad38de18',
    openid : '',
    isLogin : false,
    hasUserInfo : false,
    currentUrl : ''
  }
})