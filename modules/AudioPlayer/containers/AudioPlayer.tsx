import { Track } from "@/types";
import { Flex, Typography } from "@/ui";
import { useEffect, useState } from "react";
import { AudioPlayer as Component } from "../components/AudioPlayer";
import { getSong } from "@/lib/api";
import { licensePaid } from "@/lib/payments";
import { ConnectWallet } from "arweave-wallet-ui-test";

interface AudioPlayerProps {
  txid: string | undefined;
  gateway?: string;
}

export const AudioPlayer = ({
  txid,
  gateway = "https://arweave.net",
}: AudioPlayerProps) => {
  const [error, setError] = useState<string>();
  const [tracklist, setTracklist] = useState<Track[]>();

  /* FETCH TX & TRANSFORM DATA */

  useEffect(() => {
    console.log("yoooo");
    fetchAndTransform();
  }, []);

  const fetchAndTransform = async () => {
    if (!txid) return;

    try {
      const data = await getSong(gateway, txid);

      setTracklist(data);
    } catch (error) {
      console.error(error);
      setError(
        "An error occured trying to fetch your data. Please check you are entering a valid transaction ID."
      );
    }
  };

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!txid || !tracklist) {
    return null;
  }

  return <Component tracklist={tracklist} />;
};
