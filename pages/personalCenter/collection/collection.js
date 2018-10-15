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

    //获取我的收藏列表数据
    personalCenter() {
        var that = this;
        wx.request({
            url: app.globalData.appUrl + 'personalCenter',
            method: "POST",
            data: {
                user_id: app.d.userId,
                category: 2
            },
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.setData({
                        collectedList: res.data.data
                    })
                }
            }
        })
    },

    //跳转至事件详情
    goEventDes(e) {
        console.log(e)
        var eventId = e.currentTarget.dataset.id;
        var year = e.currentTarget.dataset.year;
        wx.navigateTo({
            url: '/pages/briefHistory/historyInToday/historyInToday?eventId=' + eventId + "&collected=" + true + "&year=" + year,
        })
    },

    touchS: function(e) {
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置        
                startX: e.touches[0].clientX
            });
        }
    },

    touchM: function(e) {
        var that = this
        initdata(that)
        if (e.touches.length == 1) {
            //手指移动时水平方向位置      
            var moveX = e.touches[0].clientX;
            //手指起始点位置与移动期间的差值      
            var disX = this.data.startX - moveX;
            var delBtnWidth = this.data.delBtnWidth;
            var txtStyle = "";
            if (disX == 0 || disX < 0) {
                //如果移动距离小于等于0，文本层位置不变        
                txtStyle = "left:0px";
            } else if (disX > 0) {
                //移动距离大于0，文本层left值等于手指移动距离        
                txtStyle = "left:-" + disX + "px";
                if (disX >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度          
                    txtStyle = "left:-" + delBtnWidth + "px";
                }
            }
            //获取手指触摸的是哪一项      
            var index = e.target.dataset.index;
            var list = this.data.list;
            list[index].txtStyle = txtStyle;
            //更新列表的状态      
            this.setData({
                list: list
            });
        }
    },

    touchE: function(e) {
        if (e.changedTouches.length == 1) {
            //手指移动结束后水平位置      
            var endX = e.changedTouches[0].clientX;
            //触摸开始与结束，手指移动的距离      
            var disX = this.data.startX - endX;
            var delBtnWidth = this.data.delBtnWidth;
            //如果距离小于删除按钮的1/2，不显示删除按钮      
            var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
            //获取手指触摸的是哪一项      
            var index = e.target.dataset.index;
            var list = this.data.list;

            list[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                list: list
            });

        }
    },

    //去收藏
    goCollection() {
        wx.redirectTo({
            url: '/pages/briefHistory/briefHistory/briefHistory',
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        this.personalCenter();
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
			title: `点点之间，水滴转转有好运`,
            path: `/pages/index/index`,
            success: function(res) {}
        }
    }
})