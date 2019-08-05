//app.js

App({
      onLaunch: function() {

        if (!wx.cloud) {
          console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
          wx.cloud.init({
            // env 参数说明：
            //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
            //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
            //   如不填则使用默认环境（第一个创建的环境）
            // env: 'my-env-id',
            traceUser: true,
          })
        }
        wx.cloud.callFunction({
          name: 'login',
          data: {},
          success: res => {
            console.log('获取用户信息: ', res)
            if (res.result.error === 0) {
              this.globalData.openId = res.result.data.openId
              this.updateUser()
            }
            // wx.navigateTo({
            //   url: '../userConsole/userConsole',
            // })
            // console.log(this.globalData)

          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
            // wx.navigateTo({
            //   url: '../deployFunctions/deployFunctions',
            // })
          }
        })

        this.globalData = {}

        // const db = wx.cloud.database()
        // db.collection('examineCollection').add({
        //       data: {
        //         title: '易错篇',
        //         collection: [
        //           24,
        //           34,
        //           39,
        //           45,
        //           67,
        //           86,
        //           100,
        //           119,
        //           141,
        //           180,
        //           211,
        //           2395,
        //           2272,
        //           2223,
        //           1739,
        //           1742,
        //           1660,
        //           1637,
        //           1621,
        //           1589,
        //           671,
        //           1539,
        //           1366,
        //           696,
        //           640,
        //           669,
        //           634,
        //           709,
        //           1332,
        //           756]
        //         }
        //       })
          },
          updateUser: function() {
            const db = wx.cloud.database()
            console.log(this.globalData.openId)
            db.collection('user').where({
              openId: this.globalData.openId
            }).field({
              integral: true,
              openId: true,
              userDesc: true,
            }).get().then(res => {
              console.log(res)
              this.globalData.user = res.data[0]
            })
          },
      })