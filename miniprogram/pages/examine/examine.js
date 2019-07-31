import * as enums from '../../utils/enums'


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.examineTypes) {
      const examineTypes = parseInt(options.examineTypes)
      switch(examineTypes) {
        case enums.examineTypes.advanced:
          // TODO 获取整20道题目
            wx.cloud.callFunction({
              name: 'randomExamine',
              data: {},
              success: res => {
                console.log(res)
              },
              fail: res => {
                console.log(res)
              }
            })
          break;
        case enums.examineTypes.animal:
          // TODO 获取动物相关的所有题目

          break;
      }
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

  }
})