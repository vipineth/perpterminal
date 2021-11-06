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
export const PERP_STAKING = {
  "30D": 30,
  "50D": 50,
  "100D": 100,
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

export const PERP_PRICE_URL = `https://api.coingecko.com/api/v3/simple/price?ids=perpetual-protocol&vs_currencies=usd`;

export const filterAddress = ["0x1a48776f436bcdaa16845a378666cf4ba131eb0f"];
