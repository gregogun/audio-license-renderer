import { Button, IconButton, Typography } from "@/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/ui/Dialog";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { usePayments } from "../hooks/usePayments";
import { SetStateAction, useState } from "react";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  setLicensePaid: React.Dispatch<SetStateAction<boolean>>;
}

export const PaymentDialog = ({
  open,
  onClose,
  setLicensePaid,
}: PaymentDialogProps) => {
  const [paymentStatus, setPaymentStatus] = useState<
    "unpaid" | "in progress" | "paid"
  >("unpaid");

  const handleClick = () => {
    setPaymentStatus("in progress");

    setTimeout(() => {
      setPaymentStatus("paid");
    }, 2000);

    setTimeout(() => {
      setLicensePaid(true);
      onClose();
    }, 3000);
  };

  const parentRef = document.getElementById("audio-container");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal container={parentRef}>
        <DialogOverlay
          css={{
            backdropFilter: "blur(3px)",
          }}
        />
        <DialogContent
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "$5",
          }}
        >
          <DialogTitle asChild>
            <Typography
              css={{ maxWidth: "14ch", textAlign: "center" }}
              contrast="high"
              size="7"
              weight="6"
            >
              Pay one-time fee of 1 $U to listen to the full track
            </Typography>
          </DialogTitle>
          <Button
            css={{
              "& svg": {
                color: "hsl(151, 55.0%, 41.5%)",
              },
            }}
            disabled={paymentStatus !== "unpaid"}
            onClick={handleClick}
          >
            {paymentStatus === "unpaid" && "Pay 1 $U"}
            {paymentStatus === "in progress" && "Payment in progress..."}
            {paymentStatus === "paid" && "Payment successful"}
            {paymentStatus === "paid" && <RxCheck />}
          </Button>
          <DialogClose asChild>
            <IconButton
              css={{
                "& svg": {
                  size: "$10",
                  color: "$whiteA11",
                },
              }}
            >
              <RxCross2 />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
