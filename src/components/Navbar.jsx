import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-20 flex h-[64px] w-full items-center border-b border-gray-200 bg-white px-2 py-2.5 dark:border-gray-600 dark:bg-gray-900 sm:px-4">
      <div className="container mx-auto flex items-center justify-between px-1 md:px-2 lg:px-6">
        <a
          href="https://linktr.ee/ethmexico"
          className="flex items-center"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Ethereum México
          </span>
        </a>
        <div className="flex md:order-2">
          <a
            type="button"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
            href="https://t.me/ethmexico"
            rel="noopener noreferrer"
            target="_blank"
          >
            Únete a la comunidad
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
