export function withOutFalsy(value, key) {
    return !(value === undefined || value === "" || value === null);
  }