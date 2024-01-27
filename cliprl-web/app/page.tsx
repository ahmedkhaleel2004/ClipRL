import { ModeToggle } from "@/components/component/ModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CarouselForImage } from "@/components/component/ImageSilder";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";

export default function Home() {
	return (
		<div>
			{/* <CarouselForImage /> */}
			<div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
				<header className="px-4 lg:px-6 h-14 flex items-center">
					<Link className="flex items-center justify-center" href="#">
						<MountainIcon className="h-6 w-6" />
						<span className="sr-only">ClipRL</span>
					</Link>
					<nav className="ml-auto flex gap-4 sm:gap-6">
						<ModeToggle />
					</nav>
				</header>
				<main className="flex-1 ">
					<section className="w-full py-12 md:py-24 lg:py-32">
						<div className="container px-4 md:px-6">
							<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
								<div className="space-y-4">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
										Experience the past with the future.
									</h1>
									<p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
										ClipRL allows you to experience the past
										by reliving your best moments in a
										virtual world.
									</p>
									<Button>
										<EnvelopeOpenIcon className="w-5 h-5 mr-2" />
										Login with Email
									</Button>
									<div className="flex flex-col gap-2 min-[400px]:flex-row"></div>
								</div>
							</div>
						</div>
					</section>
				</main>
				<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
					<p className="text-xs text-gray-500 dark:text-gray-400">
						© 2024 ClipRL Inc. All rights reserved.
					</p>
					<nav className="sm:ml-auto flex gap-4 sm:gap-6">
						<Link
							className="text-xs hover:underline underline-offset-4"
							href="#"
						>
							Terms of Service
						</Link>
						<Link
							className="text-xs hover:underline underline-offset-4"
							href="#"
						>
							Privacy
						</Link>
					</nav>
				</footer>
			</div>
		</div>
	);
}
function MountainIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m8 3 4 8 5-5 5 15H2L8 3z" />
		</svg>
	);
}
