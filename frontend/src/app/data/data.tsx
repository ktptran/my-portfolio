interface TabData {
	title: string;
	id: string;
	content: JSX.Element;
}

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

const aboutTabData: TabData[] = [
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
						target="_blank"
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
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/fa538213-b665-4635-945d-6c5648895305"
					>
						AWS Solutions Architect - Professional
					</a>
				</li>
				<li>
					<a
						className="underline"
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/6a1765c4-c906-4d1f-b625-72b1e78b9c35"
					>
						AWS Data Analytics - Specialty
					</a>
				</li>
				<li>
					<a
						className="underline"
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/e2681ad2-0dd4-41ff-bae5-d776cedbdc18"
					>
						AWS Machine Learning - Specialty
					</a>
				</li>
				<li>
					<a
						className="underline"
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.credly.com/badges/f40429e4-17ad-4ca5-9808-222380272da9"
					>
						AWS Developer - Associate
					</a>
				</li>
				<li>
					<a
						className="underline"
						target="_blank"
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

export { aboutTabData, achievementData, meta, navLinks, projectsData };
