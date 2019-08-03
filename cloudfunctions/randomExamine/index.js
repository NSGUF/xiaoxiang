// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    const db = cloud.database()
    const openId = event.userInfo.openId
    // 首先获取当前用户已经做过的题目列表，再与总数据取差集，再从差集中随机去出题目数据集

    const doneExamine = await db.collection('user').where({
      openId
    }).field({
      doneExamine: true
    }).get()
    const doneExamineArr = doneExamine.data[0].doneExamine


    // 获取用户没做过的题目
    const _ = db.command
    const totalExamine = await db.collection('product').count()
    const totalArr = getArrayByLength(totalExamine.total)

    const diffSetExamine = diffSet(totalArr, doneExamineArr)


    // 随机取20题
    let randomExamineIndexs = []
    if (diffSetExamine.length <= 20) {
      randomExamineIndexs = diffSetExamine
    } else {
      randomExamineIndexs = getRandomArr(diffSetExamine, 4)
    }
    console.log('randomExamine:', randomExamineIndexs)

    let randomExamine = await db.collection('product').where({
      id: _.in(randomExamineIndexs)
    }).get()


    randomExamine = randomExamine.data.sort(() => {
      return Math.random() - 0.5
    })

    // 获取分类信息
    const sortInfoCol = await db.collection('classify').get()
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
    return {
      error: 1,
      msg: '系统异常'
    }
  }
}

const getRandomArr = (allArr, length) => {
  const arr = []
  for (let i = 0; i < length; i++) {
    let index = Math.floor(Math.random() * allArr.length)
    arr.push(allArr.splice(index, 1)[0])
  }
  return arr
}

const getArrayByLength = (length) => {
  const arr = []
  for(let i = 1; i <= length; i++) {
    arr.push(i)
  }

  return arr
}


// 差集
const diffSet = function (father, child) {
  var fatherSet = new Set(father);
  var childSet = new Set(child);

  var subset = [];
  for (let item of fatherSet) {
    if (!childSet.has(item)) {
      subset.push(item);
    }
  }

  return subset;
};
