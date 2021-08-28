export const DAILY_VOLUME_OPTIONS = {
  "7D": 7,
  "30D": 30,
  "90D": 90,
  "180D": 180,
  Max: 1000,
};
export const USER_PNL_OPTIONS = {
  50: 50,
  100: 100,
  250: 250,
  500: 500,
  Max: 1000,
};

export const walletsConfig = [
  {
    name: "MetaMask",
    icon: "/images/metamask.svg",
    connecter: "injected",
  },
  {
    name: "WalletConnect",
    icon: "/images/walletconnect.svg",
    connecter: "walletconnect",
  },
  {
    name: "Fortmatic",
    icon: "/images/fortmatic.svg",
    connecter: "fortmatic",
  },
];
