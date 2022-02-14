const btcRegex = /^[a-fA-F0-9]{64}$/
const ethRegex = /^0x([A-Fa-f0-9]{64})$/

export default (txHash: string) => {
  if (btcRegex.test(txHash)) return "BTC";
};
