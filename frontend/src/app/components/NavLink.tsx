// A scroller function that takes element id and smooth scrolls to it.
const getOffset = (elID: string) => {
	let vw = Math.max(
		document.documentElement.clientWidth || 0,
		window.innerWidth || 0
	);
	if (vw > 500) {
		return 100;
	} else {
		if (elID === "about") {
			return 200;
		} else if (elID === "projects") {
			return 220;
		} else {
			return 125;
		}
	}
};

const scroll2El = (elID: string) => {
	const offset = getOffset(elID);
	const docElId = document.getElementById(elID);
	if (docElId) {
		window.scrollTo({
			top: docElId.offsetTop - offset,
			behavior: "smooth",
		});
	}
};

const onBtnClick = (e: any) => {
	e.preventDefault();
	const goto = e.target.getAttribute("type");
	setTimeout(() => {
		scroll2El(goto);
	}, 100);
};

const NavLink = ({ href, title }: { href: any; title: any }) => (
	<button
		type={href}
		className="block py-2 pl-3 pr-4 hover:text-[#ADB7BE] sm:text-xl rounded md:p-0 text-white"
		onClick={(e) => onBtnClick(e)}
	>
		{title}
	</button>
);

export default NavLink;
