import Blockchain from "./blockchain"
import { validationResult } from "express-validator/check"

class MyCoin {
  constructor() {
    this.blockchain = new Blockchain()
  }

  getChain = (req, res, next) => {
    req.responseValue = {
      message: "Get blockchain",
      chain: this.blockchain.chain,
    }
    return next()
  }

  mine = (req, res, next) => {
    const { blockchain } = this
    const lastBlock = blockchain.lastBlock()
    const lastProof = lastBlock.lastProof
    const proof = blockchain.proofOfWork(lastProof)

    blockchain.newTransaction(0, "MyNode", 1)

    const previousHash = blockchain.hash(lastBlock)
    const newBlock = blockchain.newBlock(proof, previousHash)

    req.responseValue = {
      message: "New block mined!",
      ...newBlock,
    }
    return next()
  }

  newTransaction = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    const trans = req.body
    const index = this.blockchain.newTransaction(
      trans["sender"],
      trans["recipient"],
      trans["amount"]
    )
    const responseValue = {
      message: `Transaction will be added to block ${index}`,
    }
    req.responseValue = responseValue
    return next()
  }
}

export default new MyCoin()
