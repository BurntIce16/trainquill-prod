"use client";

import logo from "../../public/logo.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed w-full h-24 shadow-xl bg-white z-50">
      <div className="flex items-center px-4 h-full w-full">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={90}
            height={90}
            className="cursor-pointer"
          />
        </Link>
        <div>
          <ul className="hidden sm:flex">
            <Link href="/about">
              <li className="ml-10 uppercase hover:border-b text-xl">
                About us
              </li>
            </Link>
            <Link href="/bodyscan">
              <li className="ml-10 uppercase hover:border-b text-xl">
                Bodyscan
              </li>
            </Link>
            <Link href="/name">
              <li className="ml-10 uppercase hover:border-b text-xl">Name</li>
            </Link>
            <Link href="/frame">
              <li className="ml-10 uppercase hover:border-b text-xl">Frame</li>
            </Link>
            <Link href="/reframe">
              <li className="ml-10 uppercase hover:border-b text-xl">
                Reframe
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
