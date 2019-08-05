import * as enums from '../../utils/enums'
import {
  diffSet,
  getRandomArr,
  getArrayByLength,
} from '../../utils/util.js'
import {
  showTip
} from '../../utils/util.js'
const app = getApp()
const db = wx.cloud.database()
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
  getRandomExamine: function() {
    // 首先获取当前用户已经做过的题目列表，再与总数据取差集，再从差集中随机去出题目数据集
    const openId = app.globalData.openId
    db.collection('user').where({
      openId
    }).field({
      doneExamine: true
    }).get().then(res => {
      const doneExamineArr = res.data[0].doneExamine

      // 获取用户没做过的题目
      const _ = db.command
      db.collection('product').count().then(res => {
        const totalArr = getArrayByLength(res.total)
        const diffSetExamine = diffSet(totalArr, doneExamineArr)
        this.setData({
          productTotal: res.total
        })
        // 随机取20题
        let randomExamineIndexs = []
        if (diffSetExamine.length <= 20) {
          randomExamineIndexs = diffSetExamine
        } else {
          randomExamineIndexs = getRandomArr(diffSetExamine, 20)
        }
        db.collection('product').where({
          id: _.in(randomExamineIndexs)
        }).get().then(res => {
          const randomExamine = res.data.sort(() => {
            return Math.random() - 0.5
          })
          this.setData({
            examineArr: randomExamine,
            examine: randomExamine[this.data.index],
          })
          wx.hideLoading()
        })
      })

    })

    // 获取分类信息
    db.collection('classify').get().then(res => {
      this.setData({
        sortInfo: res.data,
        isInteresting: false,
      })
    })

  },
  getExamine: function(_id) {
    db.collection('examineCollection').where({
      _id
    }).get().then(examineCollectionCol => {
      const examineCollection = examineCollectionCol.data[0].collection
      const _ = db.command
      db.collection('product').where({
        id: _.in(examineCollection)
      }).get().then(productCol => {
        const examineArr = productCol.data.sort(() => {
          return Math.random() - 0.5
        })
        this.setData({
          examineArr,
          examine: examineArr[this.data.index],
        })
        wx.hideLoading()
      })
    })
    // 获取分类信息
    db.collection('classify').get().then(res => {
      this.setData({
        sortInfo: res.data,
        isInteresting: true,
      })
    })
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
          // wx.cloud.callFunction({
          //   name: 'randomExamine',
          //   data: {},
          //   success: res => {
          //     console.log(res)
          //     const data = res.result.data
          //     this.setData({
          //       examineArr: data.randomExamine,
          //       examine: data.randomExamine[this.data.index],
          //       sortInfo: data.sortInfo,
          //       isInteresting: false,
          //     })
          //     wx.hideLoading()
          //   },
          //   fail: res => {
          //     console.log(res)
          //   }
          // })
          this.getRandomExamine()
          break;
        case enums.examineTypes.interesting:
          // TODO 获取动物相关的所有题目
          this.getExamine(options._id)
          // wx.cloud.callFunction({
          //   name: 'getExamine',
          //   data: {
          //     id: options._id
          //   },
          //   success: res => {
          //     console.log(res)
          //     const data = res.result.data
          //     this.setData({
          //       examineArr: data.examineArr,
          //       examine: data.examineArr[this.data.index],
          //       sortInfo: data.sortInfo,
          //       isInteresting: true,
          //     })
          //   }
          // })
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
    console.log(userAnswer)
    this.updateExamineResult(userAnswer)

    // wx.cloud.callFunction({
    //   name: 'updateExamineResult',
    //   data: {
    //     userAnswer,
    //     isInteresting: this.data.isInteresting
    //   },
    //   success: res => {
    //     console.log(res)
    //   },
    //   fail: res => {
    //     console.log(res)
    //   }
    // })
  },
  updateExamineResult: function(userAnswer) {
    const db = wx.cloud.database()
    const isInteresting = this.data.isInteresting
    const openId = app.globalData.openId
    console.log(openId)

    db.collection('user').where({
      openId
    }).field({
      doneResult: true,
      doneExamine: true,
      integral: true,
    }).get().then(doneExamineCol => {
      console.log(doneExamineCol)
      const doneExamine = doneExamineCol.data[0].doneExamine
      const doneResult = doneExamineCol.data[0].doneResult
      let integral = doneExamineCol.data[0].integral
      if (doneExamine.indexOf(userAnswer.examineId) > -1) {
        console.log('用户已经做过这道题')
      } else {
        doneExamine.push(userAnswer.examineId)
        doneResult.push(userAnswer)

        if (userAnswer.result) {
          integral++
        }
        if (!isInteresting) {
          if (userAnswer.isLast) {
            integral += 10
          }
        }
        console.log(app.globalData)
        db.collection('user').doc(app.globalData.user._id).update({
          data: {
            doneExamine,
            doneResult,
            integral,
            grade: this.getGrade(integral)
          }
        })
      }
    })

  },
  getGrade: function(integral) {
    switch (true) {
      case integral <= 0.05 * this.data.productTotal:
        return '九品分类师'
      case integral <= 0.10 * this.data.productTotal:
        return '八品分类师'
      case integral <= 0.17 * this.data.productTotal:
        return '七品分类师'
      case integral <= 0.26 * this.data.productTotal:
        return '六品分类师'
      case integral <= 0.37 * this.data.productTotal:
        return '五品分类师'
      case integral <= 0.50 * this.data.productTotal:
        return '四品分类师'
      case integral <= 0.66 * this.data.productTotal:
        return '三品分类师'
      case integral <= 0.86 * this.data.productTotal:
        return '二品分类师'
      case integral <= this.data.productTotal:
        return '一品分类师'
    }
  },
  nextExamine: function() {
    if (this.data.index < this.data.examineArr.length - 1) {
      this.setData({
        examine: this.data.examineArr[++this.data.index],
        chooseAnswer: null, //用户选择的结果
      })
    } else {
      if (this.data.isInteresting) {
        showTip('完成该篇，可以点击下方按钮分享给朋友一起答题噢~') // TODO 改弹框
      } else {
        showTip('恭喜您刷完该套题目，额外会加10积分到您的账户上 可以点击下方按钮分享给朋友一起答题噢~') // TODO 改弹框
      }
      setTimeout(() => {
        wx.navigateBack(-1)
      }, 2000)
    }
  }
})