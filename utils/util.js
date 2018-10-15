const domin = "https://xcx14.datikeji.com/api/";
const LoginURl = `${domin}login`;
const checkUserUrl = `${domin}getUserinfo`;

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
};

const wxloginfnc = (app, author) => {
    wx.login({
        success: res => {
            let data = {
                code: res.code
            };
            wx.request({
                url: LoginURl,
                method: "POST",
                data: data,
                success: function(value) {
                    wx.setStorageSync('userId', value.data.data.userid);
                    app.userid = value.data.data.userid;
                    wx.setStorageSync('openId', value.data.data.openId);
                    app.sessionKey = value.data.data.session_key;
                    wx.setStorageSync('sessionKey', value.data.data.session_key);
                    getSettingfnc(app, author);
                }
            });
        },
    })
};

const getSettingfnc = (app, author) => {
    wx.getSetting({
        success: res => {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    lang: "zh_CN",
                    success: res => {
                        app.globalData.userInfo = res.userInfo;
                        checkUserInfo(app, res, author);
                        if (app.userInfoReadyCallback) {
                            app.userInfoReadyCallback(res);
                        }
                    }
                })
            }
        }
    })
};

const checkUserInfo = (app, res, author) => {
    if (wx.getStorageSync('rawData') != res.rawData) {
        wx.setStorage({
            key: "rawData",

            data: res.rawData
        })
        requestFun(app, checkUserUrl, "POST", {
            encryptedData: res.encryptedData,
            iv: res.iv,
            session_key: app.sessionKey,
            user_id: app.userid,
        }, function(data) {
            console.log('checkUser', data);
            if (author) {
				if (data.code == 0 || data.code == 1) {
                    wx.hideLoading();
                    let name = wx.getStorageSync("name");
                    if (name) {
                        wx.redirectTo({
                            url: '/pages/constellation/constellation',
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
        });
    }
};

const requestFun = (app, url, method, data, cb) => {
    wx.request({
        url: url,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': '+json',
        },
        data: data,
        method: method,
        success: function(resdata) {
            cb(resdata.data);
        },
        fali: function() {
            wx.showToast({
                title: "网络异常",
                icon: 'loading',
                duration: 2000
            })
        }
    })
};

module.exports = {
    formatTime: formatTime,
    wxloginfnc: wxloginfnc,
    getSettingfnc: getSettingfnc,
    checkUserInfo: checkUserInfo,
    requestFun: requestFun,
    LoginURl: LoginURl,
}