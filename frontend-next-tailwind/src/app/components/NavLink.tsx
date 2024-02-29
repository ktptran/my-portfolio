// A scroller function that takes element id and smooth scrolls to it.
const scroll2El = (elID: string) => {
	const docElId = document.getElementById(elID);
	if (docElId) {
		window.scrollTo({
			top: docElId.offsetTop - 100,
			behavior: "smooth",
		});
	}
};

const onBtnClick = (e: {
	preventDefault: () => void;
	target: { getAttribute: (arg0: string) => any };
}) => {
	e.preventDefault();
	const goto = e.target.getAttribute("goto");
	setTimeout(() => {
		scroll2El(goto);
	}, 100);
};

const NavLink = ({ href, title }: { href: any; title: any }) => (
	<button
		// href={href}
		goto={href}
		className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
		onClick={(e) => onBtnClick(e)}
	>
		{title}
	</button>
);

export default NavLink;
