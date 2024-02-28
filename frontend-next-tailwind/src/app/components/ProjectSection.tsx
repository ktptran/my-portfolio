"use client";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";

const projectsData = [
	{
		id: 1,
		title: "React Portfolio Website",
		description: "Project 1 description",
		image: "/images/projects/1.png",
		tag: ["All", "Web"],
		gitUrl: "/",
		previewUrl: "/",
	},
	{
		id: 2,
		title: "Potography Portfolio Website",
		description: "Project 2 description",
		image: "/images/projects/2.png",
		tag: ["All", "Web"],
		gitUrl: "/",
		previewUrl: "/",
	},
	{
		id: 3,
		title: "E-commerce Application",
		description: "Project 3 description",
		image: "/images/projects/3.png",
		tag: ["All", "Web"],
		gitUrl: "/",
		previewUrl: "/",
	},
	{
		id: 4,
		title: "Food Ordering Application",
		description: "Project 4 description",
		image: "/images/projects/4.png",
		tag: ["All", "Mobile"],
		gitUrl: "/",
		previewUrl: "/",
	},
	{
		id: 5,
		title: "React Firebase Template",
		description: "Authentication and CRUD operations",
		image: "/images/projects/5.png",
		tag: ["All", "Web"],
		gitUrl: "/",
		previewUrl: "/",
	},
	{
		id: 6,
		title: "Full-stack Roadmap",
		description: "Project 5 description",
		image: "/images/projects/6.png",
		tag: ["All", "Web"],
		gitUrl: "/",
		previewUrl: "/",
	},
];

const ProjectTag = ({
	name,
	onClick,
	isSelected,
}: {
	name: any;
	onClick: any;
	isSelected: any;
}) => {
	const buttonStyle = isSelected
		? "text-white bg-primary-500"
		: "text-[#ADB7BE] border-slate-600 hover:border-white";
	return (
		<button
			className={`${buttonStyle} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
			onClick={() => onClick(name)}
		>
			{name}
		</button>
	);
};

const ProjectCard = ({
	imgUrl,
	title,
	description,
	gitUrl,
	previewUrl,
}: {
	imgUrl: any;
	title: any;
	description: any;
	gitUrl: any;
	previewUrl: any;
}) => {
	return (
		<div>
			<div
				className="h-52 md:h-72 rounded-t-xl relative group"
				style={{ background: `url(${imgUrl})`, backgroundSize: "cover" }}
			>
				<div className="overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
					<Link
						href={gitUrl}
						className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
					>
						<CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
					</Link>
					<Link
						href={previewUrl}
						className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
					>
						<EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
					</Link>
				</div>
			</div>
			<div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
				<h5 className="text-xl font-semibold mb-2">{title}</h5>
				<p className="text-[#ADB7BE]">{description}</p>
			</div>
		</div>
	);
};

const cardVariants = {
	initial: { y: 50, opacity: 0 },
	animate: { y: 0, opacity: 1 },
};

const ProjectsSection = () => {
	const [tag, setTag] = useState("All");
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	const handleTagChange = (newTag: React.SetStateAction<string>) => {
		setTag(newTag);
	};

	const filteredProjects = projectsData.filter((project) =>
		project.tag.includes(tag)
	);

	return (
		<section>
			<h2>My Projects</h2>
			<div className="text-white flex flex-row justify-center items-center gap-2 py-6">
				<ProjectTag
					onClick={handleTagChange}
					name="All"
					isSelected={tag === "All"}
				/>
				<ProjectTag
					onClick={handleTagChange}
					name="Web"
					isSelected={tag === "Web"}
				/>
				<ProjectTag
					onClick={handleTagChange}
					name="Mobile"
					isSelected={tag === "Mobile"}
				/>
			</div>
			<ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
				{filteredProjects.map((project, index) => (
					<motion.li
						key={index}
						variants={cardVariants}
						initial="initial"
						animate={isInView ? "animate" : "initial"}
						transition={{ duration: 0.3, delay: index * 0.4 }}
					>
						<ProjectCard
							key={project.id}
							title={project.title}
							description={project.description}
							imgUrl={project.image}
							gitUrl={project.gitUrl}
							previewUrl={project.previewUrl}
						/>
					</motion.li>
				))}
			</ul>
		</section>
	);
};

export default ProjectsSection;
