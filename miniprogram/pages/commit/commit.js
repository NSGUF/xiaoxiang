const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:"",
    isCommiting:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keyword=  options.keyword
    this.setData({
      keyword: keyword
    })
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
  formSubmit:function(e){
    console.log(e)
    console.log(e.detail)
    console.log(e.detail.value)
    var keyword = e.detail.value.keyword
    if (keyword == undefined || keyword == null || keyword==""){
      wx.showToast({
        title: '请输入垃圾名称',
        icon:"none"
      })
      return
    }
    this.setData({
      isCommiting:true
    })

    db.collection('commit').add({
      data:{
        keyword: keyword
      },
      success:res=>{
        console.log(res)
        this.setData({
          isCommiting: false
        })
        wx.showToast({
          title: '提交成功',
          icon: "none"
        })
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 500)
      },fail:res=>{
        this.setData({
          isCommiting: false
        })
        wx.showToast({
          title: '提交失败',
          icon: "none"
        })
      }
    })
  }
})