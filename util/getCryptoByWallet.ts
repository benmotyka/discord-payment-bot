
const btcRegex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/
const ethRegex = /^0x[a-fA-F0-9]{40}$/

export default (wallet: string) => {
  if (btcRegex.test(wallet)) return "BTC";
};
