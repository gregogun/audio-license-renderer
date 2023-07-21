import { styled } from "@/stitches.config";

export const Button = styled("button", {
  // resets
  all: "unset",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  // custom reset
  display: "inline-flex",
  justifyContent: "center",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",

  // custom
  fontFamily: "inherit",
  fontWeight: "$5",
  br: "$2",
  backgroundColor: "hsla(0, 0%, 100%, 0.923)",
  color: "$blackA12",
  height: "$11",
  fontSize: "$3",
  lineHeight: "$sizes$11",
  px: "$5",
  gap: "$2",
  borderRadius: "$pill",

  "& svg": {
    size: "$4",
  },

  "&:hover": {
    backgroundColor: "hsla(0, 0%, 100%, 0.823)",
  },

  "&:active": {
    transform: "scale(0.95)",
  },

  "&:disabled": {
    pointerEvents: "none",
    cursor: "not-allowed",
    opacity: "50%",
  },

  '&[aria-disabled="true"]': {
    pointerEvents: "none",
    cursor: "not-allowed",
    opacity: "50%",
  },
});
