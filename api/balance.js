import {
  JSONRpcProvider,
  getContract,
  OP_20_ABI,
  Configs
} from "opnet";

export default async function handler(req, res) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    // Подключаемся к OP_NET Regtest
    const network = Configs.NETWORK.REGTEST;
    const provider = new JSONRpcProvider(
      "https://regtest.opnet.org",
      network
    );

    // rBTC баланс
    const nativeBalance = await provider.getBalance(address);

    // Контракты
    const MOTO = "0x0a6732489a31e6de07917a28ff7df311fc5f98f6e1664943ac1c3fe7893bdab5";
    const PILL = "0xfb7df2f08d8042d4df0506c0d4cee3cfa5f2d7b02ef01ec76dd699551393a438";
    const ODIS = "0xc573930e4c67f47246589ce6fa2dbd1b91b58c8fdd7ace336ce79e65120f79eb";

    const motoContract = getContract(
      MOTO,
      OP_20_ABI,
      provider,
      network,
      address
    );

    const pillContract = getContract(
      PILL,
      OP_20_ABI,
      provider,
      network,
      address
    );

    const odisContract = getContract(
      ODIS,
      OP_20_ABI,
      provider,
      network,
      address
    );

    const motoBalance = await motoContract.balanceOf(address);
    const pillBalance = await pillContract.balanceOf(address);
    const odisBalance = await odisContract.balanceOf(address);

    res.status(200).json({
      network: "OP_NET Regtest",
      address,
      rBTC: nativeBalance.properties.balance,
      tokens: {
        MOTO: motoBalance.properties.balance,
        PILL: pillBalance.properties.balance,
        ODIS: odisBalance.properties.balance
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch balances" });
  }
}
