import { FaStar } from "react-icons/fa6";

type ProductInfoHeaderType = {
  price?: number;
  title?: string;
  rating?: number;
};

export default function ProductInfoHeader(props: ProductInfoHeaderType) {
  return (
    <>
      <div className="flex flex-col pt-8 pb-1 lg:hidden">
        <h3 className="text-2xl font-bold mb-2"> ${props.price} </h3>
        <p className="text-lg break-word mb-2"> {props.title} </p>
        <div>
          <div className="flex flex-row items-center py-2 px-3 bg-[#1B3B2B] rounded-full w-fit">
            <FaStar className="m-0 p-0 text-yellow-400 mr-1 w-4 h-4" />
            <span className="m-0 p-0 text-base lg:text-sm font-semibold text-white">
              {props.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col px-5 pt-8 pb-4">
        <p className="text-xl break-word font-bold"> {props.title} </p>
        <div className="flex flex-row items-center  mt-3">
          <FaStar className="m-0 p-0 text-yellow-400 mr-1 w-4 h-4" />
          <span className="m-0 p-0 text-base lg:text-sm font-semibold">
            {props.rating}
          </span>
        </div>
        <h3 className="text-3xl font-bold mt-3"> ${props.price} </h3>
      </div>
    </>
  );
}
