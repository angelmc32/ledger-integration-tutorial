import { useState } from "react";
import { ethers } from "ethers";
import { Toaster } from "react-hot-toast";
import "./App.css";
import ConnectLedgerModal from "./components/ConnectLedgerModal";
import LedgerTxButton from "./components/LedgerTxButton";

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

  return (
    <div className="App px-10">
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
      <div className="flex w-full px-8">
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
                  defaultValue={transferTxState.gasLimit || ""}
                  disabled
                  id="gasLimit"
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
              <LedgerTxButton
                addressState={addressState}
                ethState={ethState}
                isLoading={isLoading}
                provider={provider}
                recipientState={recipientState}
                setIsLoading={setIsLoading}
                setUrl={setUrl}
                transferTxState={transferTxState}
              />
            </div>
          </form>
        </div>
        <div className="flex w-1/2 flex-col px-8 pt-16">
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
        <ConnectLedgerModal
          provider={provider}
          setAddressState={setAddressState}
          setEthState={setEthState}
          setShowModal={setShowModal}
          setTransferTxState={setTransferTxState}
        />
      )}
    </div>
  );
}

export default App;
