function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabsInfo, activeTabIndex, setActiveTabIndex }) {
  return (
    <div>
      <div className="sm:hidden border">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-green-800 focus:border-green-800 border-gray-300 rounded-md"
          defaultValue={tabsInfo[activeTabIndex].name}
        >
          {tabsInfo.map((tab) => (
            <option key={tab.label}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabsInfo.map((tab, index) => (
            <p
              key={tab.label}
              onClick={() => setActiveTabIndex(index)}
              href={tab.href}
              className={classNames(
                activeTabIndex === index
                  ? "bg-green-600 text-white"
                  : "text-gray-100 hover:bg-green-50 hover:text-gray-700",
                "px-3 py-2 font-medium text-sm rounded-md cursor-pointer"
              )}
            >
              {tab.name}
            </p>
          ))}
        </nav>
      </div>
    </div>
  );
}
