export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    // Пока mock баланс (потом заменим на реальный OP_NET API)
    const mockBalance = {
      address: address,
      balance: (Math.random() * 5).toFixed(4),
      network: "OP_NET Testnet"
    };

    res.status(200).json(mockBalance);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch balance" });
  }
}
