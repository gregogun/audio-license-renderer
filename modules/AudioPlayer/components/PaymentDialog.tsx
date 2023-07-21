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
}

export const PaymentDialog = ({
  open,
  onClose,
  licensePaid,
  fee,
  txid,
}: PaymentDialogProps) => {
  const queryClient = useQueryClient();
  const { walletAddress } = useConnect();
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentMutation = useMutation({
    mutationFn: () => makePayment(txid, walletAddress),
    onSuccess: (data) => {
      setSubmittingPayment(false);
      setPaymentSuccess(true);
      console.log(data);
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [`license-info-${txid}`, `license-paid-${txid}`],
        });
      }, 500);
    },
    onError: (error: any) => {
      document.body.style.pointerEvents = "none";
      setSubmittingPayment(false);
      console.error(error);
    },
  });

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
                color: "hsl(151, 55.0%, 41.5%)",
              },
            }}
            onClick={() => {
              // fixes window focusing issue between arweave.app iframe and tanstack query
              document.body.style.pointerEvents = "auto";
              setSubmittingPayment(true);
              paymentMutation.mutate();
            }}
            disabled={submittingPayment}
          >
            {!licensePaid &&
              !paymentSuccess &&
              !submittingPayment &&
              `Pay ${fee} $U`}
            {submittingPayment && "Processing payment..."}
            {paymentSuccess && !submittingPayment && "Payment successful"}
            {paymentSuccess && !submittingPayment && <RxCheck />}
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
