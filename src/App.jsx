import { useState } from "react";
import { ethers } from "ethers";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";
import { toast, Toaster } from "react-hot-toast";
import "./App.css";
import ledgerLogo from "./assets/ledger-logo.jpg";

function App() {
  const ALCHEMY_RPC_URL = import.meta.env.VITE_ALCHEMY_API_URL;
  const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC_URL);
  const [addressState, setAddressState] = useState(null);
  const [ethState, setEthState] = useState(null);
  const [recipientState, setRecipientState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [transferTxState, setTransferTxState] = useState({
    to: null,
    gasPrice: null,
    gasLimit: null,
    nonce: null,
    chainId: 11155111,
    data: null,
    value: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState();

  const connectLedger = async () => {
    try {
      const transport = await TransportWebHID.create();
      const eth = new Eth(transport);
      const { address } = await eth.getAddress("44'/60'/0'/0/0", false);
      setAddressState(address);
      setEthState(eth);
      let gasPriceCalc = (await provider.getGasPrice())._hex;
      console.log("Provider gas price", gasPriceCalc);
      gasPriceCalc = parseInt(parseInt(gasPriceCalc, 16) * 1.15);
      console.log("Parse Int gas price", gasPriceCalc);
      setTransferTxState((prevState) => ({
        ...prevState,
        gasLimit: 10000,
        gasPrice: gasPriceCalc,
      }));
      toast.success("Ledger conectado");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Ocurrió un error, intenta de nuevo");
      setShowModal(false);
    }
  };

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
    <div className="App">
      <Toaster position="bottom-center" />
      <div className="m-5 flex flex-col items-center justify-center">
        <p>Haz click en el botón para conectar tu Ledger</p>
        <button
          className="mt-6 mb-2 rounded bg-blue-700 py-2 px-4 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
          onClick={() => setShowModal(!showModal)}
          disabled={addressState !== null ? true : false}
        >
          {addressState !== null ? "Conectado" : "Conecta tu cartera"}
        </button>
      </div>
      <div className="flex w-full">
        <div id="app" className="w-1/2">
          <form className="rounded border-2 p-8">
            <div className="mb-2 flex w-full flex-col items-start">
              <label
                htmlFor="wallet"
                className="mb-2 block font-medium text-gray-700"
              >
                Llave pública de tu cartera Ledger ("dirección")
              </label>
              <input
                type="text"
                className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                id="wallet"
                value={addressState || ""}
                disabled
              />
            </div>
            <div className="mb-2 flex w-full flex-col items-start">
              <label
                htmlFor="recipient"
                className="mb-2 block font-medium text-gray-700"
              >
                Enviar a ("dirección" de cartera que recibe)
              </label>
              <input
                type="text"
                className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                id="recipient"
                onChange={(event) => setRecipientState(event.target.value)}
                value={recipientState || ""}
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="mb-2 flex w-1/2 flex-col items-start pr-4">
                <label
                  htmlFor="gasPrice"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Precio de gas (en wei)
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                  defaultValue={transferTxState.gasPrice || ""}
                  disabled
                  id="gasPrice"
                />
              </div>
              <div className="mb-2 flex w-1/2 flex-col items-start pl-4">
                <label
                  htmlFor="gasLimit"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Límite de gas (en wei)
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                  id="gasLimit"
                  onChange={(event) =>
                    setTransferTxState((prevState) => ({
                      ...prevState,
                      gasLimit: event.target.value,
                    }))
                  }
                  value={transferTxState.gasLimit || ""}
                />
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="mb-2 flex w-1/2 flex-col items-start pr-4">
                <label
                  htmlFor="chainId"
                  className="mb-2 block font-medium text-gray-700"
                >
                  ID de cadena de bloques
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                  defaultValue={transferTxState.chainId}
                  id="chainId"
                  disabled
                />
              </div>
              <div className="mb-2 flex w-1/2 flex-col items-start pl-4">
                <label
                  htmlFor="value"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Valor a transferir (en ETH)
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                  id="value"
                  onChange={(event) =>
                    setTransferTxState((prevState) => ({
                      ...prevState,
                      value: event.target.value,
                    }))
                  }
                  value={transferTxState.value || ""}
                />
              </div>
            </div>
            <div className="mt-6 mb-2">
              <button
                className="rounded bg-blue-700 py-2 px-4 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
                disabled={isLoading}
                onClick={transactionTransfer}
              >
                {!isLoading ? "Crear tx" : "Creando tx ..."}
              </button>
            </div>
          </form>
        </div>
        <div className="flex w-1/2 flex-col p-6">
          <h4 className="mb-2 text-xl font-semibold">Red de prueba Sepolia</h4>
          <p className="text-md mb-2">Explorador de cadena de bloques:</p>
          <div className="flex justify-center p-4">
            {!url ? (
              <p id="url">"No hay información de transacción"</p>
            ) : (
              <a
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                href={url}
                rel="noopener noreferrer"
                target="_blank"
              >
                Ver tx en explorador de cadena
              </a>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/75 outline-none focus:outline-none">
          <div className="relative my-6 mx-auto flex h-full w-full justify-center pt-36">
            <div className="border-gray-400-600 relative flex h-1/2 w-2/5 flex-col items-center rounded-lg border-4 bg-white py-6 px-4 shadow-lg outline-none focus:outline-none">
              <div className="flex w-full justify-center">
                <h5 className="text-2xl font-semibold" id="WalletModalLabel">
                  Escoge tu cartera
                </h5>
                <button
                  className="absolute top-4 right-4 border-0 bg-transparent text-black"
                  onClick={() => setShowModal(false)}
                >
                  <span className="opacity-7 block h-6 w-6 rounded-full bg-gray-400 py-0 text-sm text-black">
                    x
                  </span>
                </button>
              </div>
              <div className="flex h-full w-1/2 items-center justify-center">
                <button
                  id="connect-ledger"
                  className="rounded-md border-2 border-gray-400 p-6 hover:border-0 hover:outline hover:outline-4 hover:outline-orange-500"
                  onClick={connectLedger}
                >
                  <img src={ledgerLogo} className="card-img-top" alt="Ledger" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
