type ISplitString<
  T extends string,
  Separator extends string,
> = T extends `${infer Before}${Separator}${infer After}`
  ? [Before, ...ISplitString<After, Separator>]
  : [T];

const splitString = <T extends string, Separator extends string>(
  string: T,
  separator: Separator
): ISplitString<T, Separator> => {
  return string.split(separator) as ISplitString<T, Separator>;
};

export { splitString };
export type { ISplitString };
