const app = getApp();
var URL = app.globalData.URL;
var openId = app.globalData.openid;
console.log(openId)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genders: ['男', '女'],
    index: 0,
    time: '时/分',
    date: '年/月/日',
    birthPlace: '',
    livePlace: '',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    region1: ['广东省', '广州市', '海珠区'],
    customItem1: '全部',
    userName: '',
    userGender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    birthHour: '',
    birthMinute: '',
    birthPro: '',
    birthCity: '',
    birthCountry : '',
    livePro: '',
    liveCity: '',
    liveCountry : '',
    dt: 0,
    zone: 8,
    agent: 'weChat',
    docHasWrong: false,
    errorMsg: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '个人资料',
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
  onShareAppMessage: function () {

  },

  bindPickerChange: function (e) {

  },
  bindRegionChange: function (e) {

  },

  // 选择性别
  bindGenderPickerChange: function (e) {
    var that = this;

    var i = e.detail.value;
    that.setData({
      userGender: this.data.genders[i],
      index: i
    })
  },
  // 选择出生时间
  bindTimeChange: function (e) {

    var that = this;

    var currentTime = e.detail.value;
    var tempTime = currentTime.split(":")

    that.setData({
      time: currentTime,
      birthHour: parseInt(tempTime[0]),
      birthMinute: parseInt(tempTime[1])
    })
  },

  bindDateChange: function (e) {
    console.log(e.detail.value)
    // var that = this;
    var currentDate = e.detail.value;
    var tDate = currentDate.split("-");

    this.setData({
      date: currentDate,
      birthYear: parseInt(tDate[0]),
      birthMonth: parseInt(tDate[1]),
      birthDay: parseInt(tDate[2]),

    })
  },
  // 选择出生省份
  bindPickerProvinceChange: function (e) {
    var that = this;
    console.log(e)
    var arr = e.detail.value;

    that.setData({
      birthPro: arr[0],
      birthCity : arr[1],
      birthCountry : arr[2],
      birthPlace: arr[2]
    })

  },

  // 选择现居省份
  bindPickerLiveProvinceChange: function (e) {
    var that = this;
    console.log(e)
    var arr = e.detail.value;
    that.setData({
      livePlace: arr[2],
      livePro: arr[0],
      liveCity: arr[1],
      liveCountry: arr[2],
    })


  },

  // 输入姓名之后
  checkName: function (e) {
    var that = this;
    console.log(e)
    var name = e.detail.value;

    that.setData({

      userName: name,
    })

  },
  // 保存数据
  saveProfile: function (e) {
    // console.log(this.data);
    var userName = this.data.userName;
    var userGender = this.data.userGender;
    var birthYear = this.data.birthYear;
    var birthMonth = this.data.birthMonth;
    var birthDay = this.data.birthDay;
    var birthHour = this.data.birthHour;
    var birthMinute = this.data.birthMinute;
    var birthPro = this.data.birthPro;
    var birthCity = this.data.birthCity;
    var birthCountry = this.data.birthCountry;
    var livePro = this.data.livePro;
    var liveCity = this.data.liveCity;
    var liveCountry = this.data.liveCountry;
    var dt = this.data.dt;
    var zone = this.data.zone
    var agent = this.data.agent;
    var docId = '';
    wx.getStorage({
      key: 'docId',
      success: function(res) {
        docId = res.data;
      },
    })

    if (this.checkIsEmpty(userName)) {
      this.showErrorMsg('用户名不能为空');
    } else if (this.checkIsEmpty(userGender)) {
      this.showErrorMsg('性别不能为空');
    } else if (this.checkIsEmpty(birthHour) || this.checkIsEmpty(birthMinute)) {
      this.showErrorMsg('请选择出生时间');
    } else if (this.checkIsEmpty(birthYear) || this.checkIsEmpty(birthMonth) || this.checkIsEmpty(birthDay)) {
      this.showErrorMsg('请选择出生日期');
    } else if (this.checkIsEmpty(birthPro) || this.checkIsEmpty(birthCity) || this.checkIsEmpty(birthCountry)) {
      this.showErrorMsg('请选择出生地');
    } else if (this.checkIsEmpty(livePro) || this.checkIsEmpty(liveCity) || this.checkIsEmpty(liveCountry)) {
      this.showErrorMsg('请选择现居地');
    } else {
      var data = {
        userName: userName,
        userGender: userGender,
        birthYear: birthYear,
        birthMonth: birthMonth,
        birthDay: birthDay,
        birthHour: birthHour,
        birthMinute: birthMinute,
        birthPro: birthPro,
        birthCity: birthCity,
        birthCountry: birthCountry,
        livePro: livePro,
        liveCity: liveCity,
        liveCountry: liveCountry,
        dt: dt,
        zone: zone,
        agent: agent,
        docId : docId
        
      };
      wx.request({
        url: URL+'/doc/save_data',
        data : data,
        method : 'POST',
        success : function(res){

          console.log(res);
        }
      })

      console.log(data)
    }

  },

  showErrorMsg: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      success: function (res) {
        if (res.confirm) {

        }
      }
    })
  },

  checkIsEmpty: function (variable) {
    console.log(variable);
    if (variable === '' || variable === undefined) {
      return true;
    } else {
      return false;
    }
  }

})