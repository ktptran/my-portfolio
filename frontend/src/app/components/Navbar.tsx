"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SiteIcon from "../../../public/images/logo.png";
import NavLink from "./NavLink";

import { Key } from "react";
import { navLinks } from "../data/data";

const MenuOverlay = ({ links }: { links: any }) => {
	return (
		<ul className="flex flex-col py-4 items-center">
			{links.map((link: { path: any; title: any }, index: Key) => (
				<li key={index}>
					<NavLink href={link.path} title={link.title} />
				</li>
			))}
		</ul>
	);
};

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);

	return (
		<nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
			<div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
				<Link
					href={"/"}
					className="text-xl md:text-5xl text-white font-semibold"
				>
					<Image src={SiteIcon} alt="Site Logo" className="w-10 h-10" />
				</Link>
				<div className="mobile-menu block md:hidden">
					{navbarOpen ? (
						<button
							onClick={() => setNavbarOpen(false)}
							className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
						>
							<XMarkIcon className="h-5 w-5" />
						</button>
					) : (
						<button
							onClick={() => setNavbarOpen(true)}
							className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
						>
							<Bars3Icon className="h-5 w-5" />
						</button>
					)}
				</div>
				<div className="menu hidden md:block md:w-auto" id="navbar">
					<ul className="flex p-4 md:p-0 sm:flex-row md:space-x-8">
						{navLinks.map((link, index) => (
							<li key={index}>
								<NavLink href={link.path} title={link.title} />
							</li>
						))}
					</ul>
				</div>
			</div>
			{navbarOpen ? <MenuOverlay links={navLinks} /> : null}
		</nav>
	);
};

export default Navbar;
