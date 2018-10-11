// pages/moreFast/moreFast.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plantImg:"",
    qrcodeImg:""
  },
  //返回前一页
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },
  //绘制背景图
  darwBgImg(){
    var that = this;
    console.log("开始绘制")
    that.ctx = wx.createCanvasContext('myCanvas');
    wx.downloadFile({
      url: "https://tp.datikeji.com/constellation/15382896693976/7BoMRcD8YarnlMZT7Q0z5Akzw8RrxkriImNA44GJ.png",
      success: function (Res){
        that.ctx.drawImage(Res.tempFilePath, 0, 0, 574 / that.data.pixelRatio, 746 / that.data.pixelRatio);
        wx.downloadFile({
          url: that.data.plantImg,
          success(Bgres){
            that.ctx.drawImage(Bgres.tempFilePath, 140 / that.data.pixelRatio, 389 / that.data.pixelRatio, 304 / that.data.pixelRatio, 328 / that.data.pixelRatio);
            wx.downloadFile({
              url: that.data.qrcodeImg,
              success(qrcode){
                console.log(qrcode)
                that.ctx.drawImage(qrcode.tempFilePath, 372 / that.data.pixelRatio, 252 / that.data.pixelRatio, 170 / that.data.pixelRatio, 170 / that.data.pixelRatio);
                that.ctx.draw();
              }
            })
            wx.hideLoading();            
          }
        })
      }
    })
  },

  //保存图片
  savePic() {
    var that = this;
    // 画布导出成临时图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 574 / that.data.pixelRatio,
      height: 746 / that.data.pixelRatio,
      canvasId: 'myCanvas',
      fileType: "jpg",
      success: function (res) {
        console.log("保存中")
        console.log(res)
        that.setData({
          tempFilePath: res.tempFilePath
        });
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  wx.showLoading({
                    title: '保存中...',
                    mask: true
                  });
                  wx.saveImageToPhotosAlbum({
                    filePath: that.data.tempFilePath,
                    success(res) {
                      wx.hideLoading();
                      wx.showModal({
                        title: '一切准备就绪',
                        content: '快发送到朋友圈叫好友助力吧！',
                        showCancel: false,
                        success: function (res) {
                          wx.previewImage({
                            current: that.data.tempFilePath, // 当前显示图片的http链接
                            urls: [that.data.tempFilePath] // 需要预览的图片http链接列表
                          })
                        }
                      })
                    }
                  })
                },
                fail() {
                  wx.showModal({
                    title: '一切准备就绪',
                    content: '快发送到朋友圈叫好友助力吧！',
                    showCancel: false,
                    success: function (res) {
                      wx.previewImage({
                        current: that.data.tempFilePath, // 当前显示图片的http链接
                        urls: [that.data.tempFilePath] // 需要预览的图片http链接列表
                      })
                    }
                  })
                }
              })
            }
            else {
              wx.showLoading({
                title: '保存中...',
                mask: true
              });
              wx.saveImageToPhotosAlbum({
                filePath: that.data.tempFilePath,
                success(res) {
                  wx.hideLoading();
                  wx.showModal({
                    title: '一切准备就绪',
                    content: '快发送到朋友圈叫好友助力吧！',
                    showCancel: false,
                    success: function (res) {
                      wx.previewImage({
                        current: that.data.tempFilePath, // 当前显示图片的http链接
                        urls: [that.data.tempFilePath] // 需要预览的图片http链接列表
                      })
                    }
                  })
                }
              })
            }
          },
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    wx.showLoading({
      title: '生成中',
      mask: 'true'
    });
    wx.getSystemInfo({
      success: function (res) {
        var pixelRatio = 750 / res.screenWidth;
        that.setData({
          pixelRatio: pixelRatio
        })
      }
    });
    that.setData({
      plantImg: options.plantImg
    })
    that.darwBgImg();
    var qrcodeImg = app.globalData.appUrl + 'get_qrcode?pages='+'&scene=1';
    that.setData({
      qrcodeImg: qrcodeImg
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

  }
})