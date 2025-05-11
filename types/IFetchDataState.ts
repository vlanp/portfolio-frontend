type IFetchDataState<T> =
  | FetchDataSuccess<T>
  | IFetchDataError
  | IFetchDataLoading
  | IFetchDataIdle;

class FetchDataSuccess<T> {
  status = "fetchDataSuccess" as const;
  data: T;
  constructor(data: T) {
    this.data = data;
  }
}

interface IFetchDataLoading {
  status: "fetchDataLoading";
}

const fetchDataLoading: IFetchDataLoading = {
  status: "fetchDataLoading",
};

interface IFetchDataIdle {
  status: "fetchDataIdle";
}
const fetchDataIdle: IFetchDataIdle = {
  status: "fetchDataIdle",
};

interface IFetchDataError {
  status: "fetchDataError";
}
const fetchDataError: IFetchDataError = {
  status: "fetchDataError",
};

export type { IFetchDataError, IFetchDataState };
export { FetchDataSuccess, fetchDataError, fetchDataLoading, fetchDataIdle };
