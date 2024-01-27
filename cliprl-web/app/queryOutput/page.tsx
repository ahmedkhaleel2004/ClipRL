import { queryData } from "@/lib/getQueryOutput";

const Query = async () => {
	const queryOutput = await queryData();
	console.log(JSON.stringify(queryOutput, null, 2));
	return <div>Query</div>;
};

export default Query;
