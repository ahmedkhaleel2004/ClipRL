"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const Clip = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const chunksRef = useRef<Blob[]>([]);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
		null
	);

	useEffect(() => {
		// Request user media
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then(handleStream)
			.catch((error) =>
				console.error("Error accessing media devices:", error)
			);
	}, []);

	const handleStream = (stream: MediaStream) => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}

		const options = { mimeType: "video/webm" };
		const recorder = new MediaRecorder(stream, options);
		setMediaRecorder(recorder);

		recorder.ondataavailable = (event: BlobEvent) => {
			chunksRef.current.push(event.data);
			if (chunksRef.current.length > 30) {
				chunksRef.current.shift();
			}
		};

		recorder.start(1000); // Record in 1-second chunks
	};

	const clipVideo = () => {
		const blob = new Blob(chunksRef.current, { type: "video/webm" });
		uploadAndConvertFile(blob);
	};

	const uploadAndConvertFile = async (fileBlob: Blob) => {
		const formData = new FormData();
		formData.append("file", fileBlob, "video.webm");

		try {
			const response = await fetch("/api/clip", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const convertedBlob = await response.blob();
			downloadFile(convertedBlob, "converted-video.mp4");
		} catch (error) {
			console.error("Error during file conversion:", error);
		}
	};

	const downloadFile = (blob: Blob | MediaSource, filename: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	return (
		<div>
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				className="border"
			></video>
			<Button onClick={clipVideo}>Clip it!</Button>
		</div>
	);
};

export default Clip;
