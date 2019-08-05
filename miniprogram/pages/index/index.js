// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quickInputResult: '',
    types: [
      {imgUrl:"/images/icon-khs.png",
      text:'可回收物就是可以再生循环的垃圾，主要包括废纸、塑料、玻璃、金属和布料五大类。'},
      {imgUrl:"/images/icon-yh.png",
      text:'有害垃圾含对人体健康有害的重金属、有毒的物质或对环境造成现实危害或者潜在危害的废弃物。'},
      {imgUrl:"/images/icon-s.png",
      text:'湿垃圾包括剩菜剩饭、骨头、菜根菜叶、果皮等食品类废物，其主要来源食品加工相关。'},
      {imgUrl:"/images/icon-g.png",
      text:'干垃圾指除其他几类垃圾，常见的有在自然条件下易分解的垃圾，如果皮、菜叶等。'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  quickFocusInput: function (e) {
    wx.navigateTo({
      url: '/pages/result/result'
    })
  },
  toCamera: function () {
    wx.navigateTo({
      url: '/pages/camera/camera',
    })
  },
  toType: function (e) {
    const index = parseInt(e.currentTarget.dataset.index) + 1;
    wx.navigateTo({
      url: '/pages/result/result?type=' + index,
    })
  }
})