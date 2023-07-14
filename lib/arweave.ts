import Arweave from "arweave";
import { ArweaveWebWallet } from "arweave-wallet-connector";
import { WarpFactory } from "warp-contracts";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

export const webWallet = new ArweaveWebWallet({
  name: "your_app_name_here",
});

export const warp = WarpFactory.forMainnet();

export const connect = () => {
  webWallet.setUrl("https://arweave.app");
  return webWallet.connect();
};
