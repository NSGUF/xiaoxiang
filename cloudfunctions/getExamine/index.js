// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const db = cloud.database()
    console.log(event)
    const _id = event.id
    console.log(_id)

    const examineCollectionCol = await db.collection('examineCollection').where({
      _id
    }).get()
    const examineCollection = examineCollectionCol.data[0].collection

    const _ = db.command
    const productCol = await db.collection('product').where({
      id: _.in(examineCollection)
    }).get()
    const examineArr = productCol.data
    console.log(examineCollection)

    // 获取分类信息
    const sortInfoCol = await db.collection('classify').get()
    const sortInfo = sortInfoCol.data
    return {
      error: 0,
      data: {
        examineArr,
        sortInfo
      }
    }
  } catch(e) {
    console.log(e)
    return {
      error: 0,
      msg:'系统异常'
    }
  }
}