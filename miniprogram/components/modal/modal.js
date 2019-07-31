// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowModal: {
      type: Boolean,
      value: false
    },
    items: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideDialog: function() {
      this.setData({
        isShowModal: false
      })
    },
    chooseItem: function (e) {
      console.log(e.currentTarget.dataset.item)
      this.triggerEvent("chooseItem", e.currentTarget.dataset.item)
    }
  }
})
