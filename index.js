import request from 'request'
import cheerio from 'cheerio'

const targetUrl = 'https://www.mlab.im.dendai.ac.jp/bthesis2016/StudentDeploy.jsp?displayOrder=2'

request.post({url: targetUrl, form: {"id": process.env.ID, "code": process.env.CODE, "func": "authByRadius" }}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(body);
    const main = $('table.entry_table tr')
    main.each((i,e) => {
      let obj = {}
      const td = $(e).children()
      obj['id'] = $(td[0]).text()
      // obj['name'] = $(td[1]).text()
      obj['lab'] = $(td[2]).text()
      console.log(JSON.stringify(obj, null, 2));
      console.log("\n");
    })
  }
})

