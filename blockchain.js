import crypto from "crypto"

class Blockchain {
  constructor() {
    this.chain = []
    this.currentTransactions = []
    this.newBlock(100, 1)
  }

  proofOfWork = lastProof => {
    let proof = 0
    while (!this.validProof(lastProof, proof)) {
      proof++
    }
    return proof
  }

  validProof = (lastProof, proof) =>
    crypto
      .createHmac("sha256", "secret")
      .update(`${lastProof}${proof}`)
      .digest("hex")
      .substr(0, 5) === "c4ff3"

  newBlock = (proof, previousHash) => {
    const block = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      transactions: this.currentTransactions,
      proof: proof,
      previousHash: previousHash,
    }
    this.currentTransactions = []
    this.chain.push(block)
    return block
  }

  newTransaction = (sender, recipient, amount) => {
    this.currentTransactions.push({
      sender,
      recipient,
      amount,
    })
    return this.lastBlock()["index"] + 1
  }

  hash = block =>
    crypto
      .createHmac("sha256", "secret")
      .update(JSON.stringify(block))
      .digest("hex")

  lastBlock = () => this.chain.slice(-1)[0]
}

export default Blockchain
