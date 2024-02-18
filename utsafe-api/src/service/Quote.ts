import { Not, IsNull, DataSource } from "typeorm"
import { validate } from "class-validator"
import { Quote as EntityQuote } from "../entity/Quote"


type QuoteRequest = {
  name: string;
  age: number;
  carModel: string;
  drivingExpYrs: number;
}
class Quote {
  dataSource: DataSource

  constructor(AppDataSource: DataSource) {
    if (!AppDataSource) throw new Error('Missing DataSource')
    this.dataSource = AppDataSource
  }

  getHashKey (input: QuoteRequest = { age: 0, drivingExpYrs: 0, name: '', carModel: '' }) {
    const { age, drivingExpYrs } = input
    const name = (input.name || '').toLowerCase().trim()
    const carModel = (input.carModel || '').toLowerCase().trim()
    return `${name}::${age}::${carModel}::${drivingExpYrs}`
  }

  async getCached (input: QuoteRequest) {
    const inputKey = this.getHashKey(input)
    return this.dataSource.getRepository(EntityQuote).findOneBy({
      inputKey,
      quoteRate: Not(IsNull()),
    })
  }

  async create (input: QuoteRequest) {
    try {
      const repo = this.dataSource.getRepository(EntityQuote)
      const quote = repo.create(input)
      const errors = await validate(quote)
      if (errors.length) {
        throw errors[0]
      }
      await this.dataSource.manager.save(quote)
      return quote
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async save (quote: EntityQuote) {
    try {
      const res = await this.dataSource.manager.save(quote)
      return res
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async getTop (take: number = 3) {
    return this.dataSource.getRepository(EntityQuote).find({
      where: {
        quoteRate: Not(IsNull()),
      },
      order: {
        quoteRate: 'ASC',
      },
      take,
    })
  }
}

export default Quote
