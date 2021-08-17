import useLocalStorage from "./useLocalStorage";

export default function useAmmToName() {
  let [names] = useLocalStorage("perp-info");

  function getNameFromAddress(addr) {
    if (addr) {
      return names[addr.toLowerCase()].symbol;
    }
  }
  function getAddressFromName(name) {
    return Object.values(names).find(
      (t) => t.symbol.toLowerCase() === name.toLowerCase()
    ).address;
  }

  return { getNameFromAddress, getAddressFromName };
}
