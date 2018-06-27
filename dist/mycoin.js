"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _blockchain = require("./blockchain");

var _blockchain2 = _interopRequireDefault(_blockchain);

var _check = require("express-validator/check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyCoin = function MyCoin() {
  var _this = this;

  _classCallCheck(this, MyCoin);

  this.getChain = function (req, res, next) {
    req.responseValue = {
      message: "Get blockchain",
      chain: _this.blockchain.chain
    };
    return next();
  };

  this.mine = function (req, res, next) {
    var blockchain = _this.blockchain;

    var lastBlock = blockchain.lastBlock();
    var lastProof = lastBlock.lastProof;
    var proof = blockchain.proofOfWork(lastProof);

    blockchain.newTransaction(0, "MyNode", 1);

    var previousHash = blockchain.hash(lastBlock);
    var newBlock = blockchain.newBlock(proof, previousHash);

    req.responseValue = _extends({
      message: "New block mined!"
    }, newBlock);
    return next();
  };

  this.newTransaction = function (req, res, next) {
    var errors = (0, _check.validationResult)(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    var trans = req.body;
    var index = _this.blockchain.newTransaction(trans["sender"], trans["recipient"], trans["amount"]);
    var responseValue = {
      message: "Transaction will be added to block " + index
    };
    req.responseValue = responseValue;
    return next();
  };

  this.blockchain = new _blockchain2.default();
};

exports.default = new MyCoin();