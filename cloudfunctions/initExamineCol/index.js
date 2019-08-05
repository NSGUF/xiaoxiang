// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  try {

    const wxContext = cloud.getWXContext()
    const db = cloud.database()
    db.collection('examineCollection').add({
      title: '动物篇',
      collection: [11,
        71,
        242,
        268,
        302,
        320,
        324,
        326,
        547,
        798,
        799,
        914,
        964,
        993,
        1032,
        1171,
        1181,
        1183,
        1263,
        1340,
        1397,
        2147,
        132,
        792,
        793,
        794,
        999,
        1002,
      ]
    })

    return {
      error: 1
    }
  } catch (e) {
    console.log(e)
  }
}