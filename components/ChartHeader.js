import useAmms from "../hooks/useAmms";

export default function ChartHeader({ setRange, OPTIONS, range }) {
  useAmms();
  let labels = Object.keys(OPTIONS);
  return (
    <div className="block sm:flex sm:justify-between text-center space-y-2 sm:space-y-0">
      <h3 className="text-lg font-semibold">24H Trading Volume</h3>
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        {labels.map((label) => (
          <button
            key={label}
            type="button"
            className={`relative inline-flex items-center px-2 py-1 rounded-md border border-gray-400 bg-white text-xs mr-2 font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 ${
              OPTIONS[label] === range ? "bg-green-800 text-white" : ""
            }`}
            onClick={() => setRange(OPTIONS[label])}
          >
            {label}
          </button>
        ))}
      </span>
    </div>
  );
}
