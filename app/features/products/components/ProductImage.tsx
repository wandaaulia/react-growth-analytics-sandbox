import Image from "next/image";

type ProductImageType = {
  id: number;
  images: string;
  title: string;
};

export default function ProductImage({ id, images, title }: ProductImageType) {
  return (
    <>
      <div className="flex lg:hidden items-center justify-center">
        {id ? (
          <div className="bg-red-50 w-full max-w-50 aspect-square rounded-md flex overflow-hidden items-center justify-center">
            <Image
              className="object-contain w-full h-full p-4"
              src={images}
              alt={`img-${title}`}
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
      <div className="hidden lg:flex w-50 mr-10 py-5 my-0 px-0 items-center justify-center">
        {id ? (
          <div className=" w-full aspect-square h-full rounded-md flex overflow-hidden items-center justify-center">
            <Image
              className="object-contain xl:max-w-30"
              src={images}
              alt={`img-${title}`}
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
    </>
  );
}
