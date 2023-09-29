import { fetchProducts } from "@/api/api";
import { useSearch } from "@/contexts/SearchContext";
import { DataType } from "@/types/DataType";
import { useEffect } from "react"
import { BsFillCartPlusFill } from 'react-icons/bs';
import { BiLoaderAlt } from 'react-icons/bi';
import { v4 as uuidv4 } from "uuid"

export const HeroShop = () => {

    const searchCtx = useSearch();

    useEffect(() => {
        searchCtx?.setLoading(true)
        fetchProducts("iphone").then(response => {
            searchCtx?.setProduct(response)
            searchCtx?.setLoading(false)
        })
    }, [])

    const handleAddProduct = (item: DataType) => {
        if (searchCtx?.addProduct) {
            const copyProduct = [...searchCtx.addProduct]
            const findValue = copyProduct.find(data => data.id === item.id)
            if (findValue === undefined) {
                copyProduct.push({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail, productId: uuidv4(), quantity: 1 })
            } else {
                findValue.quantity = findValue.quantity + 1;
            }
            searchCtx?.setAddProduct(copyProduct)
        }
    }

    return (
        <div className="bg-white p-5">
            <div className="container max-w-5xl mx-auto mt-20">
                {searchCtx?.loading &&
                    <div className="h-screen text-6xl flex items-center justify-center mt-[-120px]">
                        <BiLoaderAlt className="animate-spin" />
                    </div>
                }
                {!searchCtx?.loading &&
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {searchCtx?.product.map(item => (
                            <div key={item.productId} className="group relative flex flex-col items-center rounded-md shadow-black/10 shadow-lg hover:scale-105 duration-300">
                                <img src={item.thumbnail?.replace(/\w\.jpg/gi, 'W.jpg')} alt={item.title} className="h-[100px] md:h-[150px] lg:h-[200px] my-5" />
                                <div className="border-t p-4 w-full flex flex-col items-center ">
                                    <p className="text-2xl md:text-3xl">R${item.price}</p>
                                    <p className="text-gray-600 text-xs md:text-base text-center line-clamp-3 break-words">{item.title}</p>
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















// const handleAddProduct = (item: DataType) => {
//     const copyProduct = [...searchCtx.addProduct]
//     if (searchCtx?.addProduct.find(data => data.id === item.id) === undefined) {
//         searchCtx?.setAddProduct([...searchCtx.addProduct, { id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail, productId: uuidv4(), quantity: 1 }]);
//     } else {
//         item.quantity = item.quantity + 1;
//         console.log(item.quantity)
//     }


// }