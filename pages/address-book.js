import { useEffect, useState } from "react";
import { DocumentAddIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";
import { TrashIcon } from "@heroicons/react/solid";
import Head from "next/head";
import useSSR from "use-ssr";
import Avatar from "../components/common/Avatar";
import Header from "../components/Header";
import { getSmallAddress, isAddress } from "../utils/helper";
import useLocalStorage from "../hooks/useLocalStorage";
import Link from "next/link";
import { useWallet } from "../components/WalletContext";

function isDuplicate(address, allAddresses) {
  return allAddresses.findIndex((a) => a.address === address) === -1
    ? false
    : true;
}

export default function Watchlist() {
  let [addresses, setAddresses] = useLocalStorage("perp-watchlist", []);
  let { isBrowser } = useSSR();
  let { address } = useWallet();

  function switchElements() {
    if (!isBrowser) {
      return;
    }
    if (!addresses?.length) {
      return <NoAddress />;
    }
    if (addresses?.length) {
      return (
        <AddressList
          title="Watched Addresses"
          items={addresses}
          setAddresses={setAddresses}
        />
      );
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Perpetual Protocol Traders Dashboard </title>
          <meta
            name="description"
            content="Take a deeper look all the perpetual trades on perp.exchaneg. It will help you view net profits, losses, volume and assets you traded. It will also help you track assets, daily volume and recent trades on perp exchange."
          />
        </Head>
        <Header title="Address Book" isSmall />
        <main className="-mt-20">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow px-4 md:px-8 py-6 sm:px-12 pb-24">
              <AddNewAddress
                setAddresses={setAddresses}
                addresses={addresses}
              />
              {switchElements()}
              {address && (
                <AddressList
                  title="Connected Addresses"
                  items={[{ address }]}
                  setAddresses={setAddresses}
                  noDelete
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function AddressList({ title, items, setAddresses, noDelete }) {
  let { isBrowser } = useSSR();
  function handleDelete(id) {
    setAddresses((prev) => {
      return prev.filter((a) => a.id !== id);
    });
  }
  return (
    <div className="mt-8 px-2 md:px-8 md:mt-16">
      <h3 className="text-md font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </h3>
      <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items?.map(({ address, _name, id }) => (
          <li key={address}>
            <button
              type="button"
              className="group p-2 w-full flex items-center justify-between rounded-full border border-gray-300 shadow-sm space-x-3 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="min-w-0 flex-1 flex items-center space-x-3">
                <span className="block flex-shrink-0">
                  {isBrowser && (
                    <Avatar className="h-10 w-10 rounded-full" seed={address} />
                  )}
                </span>
                <span className="block min-w-0 flex-1">
                  <Link href={`/account/${address}`}>
                    <a>
                      <span className="block text-md font-medium text-gray-600 truncate hover:text-gray-800">
                        {getSmallAddress(address)}
                      </span>
                    </a>
                  </Link>
                </span>
              </span>
              {!noDelete && (
                <span className="flex-shrink-0 h-10 w-10 inline-flex items-center justify-center">
                  <TrashIcon
                    className="h-5 w-5 text-gray-400 hover:text-gray-700"
                    aria-hidden="true"
                    onClick={() => handleDelete(id)}
                  />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddNewAddress({ title, setAddresses, addresses }) {
  let [address, setAddress] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    if (isDuplicate(address, addresses)) {
      alert("This address has been added already!");
      setAddress("");
      return;
    }
    if (isAddress(address)) {
      setAddresses((prevAddresses) => {
        return [
          ...prevAddresses,
          {
            address,
            name: "",
            id: uuidv4(),
          },
        ];
      });
      setAddress("");
    } else {
      setAddress("");
      alert("Please enter a valid ETH address!");
    }
  }
  return (
    <div className="max-w-md mx-auto sm:max-w-xl">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 m-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h2 className="mt-2 text-lg font-medium text-gray-900">Address Book</h2>
        <p className="mt-1 text-sm text-gray-500">
          You can add a new address to your watchlist.
        </p>
      </div>
      <form className="mt-6 sm:flex sm:items-center" onSubmit={handleSubmit}>
        <label htmlFor="emails" className="sr-only">
          ETH addresse
        </label>
        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          <input
            type="text"
            name="emails"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            id="emails"
            className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border py-2 border-gray-300 rounded-md pl-3"
            placeholder="Enter an ETH address"
            value={address}
          />
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <button
            type="submit"
            className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add New Address
          </button>
        </div>
      </form>
    </div>
  );
}

export function NoAddress() {
  return (
    <div className="mt-20 max-w-md mx-auto">
      <button
        type="button"
        className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center"
      >
        <DocumentAddIcon className="mx-auto h-12 w-12 text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-700">
          You haven't added an address to your watchlist!
        </span>
      </button>
    </div>
  );
}
