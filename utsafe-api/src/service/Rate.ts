import { fetch } from "undici";

class Rate {
  url: string;

  constructor(url = 'http://localhost:4000/rate') {
    this.url = url
  }

  async getRate (input = {}): Promise<{ quoteRate: number }> {
    try {
      const res = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: { 'Content-Type': 'application/json' },
      })
      const jsPayload = await res.json() as { quoteRate: number }
      return jsPayload
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

export default Rate
