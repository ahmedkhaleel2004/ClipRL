"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function ProfileClient() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;

	console.log("user");
	console.log(user);

	return (
		user && (
			<div>
				aw.fnakwefnajnihiui
				<Image src={user.picture || ""} alt={user.name || ""} />
				<h2>Name: {user.name}</h2>awpofjaweoifjoi
				<p>Email: {user.email}</p>
				<p> {user.org_id} </p>
			</div>
		)
	);
}
