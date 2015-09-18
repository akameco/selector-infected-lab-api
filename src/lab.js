import request from 'request'
import cheerio from 'cheerio'
import promise from 'bluebird'

const targetUrl = 'https://www.mlab.im.dendai.ac.jp/bthesis2016/StudentDeploy.jsp?displayOrder=2'

export default function getLab() {
  return new Promise((resolve, reject) => {
    const arr = []
    request.post({
      url: targetUrl,
      form: {
        "id": process.env.ID,
        "code": process.env.CODE,
        "func": "authByRadius"
      }},
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(body);
          const main = $('table.entry_table tr')
          main.each((i,e) => {
            let obj = {}
            const td = $(e).children()
            obj['id'] = $(td[0]).text()
            // obj['name'] = $(td[1]).text()
            obj['lab'] = $(td[2]).text()
            arr.push(obj)
          })
          resolve(arr)
        } else {
          reject('miss')
        }
      })
  })
}

// getLab().then(arr => {
  // let a = arr.filter(e => {
    // return e.id === testId
  // })[0]
  // console.log(a.lab)
// })
