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
  lineHeight: "1",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",

  // custom
  fontFamily: "inherit",
  fontWeight: "$5",
  br: "$2",

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

  variants: {
    /**
     * The size of the button.
     * @default "2"
     */
    size: {
      1: {
        height: "$7",
        fontSize: "$1",
        lineHeight: "$sizes$7",
        px: "$3",
        gap: "$1",

        "& svg": {
          size: "$3",
        },
      },
      2: {
        height: "$9",
        fontSize: "$2",
        lineHeight: "$sizes$9",
        px: "$4",
        gap: "$2",

        "& svg": {
          size: "$4",
        },
      },
      3: {
        height: "$11",
        fontSize: "$3",
        lineHeight: "$sizes$11",
        px: "$5",
        gap: "$2",

        "& svg": {
          size: "$4",
        },
      },
    },
    /**
     * The variant of the button.
     * @default "subtle"
     */
    variant: {
      subtle: {
        color: "$$color",
        backgroundColor: "$$bgSubtle",

        "&:hover": {
          backgroundColor: "$$bgSubtleHover",
        },

        "&:active": {
          backgroundColor: "$$bgSubtleActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $$focus",
        },
      },
      outline: {
        color: "$$color",
        backgroundColor: "transparent",
        boxShadow: "inset 0 0 0 1px $$border",

        "&:hover": {
          boxShadow: "inset 0 0 0 1px $$borderHover",
        },

        "&:active": {
          backgroundColor: "$$bgActive",
          boxShadow: "inset 0 0 0 1px $$borderActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $$focus",
        },
      },
      solid: {
        backgroundColor: "$$bgSolid",
        color: "$$colorSolid",

        "&:hover": {
          backgroundColor: "$$bgSolidHover",
        },

        "&:active": {
          backgroundColor: "$$bgSolidActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $$focus",
        },
      },
      ghost: {
        color: "$$color",
        backgroundColor: "transparent",

        "&:hover": {
          backgroundColor: "$$bgHover",
        },

        "&:active": {
          backgroundColor: "$$bgActive",
        },

        "&:focus-visible": {
          boxShadow: "0 0 0 2px $$focus",
        },
      },
    },
    colorScheme: {
      slate: {},
      green: {
        // default styles
        $$bg: "$colors$green3",
        $$border: "$colors$green7",
        $$color: "$colors$green11",

        // hover styles
        $$bgHover: "$colors$green4",
        $$borderHover: "$colors$green8",

        // active styles
        $$bgActive: "$colors$green5",
        $$borderActive: "$colors$green8",

        $$bgSubtle: "$colors$green4",
        $$bgSubtleHover: "$colors$green5",
        $$bgSubtleActive: "$colors$green6",

        $$bgSolid: "$colors$green9",
        $$colorSolid: "white",
        // solid hover styles
        $$bgSolidHover: "$colors$green10",
        // solid active styles
        $$bgSolidActive: "$colors$green10",
      },
      blue: {
        // default styles
        $$bg: "$colors$blue3",
        $$border: "$colors$blue7",
        $$color: "$colors$blue11",

        // hover styles
        $$bgHover: "$colors$blue4",
        $$borderHover: "$colors$blue8",

        // active styles
        $$bgActive: "$colors$blue5",
        $$borderActive: "$colors$blue8",

        $$bgSubtle: "$colors$blue4",
        $$bgSubtleHover: "$colors$blue5",
        $$bgSubtleActive: "$colors$blue6",

        $$bgSolid: "$colors$blue9",
        $$colorSolid: "white",
        // solid hover styles
        $$bgSolidHover: "$colors$blue10",
        // solid active styles
        $$bgSolidActive: "$colors$blue10",
      },
      red: {
        // default styles
        $$bg: "$colors$red3",
        $$border: "$colors$red7",
        $$color: "$colors$red11",

        // hover styles
        $$bgHover: "$colors$red4",
        $$borderHover: "$colors$red8",

        // active styles
        $$bgActive: "$colors$red5",
        $$borderActive: "$colors$red8",

        $$bgSubtle: "$colors$red4",
        $$bgSubtleHover: "$colors$red5",
        $$bgSubtleActive: "$colors$red6",

        $$bgSolid: "$colors$red9",
        $$colorSolid: "white",
        // solid hover styles
        $$bgSolidHover: "$colors$red10",
        // solid active styles
        $$bgSolidActive: "$colors$red10",
      },
    },
    border: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variant: "subtle",
      border: true,
      css: {
        backgroundColor: "$$bg",
        boxShadow: "inset 0 0 0 1px $$border",
        "&:hover": {
          backgroundColor: "$$bgHover",
          boxShadow: "inset 0 0 0 1px $$borderHover",
        },
        "&:active": {
          backgroundColor: "$$bgActive",
          boxShadow: "inset 0 0 0 1px $$borderActive",
        },
      },
    },
  ],

  defaultVariants: {
    size: "2",
    variant: "subtle",
  },
});
