const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    MAX_LIMIT: 20,
    page: 0,
    datas: [],
    logo: "",
    keyword: "",
    isEmpty: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.keyword) {
      this.setData({
        keyword: options.keyword
      }, () => {
        this.onGetData()
      })
    } else if (options.type) {
      this.setData({
        isNotShowInput: true,
        type: options.type
      }, () => {
        this.getTypesData()
      })

      let title = ''
      switch (Number(options.type)) {
        case 1:
          title = '可回收物'
          break;
        case 2:
          title = '有害垃圾'
          break;
        case 3:
          title = '湿垃圾'
          break;
        case 4:
          title = '干垃圾'
          break;
      }
      wx.setNavigationBarTitle({
        title: title,
      })
    } else {
      this.onGetData()
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
    this.data.page = 0
    if (this.data.isNotShowInput) {
      this.getTypesData()
    } else {
      this.onGetData()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isNotShowInput) {
      this.getTypesData()
    } else {
      this.onGetData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getTypesData: function() {
    wx.showLoading({
      title: '正在加载数据中.....',
    })
    if (this.data.isEnd) {
      wx.showToast({
        title: '数据已经加载完',
        icon: "none"
      })
      wx.hideLoading()
      return
    }
    var that = this
    if (this.data.page == 0) {
      this.data.datas = []
    }
    var datas = db.collection('product').skip(this.data.page * this.data.MAX_LIMIT).limit(this.data.MAX_LIMIT).where({
      sortId: parseInt(that.data.type)
    }).get({
      success: function(res) {
        wx.hideLoading()
        that.data.page = that.data.page + 1
        for (var i = 0; i < res.data.length; i++) {
          that.data.datas.push(res.data[i])
        }
        that.setData({
          datas: that.data.datas
        })
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '数据加载失败',
          icon: "none"
        })
      }
    })
  },
  search: function() {
    this.setData({
      page: 0,
    }, () => {
      this.onGetData();
    })
  },
  onGetData: function() {
    wx.showLoading({
      title: '正在加载数据中.....',
    })
    if (this.data.isEnd) {
      wx.showToast({
        title: '数据已经加载完',
        icon: "none"
      })
      wx.hideLoading()
      return
    }
    var datas = db.collection('product').skip(this.data.page * this.data.MAX_LIMIT).limit(this.data.MAX_LIMIT).where({
      name: db.RegExp({
        regexp: this.data.keyword,
      })
    }).get({
      success: (res) => {
        wx.hideLoading()
        if (res.data.length == 0) {
          if (this.data.page == 0) {
            this.setData({
              datas: [],
              isEmpty: true,
            })
          } else {
            this.setData({
              isEnd: true
            })
          }
        } else {
          let datas = this.data.datas;
          if (this.data.page == 0) {
            datas = []
          }
          datas = [...datas, ...res.data]
          this.setData({
            isEnd: false,
            datas,
            isEmpty: false,
            page: this.data.page + 1
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '数据加载失败',
          icon: "none"
        })
      }
    })
  },
  onItemClick: function(event) {
    var index = event.currentTarget.dataset.index
    var data = this.data.datas[index]
    wx.navigateTo({
      url: '/pages/garbage/garbage?sortId=' + data.sortId,
    })
  },
  onGoHome: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  commit: function() {
    wx.navigateTo({
      url: '/pages/commit/commit?keyword=' + this.data.keyword,
    })
  },
  toCamera: function() {
    wx.navigateTo({
      url: '/pages/camera/camera',
    })
  },
  quickFind: function() {
    this.onGetData()
  },
  quickInputResult: function(e) {
    this.setData({
      keyword: e.detail.value,
      page: 0,
    })
  },
})