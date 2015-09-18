'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _lab = require('./lab');

var _lab2 = _interopRequireDefault(_lab);

var app = (0, _express2['default'])();

app.use(_bodyParser2['default'].urlencoded({ extended: true }));
app.use(_bodyParser2['default'].json());

var port = process.env.PORT || 8080;
var router = _express2['default'].Router();

router.use(function (req, res, next) {
  console.log(req.query);
  next();
});

router.get('/search', function (req, res) {
  var queryID = req.query.id;
  try {
    (0, _lab2['default'])().then(function (arr) {
      var obj = arr.filter(function (e) {
        return e.id === queryID;
      })[0];
      console.log(obj);
      res.json(obj);
    });
  } catch (e) {
    res.send('fuck');
  }
});

app.use('/api/v1', router);

app.listen(port);
console.log('listen port', port);