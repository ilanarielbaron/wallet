export const parseAddress = (address: string) => {
  const firstPart = address.substr(0, 5);
  const lastPart = address.substr(address.length - 4, 4);

  return `${firstPart}...${lastPart}`;
};
