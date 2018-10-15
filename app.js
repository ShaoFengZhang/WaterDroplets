
import util from './utils/util.js';
App({
    onLaunch: function() {
		util.wxloginfnc(this);
		// util.getSettingfnc(this);
    },
    onShow: function() {
        let _this = this;
        wx.getSystemInfo({
            success: function(res) {
                _this.globalData.statusBarHeight = res.statusBarHeight;
				_this.globalData.windowHeight = res.windowHeight;
            },
        })
    },
    d: {
        userId: ""
    },
    globalData: {
        userInfo: null,
        todayHistoryArr: [],
        appUrl: "https://xcx14.datikeji.com/api/",
		appid:'wx0bad78c0d19707a2',
    }
})