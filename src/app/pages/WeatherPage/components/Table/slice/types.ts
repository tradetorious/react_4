/* --- STATE --- */
export interface TableState {
  cities: City[];
  isLoading: boolean;
  isError: boolean;
}

export interface City {
  id: string;
  name: string;
}
