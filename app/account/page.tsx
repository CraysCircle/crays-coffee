import type {Metadata} from "next";
import Image from "next/image";
import {AccountEntry} from "../../src/account-entry/AccountEntry";
import {renderCoffeeNode} from "../../src/CoffeePageTree";
import {CoffeeInteractions} from "../../src/CoffeeInteractions";
import pages from "../../src/pages.generated.json";
import styles from "./coffee-account-frame.module.css";

export const metadata: Metadata = {
  title: "Account & Sign-in | CRAYS Coffee",
  description: "One secure CRAYS account for your world, services and member support.",
  alternates: {canonical: "https://www.crays.coffee/account"},
};

const links = Object.freeze({
  login: "https://member.crays.world/auth/login",
  signup: "https://member.crays.world/auth/login?screen_hint=signup",
  team: "https://member.crays.world/work/auth/login",
});

export default function AccountPage() {
  const footer = pages["/"].children.find(node => typeof node !== "string" && node.tag === "footer");
  return <>
    <header className={styles.header}>
      <a href="/" aria-label="CRAYS Coffee home"><Image src="/assets/crays-logo-white.svg" alt="CRAYS" width={142} height={40} unoptimized/></a>
      <nav aria-label="Coffee account navigation"><a href="/menu">Menu</a><a href="/">Coffee home</a></nav>
    </header>
    <div className={styles.frame}><AccountEntry locale="en" links={links} header={null}/></div>
    {footer ? renderCoffeeNode(footer, "account.footer") : null}
    <CoffeeInteractions home={false}/>
  </>;
}
