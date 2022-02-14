import axios from "axios";

const baseUrl = `https://api.blockcypher.com/v1`;

export const getBalance = async ({ wallet, crypto }: { wallet: string, crypto: string }) => {
  const {data: result} = await axios.get(
    `${baseUrl}/${crypto.toLowerCase()}/main/addrs/${wallet}`
  );
  return parseFloat(result.balance) / 1e8
};
