// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const db = cloud.database()

    const openId = event.userInfo.openId
    const userDesc = event.userDesc

    const userCount = await db.collection('user').where({
      openId // 填入当前用户 openId
    }).count()
    const total = userCount.total

    console.log({
      openId,
      userDesc
    })

    if (total === 0) {
      await db.collection('user').add({
        data: {
          openId,
          userDesc,
          integral: 0, //积分
          doneExamine: [], //做过的题目ID集合
          doneResult: [],//用户做过题的结果
        }
      })
      return {
        error: 0,
        msg: '成功',
        event
      }

    } else {
      return {
        error: 1,
        msg: '用户已存在'
      }
    }
  } catch (e) {
    return {
      error: 1,
      msg: '系统异常'
    }
  }
}
