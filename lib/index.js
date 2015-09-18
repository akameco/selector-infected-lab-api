'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var targetUrl = 'https://www.mlab.im.dendai.ac.jp/bthesis2016/StudentDeploy.jsp?displayOrder=2';

function getData() {
  return new Promise(function (resolve, reject) {
    var arr = [];
    _request2['default'].post({
      url: targetUrl,
      form: {
        "id": process.env.ID,
        "code": process.env.CODE,
        "func": "authByRadius"
      } }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        (function () {
          var $ = _cheerio2['default'].load(body);
          var main = $('table.entry_table tr');
          main.each(function (i, e) {
            var obj = {};
            var td = $(e).children();
            obj['id'] = $(td[0]).text();
            // obj['name'] = $(td[1]).text()
            obj['lab'] = $(td[2]).text();
            arr.push(obj);
          });
          resolve(arr);
        })();
      } else {
        reject('miss');
      }
    });
  });
}

getData().then(function (arr) {
  return console.log(arr);
});