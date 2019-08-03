// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    const userAnswer = event.userAnswer
    const openId = event.userInfo.openId

    const doneExamineCol = await db.collection('user').where({
      openId
    }).field({
      doneResult: true,
      doneExamine: true,
      integral: true,
    }).get()

    const doneExamine = doneExamineCol.data[0].doneExamine
    const doneResult = doneExamineCol.data[0].doneResult
    let integral = doneExamineCol.data[0].integral
    console.log('doneExamineCol', doneExamineCol)
    console.log('integral', integral)
    if (doneExamine.indexOf(userAnswer.examineId) > -1) {
      return {
        error: 1,
        msg: '用户已经做过这道题',
      }
    } else {
      doneExamine.push(userAnswer.examineId)
      doneResult.push(userAnswer)

      if (userAnswer.result) {
        integral++
      }
      if (userAnswer.isLast) {
        integral += 10
      }

      await db.collection('user').where({openId}).update({
        data: {
          doneExamine,
          doneResult,
          integral,
        }
      })
      return {
        error: 0,
        msg: '更新成功',
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
