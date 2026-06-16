"use client";

import { PropsWithChildren, useEffect, useEffectEvent, useState } from "react";
import { setConsent } from "../lib/gtm";
import CookieBanner from "./CookingBanner";
import { trackEvent } from "../lib/gtm";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function Page({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const [hasConsent, setHasConsent] = useState(false);

  const updateStateConsent = useEffectEvent(() => {
    const stored = localStorage.getItem("consent_given");
    setHasConsent(stored === "true");
  });

  useEffect(() => {
    console.log("Checking consent status...");
    updateStateConsent();
  }, []);

  // Track page_view saat pathname berubah
  useEffect(() => {
    trackEvent("page_view");
  }, [pathname]);

  useEffect(() => {
    setConsent(hasConsent);
    console.log("test-consent");
  }, [hasConsent]);

  const handleAccept = () => {
    localStorage.setItem("consent_given", "true");
    setHasConsent(true);
  };

  return (
    <div className="min-h-full flex flex-col">
      {children}
      {!hasConsent && <CookieBanner onAccept={handleAccept} />}
      <Toaster />
    </div>
  );
}
