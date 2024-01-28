"use client";

import React, { useEffect } from "react";

const testUpload = () => {
	const testUpload = async () => {
		const text = "hello omar";
		const response = await fetch("/api/uploadBlob", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});
		console.log("upload response is:", response);
	};

	useEffect(() => {
		testUpload();
	}, []);

	return <div>testUpload</div>;
};

export default testUpload;
