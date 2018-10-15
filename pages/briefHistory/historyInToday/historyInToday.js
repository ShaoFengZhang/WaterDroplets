var util = require('../../../utils/util.js');
const app = getApp()
Page({

    data: {
        collected: 0
    },

    //返回前一页
    backPage() {
        wx.navigateBack({
            delta: 1
        })
    },

    //获取当前时间
    getNowTime() {
        var index = new Date().getDay();
        var month = util.formatTime(new Date()).substr(5, 2);
        var day = util.formatTime(new Date()).substr(8, 2);
        var dateStamp = month + "月" + day + "日";
        var yearStamp = util.formatTime(new Date()).substr(0, 4) + "年";
        this.setData({
            dateStamp: dateStamp
        });
    },

    //获取历史详情
    getdetails(eventId) {
        var that = this;
        wx.request({
            url: app.globalData.appUrl + 'getdetails',
            method: "POST",
            data: {
                user_id: app.d.userId,
                _id: eventId
            },
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.setData({
                        eventItem: res.data.data.result[0]
                    })
                }
            }
        })
    },
    //判断是否收藏
    handleCollection() {
        if (this.data.collected == 0) {
            this.saveCollection(1);
            this.setData({
                collected: 1
            })
        } else {
            this.saveCollection(2);
            this.setData({
                collected: 0
            })
        }
    },
    //收藏历史上的今天
    saveCollection(status) {
        var that = this;
        var eventItem = this.data.eventItem;
        console.log(eventItem)
        wx.request({
            url: app.globalData.appUrl + 'saveCollection',
            method: "POST",
            data: {
                user_id: app.d.userId,
                status: status,
                _id: that.data.eventId,
                day: eventItem.day,
                lunar: eventItem.lunar,
                month: eventItem.month,
                year: eventItem.year,
                pic: eventItem.pic,
                title: eventItem.title,
                des: eventItem.des
            },
            success(res) {
                if (res.data.code == 0) {
                    console.log(res)
                    wx.showToast({
                        title: '收藏成功',
                        icon: "none",
                        mask: true,
                        duration: 1000
                    });
                    that.setData({
                        collected: 1
                    })
                }
            }
        })
    },

    onLoad: function(options) {
        console.log(options)
        let eventId = options.eventId;
		this.shareMonth=options.month;
		this.shareDaily=options.daily;
        this.getdetails(eventId);
        if (options.collected) {
            this.setData({
                collected: 1
            })
        }
        this.setData({
            eventId: eventId,
            yearStamp: options.year + "年"
        })
    },

    onShow: function() {
        this.getNowTime();
    },

    onShareAppMessage: function(e) {
		if (e && e.from == 'button') {
			var title = `历史上的${this.shareMonth}月${this.shareDaily}日发生了这件事`
		} else {
			var title = '以铜为镜，能正衣冠；以史为鉴，能证当下'
		}
		return {
			title: title,
			path: `/pages/index/index`,
			success: function (res) {}
		}
    }
})