


type ProductInfoType = {
    category : string; 
    description : string; 
}

export default function ProductInfo(props: ProductInfoType) {

    return (
        <div> 
          <div className="px-5 mt-4 bg-white flex lg:hidden flex-col py-5">
            <h3 className="text-lg font-bold pb-2"> Detail Product</h3>
            <div className="flex flex-row items-center justify-between">
              <p className="text-gray-500 font-medium shrink-0"> Kategori </p>
              <p className=""> {props.category} </p>
            </div>
            <div className="w-full h-0.5 mt-2 bg-gray-100" />
            <h4 className="text-base font-bold pb-2 mt-4"> Deskripsi </h4>
            <p className="text-base wrap-breaks-words ">{props.description}</p>
          </div>

            <div className="w-full px-5 mt-3 bg-white hidden lg:flex flex-col pb-5 ">
              <h3 className="w-35 p-0 text-center text-base font-bold text-[#1B3B2B]"> Detail Product</h3>
             <div className="w-35 p-0 h-0.5 bg-[#1B3B2B] mb-5 mt-3" />

              <div className="flex flex-row items-center justify-between w-[70%]">
                <p className="text-gray-600 font-medium text-sm"> Kategori: <span className="text-black text-base"> {props.category} </span></p>
              </div>
              <p className="mt-4">{props.description}</p>
            </div>
            
        </div> 
    )

}