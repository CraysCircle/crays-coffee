import type {ReactNode} from "react";
import CoffeeDocument from "../../src/CoffeeDocument";

export {metadata} from "../../src/CoffeeDocument";

export default function Layout({children}: Readonly<{children: ReactNode}>) {
  return <CoffeeDocument>{children}</CoffeeDocument>;
}
