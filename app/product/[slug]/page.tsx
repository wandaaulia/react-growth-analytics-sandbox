"use client"

import ProductDetail from "@/app/components/ProductDetail";
import { useParams } from "next/navigation";

type ProductType = {
   params : {
    slug?: string;
   }
}


export default function ProductPage() {

   const params : ProductType['params'] = useParams()
   
  return (
    <div>
        <ProductDetail slug={params.slug} /> 
    </div>
  )
}