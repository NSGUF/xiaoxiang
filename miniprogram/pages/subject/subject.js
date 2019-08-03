const app = getApp()
import {showTip} from '../../utils/util.js'
import * as enums from '../../utils/enums'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examineList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name: 'getExamineList',
      success: res => {
        console.log(res)
        this.setData({
          examineList: res.result.examineList
        })
      },
      fail: res => {
        console.log(res)
      }
    })

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
    // 不做校验 提示用户去个人中心点击头像授权
    // this.openAuthtipDialog()
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

  },
  // infoSaved: function(e) {
  //   this.setData({
  //     userInfo: e.detail
  //   });
  // },
  // infoReject: e => {
  //   console.log("inforeject " + e)
  // },
  // openAuthtipDialog: function() {
  //   this.dialog = this.selectComponent("#dialog");
  //   //判断是否需要授权用户信息
  //   if (!app.globalData.userInfo) {
  //     this.dialog.showDialog();
  //
  //   }
  // },
  toDoExamine: function (e) {
    if (!app.globalData.userInfo) {
      wx.switchTab({
        url: '/pages/user/user'
      })
      showTip('请在个人中心点击头像登陆，以便记录您的积分')
    } else {
      wx.navigateTo({
        url: `/pages/examine/examine?examineTypes=${enums.examineTypes.advanced}`
      })
    }
  }
})
