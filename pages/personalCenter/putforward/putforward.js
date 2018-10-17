const app = getApp()
Page({

    data: {
        category: 1, //0,1控制显示收入/提现
        select: 1,
        defaultImg: "https://tp.datikeji.com/constellation/15382212166127/ZvnksYDZ28VaPo6LjH6lBNGUxTFNgTwUE6CDL3bH.png",
        quicklyBtnImg: "https://tp.datikeji.com/constellation/15382235309902/GIfAV1RVUhG1a3gl5csRAubUcF9ekXtGu8IWwy4r.png",
        showPopup: 0,
		height: app.globalData.statusBarHeight + 44,
    },

    //返回前一页
    backPage() {
        wx.navigateBack({
            delta: 1
        })
    },

    //获取提现收入数据
    personalCenter() {
        var that = this;
        wx.request({
            url: app.globalData.appUrl + 'personalCenter',
            method: "POST",
            data: {
                user_id: app.d.userId,
                category: 1
            },
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    if (that.data.category == 1) {
                        that.setData({
                            recordList: res.data.data.income,
                            user_money: res.data.data.user_money
                        })
                    } else {
                        that.setData({
                            recordList: res.data.data.withdrow,
                            user_money: res.data.data.user_money
                        })
                    }
                }
            }
        })
    },

    //收入提现切换
    showIncome() {
        this.setData({
            category: 1
        })
        this.personalCenter();
    },
    showWithdrow() {
        this.setData({
            category: 2
        })
        this.personalCenter();
    },

    //提现
    withDrow() {
        var that = this;
        wx.request({
            url: app.globalData.appUrl + 'withDrow',
            data: {
                user_id: app.d.userId,
                open_id: app.globalData.userInfo.openId
            },
            method: "POST",
            success(res) {
                if (res.data.code == 0) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
                    })
                    that.personalCenter();
                } else if (res.data.code == -1 || res.data.code == -4) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
                    })
                } else {
                    // that.setData({
                    //   defaultImg:"https://tp.datikeji.com/constellation/15382229729525/ngpTxXK7E1dte25rHHegInZpHuRbAZ13U9yxSS46.png",
                    //   quicklyBtnImg:"https://tp.datikeji.com/constellation/15382236076712/xhaqfPonuKbFIBJpBmJu3eVlSX9O3dsBpnxFXxx7.png"
                    // })
                    wx.showToast({
                        title: "提现失败，请返回重试！",
                        icon: "none",
                        duration: 1500
                    })
                }
            }
        })
    },

    //更新用户余额
    saveMoney() {
        var that = this;
        wx.request({
            url: app.globalData.appUrl + 'saveMoney',
            data: {
                user_id: app.d.userId,
                num: that.data.user_money
            },
            method: "POST",
            success(res) {
                if (res.data.code == -2) {
                    wx.showToast({
                        title: '提现金额超过限制',
                        icon: "none",
                        duration: 1500
                    })
                } else if (res.data.code == 0) {

                }
            }
        })
    },

    //关闭弹窗
    close() {
        this.setData({
            showPopup: 0
        })
    },
    //控制显示规则弹窗
    showPopup() {
        this.setData({
            showPopup: 1
        })
    },

    onLoad: function(options) { 
		let _this=this;   
		wx.request({
			url: 'https://xcx14.datikeji.com/api/isExamine',
			method: "GET",
			data: {

			},
			success: function (res) {
				console.log(res);
				_this.setData({
					oneData:res.data.data.one,
					twoData:res.data.data.two,
					threeData:res.data.data.three,
				})
			}
		});
		this.setData({
			avatarUrl: app.globalData.userInfo.avatarUrl
		});
    },

    onReady: function() {

    },

    onShow: function() {
        this.personalCenter();
    },

    onShareAppMessage: function() {
        return {
            title: `点点之间，水滴转转有好运`,
            path: `/pages/index/index`,
            success: function(res) {}
        }
    }
})