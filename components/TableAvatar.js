import { usdcIcon } from "../utils/helper";

function TableAvatar({ icon }) {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      <img
        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
        src={icon}
        alt=""
      />
    </div>
  );
}

export default TableAvatar;
