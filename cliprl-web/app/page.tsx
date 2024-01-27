import { ModeToggle } from "@/components/component/ModeToggle";
import Book from "@/components/component/Book";
import { pages } from "next/dist/build/templates/app-page";

export default function Home() {
	const pages = ["Hello Wo", "Hello World", "Hello World!", "epic"];

	return (
		<main>
			<ModeToggle />
			<p className="text-2xl">Hello World</p>
			<Book pages={pages}></Book>
		</main>
	);
}
