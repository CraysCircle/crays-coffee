import {createElement, type ReactNode} from "react";
import {UserRound} from "lucide-react";

type ElementNode = string | {
  tag: string;
  attributes: Record<string, unknown>;
  children: ElementNode[];
};

// Render only the preserved trusted source tree. The added account anchor does
// not collect credentials or select roles; the common service owns both.
export function renderCoffeeNode(node: ElementNode, key: string): ReactNode {
  if (typeof node === "string") return node;
  const attributes: Record<string, unknown> = {...node.attributes, key};
  for (const name of ["href", "src"]) {
    const value = attributes[name];
    if (typeof value === "string" && value && !/^(?:[a-z][a-z\d+.-]*:|\/|#|\?)/i.test(value)) {
      Object.assign(attributes, {[name]: "/" + value});
    }
  }
  const children = node.children.map((child, index) => renderCoffeeNode(child, `${key}.${index}`));
  if (node.tag === "nav" && String(node.attributes.className).split(" ").includes("floating-nav")) {
    const beforeOrder = node.children.findIndex(child => typeof child !== "string" && String(child.attributes.className).split(" ").includes("order-link"));
    children.splice(beforeOrder < 0 ? children.length : beforeOrder, 0,
      <a key={`${key}.account`} className="nav-link account-link" href="/account" aria-label="CRAYS account">
        <UserRound size={18} aria-hidden/><span>Log in</span>
      </a>);
  }
  return createElement(node.tag, attributes, ...children);
}
