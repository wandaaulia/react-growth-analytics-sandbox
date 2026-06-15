import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";


type BreadcrumbsType = {
    title: string
}

export default function Breadcrumbs(props : BreadcrumbsType) {
  return (
    <>
      {/* Mobile breadcrumbs */}
      <div className="flex flex-row items-center p-4 lg:hidden">
        <Link href="/">
          <FaArrowLeftLong />{" "}
        </Link>
        <span className="ml-3 truncate w-[70%]"> {props.title} </span>
      </div>

      {/* Desktop breadcrumbs */}
      <div className="flex-row items-center p-4 mt-15 lg:flex hidden">
        <Link href="/" className="flex flex-row items-center">
          <span className="mr-1 text-[#1B3B2B]"> Home </span>
          <span className="text-xl text-gray-500">
            <MdKeyboardArrowRight />
          </span>
        </Link>
        <span className="ml-1 truncate w-[70%] text-[#1B3B2B]">
          {props.title}
        </span>
      </div>
    </>
  );
}
