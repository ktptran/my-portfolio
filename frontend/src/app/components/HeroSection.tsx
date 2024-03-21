"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import LinkedInIcon from "../../../public/svg/linkedin-icon.svg";

import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
	return (
		<section className="lg:py-8 px-4 xl:gap-16 xl:px-16">
			<div className="grid grid-cols-1 sm:grid-cols-12">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
				>
					<h1 className="text-white mb-4 text-xl sm:text-xl lg:text-5xl lg:leading-normal font-extrabold">
						<div className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
							Hello, I&apos;m{" "}
						</div>
						<TypeAnimation
							sequence={[
								"Kevin.",
								1000,
								"A Solutions Architect.",
								1000,
								"A Full-Stack Engineer.",
								1000,
							]}
							wrapper="span"
							speed={50}
							repeat={Infinity}
						/>
					</h1>
					<p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
						Applying the latest AI/ML & cloud technology to help customers
						evolve business operations.
					</p>
					<div className="mt-2">
						<button className="px-6 py-3 sm:w-fit rounded-full mr-4 bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-200 text-white">
							<a
								className="flex"
								target="_blank"
								rel="noopener noreferrer"
								href="https://linkedin.com/in/ktptran"
							>
								Connect on{" "}
								<Image
									src={LinkedInIcon}
									alt="LinkedIn Icon"
									className="w-6 h-6 ml-1"
								/>
							</a>
						</button>
						<button className="px-1 py-1 sm:w-fit rounded-full bg-transparent bg-gradient-to-br from-blue-500 via-primary-500 to-secondary-500 hover:bg-slate-800 text-white my-4">
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://drive.google.com/file/d/1XzgJx714Ii6ws-FiInxLLtdmxDXMWtTX/view?usp=drive_link"
							>
								<span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
									Resume
								</span>
							</a>
						</button>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className="col-span-4 place-self-center mt-4 lg:mt-0"
				>
					<div className="w-[250px] h-[250px] md:w-[225px] md:h-[225px] lg:w-[300px] lg:h-[300px] my-8 relative">
						<Image
							src="/images/kevin-tran.jpeg"
							alt="hero image"
							className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
							width={280}
							height={280}
							priority={true}
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
