


interface ProductActionCardProps {
    price? : number;
    handleAddToCart : () => void;
}

export default function ProductActionCard(props : ProductActionCardProps) {

    return (
        <>
        <div
          style={{ boxShadow: "0 -5px 6px -6px rgba(0, 0, 0, 0.3)" }}
          className="lg:hidden md:w-[60%] md:mx-auto bg-white py-8 px-4 m-0 h-12 flex flex-row items-center justify-between fixed bottom-0 left-0 right-0"
        >
          <button className="rounded-lg w-[48%] h-10 border border-[#1B3B2B] mr-2">
            <span className="text-[#1B3B2B] font-semibold text-base">
              Buy Now
            </span>
          </button>
          <button onClick={props.handleAddToCart} className="rounded-lg w-[48%] h-10 bg-[#143424]">
            <span className="text-white font-semibold text-base">
              Add to Cart
            </span>
          </button>
        </div>

        <div className="hidden lg:flex flex-col w-[250px] mx-auto mt-8 px-4 border border-gray-200 h-fit p-5 rounded-lg"> 
             <p> Jumlah </p>
              <div className="flex flex-row items-center mt-2">
                <button className="w-8 h-8 rounded-lg border border-gray-300"> - </button>
                <span className="mx-4"> 1 </span>
                <button className="w-8 h-8 rounded-lg border border-gray-300"> + </button>
              </div>
              <div className="w-full h-[0.2px] bg-gray-200 mt-3" />
              <div className="flex flex-row items-center justify-between mt-3">
                <p> Subtotal </p>
                <h4 className="text-lg font-bold"> ${props.price} </h4>
              </div> 
              <button onClick={props.handleAddToCart}  className="mt-5 w-full bg-[#143424] text-sm text-white py-2 px-3 rounded-lg"> Add To Cart </button>
              <button className="mt-2 w-full border border-[#1B3B2B] text-[#1B3B2B] text-sm py-2 px-3 rounded-lg"> Buy Now </button>

          </div>
        </>
    )
}