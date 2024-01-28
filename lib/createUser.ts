import prisma from "./prismaClient";

export const createUser = async (uid: string) => {
	try {
		if (prisma) {
			const results = await prisma.user.upsert({
				where: { uid: uid },
				update: {}, // No updates if the user already exists
				create: { uid: uid },
			});
			return results;
		}
	} catch (error) {
		console.error(error);
	}
};
