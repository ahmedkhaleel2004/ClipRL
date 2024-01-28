import prisma from "./prismaClient";

export const createUser = async (uid: string) => {
	try {
		if (prisma) {
			const results = await prisma.user.create({
				data: {
					uid: uid,
				},
			});
			return results;
		}
	} catch (error) {
		console.error(error);
	}
};
