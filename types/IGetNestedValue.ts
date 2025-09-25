type IGetNestedValue<T, Path extends string[]> = Path extends [
  infer First,
  ...infer Rest,
]
  ? First extends keyof T
    ? Rest extends string[]
      ? IGetNestedValue<T[First], Rest>
      : T[First]
    : never
  : T;

type INestedKeys<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
    ? {
        [K in keyof T]: K extends string
          ? T[K] extends object
            ? [K] | [K, ...INestedKeys<T[K], IPrev[D]>]
            : [K]
          : never;
      }[keyof T]
    : never;

type IPrev = [never, 0, 1, 2, 3, 4, 5];

type IIsValidPath<T extends object, Tab extends string[]> =
  IGetNestedValue<T, Tab> extends never ? false : true;

function getNestedValue<T extends object, P extends INestedKeys<T>>(
  obj: T,
  path: P
): IGetNestedValue<T, P> {
  const isObject = (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === "object";

  let current: unknown = obj;

  for (let i = 0; i < path.length; i++) {
    const key = path[i];

    if (!isObject(current)) {
      throw new Error(
        `Cannot access property '${key}' on non-object at path index ${i}`
      );
    }

    if (!(key in current)) {
      throw new Error(`Property '${key}' does not exist`);
    }

    current = current[key];
  }

  return current as IGetNestedValue<T, P>;
}

export { getNestedValue };
export type { IGetNestedValue, IIsValidPath };
