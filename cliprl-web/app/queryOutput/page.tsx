import { queryData } from "@/lib/getQueryOutput";

const Query = async () => {
	const queryOutput = await queryData();
	console.log(JSON.stringify(queryOutput, null, 2));
	return <div>Query test</div>;
};

export default Query;
