import * as React from "react";

/**
 * True for coarse-pointer devices (touch). Magnetic buttons and mouse
 * parallax are desktop-only effects and should read this before mounting.
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    const onChange = () => setIsTouch(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTouch;
}
