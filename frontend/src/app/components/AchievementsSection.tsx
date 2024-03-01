"use client";
import dynamic from "next/dynamic";
import { achievementData } from "../data/data";

const AnimatedNumbers = dynamic(
	() => {
		return import("react-animated-numbers");
	},
	{ ssr: false }
);

function AchievementsSection() {
	return (
		<div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
			<div className="grid md:grid-cols-4 gap-8 md:gap-12 border-[#33353F] border rounded-md py-8 px-16 flex flex-row items-center justify-between">
				{achievementData.map((achievement, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center mx-4"
					>
						<h2 className="text-white text-center text-4xl font-bold flex flex-row">
							{achievement.prefix}
							<AnimatedNumbers
								includeComma
								className="text-white text-4xl font-bold"
								transitions={(index) => ({
									mass: 1,
									friction: 100,
									tensions: 140 * (index + 1),
								})}
								locale="en-US"
								animateToNumber={parseInt(achievement.value)}
							/>
							{achievement.postfix}
						</h2>
						<p className="text-[#ADB7BE] text-center text-base">
							{achievement.metric}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default AchievementsSection;
