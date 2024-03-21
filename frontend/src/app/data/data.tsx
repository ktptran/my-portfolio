import { StaticImageData } from "next/image";
import DataSpec from "../../../public/images/certs/data-specialty.png";
import DevAssoc from "../../../public/images/certs/dev-associate.png";
import MLSpec from "../../../public/images/certs/ml-specialty.png";
import SAPro from "../../../public/images/certs/sa-professional.png";
import SysOpsAssoc from "../../../public/images/certs/sysops-associate.png";
import TechU from "../../../public/images/certs/techu-grad.png";

interface Meta {
	type: "website";
	URL: string | URL;
	siteName: string;
	title?: string;
	description?: string;
	themeColor?: string;
	backgroundColor?: string;
	og: {
		locale: string;
		type?: string;
		ogImage: string | URL;
		width?: number;
		height?: number;
		alt?: string;
	};
	authors: any;
}

interface certData {
	href: string;
	image: StaticImageData;
	alt: string;
}

interface skills {
	title: string;
	technology: string[];
	proficiency: number;
}

const certs: certData[] = [
	{
		href: "https://www.credly.com/badges/a1b4a848-8391-477a-8705-8c341a52bf4d",
		image: TechU,
		alt: "AWS TechU Graduate",
	},
	{
		href: "https://www.credly.com/badges/fa538213-b665-4635-945d-6c5648895305",
		image: SAPro,
		alt: "Solutions Architect Professional",
	},
	{
		href: "https://www.credly.com/badges/e2681ad2-0dd4-41ff-bae5-d776cedbdc18",
		image: MLSpec,
		alt: "Machine Learning Specialty",
	},
	{
		href: "https://www.credly.com/badges/6a1765c4-c906-4d1f-b625-72b1e78b9c35",
		image: DataSpec,
		alt: "Data ANalytics Specialty",
	},

	{
		href: "https://www.credly.com/badges/f40429e4-17ad-4ca5-9808-222380272da9",
		image: DevAssoc,
		alt: "Developer Associate",
	},
	{
		href: "https://www.credly.com/badges/1e5116bc-3ef4-475c-9a1f-714f0125df0a",
		image: SysOpsAssoc,
		alt: "Sys Ops Associate",
	},
];

const skillsData: skills[] = [
	{
		title: "Cloud Technology",
		technology: ["AWS CDK", "AWS SAM", "Docker", "Kubernetes"],
		proficiency: 8.5,
	},
	{
		title: "Data Science - AI/ML",
		technology: ["LangChain", "LLM", "Python", "Jupyter Notebook"],
		proficiency: 7.5,
	},
	{
		title: "Software Development",
		technology: [
			"ReactJS",
			"NextJS",
			"Tailwind",
			"JavaScript",
			"Node.js",
			"Golang",
		],
		proficiency: 8,
	},
];

const projectsData = [
	{
		id: 1,
		title: "AI/ML Automated Inventory Detection",
		description: "Recording fruit inventory storage.",
		image: "/images/projects/inventory.png",
		tag: ["All", "AWS", "ReactJS", "AI/ML"],
		gitUrl: "https://github.com/ktptran/inventory-detection",
	},
	{
		id: 2,
		title: "Probability Appointment Scheduling",
		description:
			"Study for optimal reservation system for mental health clinic.",
		image: "/images/projects/appointment-scheduling.png",
		tag: ["All", "Python", "Probability"],
		gitUrl: "https://github.com/warandstar/math381hallhealth",
		previewUrl:
			"https://drive.google.com/open?id=1dXusDXDo6_l6Kpr9pTMdekr-tlyrh6nu",
	},
	{
		id: 3,
		title: "ReactJS Web Platform",
		description: "Platform to centralize communication and marketing",
		image: "/images/projects/youth-group.png",
		tag: ["All", "ReactJS", "AWS"],
		previewUrl: "https://www.chuathanhthan.org/",
	},
];

const achievementData = [
	{
		metric: "Projects",
		value: "20",
		postfix: "+",
	},
	{
		prefix: "$",
		metric: "ARR Generated",
		value: "4.1",
		postfix: "M+",
	},
	{
		metric: "Avg CSAT",
		value: "100",
		postfix: "%",
	},
];

const navLinks = [
	{
		title: "About",
		path: "about",
	},
	{
		title: "Projects",
		path: "projects",
	},
	{
		title: "Contact",
		path: "mailto:kevintptran@gmail.com?subject=Let's chat.",
	},
];

const meta: Meta = {
	type: "website",
	URL: "https://ktptran.xyz",
	siteName: "Kevin Tran | Portfolio",
	title: "Kevin Tran: Solutions Architect Portfolio",
	description:
		"Kevin is an AWS Solutions Architect and Full-Stack Engineer. Learn more about his skills, some of the projects he worked on, and how to get in contact with him!",
	og: {
		locale: "en-US",
		type: "image/png",
		ogImage: "/images/projects/portfolio.png",
		width: 1200,
		height: 630,
		alt: "Opengraph Image",
	},
	authors: [
		{
			url: "https://www.linkedin.com/in/ktptran/",
			name: "Kevin Tran",
		},
	],
};

export { achievementData, certs, meta, navLinks, projectsData, skillsData };
