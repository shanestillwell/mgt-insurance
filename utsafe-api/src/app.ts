import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import Quote from './service/Quote'
import Rate from './service/Rate'
const isProd = false

// create and setup express app
const app = express()
app.use(express.json())

const quoteSvc = new Quote(AppDataSource)
const rateSvc = new Rate(process.env.RATE_SERVICE_URL)

// register routes
app.post("/api/quotes", 
  async function (req: Request, res: Response) {
    try {
      const existing = await quoteSvc.getCached(req.body)
      if (existing) {
        return res.json(existing)
      }
      const quote = await quoteSvc.create(req.body)
      const rate = await rateSvc.getRate(quote)
      quote.quoteRate = rate.quoteRate
      quoteSvc.save(quote)
      return res.json(quote)
    } catch (e) {
      return res.status(400).json({
          error: true,
          message: 'Validation failed',
          ...(isProd
              ? {}
              : { originalError: e }
          )
      })
    }
})

app.get("/api/quotes/best-three", async function (req: Request, res: Response) {
  try {
    const values = await quoteSvc.getTop()
    res.json(values)
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Validation failed',
      ...(isProd
        ? {}
        : { originalError: e }
      )
    })
  }

})

export default app
