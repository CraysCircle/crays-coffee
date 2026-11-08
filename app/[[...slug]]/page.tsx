import {renderCoffeeNode} from "../../src/CoffeePageTree";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import pageData from "../../src/pages.generated.json";
import {CoffeeClientRedirect, CoffeeInteractions} from "../../src/CoffeeInteractions";

type ElementNode = string | {
  tag: string;
  attributes: Record<string, unknown>;
  children: ElementNode[];
};
type CoffeePage = {
  title: string;
  description: string | null;
  children: ElementNode[];
  scripts: string[];
  clientRedirect: string | null;
};
type Props = {params: Promise<{slug?: string[]}>};
const pages = pageData as Record<string, CoffeePage>;


function getPage(slug: string[] | undefined): CoffeePage {
  const page = pages[`/${(slug ?? []).join("/")}`];
  if (!page) notFound();
  return page;
}

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(pages).map(route => ({slug: route === "/" ? [] : route.slice(1).split("/")}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const page = getPage((await params).slug);
  return {title: page.title, description: page.description};
}

export default async function Page({params}: Props) {
  const page = getPage((await params).slug);
  return <>
    {page.children.map((node, index) => renderCoffeeNode(node, String(index)))}
    {page.scripts.length ? <CoffeeInteractions home={page.scripts.includes("script.js")} /> : null}
    {page.clientRedirect ? <CoffeeClientRedirect target={page.clientRedirect} /> : null}
  </>;
}
