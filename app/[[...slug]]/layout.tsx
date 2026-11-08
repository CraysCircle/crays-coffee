import type {ReactNode} from "react";
import {notFound} from "next/navigation";
import CoffeeDocument from "../../src/CoffeeDocument";
import documentData from "../../src/document.generated.json";

export {metadata} from "../../src/CoffeeDocument";

const documents: Record<string, string> = documentData;

export default async function Layout({children, params}: Readonly<{
  children: ReactNode;
  params: Promise<{slug?: string[]}>;
}>) {
  const route = `/${((await params).slug ?? []).join("/")}`;
  if (!Object.hasOwn(documents, route)) notFound();
  return <CoffeeDocument bodyClassName={documents[route]}>{children}</CoffeeDocument>;
}
