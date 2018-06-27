"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _check = require("express-validator/check");

var _mycoin = require("./mycoin");

var _mycoin2 = _interopRequireDefault(_mycoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

var responseMiddleware = function responseMiddleware(req, res, next) {
  return res.json(req.responseValue);
};

router.get("/chain", _mycoin2.default.getChain, responseMiddleware);

router.get("/mine", _mycoin2.default.mine, responseMiddleware);

router.post("/transactions/new", [(0, _check.check)("sender", "Sender must be a string").exists(), (0, _check.check)("recipient", "Recipient must be a string").exists(), (0, _check.check)("amount", "Recipient must be an integer").isInt().exists()], _mycoin2.default.newTransaction, responseMiddleware);

app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.use("/", router);

app.listen(5000, function () {
  return console.log("Listening on port 5000!");
});