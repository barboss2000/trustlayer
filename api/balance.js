export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const RPC_URL = "https://regtest.opnet.org";

    const rpcCall = async (method, params = []) => {
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

      const data = await response.json();
      return data.result;
    };

    // rBTC баланс
    const rbtcBalance = await rpcCall("getBalance", [address]);

    // Контракты (если метод balanceOf поддерживается через RPC)
    const MOTO = "0x0a6732489a31e6de07917a28ff7df311fc5f98f6e1664943ac1c3fe7893bdab5";
    const PILL = "0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438";
    const ODIS = "0xc573930e4c67f47246589ce6fa2dbd1b91b58c8fdd7ace336ce79e65120f79eb";

    // Пример contract call (может отличаться — зависит от RPC методов)
    const motoBalance = await rpcCall("call", [MOTO, "balanceOf", address]);
    const pillBalance = await rpcCall("call", [PILL, "balanceOf", address]);
    const odisBalance = await rpcCall("call", [ODIS, "balanceOf", address]);

    return res.status(200).json({
      network: "OP_NET Regtest",
      address,
      rBTC: rbtcBalance,
      tokens: {
        MOTO: motoBalance,
        PILL: pillBalance,
        ODIS: odisBalance
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "RPC connection failed",
      details: error.message
    });
  }
}
