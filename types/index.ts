export type Track = {
  title: string | undefined;
  creator: string;
  src: string;
  artworkSrc: string | undefined;
  txid: string;
};

export type Tracklist = Track[];

type ManifestPath = {
  id: string;
};

export type Manifest = {
  index?: {
    path: string;
  };
  paths: {
    [key: string]: ManifestPath;
  };
};

export type ValidTrack = {};
