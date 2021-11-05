import { useState } from "react";
import { Transfer } from "./TransferForm";
import { useIntl } from "react-intl";

interface UseTransferProps {
  handleSubmit: (values: Transfer) => void;
  myAddress: string;
  balance: number;
}

export const useTransferForm = ({
  handleSubmit,
  myAddress,
  balance,
}: UseTransferProps) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState({
    hasError: false,
    message: "",
  });
  const [addressError, setAddressError] = useState({
    hasError: false,
    message: "",
  });
  const intl = useIntl();

  const validateAddress = () => {
    let isValid = true;

    if (amount <= 0) {
      const error = intl.formatMessage({ id: "amountGenericError" });
      setAmountError({
        hasError: true,
        message: error,
      });

      isValid = false;
    }

    if (address === "" || address.toLowerCase() === myAddress.toLowerCase()) {
      const error = intl.formatMessage({ id: "addressGenericError" });
      setAddressError({
        hasError: true,
        message: error,
      });

      isValid = false;
    }

    if (amount > balance) {
      const error = intl.formatMessage({ id: "amountExceedError" });
      setAmountError({
        hasError: true,
        message: error,
      });

      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = () => {
    const isValid = validateAddress();
    if (!isValid) return;

    if (addressError.hasError || amountError.hasError) return;

    handleSubmit({ address, amount });
  };

  return {
    validateAddress,
    handleFormSubmit,
    setAddress,
    setAmount,
    setAmountError,
    amountError,
    addressError,
    setAddressError,
  };
};
