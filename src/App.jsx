import { useState } from "react";
import "./App.css";
import ledgerLogo from "./assets/ledger-logo.jpg";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <div className="m-5 flex flex-col items-center justify-center">
        <p>Click on the bellow button to connect your Ledger Wallet</p>
        <button
          className="mt-6 mb-2 rounded bg-blue-700 py-2 px-4 font-bold text-white hover:bg-blue-600"
          data-bs-toggle="modal"
          data-bs-target="#WalletModal"
          onClick={() => setShowModal(!showModal)}
        >
          Connect your Wallet
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
                Wallet Public Key
              </label>
              <input
                type="text"
                className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                id="wallet"
                disabled
              />
            </div>
            <div className="mb-2 flex w-full flex-col items-start">
              <label
                htmlFor="recipient"
                className="mb-2 block font-medium text-gray-700"
              >
                Recipient
              </label>
              <input
                type="text"
                className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                id="recipient"
              />
            </div>
            <div className="flex w-full justify-between">
              <div className="mb-2 flex w-1/2 flex-col items-start pr-4">
                <label
                  htmlFor="gasPrice"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Gas Price in wei
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                  id="gasPrice"
                  disabled
                />
              </div>
              <div className="mb-2 flex w-1/2 flex-col items-start pl-4">
                <label
                  htmlFor="gasLimit"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Gas Limit in wei
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
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
                  Chain ID
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                  id="chainId"
                  disabled
                />
              </div>
              <div className="mb-2 flex w-1/2 flex-col items-start pl-4">
                <label
                  htmlFor="value"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Value
                </label>
                <input
                  type="text"
                  className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-blue-400"
                  id="value"
                />
              </div>
            </div>
            <div className="mt-6 mb-2">
              <button
                type="button"
                id="tx-transfer"
                className="rounded bg-blue-700 py-2 px-4 font-bold text-white hover:bg-blue-600"
              >
                Create Transaction
              </button>
            </div>
          </form>
        </div>
        <div className="flex w-1/2 flex-col">
          <p className="url">Sepolia etherscan: </p>
          <p id="url"></p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900/75 outline-none focus:outline-none">
          <div className="relative my-6 mx-auto flex h-full w-full justify-center pt-36">
            <div className="border-gray-400-600 relative flex h-1/2 w-2/5 flex-col items-center rounded-lg border-4 bg-white py-6 px-4 shadow-lg outline-none focus:outline-none">
              <div className="flex w-full justify-center">
                <h5 className="text-2xl font-semibold" id="WalletModalLabel">
                  Choose your Wallet
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
                >
                  <img src={ledgerLogo} className="card-img-top" alt="Ledger" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === "ok" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
          <div className="relative my-6 mx-auto w-auto max-w-3xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5 ">
                <h3 className="font=semibold text-3xl">General Info</h3>
                <button
                  className="float-right border-0 bg-transparent text-black"
                  onClick={() => setShowModal(false)}
                >
                  <span className="opacity-7 block h-6 w-6 rounded-full bg-gray-400 py-0 text-xl text-black">
                    x
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <form className="w-full rounded bg-gray-200 px-8 pt-6 pb-8 shadow-md">
                  <label className="mb-1 block text-sm font-bold text-black">
                    First Name
                  </label>
                  <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
                  <label className="mb-1 block text-sm font-bold text-black">
                    Last Name
                  </label>
                  <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
                  <label className="mb-1 block text-sm font-bold text-black">
                    Address
                  </label>
                  <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
                  <label className="mb-1 block text-sm font-bold text-black">
                    City
                  </label>
                  <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
                </form>
              </div>
              <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                <button
                  className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none focus:outline-none"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="mr-1 mb-1 rounded bg-yellow-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-yellow-700"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Submit
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
