import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { meta } from "./data/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: meta.siteName,
	description: meta.description,
	openGraph: {
		title: meta.title,
		description: meta.description,
		url: meta.URL,
		siteName: meta.siteName,
		images: [
			{
				url: meta.og.ogImage,
				width: meta.og.width,
				height: meta.og.height,
			},
		],
		locale: meta.og.locale,
		type: meta.og.type,
	},
	robots: {
		index: true,
		follow: false,
		noarchive: true,
		nosnippet: true,
		noimageindex: true,
		nocache: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
