export default async function handler(req, res) {
  const { address } = req.query

  if (!address) {
    return res.status(400).json({ error: "Address required" })
  }

  // MOCK balance for demo
  const fakeBalance = Math.floor(Math.random() * 100000) / 100

  return res.status(200).json({
    network: "OP_NET Testnet",
    address,
    balance: fakeBalance,
    status: "demo_mode"
  })
}
