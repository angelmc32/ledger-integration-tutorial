import { ethers } from "ethers";
import { toast, Toaster } from "react-hot-toast";

const LedgerTxButton = ({
  addressState,
  ethState,
  isLoading,
  provider,
  recipientState,
  setIsLoading,
  setUrl,
  transferTxState,
}) => {
  const transactionTransfer = async (event) => {
    event.preventDefault();
    console.log("Enviando tx :)");
  };

  return (
    <button
      className="w-36 rounded-lg bg-blue-700 py-2 px-4 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
      disabled={isLoading}
      onClick={transactionTransfer}
    >
      {!isLoading ? "Crear tx" : "Creando tx ..."}
    </button>
  );
};

export default LedgerTxButton;
