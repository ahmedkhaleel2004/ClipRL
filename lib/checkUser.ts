import prisma from "./prismaClient";

export const checkUser = async (uid: string): Promise<boolean> => {
	try {
		if (prisma) {
			const results = await prisma.user.findUnique({
				where: { uid: uid },
			});
			console.log(
				"results for ",
				uid,
				" are: !!!!!::::",
				results,
				" which is ",
				!!results
			);
			return !!results; // returns true if results is not null or undefined, false otherwise
		}
	} catch (error) {
		console.error(error);
	}
	return false; // returns false if prisma is not defined or an error occurs
};
