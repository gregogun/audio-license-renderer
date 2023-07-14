import { Tracklist } from "@/types";
import {
  Box,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from "../../../ui";
import { abbreviateAddress, formatTime } from "@/utils";
import { Flex, IconButton, Typography } from "../../../ui";
import { KeyboardEvent, useEffect, useState } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { MdVolumeDown, MdVolumeUp } from "react-icons/md";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { styled } from "@/stitches.config";
import { CircularProgress } from "@/ui/CircularProgress";

const PlayPauseButton = styled(IconButton, {
  br: 9999,
});

const SkipButton = styled(IconButton, {
  br: 9999,
});

const Slider = styled(SliderRoot, {
  width: "100%",

  '[data-slider-thumb="true"]': {
    opacity: 0,
  },

  "&:hover": {
    '[data-slider-thumb="true"]': {
      opacity: 1,
    },
  },

  "&:focus-within": {
    '[data-slider-thumb="true"]': {
      "&:focus-visible": {
        opacity: 1,
      },
    },
  },
});

const AudioContainer = styled(Flex);
const VolumeSlider = styled(Slider);
const VolumeContainer = styled("form");
const ControlsContainer = styled(Flex);
const ProgressSlider = styled(Slider);
const ProgressContainer = styled("form");
const CoverArtwork = styled("img", {
  height: "100%",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  position: "absolute",
  zIndex: -1,
});

export const AudioPlayer = ({
  tracklist,
  hasLicense,
  licensePaid,
}: {
  tracklist: Tracklist;
  hasLicense: boolean;
  licensePaid: boolean;
}) => {
  const [progressStep, setProgressStep] = useState<number>(0.01);
  // const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const {
    audioRef,
    gainRef,
    audioCtxRef,
    ready,
    playing,
    duration,
    currentTime,
    scrubbing,
    setScrubbing,
    scrubbedValue,
    setScrubbedValue,
    setCurrentTime,
    handlePlayPause,
    currentTrackIndex,
    handleNextTrack,
    handlePrevTrack,
  } = useAudioPlayer(tracklist);

  // preview progress
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (progress < 100 && playing) {
      timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 6.67);
      }, 1000);
    }

    if (progress === 100) {
      if (!audioRef.current) return;

      setProgress(0);
      audioRef.current.currentTime = 0;
      handlePlayPause();
    }

    return () => {
      clearInterval(timer);
    };
  }, [progress, playing]);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(100);
    }
  }, [progress]);

  useEffect(() => {
    console.log("tracklist", tracklist);
  }, []);

  /* VARS */

  const currentTrack = tracklist[currentTrackIndex];

  /* EVENT HANDLERS */

  const handleValueChange = (e: number[]) => {
    if (!gainRef.current) return;

    gainRef.current.gain.value = e[0] / 100;
  };

  const handleProgressChange = (e: number[]) => {
    if (!audioRef.current) return;

    console.log("dragging");

    setScrubbing(true);
    setScrubbedValue(e[0]);
  };

  const handleProgressCommit = (e: number[]) => {
    if (!audioRef.current) return;

    console.log("dragging stopped");

    setScrubbing(false);
    audioRef.current.currentTime = e[0];
    setCurrentTime(e[0]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setProgressStep(5);
    }
  };

  return (
    <AudioContainer
      css={{
        width: "100%",
        height: "100%",
        p: "$5",

        maxWidth: "500px",
        maxHeight: "500px",
        overflow: "hidden",
        position: "relative",
        aspectRatio: 1 / 1,
      }}
      direction="column"
      justify="end"
      gap="3"
    >
      <audio ref={audioRef}>
        <source src={currentTrack.src} type="audio/ogg" />
        <source src={currentTrack.src} type="audio/wav" />
        <source src={currentTrack.src} type="audio/mpeg" />
        <source src={currentTrack.src} type="audio/aac" />
        <Typography>Audio file type not supported.</Typography>
      </audio>

      <Box
        css={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <Box
          css={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(
              to top,
              hsl(0, 0%, 0%) 0%,
              hsla(0, 0%, 0%, 0.738) 19%,
              hsla(0, 0%, 0%, 0.541) 34%,
              hsla(0, 0%, 0%, 0.382) 47%,
              hsla(0, 0%, 0%, 0.278) 56.5%,
              hsla(0, 0%, 0%, 0.194) 65%,
              hsla(0, 0%, 0%, 0.126) 73%,
              hsla(0, 0%, 0%, 0.075) 80.2%,
              hsla(0, 0%, 0%, 0.042) 86.1%,
              hsla(0, 0%, 0%, 0.021) 91%,
              hsla(0, 0%, 0%, 0.008) 95.2%,
              hsla(0, 0%, 0%, 0.002) 98.2%,
              hsla(0, 0%, 0%, 0) 100%
            )`,
            opacity: 0.7,
            position: "absolute",
          }}
        />
        <CoverArtwork src={currentTrack.artworkSrc} />
      </Box>

      <CircularProgress progress={progress} />

      <PlayPauseButton
        css={{
          color: "$whiteA12",
          backgroundColor: "$blackA12",
          opacity: 0.9,
          width: 120,
          height: 120,
          position: "absolute",
          m: "auto",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,

          "& svg": {
            size: "$16",
          },

          "&:hover": {
            backgroundColor: "$blackA12",
            opacity: 0.9,
          },

          "&:active": {
            backgroundColor: "$blackA12",
            opacity: 1,
          },
        }}
        size="3"
        data-playing={playing}
        aria-checked={playing}
        // disabled={!ready}
        role="switch"
        onClick={handlePlayPause}
      >
        {playing ? <MdPause /> : <MdPlayArrow />}
      </PlayPauseButton>
      <Typography
        size="2"
        weight="6"
        css={{
          m: "auto",
          position: "absolute",
          top: "65%",
          left: 0,
          right: 0,
          maxWidth: "max-content",
          maxHeight: "max-content",
          px: "$4",
          py: "$2",
          br: "$pill",
          backgroundColor: "$whiteA12",
          color: "$blackA12",
        }}
      >
        PREVIEW
      </Typography>

      {hasLicense && !licensePaid && (
        <>
          <Flex css={{ mt: "-$2" }} direction="column">
            <Typography css={{ color: "$whiteA12" }} weight="6">
              {currentTrack.title ? currentTrack.title : "(Untitled)"}
            </Typography>
            <Typography size="2">
              {abbreviateAddress({
                address: currentTrack.creator,
                options: { endChars: 5, noOfEllipsis: 3 },
              })}
            </Typography>
          </Flex>

          <Flex
            css={{
              position: "relative",
            }}
            direction="column"
          >
            <ProgressContainer>
              <ProgressSlider
                onKeyDown={handleKeyDown}
                defaultValue={[
                  audioCtxRef.current ? audioCtxRef.current.currentTime : 0,
                ]}
                value={scrubbing ? [scrubbedValue as number] : [currentTime]}
                max={duration}
                step={progressStep}
                aria-label="Track Progress"
                onValueChange={(e) => handleProgressChange(e)}
                onValueCommit={handleProgressCommit}
              >
                <SliderTrack>
                  <SliderRange />
                </SliderTrack>
                <SliderThumb data-slider-thumb />
              </ProgressSlider>
            </ProgressContainer>
            <Flex
              css={{
                position: "absolute",
                top: "$5",
                width: "100%",
              }}
              justify="between"
            >
              <Typography size="1">
                {scrubbing
                  ? formatTime(scrubbedValue as number)
                  : formatTime(currentTime)}
              </Typography>
              <Typography size="1">
                {duration && !isNaN(duration) ? formatTime(duration) : `0:00`}
              </Typography>
            </Flex>
          </Flex>

          <ControlsContainer
            css={{
              mx: "auto",
              my: "$3",
            }}
            align="center"
            gap="3"
          >
            {/* <SkipButton
          onClick={handlePrevTrack}
          css={{
            svg: {
              size: "$6",
            },
          }}
          variant="ghost"
          disabled={tracklist.length < 2}
        >
          <MdSkipPrevious />
        </SkipButton> */}
            {/* <SkipButton
          onClick={handleNextTrack}
          css={{
            svg: {
              size: "$6",
            },
          }}
          variant="ghost"
          disabled={tracklist.length < 2}
        >
          <MdSkipNext />
        </SkipButton> */}
          </ControlsContainer>

          <Flex
            css={{
              "& svg": {
                size: "$5",
                color: "$whiteA12",
              },
            }}
            align="center"
            justify="between"
            gap="3"
          >
            <IconButton>
              <BsThreeDots />
            </IconButton>
            <Flex gap="3">
              <MdVolumeDown />
              <VolumeContainer
                css={{
                  maxWidth: "$40",
                  minWidth: "$30",
                  flex: 1,
                }}
              >
                <VolumeSlider
                  defaultValue={[
                    gainRef.current ? gainRef.current.gain.value / 100 : 100,
                  ]}
                  max={100}
                  step={progressStep}
                  aria-label="Volume"
                  onValueChange={(e) => handleValueChange(e)}
                  onKeyDown={handleKeyDown}
                >
                  <SliderTrack>
                    <SliderRange />
                  </SliderTrack>
                  <SliderThumb data-slider-thumb />
                </VolumeSlider>
              </VolumeContainer>
            </Flex>
          </Flex>
        </>
      )}
    </AudioContainer>
  );
};
