const aboutTabData = [
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
						href="https://www.credly.com/badges/9847fc66-d698-4ed4-a375-5ee3a48ae82c"
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
		title: "Mental Health Appointment Scheduling",
		description: "Study of optimal reservation method for medical clinic.",
		image: "/images/projects/appointment-scheduling.png",
		tag: ["All", "Python", "Probability"],
		gitUrl: "https://github.com/warandstar/math381hallhealth",
		previewUrl:
			"https://drive.google.com/open?id=1dXusDXDo6_l6Kpr9pTMdekr-tlyrh6nu",
	},
	{
		id: 4,
		title: "Youth Group Website",
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
	{
		metric: "years",
		value: "4",
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
		path: "contact",
	},
];

export { aboutTabData, achievementData, navLinks, projectsData };
