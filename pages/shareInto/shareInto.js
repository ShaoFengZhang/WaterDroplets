// pages/shareInto/shareInto.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plantImg: "https://tp.datikeji.com/constellation/15381264984469/4xIy5AXftNe7m7IUv8pfiA6jIjLVbCD7ENpBNJBQ.png",
    // plantPopupImg: "https://tp.datikeji.com/constellation/15381901994499/3wKR5bvoWZyldZIIvE4Yym6age9NO7s9mMfnw5IU.png",
    weekList: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    growList: [
      { "title": "V1", "value": "10" },
      { "title": "V2", "value": "200" },
      { "title": "V3", "value": "600" },
      { "title": "V4", "value": "1000" },
      { "title": "V5", "value": "1600" },
      { "title": "V6", "value": "2500" },
    ],
    showPopup: 0,//控制打卡弹窗显示
    watering: 0,
  },

  //浇水动画
  watering() {
    var that = this;
    this.setData({
      watering: 1
    })
    setTimeout(function () {
      that.setData({
        watering: 0
      })
    }, 2300);
  },

  //判断植物等级
  plantLevel() {
    if (this.data.grouth >= 600) {
      this.setData({
        plantImg: "https://tp.datikeji.com/constellation/15381232044133/Nec69FhWNVfOUqZ0GkJ1CfJ8D9QWFIBFvakOaTp6.png"
      })
    }
  },

  //浇水
  watering(status) {
    wx.request({
      url: app.globalData.appUrl + 'watering',
      data: {
        user_id: app.d.userId,
        status: status,
        grouth: "10"
      },
      method: "POST",
      success(res) {
        if (res.data.code == 0) {
          console.log(res)
        }
      }
    })
  },

  //授权
  onGotUserInfo(e) {
    var that = this;
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '加载中...',
      });
      app.globalData.userInfo = e.detail.userInfo;
      var nickName = e.detail.userInfo.nickName;
      var iv = e.detail.iv.replace(/\s*/g, "");
      wx.setStorageSync("userInfo", e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        encryptedData: e.detail.encryptedData,
        iv: iv
      });
      wx.login({
        success: res => {
          var code = res.code;
          wx.request({
            url: app.globalData.appUrl + "login",
            data: {
              code: res.code,
            },
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res)
              if (res.data.code == 0) {
                var session_key = res.data.data.session_key
                app.d.userId = res.data.data.userid;
                app.globalData.userInfo.openId = res.data.data.openId;
                that.loginUser(session_key);
              } else if (res.data.code == 1) {
                app.d.userId = res.data.data.userid;
                app.globalData.userInfo.openId = res.data.data.openId;
                
                wx.redirectTo({
                  url: '/pages/cultivate/cultivate',
                });
                wx.hideLoading();
                
              }
            }
          })
        }
      });
    }
  },
  //登录
  loginUser(session_key) {
    var that = this;
    wx.login({
      success: res => {
        var code = res.code;
        wx.request({
          url: app.globalData.appUrl + "getUserinfo",
          data: {
            session_key: session_key,
            encryptedData: this.data.encryptedData,
            iv: this.data.iv,
            user_id: app.d.userId
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.data.code == 0) {
              console.log(res)
              wx.redirectTo({
                url: '/pages/cultivate/cultivate',
              });
            }
          }
        })
      }
    })
  },

  //返回首页
  backHome(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  //成长值规则
  // showRule(){
  //   this.setData({
  //     showPopup:3
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var weekArr = ["日", "一", "二", "三", "四", "五", "六"];
    var index = new Date().getDay();
    var weekStamp = "星期" + weekArr[index];
    var month = util.formatTime(new Date()).substr(5, 2);
    var date = util.formatTime(new Date()).substr(8, 2);
    var dateStamp = month + "月" + date + "日";
    this.setData({
      dateStamp: dateStamp,
      weekStamp: weekStamp,
    });
    this.setData({
      masterId: options.masterId,
      grouth: options.grouth,
      upgrade: options.upgrade,
      plantImg: options.plantImg,
      avatarUrl: options.avatarUrl
    })
    this.plantLevel();
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
    this.setData({
      showPopup: 0
    })
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
    return {
      title: "老铁，就差你了，快来浇水领红包~",
      path: '/pages/shareInto/shareInto?masterId=' + this.data.masterId + '&grouth=' + this.data.grouth + '&upgrade=' + this.data.upgrade + '&plantImg=' + this.data.plantImg + '&avatarUrl=' + this.data.avatarUrl,
      success: function (res) {
        console.log("分享成功")
      }
    }
  }
})