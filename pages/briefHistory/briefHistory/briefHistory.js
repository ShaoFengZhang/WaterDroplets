var util = require('../../../utils/util.js');
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
var template = require('../../../template/template.js');
const app = getApp();
Page({

    data: {
        showCalendar: 0,
        year: new Date().getFullYear(), // 年份
        month: new Date().getMonth() + 1, // 月份
        day: new Date().getDate(),
        // str: MONTHS[new Date().getMonth()],  // 月份字符串
        demo4_days_style: [],
		height: app.globalData.statusBarHeight + 44,
    },

    //返回前一页
    backPage() {
        wx.navigateBack({
            delta: 1
        })
    },

    //自选日期
    dateSelect() {
        this.setData({
            showCalendar: 1
        })
    },
    //选择今日
    getTodayHistory() {
        var that = this;
        // this.getNowTime();
        this.setData({
            showCalendar: 0
        })
        wx.request({
			url: app.globalData.appUrl + 'getHistory',
			method: "POST",
			data: {
				user_id: app.d.userId,
				month: this.data.month,
				day: this.data.day
			},
			success(res) {
				console.log("历史上的今天:" + res)
				if (res.data.code == 0) {
					app.globalData.todayHistoryArr = res.data.data.result;
					console.log(app.globalData.todayHistoryArr)
					that.setData({
						todayHistoryArr: res.data.data.result
					})
				}
			}
		}),

		this.setData({
			showCalendar: 0
		})
    },
	//点击确定
	getHistory(){
		var that = this;
		// this.getNowTime();
		this.setData({
			showCalendar: 0
		})
		wx.request({
			url: app.globalData.appUrl + 'getHistory',
			method: "POST",
			data: {
				user_id: app.d.userId,
				month: this.data.month,
				day: this.data.demo4_days_style[0].day
			},
			success(res) {
				console.log("历史上的今天:" + res)
				if (res.data.code == 0) {
					app.globalData.todayHistoryArr = res.data.data.result;
					console.log(app.globalData.todayHistoryArr)
					that.setData({
						todayHistoryArr: res.data.data.result
					})
				}
			}
		}),
		this.setData({
			showCalendar: 0
		})
	},

    //历史详情
    historyDetails(e) {
        console.log(e)
        var eventId = e.currentTarget.dataset.id;
        var year = e.currentTarget.dataset.year;
        console.log(year)
        wx.navigateTo({
            url: `../historyInToday/historyInToday?eventId=${eventId}&year=${year}&month=${this.data.month}&daily=${this.data.day}`,
        })
    },

    //点击具体日期
    dayClick: function(event) {
        console.log(event);
        // const days_count = new Date(this.data.year, this.data.month, 0).getDate();
        let demo4_days_style = new Array;
        for (let i = 1; i <= 31; i++) {
            if (i == event.detail.day) {
                demo4_days_style.push({
                    month: 'current',
                    day: i,
                    color: '#fff',
                    background: '#996AEC'
                });
            }
        }
        this.setData({
            demo4_days_style,
            month: event.detail.month,
            day: event.detail.day
        });
    },

    //获取当前时间
    getNowTime() {
        var weekArr = ["日", "一", "二", "三", "四", "五", "六"];
        var index = new Date().getDay();
        var weekStamp = "星期" + weekArr[index];
        var month = util.formatTime(new Date()).substr(5, 2);
        var day = util.formatTime(new Date()).substr(8, 2);
        var dateStamp = month + "月" + day + "日";
        this.setData({
            dateStamp: dateStamp,
            weekStamp: weekStamp,
            month: month,
            day: day
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        template.tabbar("tabBar", 0, this, app.globalData.userInfo.avatarUrl) //0表示第一个tabbar
        this.getTodayHistory();
    },

    onShow: function() {
        this.getNowTime();
    },

    onShareAppMessage: function() {
        return {
			title: `历史上的今天发生了这么多事。`,
            path: `/pages/index/index`,
            success: function(res) {}
        }
    }
})