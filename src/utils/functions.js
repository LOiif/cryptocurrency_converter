export function convertPrice(fromInUSD, toInUSD) {
  if (fromInUSD === toInUSD) {
    return 1;
  }
  return parseFloat(fromInUSD).toPrecision(5) / parseFloat(toInUSD).toPrecision(5);
}

export function formatCurrency(num, currencySymbol = null, price = 1) {
  if (num && !isNaN(parseFloat(num))) {

    const value = typeof num === "string"
      ? parseFloat(num.trim()) * price
      : parseFloat(num) * price;

    if (currencySymbol) {
      return (currencySymbol.toUpperCase() === "USD")
        ? separate(roundFiat(value))
        : separate(roundCrypto(value));
    } else {
      return separate(roundFiat(value));
    }
  }
  return "";
}

export function roundFiat(value) {
  if (value > 100000) {
    return value.toFixed(0);
  } else if (value > 1000) {
    return value.toFixed(1);
  }
  return value.toFixed(2);
}

export function roundCrypto(value) {
  if (value > 1000) {
    return value.toFixed(0);
  } else if (value > 100) {
    return value.toFixed(1);
  } else if (value > 1) {
    return value.toFixed(2);
  }
  return value.toPrecision(3);
}

export function separate(value) {
  const beforePoint = value.toString().split(".")[0];
  const afterPoint = value.toString().split(".")[1];

  return (afterPoint)
    ? beforePoint.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + afterPoint
    : beforePoint.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}