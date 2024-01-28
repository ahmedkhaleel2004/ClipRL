"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";

const Query = () => {
	const { user, error, isLoading } = useUser();
	useEffect(() => {
		const createUser = async () => {
			if (user) {
				const uid = user.sub;
				const response = await fetch("/api/createUser", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ uid }),
				});
				console.log("response is:", response);
			}
		};
		if (user) {
			createUser();
		}
	}, [user]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	return (
		<>
			{user && (
				<div>
					<h2>Name: {user.name}</h2>
					<p>Email: {user.email}</p>
					sub?: {user.sub}
				</div>
			)}
			<Button className="shadow-2xl">
				<a href="/api/auth/logout">Logout</a>
			</Button>
			Query page!!
		</>
	);
};

export default Query;
