const util = require('../../utils/util.js');
import imageList from '../../utils/imgList.js';
const app = getApp();
var template = require('../../template/template.js');
Page({

    data: {
        toDayBool: 0,
        showPopup: 0,
		height: app.globalData.statusBarHeight + 44,
    },

    //获取星座运势
    getConstellation(category) {
        var that = this;
        var name = wx.getStorageSync("name");
        wx.request({
            url: app.globalData.appUrl + 'getConstellation',
            method: "POST",
            data: {
                user_id: app.d.userId,
                name: name,
                category: category
            },
            success(res) {
                that.setData({
                    fortuneList: res.data.data
                })
            }
        })
    },

    //明日/今日运势
    getFortune() {
        if (this.data.toDayBool == 0) {
            this.getConstellation(1);
            this.setData({
                toDayBool: 1,
            })
        } else if (this.data.toDayBool == 1) {
            this.getConstellation();
            this.setData({
                toDayBool: 0,
            })
        }
    },

    //个人中心
    goPersonalCenter() {
        wx.navigateTo({
            url: '../personalCenter/personalCenter',
        })
    },

    //显示星座二次选择弹窗
    showPopup() {
        this.setData({
            showPopup: 1
        })
    },

    //选择星座更换图片
    choiceImg(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        wx.setStorageSync("name", e.currentTarget.dataset.name);
        this.setData({
            name: e.currentTarget.dataset.name,
            selectId: id,
            showPopup: 0
        })
        this.getConstellation(1);
    },

    onLoad: function(options) {
        app.d.userId = wx.getStorageSync("userId");
		app.globalData.imgList = imageList.imglist;
        app.globalData.userInfo.openId = wx.getStorageSync("openId");
        var weekArr = ["日", "一", "二", "三", "四", "五", "六"];
        var index = new Date().getDay();
        var weekStamp = "星期" + weekArr[index];
        var month = util.formatTime(new Date()).substr(5, 2);
        var date = util.formatTime(new Date()).substr(8, 2);
        var dateStamp = month + "月" + date + "日";
        this.setData({
            dateStamp: dateStamp,
            weekStamp: weekStamp,
            imgList: app.globalData.imgList
        });
        template.tabbar("tabBar", 1, this, app.globalData.userInfo.avatarUrl) //0表示第一个tabbar
    },

    onShow: function() {
        this.getConstellation();
    },
    onShareAppMessage: function(e) {
        if (e && e.from == 'button') {
            var title = '今天运势超级好，绝对是遇到锦鲤了。'
        } else {
            var title = '打开水滴，今日运势一手掌握。'
        }
        return {
            title: title,
            path: `/pages/index/index`,
            success: function(res) {}
        }
    }
})