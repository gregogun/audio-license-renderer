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

    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error("Error occured whilst fetching data:", error.message);
  }
};

export const setTrackInfo = (node: Transaction, gateway: string) => {
  const title = node.tags.find((x) => x.name === "Title")?.value;

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

  return {
    title,
    creator,
    artworkSrc,
    src,
  };
};
