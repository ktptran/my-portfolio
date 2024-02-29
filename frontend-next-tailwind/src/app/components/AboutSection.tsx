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
				<li>AWS TechU</li>
				<li>BS Applied Math from University of Washington, Seattle</li>
			</ul>
		),
	},
	{
		title: "Certifications",
		id: "certifications",
		content: (
			<ul className="list-disc pl-2">
				<li>AWS Solutions Architect - Professional</li>
				<li>AWS Data Analytics - Specialty</li>
				<li>AWS Machine Learning - Specialty</li>
				<li>AWS Developer - Associate</li>
				<li>AWS SysOps - Associate</li>
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
