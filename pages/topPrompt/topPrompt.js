const app = getApp();
Page({

    data: {
        height: app.globalData.statusBarHeight + 44,
        scrollHeight: app.globalData.windowHeight - (app.globalData.statusBarHeight + 44),
		friendtxt:'',
    },

    onLoad: function(options) {
		let that=this;
		wx.request({
			url: 'https://xcx14.datikeji.com/api/isExamine',
			method: "GET",
			data: {

			},
			success: function (res) {
				console.log(res);
				that.setData({
					friendtxt: res.data.data.firend
				})
			}
		})
    },

    onShow: function() {

    },
    backPage() {
        wx.navigateBack({
            delta: 1
        })
    },
})