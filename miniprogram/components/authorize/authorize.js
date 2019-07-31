// components/authorize/authorize.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        // 弹窗标题
        title: {
            type: String,
            value: '' // 默认值
        },
        // 弹窗内容
        content: {
            type: String,
            value: ''
        },

        // 弹窗确认按钮文字
        confirmText: {
            type: String,
            value: ''
        },

        isAutoHide: {
            type: String,
            value: '1'
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
// 弹窗显示控制
        isShow: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //隐藏弹框
        hideDialog() {
            this.setData({
                isShow: false
            })
        },
        //展示弹框
        showDialog() {
            this.setData({
                isShow: true
            })
        },

        setUserInfo(e) {
            let that = this
            if (this.data.isAutoHide == '1') {
                this.setData({
                    isShow: false
                })
            }
            if (e.detail.userInfo == null) {
                this.triggerEvent("infoReject", e)
            } else {
                that.setData({
                    isShow: false
                })
                this.triggerEvent("infoSaved", e.detail.userInfo);
            }
        },

        bindError(e) {
            console.log("bindError " + e)
            if (this.data.isAutoHide == '1') {
                this.setData({
                    isShow: false
                })
            }
            this.triggerEvent("infoReject", e)
        }
    }
})
