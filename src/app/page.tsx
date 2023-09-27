"use client"

import { Header } from "@/components/Header";
import { HeroShop } from "@/components/HeroShop";
import { SearchProvider } from "@/contexts/SearchContext";

const Page = () => {
  return (
    <SearchProvider>
      <Header />
      <HeroShop />
    </SearchProvider>

  )
}

export default Page;