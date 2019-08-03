// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const openId = event.userInfo.openId
    const db = cloud.database()

    const doneExamineCol = await db.collection('user').where({
      openId
    }).count()
    const doneExamineTotal = doneExamineCol.total

    const doneExamineCol = await db.collection('user').where({
      openId
    }).count()
    const doneExamineTotal = doneExamineCol.total

    const examineListCol = await db.collection('examineCollection').field({
      title: true
    }).get()
    console.log(examineListCol)


    const examineList = examineListCol.data
    console.log(examineList)
    return {
      error: 0,
      examineList,
    }

  } catch (e) {
    console.log(e)
    return {
      error: 1,
      msg: '系统异常'
    }
  }
}
