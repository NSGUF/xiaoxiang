//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade: '九品分类师',//九品分类师  
    user: { integral:0},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openId) {
      this.setData({
        openId: app.globalData.openId
      })
    }
  },
  updateUser: function() {
    // if (!app.globalData.user) {
    //   return
    // }
    try{
      console.log(app.globalData.openId)
    const db = wx.cloud.database()
    db.collection('user').where({
      openId: app.globalData.openId
    }).field({
      integral: true,
      openId: true,
      userDesc: true,
    }).get().then(res => {
      // console.log(res.data[0])
      this.setData({
        user: res.data[0]
      })
      app.globalData.user = res.data[0]
        })
    }catch(e){
      console.log(e)
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.isExistUser().then((res) => {
    }).then(res => {
      this.updateUser()
    })
  },
  isExistUser: function() {
    return new Promise((resove, reject) => {
      const userCount = wx.cloud.database().collection('user').where({
        openId: app.globalData.openId // 填入当前用户 openId
      }).count().then(res => {
        console.log(res)
        const total = res.total
        if (total === 0) {
          resove()
          this.addUser()
        } else {
          console.log('已经存在')
          this.updateUser()
        }
      })
    })
  },
  addUser: function() {
    return new Promise((resove, reject) => {
      try {
        wx.cloud.database().collection('user').add({
          data: {
            openId: app.globalData.openId,
            userDesc: app.globalData.userInfo,
            grade:'九品分类师',
            integral: 0, //积分
            doneExamine: [], //做过的题目ID集合
            doneResult: [], //用户做过题的结果
          }
        })
      } catch (e) {
        console.log(e)
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
    this.updateUser()
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
  toPage: function(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  }
})