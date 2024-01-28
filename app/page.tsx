"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { ModeToggle } from "@/components/component/ModeToggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
	const { user, error, isLoading } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && user) {
			router.push("/querytest");
		} else if (!isLoading && error) {
			console.error(error);
		}
	}, [user, isLoading]);

	return (
		<div className="min-h-screen">
			<header className="flex items-center justify-between mx-8 mt-8">
				<div className="flex items-center">
					<Image
						src="/cliprllogo.svg"
						alt="ClipRL Logo"
						width={40}
						height={40}
						className="dark:invert"
					/>
					<Link className="ml-2 text-3xl font-semibold" href="/">
						ClipRL
					</Link>
				</div>
				<nav>
					<ModeToggle />
				</nav>
			</header>
			<main className="flex flex-col items-center justify-center mx-16">
				<div className="space-y-8 mb-8 mt-[30vh]">
					<h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
						Experience the past with the future.
					</h1>
					<p className="text-xl text-center">
						ClipRL allows you to experience the past by reliving
						your best moments in first person.
					</p>
				</div>
				<Button className="shadow-2xl">
					<a href="/api/auth/login">Login</a>
				</Button>
			</main>
		</div>
	);
}
