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
		<div className="px-4 xl:gap-16 sm:py-8 xl:px-16 pb-16">
			<div className="w-full grid md:grid-cols-3 gap-8 md:gap-12 border-[#33353F] border rounded-md py-8 px-16">
				{achievementData.map((achievement, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center w-full align-center"
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
