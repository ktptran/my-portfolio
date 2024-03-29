"use client";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Chip } from "@nextui-org/react";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { projectsData } from "../data/data";

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
	tag,
}: {
	imgUrl: any;
	title: any;
	description: any;
	gitUrl: any;
	previewUrl: any;
	tag: any;
}) => {
	return (
		<div className="pb-8">
			<div
				className="h-52 md:h-72 rounded-t-xl relative group"
				style={{
					background: `url(${imgUrl})`,
					backgroundSize: "auto 100%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center top",
					backgroundColor: "white",
				}}
			>
				<div className="overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
					{gitUrl && (
						<a
							href={gitUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
						>
							<CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
						</a>
					)}
					{previewUrl && (
						<a
							href={previewUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
						>
							<EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
						</a>
					)}
				</div>
			</div>
			<div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 pr-4">
				<h5 className="text-xl font-semibold mb-2">{title}</h5>
				<p className="text-[#ADB7BE]">{description}</p>
				<div className="flex gap-2 pt-4">
					{tag
						.sort(function (a: string, b: string) {
							if (a.toLowerCase() < b.toLowerCase()) return -1;
							if (a.toLowerCase() > b.toLowerCase()) return 1;
							return 0;
						})
						.map((value: any, index: any) => {
							if (value !== "All")
								return (
									<Chip color="secondary" key={index}>
										{value}
									</Chip>
								);
						})}
				</div>
			</div>
		</div>
	);
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
		<section id="projects">
			<h2 className="text-center text-4xl font-bold text-white mt-4 mb-4 md:mb-6">
				My Projects
			</h2>
			<ul
				ref={ref}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
			>
				{filteredProjects.map((project, index) => (
					<motion.li
						key={index}
						variants={{
							initial: { y: 50, opacity: 0 },
							animate: { y: 0, opacity: 1 },
						}}
						initial="initial"
						animate={isInView ? "animate" : "initial"}
						transition={{ duration: 0.3, delay: index * 0.4 }}
					>
						<ProjectCard
							key={project.id}
							title={project.title}
							description={project.description}
							imgUrl={project.image}
							tag={project.tag}
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
