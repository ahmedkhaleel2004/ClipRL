"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/component/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/lib/firebase";
import { ref, getDownloadURL } from "firebase/storage";

function aiprompt() {
	const [videoURL, setVideoURL] = useState<string | undefined>(undefined);

	useEffect(() => {
		const storageRef = ref(storage, "videos/output.mp4");
		getDownloadURL(storageRef).then((url) => setVideoURL(url));
	});

	return (
		<div>
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
			<div className="flex flex-col justify-center items-center h-screen">
				<video src={videoURL} autoPlay muted className="border">
					Test
				</video>
				<div className="flex flex-col justify-center items-center w-80">
					<h1 className="text-3xl font-bold sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
						AI Prompt
					</h1>
					<Input
						className="flex-grow border rounded-md p-2 mt-4"
						placeholder="Enter your prompt here"
						type="text"
					/>
					<div>
						<Button className="shadow-2xl mt-4">Submit</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default aiprompt;
