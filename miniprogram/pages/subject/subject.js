const app = getApp()
import {
  showTip
} from '../../utils/util.js'
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
    // 以前调用云函数的
    // wx.cloud.callFunction({
    //   name: 'getExamineList',
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       productTotal: res.result.data.productTotal,
    //       doneExamineLength: res.result.data.doneExamineLength,
    //       examineList: res.result.data.examineList,
    //     })
    //   },
    //   fail: res => {
    //     console.log(res)
    //   }
    // })

  },
  getExamineInfo: function() {
    const db = wx.cloud.database()
    const openId = app.globalData.openId

    db.collection('examineCollection').get().then(res => {
      this.setData({
        examineList: res.data
      })
    })
    db.collection('product').count().then(res => {
      this.setData({
        productTotal: res.total
      })
    })

    db.collection('user').where({
      openId
    }).field({
      doneExamine: true
    }).get().then(res => {
      let doneExamineLength = 0
      if (res.data && res.data.length > 0) {
        doneExamineLength = res.data[0].doneExamine.length || 0
      }
      this.setData({
        doneExamineLength
      })
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
    this.getExamineInfo()
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
  toDoExamine: function(e) {
    if (!app.globalData.user) {
      wx.switchTab({
        url: '/pages/user/user'
      })
      showTip('请在个人中心点击头像登陆，以便记录您的积分')
    } else {
      if (e.currentTarget.dataset.id === 'all') {
        if (this.data.doneExamineLength === this.data.productTotal) {
          showTip('您已完成目前所有的题目，请等待更新题库，或者去个人中心提交新题库以获取奖励~')
        }
        wx.navigateTo({
          url: `/pages/examine/examine?examineTypes=${enums.examineTypes.advanced}`
        })
      } else {
        wx.navigateTo({
          url: `/pages/examine/examine?examineTypes=${enums.examineTypes.interesting}&_id=${e.currentTarget.dataset.id}`
        })
      }
    }
  }
})