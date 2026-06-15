
let gtm: typeof import("react-gtm-module");
let consentGiven = false;

export const setConsent = (consent: boolean) => {
    consentGiven = consent;
    console.log(`Consent status : ${consentGiven ? "ACCEPTED" : "REJECTED"}`);
}

export const getGTM = async () => {

    if(typeof window === "undefined") return null

    if(!consentGiven) {
        console.log("GTM blocked - consent not given")
        return null
    }

    if(!gtm) {
        gtm = await import("react-gtm-module")
        gtm.initialize({
            gtmId : process.env.NEXT_PUBLIC_GTM_ID
        })

        console.log("GTM initialized");
    }


    return gtm; 
}

export const trackEvent = async (event: string, ecommerce?: object) => {
    
    try {
        // Check consent dulu sebelum tracking
        const gtm = await getGTM()
        if(!gtm) {
            console.log(`Event blocked - no consent: ${event}`)
            return
        }

        gtm.dataLayer({ 
            dataLayer: {
                event, 
                ecommerce: ecommerce || {}
            }
        })

        console.log("Event tracked: ", event)

    } catch (err) {
        console.log("Error tracking event ", err)
    }
}

