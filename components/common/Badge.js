function Badge(props) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded font-medium bg-gray-800 text-white mb-4 uppercase text-xs">
      <svg
        className="-ml-1 mr-1.5 h-2 w-2 text-white"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {props.label}
    </span>
  );
}
export default Badge;
