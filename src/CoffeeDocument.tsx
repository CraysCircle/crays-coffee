import type {Metadata} from "next";
import type {ReactNode} from "react";
import "../app/styles.css";
import "../app/crays-theme.css";
import "../app/account-navigation.css";

export const metadata: Metadata = {
  icons: {icon: "/assets/crays-mark.svg"},
};

/** Original per-page document framing; CSS, assets and interactions stay intact. */
export default function CoffeeDocument({children, bodyClassName}: Readonly<{
  children: ReactNode;
  bodyClassName?: string;
}>) {
  return <html lang="en"><body className={bodyClassName || undefined}>{children}</body></html>;
}
