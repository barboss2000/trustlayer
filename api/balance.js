export default async function handler(req, res) {
  try {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({ error: "Address is required" })
    }

    const RPC_URL = "https://regtest.opnet.org/api/v1/json-rpc"

    async function rpcCall(method, params = []) {
      const response = await fetch(RPC_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method,
          params,
          id: 1
        })
      })

      if (!response.ok) {
        throw new Error(`RPC error: ${response.status}`)
      }

      const data = await response.json()
      return data.result
    }

    // rBTC balance
    const rbtc = await rpcCall("getBalance", [address])

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
