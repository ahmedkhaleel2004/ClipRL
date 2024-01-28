import { BlobServiceClient } from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	const { text } = await req.json();
	const AZURE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${process.env.AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY};EndpointSuffix=core.windows.net`;
	const blobServiceClient = BlobServiceClient.fromConnectionString(
		AZURE_STORAGE_CONNECTION_STRING
	);
	const containerClient = blobServiceClient.getContainerClient(
		process.env.AZURE_STORAGE_CONTAINER_NAME || ""
	);

	const blobName = "inshallah.txt"; // Customize the file name
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);

	const uploadBlobResponse = await blockBlobClient.upload(text, text.length);
	return NextResponse.json({ message: "Upload successful" });
}
