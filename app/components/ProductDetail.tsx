"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "../lib/gtm";
import Breadcrumbs from "./Breadcrumbs";
import ProductInfo from "../features/products/components/ProductInfo";
import ProductActionCard from "../features/products/components/ProductActionCard";
import ProductInfoHeader from "../features/products/components/ProductInfoHeader";
import ProductImage from "../features/products/components/ProductImage";
import { toast } from "sonner"

export interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface ProductDetailProps {
  slug?: string;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);
  
  const url = "https://dummyjson.com/products/";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}${slug}`);
        if (!res) throw new Error();
        const resProduct = await res.json();
        setProduct(resProduct);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    trackEvent("view_item");
  }, []);

  const handleAddToCart = () => {
    trackEvent("add_to_Cart", {
      value: product?.price,
      currency: "USD",
      items: [
        {
          item_id: product?.id,
          item_name: product?.title,
          price: product?.price,
        },
      ],
    });
    toast.success("Added to Cart", { position: "top-center"})
  };

  if (!slug) {
    return <p> Product no found</p>;
  }

  if (loading) return <p> Loading </p>;

  if (!loading && product) {
    return (
      <div className="flex flex-col md:w-[60%] lg:w-[80%] mx-auto">
        <Breadcrumbs title={product.title} />

        {/* Mobile Content */}
        <div className="flex flex-col bg-[#F8F8F8] w-full lg:hidden">
          <div className="px-5 pt-5 pb-4 bg-white">
            <ProductImage
              id={product.id}
              images={product.images[0]}
              title={product.title}
            />
            <ProductInfoHeader
              price={product.price}
              title={product.title}
              rating={product.rating}
            />
          </div>
          <ProductInfo
            category={product.category}
            description={product.description}
          />
        </div>

        {/* Desktop Content */}
        <div className="mx-auto w-[80%] max-w-250 hidden lg:flex lg:flex-row justify-start">
          <ProductImage
            id={product.id}
            images={product.images[0]}
            title={product.title}
          />
          <div className="w-87.5 p-0 mr-10">
            <ProductInfoHeader
              price={product.price}
              title={product.title}
              rating={product.rating}
            />
            <div className="mx-5 w-full h-0.5 mt-1 bg-gray-100" />
            <ProductInfo
              category={product.category}
              description={product.description}
            />
          </div>
          <ProductActionCard
            price={product.price}
            handleAddToCart={handleAddToCart}
          />
        </div>

        <div className="lg:hidden">
          <ProductActionCard handleAddToCart={handleAddToCart} />
        </div>
      </div>
    );
  }

  if (!loading && !product) {
    return <p> Data tidak ditemukan </p>;
  }
}
