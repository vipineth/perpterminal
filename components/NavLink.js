import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function NavLink({ href, children, exact }) {
  const router = useRouter();

  let className = children.props.className || "";
  const isActive = exact
    ? router.pathname === href
    : router.pathname.startsWith(href);
  if (isActive) {
    className = `${className} bg-green-700 text-white`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
}
