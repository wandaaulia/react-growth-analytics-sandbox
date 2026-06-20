"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../(layoutPage)/layout";
import { FaStar } from "react-icons/fa6";
import { trackEvent } from "../lib/gtm";

export interface ResType {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

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

export default function ListProducts() {
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [searchProduct, setSearchProduct] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const url = "https://dummyjson.com/products?limit=10";

  useEffect(() => {
    const products = async () => {
      setLoading(true);
      try {
        const fetchDataProducts = fetch(url);

        if (!fetchDataProducts) throw new Error("Error");

        const res = await fetchDataProducts;
        const jsonProducts: ResType = await res.json();
        setDataProduct(jsonProducts.products);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    products();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const displayDataProduct = searchTerm === "" ? dataProduct : searchProduct;
  const isNotFound = searchTerm !== "" && searchProduct.length <= 0;

  return (
    <>
      <Layout>
        <div className="py-4 md:px-4">
          <h3 className="text-xl font-semibold text-[#2D3748]">
            {" "}
            Find Your Makeup{" "}
          </h3>
          <div>
            {loading && (
              <div className="w-full flex items-center justify-center mt-10 text-base">
                {" "}
                Loading ...{" "}
              </div>
            )}

            {isNotFound && !loading ? (
              <div className="text-center py-4 text-black mt-10">
                {" "}
                Data tidak ditemukan{" "}
              </div>
            ) : (
              <ul className="md:justify-start md:mx-auto flex flex-row flex-wrap justify-center overflow-hidden mt-4">
                {displayDataProduct
                  .slice(0, visibleCount)
                  .map((item, index) => (
                    <Link key={index} href={`/product/${item.id}`}>
                      <li
                        className="mx-0 w-34 xl:w-36 h-auto pb-3  border justify-center border-gray-200
                 flex flex-col items-center"
                      >
                        {item.id ? (
                          <div className="w-20 h-20 lg:w-26 lg:h-26 rounded-md flex overflow-hidden items-center justify-center">
                            <Image
                              className="object-contain max-h-12.5 lg:max-h-16 max-w-20"
                              src={item.images[0]}
                              alt={`img-${item.title}`}
                              width={150}
                              height={150}
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-gray-300 rounded-md flex items-center justify-center">
                            <span className="text-[10px] text-gray-500">
                              No Image
                            </span>
                          </div>
                        )}

                        <div className="w-25 h-auto mx-auto flex-wrap flex items-center m-0 px-0 pt-2">
                          <p className="text-xs lg:text-sm m-0 p-0 w-full truncate">
                            {item.title}
                          </p>
                          <h3 className="text-sm lg:text-base m-0 p-0 w-full truncate font-semibold">
                            ${item.price}
                          </h3>
                          <div className="flex flex-row items-center m-0 p-0 text-xs lg:text-sm text-gray-500">
                            <FaStar className="m-0 p-0 text-yellow-400 mr-1 w-3 h-3" />
                              {item.rating}

                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
              </ul>
            )}

            {visibleCount < displayDataProduct.length && (
              <div>
                <button
                  onClick={showMore}
                  className="text-lg cursor-pointer mt-4 bg-[#E9B44C] rounded-xl text-white font-bold px-6 py-3 w-full"
                >
                   Show More 
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
