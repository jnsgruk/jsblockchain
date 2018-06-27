"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Blockchain = function Blockchain() {
  var _this = this;

  _classCallCheck(this, Blockchain);

  this.proofOfWork = function (lastProof) {
    var proof = 0;
    while (!_this.validProof(lastProof, proof)) {
      proof++;
    }
    return proof;
  };

  this.validProof = function (lastProof, proof) {
    return _crypto2.default.createHmac("sha256", "secret").update("" + lastProof + proof).digest("hex").substr(0, 5) === "c4ff3";
  };

  this.newBlock = function (proof, previousHash) {
    var block = {
      index: _this.chain.length + 1,
      timestamp: new Date(),
      transactions: _this.currentTransactions,
      proof: proof,
      previousHash: previousHash
    };
    _this.currentTransactions = [];
    _this.chain.push(block);
    return block;
  };

  this.newTransaction = function (sender, recipient, amount) {
    _this.currentTransactions.push({
      sender: sender,
      recipient: recipient,
      amount: amount
    });
    return _this.lastBlock()["index"] + 1;
  };

  this.hash = function (block) {
    return _crypto2.default.createHmac("sha256", "secret").update(JSON.stringify(block)).digest("hex");
  };

  this.lastBlock = function () {
    return _this.chain.slice(-1)[0];
  };

  this.chain = [];
  this.currentTransactions = [];
  this.newBlock(100, 1);
};

exports.default = Blockchain;