"use client";
import Image from "next/image";
import { useState } from "react";
import GithubIcon from "../../../public/svg/github-icon.svg";
import HuggingFaceIcon from "../../../public/svg/hf-icon.svg";
import LinkedInIcon from "../../../public/svg/linkedin-icon.svg";

function EmailSection() {
	const [emailSubmitted, setEmailSubmitted] = useState(false);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const data = {
			email: e.target.email.value,
			subject: e.target.subject.value,
			message: e.target.message.value,
		};
		const JSONdata = JSON.stringify(data);
		const endpoint = "/api/email";
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSONdata,
		};
		const response = await fetch(endpoint, options);
		const resData = await response.json();
		console.log(resData);
		if (response.status === 200) {
			console.log("Message sent!");
			setEmailSubmitted(true);
		}
	};

	return (
		<section
			className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
			id="contact"
		>
			<div className="z-9">
				<h5 className="text-xl font-bold text-white my-2">
					Let&apos;s Connect
				</h5>
				<p className="text-[$ADB7BE] mb-4 max-w-md">
					I&apos;m currently looking for new opportunities, my inbox is always
					open. Whether you have a question or just want to say hi, I&apos;ll
					try my best to get back to you!{" "}
				</p>
				<div className="socials flex flex-row gap-2">
					<a
						target="_blank"
						href="https://github.com/ktptran"
						rel="noopener noreferrer"
					>
						<Image src={GithubIcon} alt="Github Icon" className="w-10 h-10" />
					</a>
					<a
						target="_blank"
						href="https://linkedin.com/in/ktptran"
						rel="noopener noreferrer"
					>
						<Image
							src={LinkedInIcon}
							alt="LinkedIn Icon"
							className="w-10 h-10"
						/>
					</a>
					<a
						target="_blank"
						href="https://huggingface.co/ktptran"
						rel="noopener noreferrer"
					>
						<Image
							src={HuggingFaceIcon}
							alt="Hugging Face Icon"
							className="w-10 h-10"
						/>
					</a>
				</div>
			</div>
			<div>
				<form className="flex flex-col" onSubmit={handleSubmit}>
					<div className="mb-6">
						<label
							htmlFor="email"
							className="text-white block text-sm mb-2 font-medium"
						>
							Your email
						</label>
						<input
							name="email"
							type="email"
							id="email"
							required
							className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
							placeholder="example@gmail.com"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="subject"
							className="text-white block text-sm mb-2 font-medium"
						>
							Subject
						</label>
						<input
							name="subject"
							type="text"
							id="subject"
							required
							className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
							placeholder="Just saying hi!"
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="message"
							className="text-white block text-sm mb-2 font-medium"
						>
							Message
						</label>
						<textarea
							name="message"
							id="message"
							className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
							placeholder="Let's talk about..."
						/>
					</div>
					<button
						type="submit"
						className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
					>
						Send Message
					</button>
					{
						// If the email was submitted successfully, show a success message.
						emailSubmitted && (
							<p className="text-green-500 text-sm mt-2">
								Email sent successfully
							</p>
						)
					}
				</form>
			</div>
		</section>
	);
}

export default EmailSection;
