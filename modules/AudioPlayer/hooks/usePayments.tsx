import { useState } from "react";

export const usePayments = () => {
  const [licensePaid, setLicensePaid] = useState(false);

  return {
    licensePaid,
    setLicensePaid,
  };
};
