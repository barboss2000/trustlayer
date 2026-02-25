export default async function handler(req, res) {
  try {
    const response = await fetch("https://regtest.opnet.org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "web3_clientVersion",
        params: [],
        id: 1
      })
    });

    const data = await response.text();

    return res.status(200).json({
      success: true,
      response: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
