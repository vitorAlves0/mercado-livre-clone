import { fetchProducts } from "@/api/api";
import { useSearch } from "@/contexts/SearchContext";
import { DataType } from "@/types/DataType";
import { useEffect } from "react"
import { BsFillCartPlusFill } from 'react-icons/bs';
import { BiLoaderAlt } from 'react-icons/bi';

export const HeroShop = () => {

    const searchCtx = useSearch();

    useEffect(() => {
        searchCtx?.setLoading(true)
        fetchProducts("iphone").then(response => {
            searchCtx?.setProduct(response)
            console.log(searchCtx?.product)
            searchCtx?.setLoading(false)
        })
    }, [])

    const handleAddProduct = (item: DataType) => {
        searchCtx?.setAddProduct([...searchCtx.addProduct, item]);
        console.log(searchCtx?.addProduct)
    }

    return (
        <div className="bg-white p-5">
            <div className="container max-w-5xl mx-auto mt-20">
                {searchCtx?.loading &&
                    <div className="absolute top-[300px] left-[650px] text-6xl">
                        <BiLoaderAlt className="animate-spin" />
                    </div>
                }
                {!searchCtx?.loading &&
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {searchCtx?.product.map(item => (
                            <div key={item.id} className="group relative flex flex-col items-center rounded-md shadow-black/10 shadow-lg hover:scale-105 duration-300">
                                <img src={item.thumbnail?.replace(/\w\.jpg/gi, 'W.jpg')} alt={item.title} className="h-[100px] md:h-[150px] lg:h-[200px] my-5" />
                                <div className="border-t p-4 w-full flex flex-col items-center">
                                    <p className="text-2xl md:text-3xl">R${item.price}</p>
                                    <p className="text-gray-600 text-xs md:text-base text-center">{item.title}</p>
                                </div>
                                <button onClick={() => handleAddProduct(item)} className="absolute bg-gray-100/80 text-[#0c5dd6] h-9 w-9 group-hover:flex items-center justify-center rounded-full top-1 right-5 hidden">
                                    <BsFillCartPlusFill />
                                </button>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}