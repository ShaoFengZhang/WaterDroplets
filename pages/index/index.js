const app = getApp();
import imageList from '../../utils/imgList.js';
import util from '../../utils/util.js';
Page({
    data: {
        selectId: "",
        height: app.globalData.statusBarHeight + 44,
        imgList: imageList.imglist,
    },

    //授权
    onGotUserInfo(e) {
        let that = this;
        if (e.detail.userInfo) {
            wx.showLoading({
                title: '加载中...',
            });
            app.globalData.userInfo = e.detail.userInfo;
            let iv = e.detail.iv.replace(/\s*/g, "");
            let encryptedData = e.detail.encryptedData;
            wx.setStorageSync("userInfo", e.detail.userInfo);
            this.rawData = e.detail.rawData;
			if (wx.getStorageSync('rawData') != e.detail.rawData) {
                that.loginUser(iv, encryptedData);
            } else {
                wx.hideLoading();
                let name = wx.getStorageSync("name");
                if (name) {
                    wx.redirectTo({
                        url: '../constellation/constellation',
                    });
                } else {
                    wx.showToast({
                        title: '请选择您的生日或星座！',
                        icon: "none",
                        duration: 1500
                    })
                }
            }

        }
    },
    //登录
    loginUser(iv, encryptedData) {
        let that = this;
        wx.login({
            success: res => {
                let data = {
                    code: res.code
                };
                wx.request({
                    url: util.LoginURl,
                    method: "POST",
                    data: data,
                    success: function(value) {
                        wx.setStorageSync('userId', value.data.data.userid);
                        app.userid = value.data.data.userid;
                        wx.setStorageSync('openId', value.data.data.openId);
                        app.sessionKey = value.data.data.session_key;
                        wx.setStorageSync('sessionKey', value.data.data.session_key);
                        wx.request({
                            url: app.globalData.appUrl + "getUserinfo",
                            data: {
                                session_key: app.sessionKey,
                                encryptedData: encryptedData,
                                iv: iv,
                                user_id: app.userid
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/json' // 默认值
                            },
                            success(res) {
                                console.log(res);
                                if (res.data.code == 0 || res.data.code == 1) {
                                    wx.hideLoading();
									wx.setStorage({
										key: "rawData",
										data: that.rawData
									})
                                    let name = wx.getStorageSync("name");
                                    if (name) {
                                        wx.redirectTo({
                                            url: '../constellation/constellation',
                                        });
                                    } else {
                                        wx.showToast({
                                            title: '请选择您的生日或星座！',
                                            icon: "none",
                                            duration: 1500
                                        })
                                    }
                                }else{
									let author=true;
									util.wxloginfnc(app,author)
								}
                            }
                        })
                    }
                });
            },
        })

    },

    //选择星座更换图片
    choiceImg(e) {
        var that = this;
        var id = e.currentTarget.dataset.id;
        this.setData({
            name: e.currentTarget.dataset.name,
            selectId: id
        })
        wx.setStorageSync("name", e.currentTarget.dataset.name);
    },

    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
            var name = wx.getStorageSync("name");
            if (name.length > 0) {
                wx.redirectTo({
                    url: '../constellation/constellation',
                })
            }
        } else if (this.data.canIUse) {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
                console.log('elseif')
                // util.checkUserInfo(app, res);
                if (wx.getStorageSync('rawData') != res.rawData) {
                    util.wxloginfnc(app);
                }

                var name = wx.getStorageSync("name");
                if (name.length > 0) {
                    wx.redirectTo({
                        url: '../constellation/constellation',
                    })
                }
            }
        } else {
            console.log('else')
            wx.getUserInfo({
                lang: "zh_CN",
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                    // util.checkUserInfo(app, res);
                    if (wx.getStorageSync('rawData') != res.rawData) {
                        util.wxloginfnc(app);
                    }
                    var name = wx.getStorageSync("name");
                    if (name.length > 0) {
                        wx.redirectTo({
                            url: '../constellation/constellation',
                        })
                    }
                }
            })
        }
    },

    onShow: function() {

    },

	onShareAppMessage:function(){
		return {
			title: "打开水滴，今日运势一手掌握。",
			path: `/pages/index/index`,
			success: function (res) {
			}
		}
	}
})