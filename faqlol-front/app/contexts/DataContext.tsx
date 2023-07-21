import { createContext, ReactNode, useState } from "react";

interface DataContext {
  [key: string]: any;
}

type Props = {
  children: ReactNode;
};

const DataContext = createContext<DataContext>({} as DataContext);
export default DataContext;

const initialDataState = {
  requiredTextError: false
};

type DataState = typeof initialDataState;

export const DataProvider = ({ children }: Props) => {
  const [dataState, setDataState] = useState<DataState>(initialDataState);

  const updateDataState = (updatedState: Partial<DataState>) => {
    setDataState((prevState) => ({
      ...prevState,
      ...updatedState
    }));
  };

  const value: DataContext = {
    ...dataState,
    setDataState: updateDataState
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
