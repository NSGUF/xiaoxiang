import * as enums from '../../utils/enums'
import {
  showTip
} from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examineArr: [], // 当前做的题的数组
    index: 0, //用户伦到哪道题
    examine: {}, //当前题目信息,
    sortInfo: [], // 答案信息，数组
    chooseAnswer: null, //用户选择的结果

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载...',
    })
    if (options.examineTypes) {
      const examineTypes = parseInt(options.examineTypes)
      switch (examineTypes) {
        case enums.examineTypes.advanced:
          // TODO 获取整20道题目
          wx.cloud.callFunction({
            name: 'randomExamine',
            data: {},
            success: res => {
              console.log(res)
              const data = res.result.data
              this.setData({
                examineArr: data.randomExamine,
                examine: data.randomExamine[this.data.index],
                sortInfo: data.sortInfo,
              })
              wx.hideLoading()
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
  chooseAnswer: function(e) {
    if (this.data.chooseAnswer) {
      return
    }
    this.setData({
      chooseAnswer: e.currentTarget.dataset.answer,
    })
    // 获取正确结果的编号
    this.data.sortInfo.map(item => {
      if (item.id == this.data.examine.sortId) {
        const examine = this.data.examine
        examine.examineIndex = item.examineIndex
        this.setData({
          examine
        })
      }
    })
    let result = this.data.examine.sortId === e.currentTarget.dataset.answer.id
    console.info(result)
    console.info(this.data.index === (this.data.examineArr.length - 1))
    // TODO 上传数据
    const userAnswer = {
      examineId: this.data.examine.id,
      result,
      isLast: this.data.index === (this.data.examineArr.length - 1)
    }

    wx.cloud.callFunction({
      name: 'updateExamineResult',
      data: {
        userAnswer
      },
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  nextExamine: function() {
    console.log(this.data.index)
    console.log(this.data.examineArr.length)
    if (this.data.index < this.data.examineArr.length - 1) {
      this.setData({
        examine: this.data.examineArr[++this.data.index],
        chooseAnswer: null, //用户选择的结果
      })
    } else {
      showTip('恭喜您刷完该套题目，额外会加10积分到您的账户上噢~') // TODO 改弹框
      setTimeout(() => {
        wx.navigateBack(-1)
      }, 2000)
    }
  }
})