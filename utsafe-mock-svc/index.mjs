import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.post('/rate', (req, res) => {
  // Totally contrived rate
  const charInName = req.body?.name?.length || 10
  const age = req.body?.age || 50
  const drivingExpYrs = req.body?.drivingExpYrs || 20

  // Older people will have better rate
  const factor = Math.max(100 - age, 10)
  const quoteRate = getFormatted({ drivingExpYrs, factor, charInName })
  return res.json({
    quoteRate,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getFormatted ({ drivingExpYrs, factor, charInName }) {
  const quoteRate = (drivingExpYrs * factor) / charInName
  return parseFloat(quoteRate.toFixed(2))
}
