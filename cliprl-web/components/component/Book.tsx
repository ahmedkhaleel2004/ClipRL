"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { useSwipeable } from "react-swipeable";

import { Button } from "../ui/button";
import { Car } from "lucide-react";

interface BookProps {
	pages: string[];
	// this could change to a more complex type
}

const Book: React.FC<BookProps> = ({ pages }) => {
	const [currentPage, setCurrentPage] = useState(0);

	const handlers = useSwipeable({
		onSwipedLeft: () =>
			setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1)),
		onSwipedRight: () => setCurrentPage((prev) => Math.max(prev - 1, 0)),
		// Remove the preventDefaultTouchmoveEvent property
		trackMouse: true,
	});

	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle>Book</CardTitle>
				<CardDescription>Book description</CardDescription>
			</CardHeader>
			<div {...handlers} className="">
				<div className="">
					{pages.map((page, index) => (
						<div
							key={index}
							className={`absolute w-full h-full bg-black border border-gray-300 p-4 ${
								index === currentPage ? "block" : "hidden"
							}`}
						>
							{page}
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default Book;
