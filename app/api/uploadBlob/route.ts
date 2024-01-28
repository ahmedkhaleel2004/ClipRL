import { BlobServiceClient } from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const file = await req.blob();
    const AZURE_STORAGE_CONNECTION_STRING = `DefaultEndpointsProtocol=https;AccountName=${process.env.AZURE_STORAGE_ACCOUNT_NAME};AccountKey=${process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY};EndpointSuffix=core.windows.net`;
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = "testvideo.mp4"; // Customize the file name
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const arrayBuffer = await new Response(file).arrayBuffer();
    await blockBlobClient.upload(arrayBuffer, arrayBuffer.byteLength, { blobHTTPHeaders: { blobContentType: "video/mp4" } });

    // Construct the Blob URL
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const blobUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

    return NextResponse.json({ message: "Upload successful", blobUrl: blobUrl });
}
