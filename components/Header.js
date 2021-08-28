import { Fragment } from "react";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon, SelectorIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import NavLink from "./NavLink";
import { getSmallAddress } from "../utils/helper";
import { useModal } from "./ModalContext";
import { useWallet } from "./WalletContext";
import { useUserAddress } from "./AddressContext";
import useSSR from "use-ssr";
import Avatar from "./common/Avatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { label: "Dashboard", pathname: "/" },
  { label: "Account", pathname: "/account" },
];

function getClassName(isSmall, noPadding) {
  if (isSmall) {
    return "pb-16";
  }
  if (noPadding) {
    return "pb-0";
  }
  if (!isSmall && !noPadding) {
    return "pb-32";
  }
}

function Header({ title, isSmall, noPadding, isInvalid }) {
  let { address, setAddress } = useUserAddress();
  let { isBrowser } = useSSR();

  let { isOpen, closeModal, openModal } = useModal();
  let wallet = useWallet();

  function getTitle() {
    if (isInvalid) return "";
    if (title && address && title.includes("Account"))
      return (
        <>
          {title}{" "}
          <span className="text-base text-gradient-to-r from-red-500">
            of {getSmallAddress(address)}
          </span>
        </>
      );
    if (title) return title;
  }

  return (
    <div className={`bg-gray-800 ${getClassName(isSmall, noPadding)}`}>
      <Disclosure
        as="nav"
        className="bg-gray-800 border-b border-gray-300 border-opacity-25 lg:border-none"
      >
        {(props) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-white lg:border-opacity-25">
                <div className="px-2 flex items-center lg:px-0">
                  <div className="flex-shrink-0 cursor-pointer">
                    <Link href="/">
                      <a>
                        <img
                          className="block h-12 w-12"
                          src="/logo.svg"
                          alt="Workflow"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="hidden lg:block lg:ml-10">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink key={item.pathname} href={item.pathname}>
                          <a className="rounded-md py-2 px-3 text-sm font-medium text-white">
                            {item.label}
                          </a>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-green-600 p-2 rounded-md inline-flex items-center justify-center text-green-200 hover:text-white hover:bg-green-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {props.open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {wallet?.web3Provider ? (
                  <LoggedInUser
                    address={wallet?.address}
                    disconnect={wallet?.disconnect}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={wallet?.connect}
                    className="hidden sm:inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Connect to a wallet
                  </button>
                )}
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <NavLink key={item.pathname} href={item.pathname}>
                    <a className="bg-gray-900 border-white text-white block rounded-md py-2 px-3 text-base font-medium">
                      {item.label}
                    </a>
                  </NavLink>
                ))}
                <button
                  type="button"
                  onClick={wallet?.connect}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
                >
                  <span>Connect to a wallet</span>
                </button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {
        <header className="py-8 sm:py-10">
          <div className="max-w-7xl mx-auto flex px-4 sm:px-6 lg:px-8 items-center">
            <h1 className="text-3xl font-bold text-white hidden md:block">
              {getTitle()}
            </h1>
            <SearchInput address={address} setAddress={setAddress} />
          </div>
        </header>
      }
    </div>
  );
}

function SearchInput({ address, setAddress }) {
  let router = useRouter();
  return (
    <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
      <div className="max-w-lg w-full lg:max-w-m">
        <label htmlFor="search" className="sr-only">
          Search by Address
        </label>
        <div className="relative text-gray-400 focus-within:text-gray-600">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5" aria-hidden="true" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/account/${address}`);
            }}
          >
            <input
              id="search"
              className="block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white focus:border-white sm:text-sm"
              placeholder="Search by Address"
              type="search"
              name="search"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            />
            <div className="absolute inset-y-0 right-0 pr-1 flex items-center cursor-pointer">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <SearchIcon className="block h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoggedInUser({ address, disconnect }) {
  let { isBrowser } = useSSR();
  return (
    <div>
      <Menu as="div" className="px-3 relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="group w-full bg-white rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500">
                <span className="flex w-full justify-between items-center">
                  <span className="flex min-w-0 items-center justify-between space-x-3">
                    {isBrowser && (
                      <Avatar
                        className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0"
                        seed={address}
                      />
                    )}
                    <span className="flex-1 flex flex-col min-w-0">
                      <span className="text-gray-900 text-xs font-medium">
                        {getSmallAddress(address)}
                      </span>
                    </span>
                  </span>
                  <SelectorIcon
                    className="ml-2 flex-shrink-0 h-5 w-5 text-gray-900 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={disconnect}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
export default Header;
