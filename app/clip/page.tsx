"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

const Clip = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const [videoChunks, setVideoChunks] = useState<Blob[]>([]);

	const handleClip = () => {
		const blob = new Blob(videoChunks, { type: "video/webm" });
		const formData = new FormData();
		formData.append("video", blob);

		fetch("/api/clip", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				const downloadLink = document.createElement("a");
				downloadLink.href = url;
				downloadLink.download = "clip.mp4";
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			})
			.catch((error) => console.error("Error:", error));
	};

	useEffect(() => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
						videoRef.current.play();

						// Initialize MediaRecorder
						const mediaRecorder = new MediaRecorder(stream);
						mediaRecorderRef.current = mediaRecorder;
						mediaRecorder.ondataavailable = (e) => {
							if (e.data && e.data.size > 0) {
								setVideoChunks((prevChunks) =>
									[...prevChunks, e.data].slice(-30)
								); // Keep last 30 chunks
							}
						};

						// Start recording in chunks of X milliseconds
						mediaRecorder.start(1000); // Adjust chunk size as needed
					}
				});
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
			<Button onClick={handleClip}>Clip it!</Button>
		</div>
	);
};

export default Clip;
