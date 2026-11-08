"use client";

import Script from "next/script";
import {useEffect, useState} from "react";

/** Preserve the existing dependency order while loading scripts after hydration. */
export function CoffeeInteractions({home}: Readonly<{home: boolean}>) {
  const [siteReady, setSiteReady] = useState(false);
  return <>
    <Script src="/site.js" strategy="afterInteractive" onReady={() => setSiteReady(true)} />
    {siteReady && home ? <Script src="/script.js" strategy="afterInteractive" /> : null}
  </>;
}

/** Preserves the existing locations alias's HTTP200 followed by client navigation. */
export function CoffeeClientRedirect({target}: Readonly<{target: string}>) {
  useEffect(() => {window.location.replace(target);}, [target]);
  return null;
}
