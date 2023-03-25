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
  const transactionTransfer = async () => {
    setIsLoading(true);
    const nonce = await provider.getTransactionCount(addressState, "latest");
    console.log(transferTxState.value);
    const transaction = {
      to: recipientState,
      gasPrice: transferTxState.gasPrice,
      gasLimit: ethers.utils.hexlify(32000),
      nonce: nonce,
      chainId: transferTxState.chainId,
      data: "0x00",
      value: ethers.utils.parseUnits(transferTxState.value, "ether")._hex,
    };
    //Serializing the transaction to pass it to Ledger Nano for signing
    let unsignedTx = ethers.utils.serializeTransaction(transaction).slice(2);

    try {
      //Sign with the Ledger Nano (Sign what you see)
      const signature = await ethState.signTransaction(
        "44'/60'/0'/0/0",
        unsignedTx,
        null
      );

      //Parse the signature
      signature.r = "0x" + signature.r;
      signature.s = "0x" + signature.s;
      signature.v = parseInt("0x" + signature.v);
      signature.from = addressState;

      //Serialize the same transaction as before, but adding the signature on it
      let signedTx = ethers.utils.serializeTransaction(transaction, signature);

      //Sending the transaction to the blockchain
      const hash = (await provider.sendTransaction(signedTx)).hash;

      if (hash) {
        toast.success("Se ha creado tu tx exitosamente");
        setUrl("https://sepolia.etherscan.io/tx/" + hash);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error, intenta de nuevo");
      setIsLoading(false);
    }
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
