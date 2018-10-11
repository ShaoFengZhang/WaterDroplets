// pages/personalCenter/personalCenter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //返回前一页
  backPage() {
    wx.navigateBack({
      delta: 1
    })
  },

  //跳转至提现记录页面
  goRecord(){
    wx.navigateTo({
      url: 'putforward/putforward',
    })
  },
  //跳转至我的收藏
  goCollection(){
    wx.navigateTo({
      url: 'collection/collection',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName: app.globalData.userInfo.nickName,
      avatarUrl:app.globalData.userInfo.avatarUrl
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