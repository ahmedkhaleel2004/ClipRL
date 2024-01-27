import { ModeToggle } from "@/components/component/ModeToggle";
import Book from "@/components/component/Book";
import { pages } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
	const pages = ["Hello Wo", "Hello World", "Hello World!", "epic"];

	return (
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
			<main className="flex-1">
				<section className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
							<div className="space-y-4">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
									Experience the past with the future.
								</h1>
								<p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
									ClipRL allows you to experience the past by
									reliving your best moments in a virtual
									world.
								</p>
								<div className="flex flex-col gap-2 min-[400px]:flex-row"></div>
							</div>
							<img
								alt="Hero"
								className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
								height="300"
								src="/placeholder.svg"
								width="1270"
							/>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 dark:bg-gray-800">
					<div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Meet our Customers
							</h2>
							<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Trusted by the best teams in the world. We help
								teams of all sizes.
							</p>
						</div>
						<div className="divide-y rounded-lg border">
							<div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
								<div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
									<img
										alt="Logo"
										className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
										height="70"
										src="/placeholder.svg"
										width="140"
									/>
								</div>
								<div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
									<img
										alt="Logo"
										className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
										height="70"
										src="/placeholder.svg"
										width="140"
									/>
								</div>
								<div className="mx-auto flex w-full items-center justify-center p-8">
									<img
										alt="Logo"
										className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
										height="70"
										src="/placeholder.svg"
										width="140"
									/>
								</div>
							</div>
							<div className="grid w-full grid-cols-3 items-stretch justify-center divide-x md:grid-cols-3">
								<div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
									<img
										alt="Logo"
										className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
										height="70"
										src="/placeholder.svg"
										width="140"
									/>
								</div>
								<div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
									<img
										alt="Logo"
										className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
										height="70"
										src="/placeholder.svg"
										width="140"
									/>
								</div>
								<div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
									<img
										alt="Logo"
										className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
										height="70"
										src="/placeholder.svg"
										width="140"
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-center space-x-4">
							<Link
								className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
								href="#"
							>
								Contact Sales
							</Link>
							<Link
								className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
								href="#"
							>
								Learn more
							</Link>
						</div>
					</div>
				</section>
				<section className="w-full py-12 md:py-24 lg:py-32 border-t">
					<div className="container px-4 md:px-6">
						<div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
							<div className="space-y-4">
								<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
									Performance
								</div>
								<h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
									Traffic spikes should be exciting, not
									scary.
								</h2>
								<Link
									className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
									href="#"
								>
									Get Started
								</Link>
							</div>
							<div className="flex flex-col items-start space-y-4">
								<div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
									Security
								</div>
								<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
									Fully managed infrastructure designed to
									scale dynamically with your traffic, a
									global edge to ensure your site is fast for
									every customer, and the tools to monitor
									every aspect of your app.
								</p>
								<Link
									className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
									href="#"
								>
									Contact Sales
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2024 Acme Inc. All rights reserved.
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
