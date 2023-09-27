import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { KeyboardEvent, useState } from 'react';
import { useSearch } from '@/contexts/SearchContext';
import { fetchProducts } from '@/api/api';
import { BsCartDashFill } from 'react-icons/bs';

export const Header = () => {

    const [cart, setCart] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const searchCtx = useSearch();

    const handleSendInfor = async () => {
        if (inputValue !== '') {
            searchCtx?.setLoading(true)
            const products = await fetchProducts(inputValue);
            searchCtx?.setProduct(products);
            setInputValue("");
            searchCtx?.setLoading(false)
        }
    }

    const handleOnkeyUp = (event: KeyboardEvent) => {
        if (event.code === 'Enter' && inputValue !== '') {
            console.log(event.code)
            handleSendInfor();
        }
    }

    const valueFinal = searchCtx?.addProduct.reduce((acc, item) => {
        return acc + item.price
    }, 0)
    const rs = 'R$'

    const handleDeleteProduct = (id: string) => {
        const newProduct = searchCtx?.addProduct.filter(item => item.id !== id)
        if (newProduct) {
            searchCtx?.setAddProduct(newProduct)
        }
    }

    return (
        <div className="fixed w-full bg-[#fff159] p-5 z-10 shadow-black/20 shadow-md">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <div className='max-w-[280px] sm:max-w-md md:max-w-lg w-full flex'>
                    <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleOnkeyUp} type="text" className='outline-none px-4 py-1 w-full rounded-l-md' />
                    <button className='bg-gray-100 px-2 rounded-r-md'>
                        <BsSearch onClick={handleSendInfor} className='text-gray-800' />
                    </button>
                </div>
                <div className='flex items-center'>
                    <button className='ml-5 p-1 relative hover:scale-105 duration-300'>
                        <AiOutlineShoppingCart onClick={() => setCart(!cart)} size={30} className="text-gray-800" />
                        <div className={`${searchCtx?.addProduct.length === 0 ? 'hidden' : 'flex'} absolute h-3 w-3 items-center justify-center p-2 text-white text-xs font-bold bg-red-600 rounded-full top-0`}>{searchCtx?.addProduct.length}</div>
                    </button>
                </div>
            </div>

            <div className={cart ? 'fixed max-w-[410px] w-full h-screen bg-white shadow-black/20 shadow-md top-[78px] right-0  ease-out duration-300 flex flex-col justify-between' : 'fixed max-w-[300px] w-full h-screen bg-white shadow-black/20 shadow-md top-[78px] right-[-300px] ease-out duration-300 flex flex-col justify-between'}>
                <div className='p-4 flex flex-col overflow-y-auto'>
                    {searchCtx?.addProduct.map(item => (
                        <div className='flex mb-5 border-b pb-2 last:border-none'>
                            <img src={item.thumbnail?.replace(/\w\.jpg/gi, 'W.jpg')} alt={item.title} className="h-[70px]" />
                            <div className='flex flex-col relative  pr-10 w-full'>
                                <p className='text-xs'>{item.title}</p>
                                <p className='text-xl'>R${item.price}</p>
                                <button onClick={() => handleDeleteProduct(item.id)} className='absolute top-4 right-0 text-2xl text-red-600'>
                                    <BsCartDashFill />
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
                <div className='pb-[90px] pt-4 text-3xl text-center border-t'>R${valueFinal}</div>
            </div>
        </div>
    )
}