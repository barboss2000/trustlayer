import { JSONRpcProvider, OP20Contract, OP_NET } from "opnet"

export default async function handler(req, res) {
  try {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({ error: "Address is required" })
    }

    const network = OP_NET.Testnet

    const provider = new JSONRpcProvider(
      "https://regtest.opnet.org",
      network
    )

    // rBTC balance
    const rbtc = await provider.getBalance(address)

    return res.status(200).json({
      network: "OP_NET Testnet",
      address,
      balances: {
        rBTC: rbtc
      }
    })

  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch balances",
      details: error.message
    })
  }
}
