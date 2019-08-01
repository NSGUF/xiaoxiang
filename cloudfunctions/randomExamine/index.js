// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const db = cloud.database()
    const openId = event.userInfo.openId
    // 获取当前用户已经做过的题目列表
    const doneExamine = await db.collection('user').where({
      openId
    }).field({
      doneExamine: true
    }).get()
    const doneExamineArr = doneExamine.data[0].doneExamine

    // 获取用户没做过的题目
    const _ = db.command
    const totalExamine = await db.collection('product').where({
      id: _.nin(doneExamineArr)
    }).get()
    const totalExamineArr = totalExamine.data
    // 随机取20题
    let randomExamine = []
    if (totalExamineArr.length <= 20) {
      randomExamine = totalExamineArr
    } else {
      randomExamine = getTwentyRArr(totalExamineArr, 20)
    }
    console.log('randomExamine:', randomExamine)

    // 获取分类信息
    const sortInfoCol = await db.collection('sort').get()
    const sortInfo = sortInfoCol.data

    return {
      error: 0,
      data: {
        randomExamine,
        sortInfo
      },
      msg: '获取成功'
    }

  } catch (e) {
    console.log(e)
  }
}

const getTwentyRArr = (allArr, length) => {
  const arr = []
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * allArr.length)
    arr.push(allArr.splice(index, 1)[0])
  }
  return arr
}