"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useTransition } from "react";
import { aboutTabData } from "../data/data";

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
			<div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py16 xl:px-16">
				<Image
					src="/images/about-image.jpeg"
					alt="about-image"
					width={550}
					height={550}
				/>
				<div className="mt-4 md:mt-0 text-left flex flex-col h-full">
					<h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
					<p className="text-base md:text-lg">
						I am a Solutions Architect with a passion for aiding customers
						develop industry-leading solutions. Previously, I supported both
						early-stage startups and fortune 500 companies with different
						initiatives such as geospatial supply chain management, AI/ML
						inventory detection, and heterogeneous data unification. In my free
						time, I enjoy reading, running, and writing.
					</p>
					<div className="flex flex-row justify-start mt-4">
						<TabButton
							selectTab={() => handleTabChange("skills")}
							active={tab === "skills"}
						>
							Skills
						</TabButton>
						<TabButton
							selectTab={() => handleTabChange("education")}
							active={tab === "education"}
						>
							Education
						</TabButton>
						<TabButton
							selectTab={() => handleTabChange("certifications")}
							active={tab === "certifications"}
						>
							Certifications
						</TabButton>
					</div>
					<div className="mt-4">
						{aboutTabData.find((t) => t.id === tab).content}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
