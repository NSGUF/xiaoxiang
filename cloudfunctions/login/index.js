// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = async(event, context) => {
    try {
        const openId = event.userInfo.openId

        const db = cloud.database()

        const users = await db.collection('user').where({
            openId
        }).field({
            integral: true,
            openId: true,
            userDesc: true,
        }).get()
        const user = users.data[0]
        console.log(users)

        return {
            data:{
                user,
                openId,
            },
            error: 0,
        }
    } catch (e) {
        console.log(e)
        return {
            error: 1,
            msg: '系统异常'
        }
    }

}
