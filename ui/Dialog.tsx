import { ComponentProps, keyframes, styled } from "stitches.config";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import React, { forwardRef } from "react";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "rgba(8, 8, 8, 0.8)",
  position: "absolute",
  width: "100%",
  height: "100%",
  inset: 0,

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  br: "$3",
  backgroundColor: "$slate1",
  boxShadow: "0px 0px 33px rgba(0, 0, 0, 0.08)",
  position: "absolute",
  m: "auto",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  maxWidth: 500,
  maxHeight: 500,
  overflow: "hidden",
  "&:focus": { outline: "none" },
  p: "$5",
});

export type DialogContentProps = ComponentProps<typeof StyledDialogContent> &
  DialogPrimitive.PortalProps & {
    portal?: boolean;
  };

// export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
//   ({ children, portal = true, forceMount, container, ...props }, ref) => {
//     const Portal = portal ? DialogPrimitive.Portal : React.Fragment;
//     return (
//       <Portal forceMount={forceMount} container={container}>
//         <StyledDialogContent ref={ref} {...props}>
//           {children}
//         </StyledDialogContent>
//       </Portal>
//     );
//   }
// );

const StyledCloseButton = styled(DialogPrimitive.Close, {
  variants: {
    pos: {
      absolute: {
        position: "absolute",

        top: "$5",
        right: "$5",
      },
      relative: {
        position: "relative",

        top: 0,
        right: 0,
      },
    },
  },

  defaultVariants: {
    pos: "absolute",
  },
});

export const Dialog = DialogPrimitive.Root;
export const DialogOverlay = StyledOverlay;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogTrigger = styled(DialogPrimitive.Trigger);
export const DialogTitle = styled(DialogPrimitive.Title);
export const DialogDescription = styled(DialogPrimitive.Description);
export const DialogClose = StyledCloseButton;
export const DialogContent = StyledDialogContent;
