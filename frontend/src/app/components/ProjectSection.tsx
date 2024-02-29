"use client";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Chip } from "@nextui-org/react";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";

const projectsData = [
	{
		id: 1,
		title: "NextJS Portfolio Website",
		description: "Showcasing expert work.",
		image: "/images/projects/1.png",
		tag: ["All", "AWS", "NextJS", "Tailwind"],
		gitUrl: "https://github.com/ktptran/my-portfolio",
		previewUrl: "https://ktptran.xyz",
	},
	{
		id: 2,
		title: "AI/ML Inventory Detection",
		description: "Recording fruit inventory storage.",
		image: "/images/projects/inventory.png",
		tag: ["All", "AWS", "ReactJS", "AI/ML"],
		gitUrl: "https://github.com/ktptran/inventory-detection",
	},
	{
		id: 3,
		title: "LLM Running Application",
		description: "LLM Running Application",
		image: "/images/projects/3.png",
		tag: ["All", "AWS", "LangChain", "NextJS", "Tailwind"],
		gitUrl: "https://github.com/ktptran/llm-running-app",
	},
	{
		id: 4,
		title: "Mental Health Appointment Scheduling",
		description: "Study of optimal reservation method for medical clinic.",
		image: "/images/projects/appointment-scheduling.png",
		tag: ["All", "Python", "Probability"],
		gitUrl: "https://github.com/warandstar/math381hallhealth",
		previewUrl:
			"https://drive.google.com/open?id=1dXusDXDo6_l6Kpr9pTMdekr-tlyrh6nu",
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
		<div>
			<div
				className="h-52 md:h-72 rounded-t-xl relative group"
				style={{
					background: `url(${imgUrl})`,
					backgroundSize: "auto 100%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "left top",
					backgroundColor: "white",
				}}
			>
				<div className="overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
					<a
						href={gitUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
					>
						<CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
					</a>
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
			<div className="text-white rounded-b-xl mt-3 bg-[#181818]py-6 px-4">
				<h5 className="text-xl font-semibold mb-2">{title}</h5>
				<p className="text-[#ADB7BE]">{description}</p>
				<div className="flex gap-2 pt-4">
					{tag.map((value: any, index: any) => {
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
		<section id="projects">
			<h2 className="text-center text-4xl font-bold text-white mt-4 mb-4 md:mb-6">
				My Projects
			</h2>
			<div className="text-white flex flex-row justify-center items-center gap-2 py-6">
				<ProjectTag
					onClick={handleTagChange}
					name="All"
					isSelected={tag === "All"}
				/>
				<ProjectTag
					onClick={handleTagChange}
					name="AWS"
					isSelected={tag === "AWS"}
				/>
				<ProjectTag
					onClick={handleTagChange}
					name="AI/ML"
					isSelected={tag === "AI/ML"}
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
