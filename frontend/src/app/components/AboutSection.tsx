"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useTransition } from "react";

const variants = {
	default: { width: 0 },
	active: { width: "calc(100% - 0.75rem)" },
};

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
				variants={variants}
				className="h-1 bg-primary-500 mt-2 mr-3"
			></motion.div>
		</button>
	);
};

const TAB_DATA = [
	{
		title: "Skills",
		id: "skills",
		content: (
			<ul className="list-disc pl-2">
				<li>ReactJS</li>
				<li>NextJS</li>
				<li>Node.js</li>
				<li>Tailwind</li>
				<li>Javascript</li>
				<li>Golang</li>
				<li>AWS Cloud Development Kit (CDK)</li>
				<li>AWS Serverless Application Model (SAM)</li>
			</ul>
		),
	},
	{
		title: "Education",
		id: "education",
		content: (
			<ul className="list-disc pl-2">
				<li>
					<a
						className="underline"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/a1b4a848-8391-477a-8705-8c341a52bf4d"
					>
						AWS TechU
					</a>
				</li>
				<li>BS Applied Math @ University of Washington, Seattle</li>
			</ul>
		),
	},
	{
		title: "Certifications",
		id: "certifications",
		content: (
			<ul className="list-disc pl-2">
				<li>
					<a
						className="underline"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/fa538213-b665-4635-945d-6c5648895305"
					>
						AWS Solutions Architect - Professional
					</a>
				</li>
				<li>
					<a
						className="underline"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/6a1765c4-c906-4d1f-b625-72b1e78b9c35"
					>
						AWS Data Analytics - Specialty
					</a>
				</li>
				<li>
					<a
						className="underline"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/e2681ad2-0dd4-41ff-bae5-d776cedbdc18"
					>
						AWS Machine Learning - Specialty
					</a>
				</li>
				<li>
					<a
						className="underline"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/9847fc66-d698-4ed4-a375-5ee3a48ae82c"
					>
						AWS Developer - Associate
					</a>
				</li>
				<li>
					<a
						className="underline"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/1e5116bc-3ef4-475c-9a1f-714f0125df0a"
					>
						AWS SysOps Administrator - Associate
					</a>
				</li>
			</ul>
		),
	},
];

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
					src="/images/about-image.png"
					alt="about-image"
					width={500}
					height={500}
				/>
				<div className="mt-4 md:mt-0 text-left flex flex-col h-full">
					<h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
					<p className="text-base md:text-lg">
						I am a Solutions Architect with a passion for aiding customers
						develop industry-leading solutions. I have experience working with
						both early-stage startups and fortune 500 companies. Some of my
						favorite projects include geospatial supply chain management, AI/ML
						inventory detection, and heterogeneous data unification, In my free
						time, I enjoy reading, running, and writing. I am excited to build
						new solutions to create history!
					</p>
					<div className="flex flex-row justify-start mt-8">
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
					<div className="mt-8">
						{TAB_DATA.find((t) => t.id === tab).content}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
