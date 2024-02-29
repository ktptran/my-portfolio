import Image from "next/image";
import SiteIcon from "../../../public/images/logo.png";

function Footer() {
	return (
		<footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
			<div className="container p-12 flex justify-between">
				<Image src={SiteIcon} alt="Site Logo" className="w-10 h-10" />
				<p className="text-slate-600">All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
