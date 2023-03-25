import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import Eth from "@ledgerhq/hw-app-eth";
import { toast } from "react-hot-toast";
import ledgerLogo from "../assets/ledger-logo.jpg";

const ConnectLedgerModal = ({
  provider,
  setAddressState,
  setEthState,
  setShowModal,
  setTransferTxState,
}) => {
  const connectLedger = async () => {
    console.log("Conectando Ledger :)");
  };

  return (
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
  );
};

export default ConnectLedgerModal;
