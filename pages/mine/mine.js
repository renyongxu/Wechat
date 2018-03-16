const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userlogin: false
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

    // that.drawCursor();

    console.log(url);
    wx.setNavigationBarTitle({
      title: '我的',
    })


    that.setData({
      userInfo: app.globalData.userInfo,
      userlogin: app.globalData.isLogin

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from == 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '纪念',
      path: '/pages/home/home',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  getMyReport: function (event) {

    if (app.globalData.hasUserInfo) {
      wx.navigateTo({
        url: '../myReport/rp',
      })
    } else {
      this.goUserAuth();
    }

  },

  getPinTuan: function (event) {

    wx.navigateTo({
      url: '../pin/pin',
    })
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
  goUserAuth: function () {
    var that = this;
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
                    // 可以将 res 发送给后台解码出 unionId
                    console.log(2);
                    that.setData({
                      userInfo: res.userInfo,
                      userlogin : true
                    })
                    app.globalData.userInfo = res.userInfo
                    app.globalData.userlogin = true;
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