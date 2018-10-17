const app = getApp();
Page({

    data: {
		height: app.globalData.statusBarHeight + 44,
    },
    //返回前一页
    backPage() {
        wx.navigateBack({
            delta: 1
        })
    },

    //跳转至提现记录页面
    goRecord() {
        wx.navigateTo({
            url: 'putforward/putforward',
        })
    },
    //跳转至我的收藏
    goCollection() {
        wx.navigateTo({
            url: 'collection/collection',
        })
    },

    onLoad: function(options) {
        this.setData({
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl
        })
    },

    onShow: function() {

    },

    onShareAppMessage: function(e) {
        if (e && e.from == 'button') {
            var title = "有人@你  这个好运的宝贝必须推荐给你，比锦鲤还厉害的水滴😘";
        } else {
			var title = "点点之间，水滴转转有好运";
        }
        return {
            title: title,
            path: `/pages/index/index`,
			imageUrl: "https://tp.datikeji.com/a/15396917198531/1tskpoyy8TzS1xmP60myIpQEQgMYDUXP0pRqAERI.png",
            success: function(res) {}
        }
    }
})