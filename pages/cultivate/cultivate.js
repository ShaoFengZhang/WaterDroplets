// pages/cultivate/cultivate.js
const util = require('../../utils/util.js');
const template = require('../../template/template.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plantImg: "https://tp.datikeji.com/constellation/15381264984469/4xIy5AXftNe7m7IUv8pfiA6jIjLVbCD7ENpBNJBQ.png",
    plantPopupImg: "https://tp.datikeji.com/constellation/15381901994499/3wKR5bvoWZyldZIIvE4Yym6age9NO7s9mMfnw5IU.png",
    weekList: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    growList: [
      { "title": "V1", "value":"10" },
      { "title": "V2", "value": "200" }, 
      { "title": "V3", "value": "600" }, 
      { "title": "V4", "value": "1000" },
      { "title": "V5", "value": "1600" },
      { "title": "V6", "value": "2500" },
    ],
    frameClass1: 'frame z1', //默认正面在上面
    frameClass2: 'frame z2',
    showPopup:0,//控制打卡弹窗显示
    watering:0,
    grouthUpgrade:0,
    grouth:0
  },
  //翻转动画
  rotateFn: function(e) {
    var that = this
    if (this.data.frameClass1 == 'frame z1' && this.data.frameClass2 == 'frame z2') {
      that.setData({
        frameClass1: "frame front",
        frameClass2: "frame back",
      })
      setTimeout(function() {
        that.setData({
          frameClass1: "frame z2",
          frameClass2: "frame z1",
        })
      }, 1000);
    } else {
      that.setData({
        frameClass1: "frame back",
        frameClass2: "frame front",
      })
      setTimeout(function() {
        that.setData({
          frameClass1: "frame z1",
          frameClass2: "frame z2",
        })
      }, 1000);
    }
  },

  //更新签到信息
  punchClock(){
    var that = this;
    // that.watering(1);        
    wx.request({
      url: app.globalData.appUrl + 'saveClock',
      method: "POST",
      data: {
        user_id: app.globalData.userInfo.openId
        // open_id: app.globalData.userInfo.openId
      },
      success(res) {
        if (res.data.code == 0) {
          console.log(res)
          that.setData({
            showPopup: 1,
            updateList:res.data.data
          })
          that.plantLevel();
          that.saveClock();
          
        }
      }
    })
  },

  //获取用户签到信息
  saveClock() {
    var that = this;
    wx.request({
      url: app.globalData.appUrl + 'saveClock',
      method: "GET",
      data: {
        user_id: app.globalData.userInfo.openId
      },
      success(res) {
        if (res.data.code == 0) {
          console.log(res)
          that.setData({
            is_clock: res.data.is_clock
          });
          const growList = that.data.growList;
          for (const value of growList) {
            if (value.value >= res.data.grouth) {
              that.setData({
                upgrade: value.value
              })
              break;
            }
          }
          if (res.data.data.length == 0){
            that.setData({
              grouth: res.data.grouth
            })
            that.plantLevel();
          }else{
            that.setData({
              clock_day: res.data.data[res.data.data.length - 1].clock_day,
              grouth: res.data.grouth
            })
            that.plantLevel();
          }
        }
      }
    })
  },

  //跳转至提现页
  goWithDraw(){
    wx.navigateTo({
      url: '/pages/personalCenter/putforward/putforward',
    })
  },
  //关闭弹窗
  close(){
    this.setData({
      showPopup: 0
    })
  },
  //显示帮助
  showHelp(){
    this.setData({
      showPopup: 3
    })
  },

  //浇水动画
  waterAnimation(){
    var that = this;
    that.watering(1, that.data.grouth);
    this.setData({
      watering:1
    });
    setTimeout(function () {
      that.setData({
        watering: 0
      })
    }, 2300);
  },

  //判断植物等级
  plantLevel(){
    var grouth = this.data.grouth;
    var grouthUpgrade = this.data.grouthUpgrade;
    if (grouth > 10 && grouth <= 200){
      grouth = 10;
    } else if (grouth > 200 && grouth <= 600){
      grouth = 200;
    } else if (grouth > 600 && grouth <= 1000){
      this.setData({
        plantImg:"https://tp.datikeji.com/constellation/15381232044133/Nec69FhWNVfOUqZ0GkJ1CfJ8D9QWFIBFvakOaTp6.png",
        plantPopupImg:"https://tp.datikeji.com/constellation/15381920755274/pjjZGIejakcL6omWSM0OANTZLVzGyTkIjFyLOomX.png"
      })
      grouth = 600;
    } else if (grouth > 1000 && grouth <= 1600){
      grouth = 1000;
    } else if (grouth > 1600 && grouth <= 2500){
      grouth = 1600;
    } else if (grouth >= 2500){
      grouth = 2500;
    } else if (grouth < 10 ){
      grouth = 0;
    }
    console.log(grouthUpgrade)
    console.log(grouth)
    if (grouth != grouthUpgrade){
      this.watering(2, grouth);
    }
  },

  //更快成长
  goMoreFast(){
    wx.navigateTo({
      url: '../moreFast/moreFast?plantImg=' + this.data.plantImg,
    })
  },

  //浇水/升级
  watering(status, all_grouth){
    var that = this;
    wx.request({
      url: app.globalData.appUrl + 'watering',
      data:{
        user_id: app.globalData.userInfo.openId,
        status: status,
        grouth: that.data.grouth,
        all_grouth: all_grouth
      },
      method:"POST",
      success(res){
        if(res.data.code == 0){
          if (status == 2){
            that.setData({
              num: res.data.num
            })
          } 
        } else if (res.data.code == 2){
          that.setData({
            grouthUpgrade: res.data.grouth
          })
        } else if (res.data.code == -2 || res.data.code == -3){
          wx.showToast({
            title: res.data.msg,
            icon:"none",
            duration:1500
          })
        } else if (res.data.code == 1){
          wx.showToast({
            title: "发生错误，请稍后尝试！",
            icon: "none",
            duration: 1500
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    template.tabbar("tabBar", 2, this, app.globalData.userInfo.avatarUrl);
    this.plantLevel();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.saveClock();
    this.setData({
      showPopup:0
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "老铁，快来帮我浇水助力吧~",
      path: '/pages/shareInto/shareInto?masterId=' + app.d.userId + '&grouth=' + this.data.grouth + '&upgrade=' + this.data.upgrade + '&plantImg=' + this.data.plantImg + '&avatarUrl=' + app.globalData.userInfo.avatarUrl,
      success: function (res) {
        console.log("分享成功")
      }
    }
  }
})