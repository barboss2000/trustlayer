export default async function handler(req, res) {
  try {
    const { address } = req.query

    if (!address) {
      return res.status(400).json({ error: "Address is required" })
    }

    const response = await fetch("https://regtest.opnet.org/api/v1/json-rpc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "getbalance",
        params: {
          address: address
        },
        id: 1
      })
    })

    const data = await response.json()

    if (data.error) {
      return res.status(500).json({
        error: "RPC error",
        details: data.error
      })
    }

    return res.status(200).json({
      network: "OP_NET Testnet",
      address,
      balance: data.result
    })

  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    })
  }
}
