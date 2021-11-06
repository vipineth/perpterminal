function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TopFilter({ tabs, activeTab, setActiveTab }) {
  return (
    <ul className="inline-flex items-center p-2 space-x-1 bg-gray-300 rounded-md font-semibold space-x-2">
      {Object.keys(tabs).map((t) => (
        <li
          key={t}
          onClick={() => setActiveTab(t)}
          className={classNames(
            "flex px-3 text-sm py-1 leading-6 bg-white border-2 border-transparent hover:border-gray-600 rounded cursor-pointer",
            activeTab === t ? "bg-gray-800 text-white" : ""
          )}
        >
          {tabs[t]}
        </li>
      ))}
    </ul>
  );
}
