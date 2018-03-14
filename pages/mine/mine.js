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
    app.globalData.currentUrl = url;

    that.drawCursor();

    console.log(url);
    wx.setNavigationBarTitle({
      title: '我的',
    })
    

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
    
  },

  drawCursor: function () {
    /* 定义变量 */
    // 定义三角形顶点 TODO x
    var center = { x: app.screenWidth / 2, y: 5 };
    // 定义三角形边长
    var length = 20;
    // 左端点
    var left = { x: center.x - length / 2, y: center.y + length / 2 * Math.sqrt(3) };
    // 右端点
    var right = { x: center.x + length / 2, y: center.y + length / 2 * Math.sqrt(3) };
    // 初始化context
    const context = wx.createCanvasContext('canvas-cursor');
    context.moveTo(center.x, center.y);
    context.lineTo(left.x, left.y);
    context.lineTo(right.x, right.y);
    // fill()填充而不是stroke()描边，于是省去手动回归原点，context.lineTo(center.x, center.y);
    context.setFillStyle('#000');
    context.fill();
    context.draw();
  }
})