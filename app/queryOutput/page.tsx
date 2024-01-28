import ProfileClient from "@/components/component/Profile";
import { queryData } from "@/lib/getQueryOutput";
import { Button } from "@/components/ui/button";

const Query = async () => {
	const queryOutput = await queryData();
	console.log(JSON.stringify(queryOutput, null, 2));
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
