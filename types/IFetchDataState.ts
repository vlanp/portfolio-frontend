type IFetchDataState<T> = FetchDataSuccess<T> | IFetchDataError;

class FetchDataSuccess<T> {
  status = "fetchDataSuccess" as const;
  data: T;
  constructor(data: T) {
    this.data = data;
  }
}

interface IFetchDataError {
  status: "fetchDataError";
}
const fetchDataError: IFetchDataError = {
  status: "fetchDataError",
};

export type { IFetchDataError, IFetchDataState };
export { FetchDataSuccess, fetchDataError };
