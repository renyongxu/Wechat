const app = getApp();
// var md5 = require('../../utils/md5.js')
// var sha1 = require('../../utils/sha1.js')
var URL = app.globalData.URL;
var appid = app.globalData.appid;
var secret = app.globalData.secret;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportList: '',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    hasUserInfo: false,
    userInfo: {},
    isBuy: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route;
    app.globalData.currentUrl = url;
    

    // 获取报告列表
    wx.request({

      url: URL + '/rp/list',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        that.setData({
          reportList: res.data
        })

      }
    })
    // if (app.globalData.userInfo) {

    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       console.log('--1')
    //       console.log(res.userInfo)
    //       app.globalData.userInfo = res.userInfo
    //       console.log(app.globalData.userInfo)
    //       that.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //       console.log('--2')
    //     },
    //     fail: function (res) {

    //     }
    //   })
    // }
    console.log(app.globalData.userInfo)
    // // 登录
    // wx.login({

    //   success: res => {
    //     console.log('app13 --' + res.code);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     if (res.code) {
    //       var that = this;
    //       var a = that.globalData;

    //       wx.request({
    //         url: 'http://ceceapi_dev.xxwolo.com/rp/get_openid',
    //         method: 'POST',
    //         data: {
    //           code: res.code,
    //           appid: appid,
    //           secret: secret
    //         },
    //         success: function (res) {
    //           console.log(res);
    //           // that.globalData.openid = res.data.openid;

    //         }
    //       })
    //     }

    //   }
    // })

    wx.setNavigationBarTitle({
      // title: that.data.mername//页面标题为路由参数
      title: "首页"
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    console.log(e);
    if (e.detail.errMsg == 'getUserInfo:ok') {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        userlogin: true
      })
    } else {
      this.setData({
        userInfo: {},
        userlogin: false
      })
    }

  },
  // 前往详情页
  toDetail: function (event) {
    // console.log(event.currentTarget);
    var that = this;
    console.log(event.currentTarget)
    var id = event.currentTarget.id;
    var category = event.currentTarget.dataset.category;
    var name = event.currentTarget.dataset.name;
    var hasUserInfo = app.globalData.hasUserInfo;
    var isBuy = that.data.isBuy;
    console.log(isBuy);
    if (hasUserInfo) {
      if (isBuy) {
        wx.navigateTo({

          url: '../detail/detail?id=' + id + '&category=' + category,
        })
      } else {

        var hasDoc = app.globalData.hasDoc;
        if (hasDoc) {
          wx.navigateTo({

            url: '../reportDetail/report?id=' + id + '&category=' + category + '&name=' + name,
          })
        } else {
          wx.navigateTo({

            url: '../doc/doc',
          })
        }

      }

    } else {

      this.goUserAuth();
    }

  },
  goUserAuth: function () {

    wx.showModal({
      title: '提示',
      content: '授权之后才能进行下一步操作',
      success: function (res) {
        if (res.confirm) {
          wx.openSetting({
            success: function (res) {
              console.log(res);
              var scope = res.authSetting['scope.userInfo'];

              if (scope) {
                console.log(1);
                wx.getUserInfo({
                 
                  success: res => {
                    console.log(2);
                    // 可以将 res 发送给后台解码出 unionId
                    app.globalData.userInfo = res.userInfo
                    app.globalData.isLogin = true;
                    app.globalData.hasUserInfo = true;
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况

                    console.log(3);
                    if (this.userInfoReadyCallback) {
                      this.userInfoReadyCallback(res)
                    }
                  }

                })

              } else {
                console.log('stop');
              }
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      }
    })
  }

})