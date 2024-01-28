import prisma from "./prismaClient";

export const queryData = async () => {
	if (!prisma) {
		throw new Error("Prisma client is not initialized lolololol");
	}
	try {
		const data = await prisma.user.findMany();
		return data;
	} catch (error) {
		console.log("brooooo: ", error);
	} finally {
		await prisma.$disconnect();
	}
};
