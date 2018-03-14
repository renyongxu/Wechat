const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : {},
    userlogin : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route;
    console.log(url);
    wx.setNavigationBarTitle({
      title: '我的',
    })
    app.globalData.currentUrl = url;

    that.setData({
      userInfo : app.globalData.userInfo,
      userlogin : app.globalData.isLogin
      
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
    if(res.from == 'button'){
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

  getMyReport : function(event){

    if (app.globalData.hasUserInfo){
      wx.navigateTo({
        url: '../myReport/rp',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '授权登录才能访问',
        success : function(res){
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login',
            })
          }
        },
        
      })
    }
    
  },

  getPinTuan : function (event) {

    wx.navigateTo({
      url: '../pin/pin',
    })
  },

  getUserInfo : function(e){
    console.log(e);
    if (e.detail.errMsg == 'getUserInfo:ok'){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        userlogin: true
      })
    }else{
      this.setData({
        userInfo: {},
        userlogin: false
      })
    }
    
  }
})