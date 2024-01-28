"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import {
	BlobServiceClient,
	ContainerClient,
	BlockBlobClient,
} from "@azure/storage-blob";
import { read } from "fs";

const AZURE_STORAGE_CONNECTION_STRING =
	process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
	throw new Error("Azure Storage connection string is not defined");
}

const blobServiceClient: BlobServiceClient =
	BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
if (!AZURE_STORAGE_CONTAINER_NAME) {
	throw new Error("Azure Storage container name is not defined");
}

const containerClient: ContainerClient = blobServiceClient.getContainerClient(
	AZURE_STORAGE_CONTAINER_NAME
);

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
			console.log(chunksRef.current.length);
			if (chunksRef.current.length >= 30) {
				chunksRef.current.shift();
			}
			chunksRef.current.push(event.data);
		};

		recorder.start(1000); // one second chunks
	};

	const clipVideo = () => {
		if (mediaRecorder) {
			mediaRecorder.stop();

			console.log("stopped updating buffer");

			const blob = new Blob(chunksRef.current, { type: "video/webm" });
			downloadClip(blob);
		}
	};

	const downloadClip = (blob: Blob) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "clip.webm";
		// document.body.appendChild(a);
		// a.click();
		// window.URL.revokeObjectURL(url);
		// document.body.removeChild(a);

		// convert blob to file
		const file = new File([blob], "clip.webm", { type: "video/webm" });

		const reader = new FileReader();

		reader.onloadend = async function () {
			const blobName = "clip.webm";
			const localFilePath = reader.result as string;

			// Upload blob to Azure Storage
			await uploadBlobFromLocalPath(
				containerClient,
				blobName,
				localFilePath
			);
		};

		reader;
		console.log(mediaRecorder?.state);

		if (mediaRecorder) {
			if (mediaRecorder.state === "inactive") {
				setTimeout(() => {
					console.log("resumed updating buffer");
					mediaRecorder.start();
				}, 15000);
			} else {
				const stream = videoRef.current?.srcObject as MediaStream;
				if (stream) {
					handleStream(stream);
				} else {
					console.error("videoRef.current is null");
				}
			}
		}
	};

	async function uploadBlobFromLocalPath(
		containerClient: ContainerClient,
		blobName: string,
		localFilePath: string
	): Promise<void> {
		// Create blob client from container client
		const blockBlobClient: BlockBlobClient =
			containerClient.getBlockBlobClient(blobName);

		await blockBlobClient.uploadFile(localFilePath);
	}
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
		</div>
	);
};

export default Clip;
