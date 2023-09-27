
import { DataType } from "@/types/DataType";
import { createContext, ReactNode, useContext, useState } from "react";

type Props = {
    product: DataType[];
    setProduct: (data: DataType[]) => void;
    addProduct: DataType[];
    setAddProduct: (data: DataType[]) => void;
    loading: boolean;
    setLoading: (item: boolean) => void;
}

const SearchContext = createContext<Props | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {

    const [product, setProduct] = useState<DataType[]>([])
    const [addProduct, setAddProduct] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);

    return (
        <SearchContext.Provider value={{ product, setProduct, addProduct, setAddProduct, loading, setLoading }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext);