// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const db = cloud.database()
    const openId = event.userInfo.openId
    
    const examineListCol = await db.collection('examineCollection').field({
      title: true,
      collection: true,
    }).get()
    console.log(examineListCol)
    const examineList = examineListCol.data

    const productCol = await db.collection('product').count()
    const productTotal = productCol.total

    const doneExamineCol = await db.collection('user').where({
      openId
    }).field({
      doneExamine: true
    }).get()

    const doneExamine = doneExamineCol.data[0].doneExamine

    console.log(doneExamine)

    return {
      error: 0,
      data: {
        productTotal,
        doneExamineLength: doneExamine.length,
        examineList,
      }
    }

  } catch (e) {
    console.log(e)
    return {
      error: 1,
      msg: '系统异常'
    }
  }
}
