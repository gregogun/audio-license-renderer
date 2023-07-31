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
import { SetStateAction, useState } from "react";
import { Image } from "@/ui/Image";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { licensePaid, makePayment } from "@/lib/payments";
import { getLicenseInfo } from "@/lib/api";
import { useConnect } from "arweave-wallet-ui-test";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  licensePaid: boolean;
  fee: number | undefined;
  txid: string;
  walletAddress: string | undefined;
}

export const PaymentDialog = ({
  open,
  onClose,
  licensePaid,
  fee,
  txid,
  walletAddress,
}: PaymentDialogProps) => {
  const queryClient = useQueryClient();
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const paymentMutation = useMutation({
    mutationFn: () => makePayment(txid, walletAddress),
    onSuccess: (data) => {
      setSubmittingPayment(false);
      setPaymentSuccess(true);
      console.log("id", data);
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [`license-info-${txid}`, `license-paid-${txid}`],
        });
        onClose();
      }, 1000);
    },
    onError: (error: any) => {
      document.body.style.pointerEvents = "none";
      setSubmittingPayment(false);
      setPaymentError(true);
      console.error("Payment Error:", error.message);
    },
  });

  const parentRef = document.getElementById("audio-container");
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (paymentError) {
          setPaymentError(false);
        }
        if (paymentSuccess) {
          setPaymentSuccess(false);
        }
        onClose();
      }}
    >
      <DialogPortal container={parentRef}>
        <DialogOverlay
          css={{
            backdropFilter: "blur(3px)",
          }}
        />
        <DialogContent
          css={{
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "$5",
          }}
        >
          {/* <Image
            css={{
              width: 80,
              height: 33.45,
            }}
            src="udl_license.svg"
          /> */}
          <DialogTitle asChild>
            <Typography
              css={{ maxWidth: "14ch", textAlign: "center" }}
              contrast="high"
              size="7"
              weight="6"
            >
              Pay one-time fee of {fee} $U to listen to the full track
            </Typography>
          </DialogTitle>
          <Button
            css={{
              "& svg": {
                color: paymentError
                  ? "hsl(358, 75.0%, 59.0%)"
                  : "hsl(151, 55.0%, 41.5%)",
              },
            }}
            onClick={async () => {
              // fixes window focusing issue between arweave.app iframe and tanstack query
              document.body.style.pointerEvents = "auto";
              if (walletAddress) {
                setSubmittingPayment(true);
                paymentMutation.mutate();
              } else {
                try {
                  await window.arweaveWallet.connect([
                    "ACCESS_ADDRESS",
                    "ACCESS_ALL_ADDRESSES",
                    "DISPATCH",
                    "SIGN_TRANSACTION",
                  ]);
                  setSubmittingPayment(true);
                  paymentMutation.mutate();
                } catch (error: any) {
                  console.error("Error connecting wallet: " + error.message);
                }
              }
            }}
            disabled={submittingPayment}
          >
            {!licensePaid &&
              !paymentSuccess &&
              !paymentError &&
              !submittingPayment &&
              `Pay ${fee} $U`}
            {submittingPayment && "Processing payment..."}
            {paymentSuccess && !submittingPayment && "Payment successful"}
            {paymentError && !submittingPayment && "Payment error"}
            {paymentSuccess && !submittingPayment && <RxCheck />}
            {paymentError && !submittingPayment && <RxCross2 />}
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
