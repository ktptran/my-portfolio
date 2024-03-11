"use client";
import Image from "next/image";
import GithubIcon from "../../../public/svg/github-icon.svg";
import HuggingFaceIcon from "../../../public/svg/hf-icon.svg";
import LinkedInIcon from "../../../public/svg/linkedin-icon.svg";

function EmailSection() {
	return (
		<section
			className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
			id="contact"
		>
			<div className="z-9">
				<h4 className="text-3xl font-bold text-white my-2">
					Let&apos;s Connect
				</h4>
				<p className="text-[$ADB7BE] mb-4 max-w-md">
					I&apos;m currently looking for new opportunities! Whether you have a
					question or just want to say hi, I&apos;ll do my best to get back to
					you!{" "}
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
			<div></div>
		</section>
	);
}

export default EmailSection;
