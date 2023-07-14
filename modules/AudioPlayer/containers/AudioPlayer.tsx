import { Track } from "@/types";
import { Typography } from "@/ui";
import { useEffect, useState } from "react";
import { AudioPlayer as Component } from "../components/AudioPlayer";
import { getSong } from "@/lib/api";

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
  const [hasLicense, setHasLicense] = useState(true);

  /* FETCH TX & TRANSFORM DATA */

  useEffect(() => {
    fetchAndTransform();
  }, []);

  const fetchAndTransform = async () => {
    if (!txid) return;

    try {
      const data = await getSong(gateway, txid);
      // console.log("fetched data", data);

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

  return (
    <Component
      tracklist={tracklist}
      hasLicense={hasLicense}
      // licensePaid={licensePaid}
    />
  );
};
