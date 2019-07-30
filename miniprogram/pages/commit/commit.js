const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: "",
        isCommiting: false,
        type: 1,
        typeInfo: '可回收垃圾',
        sorts: [{"id": "1", "keyword": "可回收物"},
            {"id": "2", "keyword": "有害垃圾"},
            {"id": "3", "keyword": "湿垃圾"},
            {"id": "4", "keyword": "干垃圾"}]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.keyword) {
            this.setData({
                keyword: options.keyword
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    formSubmit: function (e) {
        var keyword = e.detail.value.keyword
        if (keyword == undefined || keyword == null || keyword == "") {
            wx.showToast({
                title: '请输入垃圾名称',
                icon: "none"
            })
            return
        }
        this.setData({
            isCommiting: true
        })

        db.collection('commit').add({
            data: {
                keyword: keyword,
                sortId: this.data.type
            },
            success: res => {
                console.log(res)
                this.setData({
                    isCommiting: false
                })
                wx.showToast({
                    title: '提交成功',
                    icon: "none"
                })
                setTimeout(() => {
                    // wx.switchTab({
                    //   url: '/pages/index/index',
                    // })
                    wx.navigateBack(-1)
                }, 500)
            }, fail: res => {
                this.setData({
                    isCommiting: false
                })
                wx.showToast({
                    title: '提交失败',
                    icon: "none"
                })
            }
        })
    },
    chooseItem: function(e) {
        console.log(e)
        this.setData({
            isShowModal: false,
            type: e.detail.id,
            typeInfo: e.detail.keyword,
        })
        console.log(this.data)

    },
    showModal: function () {
        this.setData({
            isShowModal: true
        })
    }
})