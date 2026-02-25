import { JSONRpcProvider, OP20Contract, OP_NET } from "opnet"

export default async function handler(req, res) {
  try {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({ error: "Address required" })
    }

    const network = OP_NET.Testnet

    const provider = new JSONRpcProvider(
      "https://testnet.opnet.org",
      network
    )

    const TOKENS = {
      MOTO: "0x0a6732489a31e6de07917a28ff7df311fc5f98f6e1664943ac1c3fe7893bdab5",
      PILL: "0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438",
      ODIS: "0xc573930e4c67f47246589ce6fa2dbd1b91b58c8fdd7ace336ce79e65120f79eb"
    }

    const balances = {}

    for (const [symbol, contractAddress] of Object.entries(TOKENS)) {
      const contract = new OP20Contract(
        contractAddress,
        network,
        provider
      )

      const balance = await contract.balanceOf(address)
      balances[symbol] = balance.toString()
    }

    return res.status(200).json({
      network: "OP_NET Testnet",
      address,
      balances
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: "Failed to fetch balances",
      details: error.message
    })
  }
}