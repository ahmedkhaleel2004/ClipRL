"use client";

import React, { useState, useEffect } from "react";

export function CarouselForImage() {
	const [currentBackground, setCurrentBackground] = useState(0);
	const backgroundImages = [
		"happy1.jpg",
		"happy2.jpg",
		"happy3.jpg",
		"happy4.jpg",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentBackground(
				(current) => (current + 1) % backgroundImages.length
			);
		}, 5000); // Change image every 5000 milliseconds (5 seconds)

		return () => clearInterval(interval);
	}, [backgroundImages.length]);

	return (
		<div
			className="panning-background"
			style={{
				backgroundImage: `url(${backgroundImages[currentBackground]})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				transition: "background-image 1s ease-in-out",
				height: "100vh",
				width: "100vw",
			}}
		></div>
	);
}

export default CarouselForImage;
