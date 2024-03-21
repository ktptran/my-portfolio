"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useTransition } from "react";

import { certs, skillsData } from "../data/data";

const TabButton = ({
	active,
	selectTab,
	children,
}: {
	active: any;
	selectTab: any;
	children: any;
}) => {
	const buttonClasses = active ? "text-white" : "text-[#ADB7BE]";

	return (
		<button onClick={selectTab}>
			<p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
				{children}
			</p>
			<motion.div
				animate={active ? "active" : "default"}
				variants={{
					default: { width: 0 },
					active: { width: "calc(100% - 0.75rem)" },
				}}
				className="h-1 bg-primary-500 mt-2 mr-3"
			></motion.div>
		</button>
	);
};

const Certifications = () => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 sm:px-4 xl:px-32">
			{certs.map((value, index) => {
				const { href, image, alt } = value;
				return (
					<a
						key={index}
						className="flex flex-col items-center justify-center w-full align-center"
						target="_blank"
						rel="noopener noreferrer"
						href={href}
					>
						<Image src={image} alt={alt} className="w-36 h-36" />
					</a>
				);
			})}
		</div>
	);
};

const AboutSection = () => {
	const [tab, setTab] = useState("skills");
	const [isPending, startTransition] = useTransition();

	const handleTabChange = (id: any) => {
		startTransition(() => {
			setTab(id);
		});
	};
	return (
		<section className="text-white" id="about">
			<h2 className="text-center text-4xl font-bold text-white mt-4 mb-4 md:mb-6">
				About Me
			</h2>
			<Certifications />
			<div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 sm:py-16 xl:px-16">
				<div>
					<p className="text-base md:text-lg">
						I am a Solutions Architect with a passion for aiding customers
						develop industry-leading solutions. Previously, I supported both
						early-stage startups and fortune 500 companies with different
						initiatives such as geospatial supply chain management, AI/ML
						inventory detection, and heterogeneous data unification. In my free
						time, I enjoy reading, running, and writing.
					</p>
				</div>
				<div className="mt-8 md:mt-0 text-left flex flex-col flex-grow">
					{skillsData.map((value, index) => {
						const { proficiency, title, technology } = value;
						return (
							<div key={index} className="mt-1">
								<h5 className="font-bold">{title + " "}</h5>
								<div className="italic flex flex-row justify-between pb-1">
									<div className="mr-2 flex flex-col">
										<span key={index} className="text-sm sm:text-xs mt-auto">
											{technology.map((value, index) => {
												const input =
													index !== technology.length - 1
														? value + ", "
														: value;
												return <>{input}</>;
											})}
										</span>
									</div>
									<div className="h-auto flex flex-col">
										<span className="text-sm sm:text-xs mt-auto">
											{proficiency * 10}%
										</span>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
									<div
										className="bg-blue-500 h-1.5 rounded-full dark:bg-blue-500"
										style={{ width: `${proficiency * 10}%` }}
									></div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
