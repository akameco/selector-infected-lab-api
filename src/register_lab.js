import Request from 'request'
import promise from 'bluebird'
import cheerio from 'cheerio'
import {CronJob} from 'cron'

const request = Request.defaults({jar: true})
const targetUrl = 'https://www.mlab.im.dendai.ac.jp/bthesis2016/StudentDeploy.jsp?displayOrder=2'
const registerUrl = 'https://www.mlab.im.dendai.ac.jp/bthesis2016/StudentDeploy.jsp?'

export default function login() {
  return new promise((resolve, reject) => {
    request.post({
      url: targetUrl,
      form: {
        id: process.env.ID,
        code: process.env.CODE,
        func: 'authByRadius'
      }},
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body)
        } else {
          reject('miss')
        }
      })
  })
}

function selectLab(x) {
  const labs = [
    '星野', '絹川', '佐々木', '小山', '矢島', '齊藤',
    '小坂', '中島', '高橋', '鉄谷', '川澄', '増田',
    '岩井', '竜田', '山田', '柿崎', '森本',
    '森谷', '学科外(系列等)','(未定)'
  ]
  return shuffle(labs)[x % labs.length]
}

// http://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let m = array.length, t, i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }
  return array
}

function register(lab) {
  login().then(() => {
    request.post({
      url: registerUrl,
      form: {
        firstLab: lab,
        firstAb: 'B',
        secondLab: '(未定)',
        secondAb: '(未定)',
        func: 'cfmEntry'
      }
    }, (err, res, body) => {
      request.get(
        'https://www.mlab.im.dendai.ac.jp/bthesis2016/StudentDeploy.jsp?func=pfmEntry',
        (err, res, body) => {
          console.log(body)
        })
    })
  })
}

let x = 0
const job = new CronJob('00 * * * * *', () => {
  register(selectLab(x++))
}, false)
job.start()
