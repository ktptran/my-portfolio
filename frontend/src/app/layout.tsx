import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { meta } from "./data/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(meta.URL),
	title: meta.siteName,
	description: meta.description,
	authors: meta.authors,
	openGraph: {
		type: meta.type,
		title: meta.title,
		description: meta.description,
		url: meta.URL,
		siteName: meta.siteName,
		images: [
			{
				url: meta.og.ogImage,
				width: meta.og.width,
				height: meta.og.height,
				type: meta.og.type,
				secureUrl: meta.og.ogImage,
			},
		],
		locale: meta.og.locale,
	},
	twitter: {
		card: "summary_large_image",
		title: meta.title,
		description: meta.description,
		images: [meta.og.ogImage],
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
