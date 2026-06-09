"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "@/app/(layoutPage)/layout";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

export interface ProductType {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: Meta
  images: string[]
  thumbnail: string
}

export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}
export default function Product() {
  const params = useParams();

  const [product, setProduct] = useState<ProductType>();
  const [loading, setLoading] = useState(false);

  const url = "https://dummyjson.com/products/";

  const data = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 3.9,
      count: 120,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}${params.slug}`);
        if (!res) throw new Error();
        const resJson = await res.json();
        console.log("Res ", resJson);
        setProduct(resJson);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.slug]);

  if (loading) return <p> Loading </p>;

  if (!loading && product) {
    return (
      <div className="flex flex-col md:w-[60%] lg:w-[80%] mx-auto">
        <div className="flex flex-row items-center p-4 lg:hidden">
          <Link href="/">
            {" "}
            <FaArrowLeftLong />{" "}
          </Link>
          <span className="ml-3 truncate w-[70%]"> {product.title} </span>
        </div>

          <div className="flex-row items-center p-4 mt-15 lg:flex hidden">
          <Link href="/" className="flex flex-row items-center">
             <span className="mr-1 text-green-600"> Home </span> 
             <span className="text-xl text-gray-500"> <MdKeyboardArrowRight /> </span>
          </Link>
          <span className="ml-1 truncate w-[70%]"> {product.title} </span>
        </div>

        <div className="flex flex-col bg-[#F8F8F8] w-full lg:hidden pb-24">
          <div className="px-5 pt-5 pb-4 bg-white">
            <div className="flex items-center justify-center">
              {product.id ? (
                <div className="bg-red-50 w-full max-w-[200px] aspect-square rounded-md flex overflow-hidden items-center justify-center">
                  <Image
                    className="object-contain w-full h-full p-4"
                    src={product.images[0]}
                    alt={`img-${product.title}`}
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-md flex items-center justify-center">
                  <span className="text-[10px] text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="flex flex-col pt-8 pb-1">
              <h3 className="text-2xl font-bold mb-2"> ${product.price} </h3>
              <p className="text-lg break-word mb-2"> {product.title} </p>
              <div>
                <div className="flex flex-row items-center py-2 px-3 bg-green-700 rounded-full w-fit">
                  <FaStar className="m-0 p-0 text-yellow-400 mr-1 w-4 h-4" />

                  <span className="m-0 p-0 text-base lg:text-sm font-semibold text-white">
                    {product.rating}
                  </span>
                  {/* <span className="ml-1 my-0 p-0 text-base lg:text-sm text-gray-200">
                    ({product.rating})
                  </span> */}
                </div>
              </div>
            </div>
          </div> 
          <div className="px-5 mt-4 bg-white flex flex-col py-5">
            <h3 className="text-lg font-bold pb-2"> Detail Product</h3>
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-500 font-medium shrink-0"> Kategori </p>
              <p className=""> {product.category} </p>
            </div>
            <div className="w-full h-0.5 mt-2 bg-gray-100" />
            <h4 className="text-base font-bold pb-2 mt-4"> Deskripsi </h4>
            <p className="text-base wrap-breaks-words ">{product.description}</p>
          </div>
        </div>

        <div className="mx-auto w-[80%] max-w-[1000px] hidden lg:flex lg:flex-row justify-start">
          <div className="w-[200px] mr-10 py-5 my-0 px-0 flex items-center justify-center">
            {product.id ? (
              <div className=" w-full aspect-square h-full rounded-md flex overflow-hidden items-center justify-center">
                <Image
                  className="object-contain xl:max-w-30"
                  src={product.images[0]}
                  alt={`img-${product.title}`}
                  width={300}
                  height={300}
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-[10px] text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="w-[350px] p-0 mr-10">
            <div className="flex flex-col px-5 pt-8 pb-4">
              <p className="text-xl break-word font-bold"> {product.title} </p>
              <div className="flex flex-row items-center  mt-3">
                <FaStar className="m-0 p-0 text-yellow-400 mr-1 w-4 h-4" />

                <span className="m-0 p-0 text-base lg:text-sm font-semibold">
                  {product.rating}
                </span>
                {/* <span className="ml-1 my-0 p-0 text-base lg:text-sm text-gray-500 font-medium">
                  ({product.rating})
                </span> */}
              </div>
              <h3 className="text-3xl font-bold mt-3"> ${product.price} </h3>
            </div>
            <div className="mx-5 w-full h-0.5 mt-1 bg-gray-100" />

            <div className="w-full px-5 mt-3 bg-white flex flex-col pb-5 ">
              <h3 className="w-35 p-0 text-center text-base font-bold text-green-600"> Detail Product</h3>
             <div className="w-35 p-0 h-0.5 bg-green-600 mb-5 mt-3" />

              <div className="flex flex-row items-center justify-between w-[70%]">
                <p className="text-gray-600 font-medium text-sm"> Kategori: <span className="text-black text-base"> {product.category} </span></p>
              </div>
              <p className="mt-4">{product.description}</p>

            </div>
          </div>
          <div className="w-[250px] mx-auto mt-8 px-4 flex flex-col border border-gray-200 h-fit p-5 rounded-lg"> 
             <p> Jumlah </p>
              <div className="flex flex-row items-center mt-2">
                <button className="w-8 h-8 rounded-lg border border-gray-300"> - </button>
                <span className="mx-4"> 1 </span>
                <button className="w-8 h-8 rounded-lg border border-gray-300"> + </button>
              </div>
              <div className="w-full h-[0.2px] bg-gray-200 mt-3" />
              <div className="flex flex-row items-center justify-between mt-3">
                <p> Subtotal </p>
                <h4 className="text-lg font-bold"> ${product.price} </h4>
              </div> 
              <button className="mt-5 w-full bg-green-600 text-sm text-white py-2 px-3 rounded-lg"> Add To Cart </button>
              <button className="mt-2 w-full border border-green-600 text-sm text-green-600 py-2 px-3 rounded-lg"> Beli Sekarang </button>

          </div>
        </div>

        <div
          style={{ boxShadow: "0 -5px 6px -6px rgba(0, 0, 0, 0.3)" }}
          className="lg:hidden md:w-[60%] md:mx-auto bg-white py-4 px-4 m-0 h-12 flex flex-row items-center justify-between fixed bottom-0 left-0 right-0"
        >
          <button className="rounded-lg w-[48%] h-10 border border-green-600 mr-2">
            <span className="text-green-600 font-semibold text-base">
              Buy Now
            </span>
          </button>
          <button className="rounded-lg w-[48%] h-10 bg-green-600">
            <span className="text-white font-semibold text-base">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    );
  }

  if (!loading && !product) {
    return <p> Data tidak ditemukan </p>;
  }
}
