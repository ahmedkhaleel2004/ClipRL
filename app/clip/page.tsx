"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";

const Clip = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const chunksRef = useRef<Blob[]>([]);
	const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
		null
	);
	const messageRef = useRef<HTMLParagraphElement | null>(null);
	const ffmpegRef = useRef(new FFmpeg());

	useEffect(() => {
		load();

		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then(handleStream)
			.catch((error) =>
				console.error("Error accessing media devices:", error)
			);
	}, []);

	const load = async () => {
		const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
		const ffmpeg = ffmpegRef.current;
		ffmpeg.on("log", ({ message }) => {
			if (messageRef.current) messageRef.current.innerHTML = message;
		});
		// toBlobURL is used to bypass CORS issue, urls with the same
		// domain can be used directly.
		await ffmpeg.load({
			coreURL: await toBlobURL(
				`${baseURL}/ffmpeg-core.js`,
				"text/javascript"
			),
			wasmURL: await toBlobURL(
				`${baseURL}/ffmpeg-core.wasm`,
				"application/wasm"
			),
		});
	};

	const transcode = async (clip: Blob) => {
		const ffmpeg = ffmpegRef.current;
		// u can use 'https://ffmpegwasm.netlify.app/video/video-15s.avi' to download the video to public folder for testing
		await ffmpeg.writeFile("input.webm", await fetchFile(clip));
		await ffmpeg.exec(["-i", "input.webm", "output.mp4"]);
		const data = (await ffmpeg.readFile("output.mp4")) as any;
		if (videoRef.current)
			videoRef.current.src = URL.createObjectURL(
				new Blob([data.buffer], { type: "video/mp4" })
			);

		const blob = new Blob([data.buffer], { type: "video/mp4" });
		downloadFile(blob, "output.mp4");

		// store in firebase storage
		const storageRef = ref(storage, "videos/output.mp4");

		uploadBytes(storageRef, blob)
			.then((snapshot) => {
				console.log("Uploaded a blob or file!");
			})
			.catch((error) => {
				console.error("Error uploading file:", error);
			});
	};

	const handleStream = (stream: MediaStream) => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}

		const options = { mimeType: "video/webm" };
		const recorder = new MediaRecorder(stream, options);
		setMediaRecorder(recorder);

		recorder.ondataavailable = (event: BlobEvent) => {
			console.log(chunksRef.current.length);
			chunksRef.current.push(event.data);
		};

		recorder.start(1000); // one second chunks
	};

	const clipVideo = () => {
		if (mediaRecorder && mediaRecorder.state === "recording") {
			mediaRecorder.stop();

			console.log("stopped updating buffer");

			const blob = new Blob(chunksRef.current, { type: "video/webm" });

			transcode(blob);
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
			<Button className="shadow-2xl">
				<a href="/api/auth/logout">Logout</a>
			</Button>
			<p ref={messageRef}></p>
		</div>
	);
};

export default Clip;
