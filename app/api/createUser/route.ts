import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/createUser";

export async function POST(request: NextRequest) {
	const { uid } = await request.json();
	const results = await createUser(uid);
	return NextResponse.json(results);
}
