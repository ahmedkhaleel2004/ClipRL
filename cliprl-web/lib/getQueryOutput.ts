import prisma from "./prismaClient";

export const queryData = async () => {
	try {
		const data = await prisma.users.findMany();
		return data;
	} catch (error) {
		console.log("brooooo: ", error);
	} finally {
		await prisma.$disconnect();
	}
};
