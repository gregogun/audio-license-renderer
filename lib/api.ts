import arweaveGql, { Transaction } from "arweave-graphql";
import { arweave } from "./arweave";

export const getSong = async (gateway: string, txid: string) => {
  try {
    const res = await arweaveGql(`${gateway}/graphql`).getTransactions({
      ids: [txid],
      tags: [
        {
          name: "Content-Type",
          values: ["audio/mpeg", "audio/wav", "audio/aac"],
        },
      ],
    });

    const data = res.transactions.edges
      //   .filter((edge) => Number(edge.node.data.size) < 1e7)
      .filter((edge) => edge.node.tags.find((x) => x.name === "Title"))
      .map((edge) => setTrackInfo(edge.node as Transaction, gateway));

    console.log(data);

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error("Error occured whilst fetching data:", error.message);
  }
};

const setTrackInfo = (node: Transaction, gateway: string) => {
  const title = node.tags.find((x) => x.name === "Title")?.value;

  let hasLicense = false;

  const licenseTx = node.tags.find((x) => x.name === "License")?.value;
  const access = node.tags.find((x) => x.name === "Access")?.value;
  const accessFee = node.tags.find((x) => x.name === "Access-Fee")?.value;

  if (
    licenseTx === "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8" &&
    access === "Restricted"
  ) {
    hasLicense = true;
  }

  let creator: string;

  try {
    // find owner from balances
    const initStateTag = node.tags.find((x) => x.name === "Init-State")?.value;

    const initState = initStateTag ? JSON.parse(initStateTag) : undefined;

    const assetOwner = Object.keys(initState.balances)[0];

    creator = assetOwner;
  } catch (error) {
    creator = node.owner.address;
  }

  let artworkSrc = "";

  const hasArtwork = !!node.tags.find((x) => x.name === "Cover-Artwork")?.value;

  if (hasArtwork) {
    artworkSrc =
      gateway + "/" + node.tags.find((x) => x.name === "Cover-Artwork")?.value;
  }

  const src = gateway + "/" + node.id;
  const txid = node.id;

  return {
    title,
    creator,
    artworkSrc,
    src,
    hasLicense,
    txid,
    accessFee,
  };
};

export const getLicenseInfo = async (
  txid: string,
  gateway = "https://arweave.net"
) => {
  try {
    const res = await arweaveGql(`${gateway}/graphql`).getTransactions({
      ids: [txid],
    });

    const data = res.transactions.edges.map((edge) =>
      setLicenseInfo(edge.node as Transaction, gateway)
    );

    return data[0];
  } catch (error: any) {
    console.error(error);
    throw new Error("Error occured whilst fetching data:", error.message);
  }
};

const setLicenseInfo = (node: Transaction, gateway: string) => {
  let hasLicense = false;

  const licenseTx = node.tags.find((x) => x.name === "License")?.value;
  const access = node.tags.find((x) => x.name === "Access")?.value;
  const accessFeeTag = node.tags
    .find((x) => x.name === "Access-Fee")
    ?.value.split("One-Time-")[1];

  const accessFee = accessFeeTag ? Number(accessFeeTag) : undefined;

  if (
    licenseTx === "yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8" &&
    access === "Restricted"
  ) {
    hasLicense = true;
  }

  console.log("hasLicense", hasLicense);
  return {
    hasLicense,
    accessFee,
  };
};
