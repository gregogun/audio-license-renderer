import type * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";

export const { styled, css, theme, globalCss, keyframes, getCssText, config } =
  createStitches({
    theme: {
      colors: {
        whiteA1: "hsla(0, 0%, 100%, 0)",
        whiteA2: "hsla(0, 0%, 100%, 0.013)",
        whiteA3: "hsla(0, 0%, 100%, 0.034)",
        whiteA4: "hsla(0, 0%, 100%, 0.056)",
        whiteA5: "hsla(0, 0%, 100%, 0.086)",
        whiteA6: "hsla(0, 0%, 100%, 0.124)",
        whiteA7: "hsla(0, 0%, 100%, 0.176)",
        whiteA8: "hsla(0, 0%, 100%, 0.249)",
        whiteA9: "hsla(0, 0%, 100%, 0.386)",
        whiteA10: "hsla(0, 0%, 100%, 0.446)",
        whiteA11: "hsla(0, 0%, 100%, 0.592)",
        whiteA12: "hsla(0, 0%, 100%, 0.923)",
        blackA1: "hsla(0, 0%, 0%, 0.012)",
        blackA2: "hsla(0, 0%, 0%, 0.027)",
        blackA3: "hsla(0, 0%, 0%, 0.047)",
        blackA4: "hsla(0, 0%, 0%, 0.071)",
        blackA5: "hsla(0, 0%, 0%, 0.090)",
        blackA6: "hsla(0, 0%, 0%, 0.114)",
        blackA7: "hsla(0, 0%, 0%, 0.141)",
        blackA8: "hsla(0, 0%, 0%, 0.220)",
        blackA9: "hsla(0, 0%, 0%, 0.439)",
        blackA10: "hsla(0, 0%, 0%, 0.478)",
        blackA11: "hsla(0, 0%, 0%, 0.565)",
        blackA12: "hsla(0, 0%, 0%, 0.910)",
      },
      fonts: {
        body: 'ui-sans-serif,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        heading:
          'ui-sans-serif,system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      },
      fontSizes: {
        1: ".75rem",
        2: ".875rem",
        3: "1rem",
        4: "1.125rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.875rem",
        8: "2.25rem",
        9: "3rem",
        10: "3.75rem",
        11: "4.5rem",
        12: "6rem",
      },
      fontWeights: {
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500,
        6: 600,
        7: 700,
        8: 800,
        9: 900,
      },
      lineHeights: {
        1: "1rem",
        2: "1.25rem",
        3: "1.5rem",
        4: "1.75rem",
        5: "1.75rem",
        6: "2rem",
        7: "2.25rem",
        8: "2.5rem",
        9: "3rem",
        10: "3.75rem",
        11: "4.5rem",
        12: "6rem",
      },
      radii: {
        1: "4px",
        2: "6px",
        3: "8px",
        4: "12px",
        5: "20px",
        round: "50%",
        pill: "9999px",
      },
      space: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
        30: "120px",
      },
      sizes: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        16: "64px",
        20: "80px",
        30: "120px",
        40: "160px",
        50: "200px",
        60: "240px",
        80: "320px",
        100: "400px",
        120: "480px",
      },
    },
    media: {
      bp1: "(min-width: 520px)",
      bp2: "(min-width: 768px)",
      bp3: "(min-width: 1024px)",
      bp4: "(min-width: 1280px)",
      bp5: "(min-width: 1536px)",
    },
    utils: {
      p: (value: Stitches.PropertyValue<"padding">) => ({
        paddingTop: value,
        paddingBottom: value,
        paddingLeft: value,
        paddingRight: value,
      }),
      pt: (value: Stitches.PropertyValue<"padding">) => ({
        paddingTop: value,
      }),
      pr: (value: Stitches.PropertyValue<"padding">) => ({
        paddingRight: value,
      }),
      pb: (value: Stitches.PropertyValue<"padding">) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.PropertyValue<"padding">) => ({
        paddingLeft: value,
      }),
      px: (value: Stitches.PropertyValue<"padding">) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.PropertyValue<"padding">) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      m: (value: Stitches.PropertyValue<"margin">) => ({
        marginTop: value,
        marginBottom: value,
        marginLeft: value,
        marginRight: value,
      }),
      mt: (value: Stitches.PropertyValue<"margin">) => ({
        marginTop: value,
      }),
      mr: (value: Stitches.PropertyValue<"margin">) => ({
        marginRight: value,
      }),
      mb: (value: Stitches.PropertyValue<"margin">) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.PropertyValue<"margin">) => ({
        marginLeft: value,
      }),
      mx: (value: Stitches.PropertyValue<"margin">) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.PropertyValue<"margin">) => ({
        marginTop: value,
        marginBottom: value,
      }),
      br: (value: Stitches.PropertyValue<"borderRadius">) => ({
        borderRadius: value,
      }),
      size: (value: Stitches.PropertyValue<"width">) => ({
        width: value,
        height: value,
      }),
      shadow: (value: Stitches.PropertyValue<"boxShadow">) => ({
        boxShadow: value,
      }),

      userSelect: (value: Stitches.PropertyValue<"userSelect">) => ({
        WebkitUserSelect: value,
        userSelect: value,
      }),
      appearance: (value: Stitches.PropertyValue<"appearance">) => ({
        WebkitAppearance: value,
        appearance: value,
      }),
      backgroundClip: (value: Stitches.PropertyValue<"backgroundClip">) => ({
        WebkitBackgroundClip: value,
        backgroundClip: value,
      }),
    },
  });

export type CSS = Stitches.CSS<typeof config>;
export type {
  ComponentProps,
  VariantProps,
  PropertyValue,
  ScaleValue,
} from "@stitches/react";
