import express from "express"
import { check } from "express-validator/check"
import MyCoin from "./mycoin"

let app = express()
let router = express.Router()

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue)
}

router.get("/chain", MyCoin.getChain, responseMiddleware)

router.get("/mine", MyCoin.mine, responseMiddleware)

router.post(
  "/transactions/new",
  [
    check("sender", "Sender must be a string").exists(),
    check("recipient", "Recipient must be a string").exists(),
    check("amount", "Recipient must be an integer")
      .isInt()
      .exists(),
  ],
  MyCoin.newTransaction,
  responseMiddleware
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", router)

app.listen(5000, () => console.log("Listening on port 5000!"))
