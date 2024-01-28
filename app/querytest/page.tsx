import ProfileClient from "@/components/component/Profile";
import { queryData } from "@/lib/readUsers";
import { Button } from "@/components/ui/button";
import { createUser } from "@/lib/createUser";

const Query = async () => {
	// const queryOutput = await queryData();
	// console.log(JSON.stringify(queryOutput, null, 2));
	const createUserResult = await createUser("wow!");
	console.log(JSON.stringify(createUserResult, null, 2));
	return (
		<div>
			<ProfileClient />
			<Button className="shadow-2xl">
				<a href="/api/auth/logout">Logout</a>
			</Button>
			Query page!!
		</div>
	);
};

export default Query;
