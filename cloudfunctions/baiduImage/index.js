const rq = require('request-promise')
// 
/**
 * 获取百度ai AccessToken
 */
exports.main = async (event, context) => {
  let clientId = 'nI0kHGLQyqZ692HKWXI4uR5M',
    grantType = 'client_credentials',
    clientSecret = 'li1W4vooBzkQi3mG80Gc4ZRgnkDI328M',
    url = `https://aip.baidubce.com/oauth/2.0/token`

  return new Promise(async (resolve, reject) => {
    try {
      let data = await rq({
        method: 'POST',
        url,
        form: {
          "grant_type": grantType,
          "client_secret": clientSecret,
          "client_id": clientId
        },
        json: true
      })
      resolve({
        code: 0,
        data,
        info: '操作成功！'
      })
    } catch (error) {
      console.log(error)
      if (!error.code) reject(error)
      resolve(error)
    }
  })
}