export function convertPrice(fromInUSD, toInUSD) {
  if (fromInUSD === toInUSD) {
    return 1;
  }
  return parseFloat(fromInUSD).toPrecision(15) / parseFloat(toInUSD).toPrecision(15);
}

export function formatCurrency(num, currencySymbol, price = 1) {
  if (num && !isNaN(parseFloat(num))) {
    const value = parseFloat(num.trim()) * price;
    return (currencySymbol.toUpperCase() === "USD")
      ? roundFiat(value)
      : roundCrypto(value);
  }
  return "";
}

export function roundFiat(value) {
  if (value > 10000000) {
    return value.toFixed(0);
  } else if (value > 100000) {
    return value.toFixed(1);
  }
  return value.toFixed(2);
}

export function roundCrypto(value) {
  if (value > 10000000) {
    return value.toFixed(0);
  } else if (value > 100000) {
    return value.toFixed(2);
  } else if (value > 1000) {
    return value.toFixed(4);
  } else if (value > 100) {
    return value.toFixed(6);
  }
  return value.toFixed(8);
}