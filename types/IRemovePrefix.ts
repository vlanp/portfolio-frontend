type IRemovePrefix<
  T extends string,
  Prefix extends string,
> = T extends `${Prefix}${infer Rest}` ? Rest : T;

type IRemovePrefixOrThrow<
  T extends string,
  Prefix extends string,
> = T extends `${Prefix}${infer Rest}` ? Rest : never;

function removePrefix<T extends string, Prefix extends string>(
  string: T,
  prefix: Prefix
): IRemovePrefix<T, Prefix> {
  return string.replace(prefix, "") as IRemovePrefix<T, Prefix>;
}

function removePrefixOrThrow<T extends string, Prefix extends string>(
  string: T,
  prefix: Prefix
): IRemovePrefixOrThrow<T, Prefix> {
  if (!string.startsWith(prefix)) {
    throw new Error(
      'The string "' +
        string +
        '" does not start with the prefix "' +
        prefix +
        '"'
    );
  }
  return string.replace(prefix, "") as IRemovePrefixOrThrow<T, Prefix>;
}

export { removePrefix, removePrefixOrThrow };
export type { IRemovePrefix, IRemovePrefixOrThrow };
