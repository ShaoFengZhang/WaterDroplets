const app = getApp();
Page({

    data: {
        height: app.globalData.statusBarHeight + 44,
        scrollHeight: app.globalData.windowHeight - (app.globalData.statusBarHeight + 44)
    },

    onLoad: function(options) {

    },

    onShow: function() {

    },
    backPage() {
        wx.navigateBack({
            delta: 1
        })
    },
})