//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    selectId:""
  },
  
  //授权
  onGotUserInfo(e){
    var that = this;
    if (e.detail.userInfo) {
      wx.showLoading({
        title: '加载中...',
      });
      app.globalData.userInfo = e.detail.userInfo;
      var nickName = e.detail.userInfo.nickName;
      var iv = e.detail.iv.replace(/\s*/g, "");
      wx.setStorageSync("userInfo", e.detail.userInfo);
      var name = wx.getStorageSync("name");
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
                wx.setStorageSync('userId', res.data.data.userid);
                app.globalData.userInfo.openId = res.data.data.openId;
                wx.setStorageSync('openId', res.data.data.openId);
                that.loginUser(session_key);
              } else if (res.data.code == 1) {
                app.d.userId = res.data.data.userid;
                wx.setStorageSync('userId', res.data.data.userid);
                app.globalData.userInfo.openId = res.data.data.openId;
                wx.setStorageSync('openId', res.data.data.openId);
                if(name){
                  wx.redirectTo({
                    url: '../constellation/constellation',
                  });
                }else{
                  wx.hideLoading();
                  wx.showToast({
                    title: '请选择您的生日或星座！',
                    icon:"none",
                    duration:1500
                  })
                }
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
                url: '../constellation/constellation',
              });
            }
          }
        })
      }
    })
  },


  //获取星座信息列表
  getConstellations(){
    var that = this;
    wx.request({
      url: app.globalData.appUrl + 'getConstellations',
      success(res){
        if(res.data.code == 0){
          that.setData({
            imgList:res.data.data
          })
          wx.setStorageSync("imgList", res.data.data);
          app.globalData.imgList = res.data.data
        }
      }
    })
  },

  //选择星座更换图片
  choiceImg(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    this.setData({
      name: e.currentTarget.dataset.name,
      selectId:id
    })
    wx.setStorageSync("name", e.currentTarget.dataset.name);
  },

  onLoad: function () {
    var name = wx.getStorageSync("name"); 
    if (name.length > 0){
      wx.redirectTo({
        url: '../constellation/constellation',
      })
    }else{
      this.getConstellations();      
    }
    // this.addForm();
  },
  
  onShow: function () {
    
  }
})
