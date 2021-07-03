import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

const navigation = [
  { label: "Dashboard", link: "/" },
  { label: "User Account", link: "/user" },
];

function Header({ title, isSmall }) {
  let router = useRouter();

  let [address, setAddress] = useState("");
  useEffect(() => {
    setAddress(router.query.address);
  }, []);
  return (
    <div className={`bg-gray-800 ${isSmall ? "pb-16" : "pb-32"}`}>
      <Disclosure
        as="nav"
        className="bg-gray-800 border-b border-gray-300 border-opacity-25 lg:border-none"
        router={router}
        address={address}
        setAddress={setAddress}
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
                      {navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item.link}>
                            {/* Current: "bg-green-700 text-white", Default: "text-white hover:bg-green-500 hover:bg-opacity-75" */}
                            <a
                              href="#"
                              className="bg-green-700 text-white rounded-md py-2 px-3 text-sm font-medium"
                            >
                              {item.label}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item.link}
                            href={item.link}
                            className="text-white hover:bg-green-500 hover:bg-opacity-75 rounded-md py-2 px-3 text-sm font-medium"
                          >
                            {item.label}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>
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
                          router.push(`/user/${address}`);
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
                      </form>
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
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <Fragment key={item}>
                      {/* Current: "bg-green-700 text-white", Default: "text-white hover:bg-green-500 hover:bg-opacity-75" */}
                      <a
                        href="#"
                        className="bg-green-700 text-white block rounded-md py-2 px-3 text-base font-medium"
                      >
                        {item}
                      </a>
                    </Fragment>
                  ) : (
                    <a
                      key={item}
                      href="#"
                      className="text-white hover:bg-green-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">
            {title || "Dashboard"}
          </h1>
        </div>
      </header>
    </div>
  );
}

export default Header;
