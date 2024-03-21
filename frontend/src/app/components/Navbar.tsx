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
		<ul className="flex flex-col items-center pb-2">
			{links.map((link: { path: any; title: any }, index: Key) => {
				const { title, path } = link;
				if (title === "Contact") {
					return (
						<li
							key={index}
							className="px-1 py-0.5 sm:w-fit rounded-full bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
						>
							<NavLink href={path} title={title} />
						</li>
					);
				} else {
					return (
						<li key={index} className="text-white">
							<NavLink href={link.path} title={link.title} />
						</li>
					);
				}
			})}
		</ul>
	);
};

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);

	return (
		<nav className="fixed mx-auto border-b-1 border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
			<div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto py-8 px-4 xl:gap-16 sm:py-8 xl:px-16">
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
						{navLinks.map((link, index) => {
							const { path, title } = link;
							if (title === "Contact") {
								return (
									<li
										key={index}
										className="px-3 py-1 sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
									>
										<NavLink href={path} title={title} />
									</li>
								);
							} else {
								return (
									<li key={index} className="py-1 text-white">
										<NavLink href={path} title={title} />
									</li>
								);
							}
						})}
					</ul>
				</div>
			</div>
			{navbarOpen ? <MenuOverlay links={navLinks} /> : null}
		</nav>
	);
};

export default Navbar;
