export async function getRate (input) {
  const res = await fetch('/api/quotes', {
    method: 'POST',
    body: JSON.stringify(input),
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}

export async function getTopThree () {
  const res = await fetch('/api/quotes/best-three', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}
