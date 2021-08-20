export default function MobileCard() {
  return (
    <div className="ring-1 ring-offset-2 ring-indigo-500 relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none">
      <div className="flex items-center">
        <div className="text-sm">
          <p className="font-medium text-gray-900">{plan.name}</p>
          <div className="text-gray-500">
            <p className="sm:inline">
              {plan.ram} / {plan.cpus}
            </p>{" "}
            <span className="hidden sm:inline sm:mx-1" aria-hidden="true">
              &middot;
            </span>{" "}
            <p className="sm:inline">{plan.disk}</p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right">
        <div className="font-medium text-gray-900">{plan.price}</div>
        <div className="ml-1 text-gray-500 sm:ml-0">/mo</div>
      </div>
      <div
        className="border-indigo-500 absolute -inset-px rounded-lg border-2 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
