// pages/shareInto/shareInto.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        height: app.globalData.statusBarHeight + 44,
        plantImg: "https://tp.datikeji.com/constellation/15381264984469/4xIy5AXftNe7m7IUv8pfiA6jIjLVbCD7ENpBNJBQ.png",
        // plantPopupImg: "https://tp.datikeji.com/constellation/15381901994499/3wKR5bvoWZyldZIIvE4Yym6age9NO7s9mMfnw5IU.png",
        weekList: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        growList: [{
                "title": "V1",
                "value": "10"
            },
            {
                "title": "V2",
                "value": "200"
            },
            {
                "title": "V3",
                "value": "600"
            },
            {
                "title": "V4",
                "value": "1000"
            },
            {
                "title": "V5",
                "value": "1600"
            },
            {
                "title": "V6",
                "value": "2500"
            },
        ],
        showPopup: 0, //控制打卡弹窗显示
        watering: 0,
    },

    //返回首页
    backHome() {
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },

    //显示帮助
    showRule() {
        this.setData({
            showPopup: 3
        })
    },
    //关闭弹窗
    close() {
        this.setData({
            showPopup: 0,
        })
    },
    //获取用户信息
    getUserData() {
        var that = this;
        wx.request({
            url: app.globalData.appUrl + 'getUserData',
            method: "POST",
            data: {
                user_id: that.data.masterId
            },
            success(res) {
                if (res.data.code == 0) {
                    console.log(res.data)
                    that.setData({
                        avatarUrl: res.data.data.pic,
                        grouth: res.data.data.grouth,
                        userName: res.data.data.userName
                    })
                    that.plantLevel();
                }
            }
        })
    },

    //判断植物升级阈值
    plantLevel() {
        var grouth = this.data.grouth;
        // var grouthUpgrade = this.data.grouthUpgrade;
        if (grouth > 10 && grouth <= 200) {
            grouth = 200;
        } else if (grouth > 200 && grouth <= 600) {
            grouth = 600;
        } else if (grouth > 600 && grouth <= 1000) {
            this.setData({
                plantImg: "https://tp.datikeji.com/constellation/15381232044133/Nec69FhWNVfOUqZ0GkJ1CfJ8D9QWFIBFvakOaTp6.png",
                plantPopupImg: "https://tp.datikeji.com/constellation/15381920755274/pjjZGIejakcL6omWSM0OANTZLVzGyTkIjFyLOomX.png"
            })
            grouth = 1000;
        } else if (grouth > 1000 && grouth <= 1600) {
            grouth = 1600;
        } else if (grouth > 1600 && grouth <= 2500) {
            grouth = 2500;
        } else if (grouth <= 10) {
            grouth = 0;
        }
        console.log(grouth)
        this.setData({
            upgrade: grouth
        })
    },

    //好友助力浇水
    userAssistance() {
        var that = this;
        var assistance_id = wx.getStorageSync("openId");
        wx.request({
            url: app.globalData.appUrl + 'userAssistance',
            data: {
                user_id: that.data.masterId,
                assistance_id: assistance_id
                // open_id: all_grouth
            },
            method: "POST",
            success(res) {
                if (res.data.code == 0) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
                    })
                } else if (res.data.code == -3 || res.data.code == -2) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: "none",
                        duration: 1500
                    })
                } else if (res.data.code == -1) {
                    wx.showToast({
                        title: "发生错误，请稍后尝试！",
                        icon: "none",
                        duration: 1500
                    })
                } else if (res.data.code == -5) {
                    wx.redirectTo({
                        url: '/pages/index/index',
                    })
                }
            }
        })
    },

    //浇水动画
    waterAnimation() {
        var that = this;
        that.userAssistance();
        this.setData({
            watering: 1
        });
        setTimeout(function() {
            that.setData({
                watering: 0
            })
        }, 2300);
    },

    onLoad: function(options) {
        console.log(options)
        var that = this;
        var weekArr = ["日", "一", "二", "三", "四", "五", "六"];
        var index = new Date().getDay();
        var weekStamp = "星期" + weekArr[index];
        var month = util.formatTime(new Date()).substr(5, 2);
        var date = util.formatTime(new Date()).substr(8, 2);
        var dateStamp = month + "月" + date + "日";
        if (options.scene) {
            let scene = decodeURIComponent(options.scene);
            that.setData({
                masterId: scene
            })
            console.log(scene)
        };
        if (options.masterId) {
            this.setData({
                masterId: options.masterId,
                grouth: options.grouth,
                upgrade: options.upgrade,
                plantImg: options.plantImg,
                avatarUrl: options.avatarUrl
            })
        }
        //   console.log(options.masterId)
        //   console.log(wx.getStorageSync("openId"))
        // if (options.masterId == wx.getStorageSync("openId")){
        // 	wx.redirectTo({
        // 		url: '/pages/cultivate/cultivate',
        // 	})
        // }
        this.setData({
            dateStamp: dateStamp,
            weekStamp: weekStamp,
        });
        this.getUserData();
        // this.plantLevel();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setData({
            showPopup: 0
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: "老铁，就差你了，快来浇水领红包~",
            path: '/pages/shareInto/shareInto?masterId=' + this.data.masterId + '&grouth=' + this.data.grouth + '&upgrade=' + this.data.upgrade + '&plantImg=' + this.data.plantImg + '&avatarUrl=' + this.data.avatarUrl,
            success: function(res) {
                console.log("分享成功")
            }
        }
    }
})