"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";

const Clip = () => {
	const videoRef = React.useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
						videoRef.current.play();
					}
				})
				.catch((err) => console.error(err));
		}
	}, []);

	return (
		<div>
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				className="border"
			></video>
			<Button>Clip it!</Button>
		</div>
	);
};

export default Clip;
