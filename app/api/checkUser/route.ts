import { NextRequest, NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";

export async function POST(request: NextRequest) {
	const { uid } = await request.json();
	const results = await checkUser(uid);
	return NextResponse.json(results);
}
