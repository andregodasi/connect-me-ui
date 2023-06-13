export function enumToArray(Enum: any): Array<{ key: string; value: string }> {
  return Object.keys(Enum).map((key) => ({
    key,
    value: Enum[key],
  }));
}
