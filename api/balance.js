export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  const RPC_URL = "https://regtest.opnet.org/api/v1/json-rpc";

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
    });

    if (!response.ok) {
      throw new Error(`RPC error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "RPC returned error");
    }

    return data.result;
  }

  try {
    // rBTC balance
    const rbtcBalance = await rpcCall("getBalance", [address]);

    // Твои контракты
    const TOKENS = {
      MOTO: "0x0a6732489a31e6de07917a28ff7df311fc5f98f6e1664943ac1c3fe7893bdab5",
      PILL: "0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438",
      ODIS: "0xc573930e4c67f47246589ce6fa2dbd1b91b58c8fdd7ace336ce79e65120f79eb"
    };

    async function getTokenBalance(contractAddress) {
      return await rpcCall("call", [
        {
          to: contractAddress,
          data: {
            method: "balanceOf",
            params: [address]
          }
        }
      ]);
    }

    const balances = {};

    for (const [symbol, contract] of Object.entries(TOKENS)) {
      try {
        balances[symbol] = await getTokenBalance(contract);
      } catch (e) {
        balances[symbol] = "0";
      }
    }

    return res.status(200).json({
      network: "OP_NET Regtest",
      address,
      rBTC: rbtcBalance,
      tokens: balances
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch balances",
      details: error.message
    });
  }
}
