import Payments from "@permaweb/payments";
import { arweave } from "./arweave";
import { warp } from "./arweave";

const payments = Payments.init({ warp, wallet: "use_wallet", arweave });

export const licensePaid = async (
  contract: string,
  address: string | undefined
) => {
  console.log("contract", contract);
  console.log("address", address);
  try {
    if (!address) {
      throw new Error("No wallet address found");
    }
    const res = await payments.isLicensed(contract, address);
    console.log(res);
    return res;
  } catch (error) {
    throw error;
  }
};

export const makePayment = async (
  contract: string,
  address: string | undefined
) => {
  console.log("contract", contract);
  console.log("address", address);
  try {
    if (!address) {
      throw new Error("No wallet address found");
    }
    const res: boolean = await payments.pay(contract, address);
    console.log(res);
    return res;
  } catch (error: any) {
    console.error("Payment Error:", error.message);
  }
};
