import { useEffect, useState } from "react";

function useIsIosWebview() {
  const [isIosWebview, setIsIosWebview] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const isiOS = /iPhone|iPad|iPod/.test(ua) ||
                  // iPadOS on iPadOS 13+ identifies itself as Mac, so check for touch support
                  (ua.includes("Mac") && "ontouchend" in document);
    // In many cases, a native iOS WebView will not include "Safari" in its UA string.
    // Be aware that this check isn’t perfect as user agent strings can change.
    const inWebview = isiOS && !ua.includes("Safari");

    setIsIosWebview(inWebview);
  }, []);

  return isIosWebview;
}

export default useIsIosWebview;