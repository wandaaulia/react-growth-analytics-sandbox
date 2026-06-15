"use client"

import { setConsent  } from "../lib/gtm"

interface CookieBannerProps {
    onAccept: () => void
}

export default function CookieBanner({onAccept} : CookieBannerProps) {

   const handleAccepted = () => {
        console.log("Consent ACCEPTED")
        localStorage.setItem("consent_given", "true")
        setConsent(true)
        onAccept()
   }


    const handleReject = () => {
        setConsent(false)
        localStorage.setItem("consent_given", "false")
        console.log("Consent REJECTED")
    }

    return (
        <div className="py-4 px-3 flex flex-col bg-white w-fit fixed bottom-10 left-5 text-black p-2 drop-shadow-xl">
            <p> We use cookies to improve your experience and track analytics. </p>
            <div className="flex mt-4"> 
                <button onClick={handleAccepted} className="bg-slate-900 text-white py-2 cursor-pointer px-4 rounded-full "> Accept </button>
                <button onClick={handleReject} className="mr-4 bg-white text-slate-500 cursor-pointer py-2 px-4"> Reject </button>
            </div>
        </div>
    )
}