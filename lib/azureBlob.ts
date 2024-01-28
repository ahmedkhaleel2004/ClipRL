const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const fs = require('fs');
const path = require('path');

async function main(){

	 const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    
    // Replace with your container name
    const containerName = 'uploadcontent';
    
    // Create a container client
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    // Replace with your blob name (this could be the filename you want to upload)
    const blobName = 'your-blob-name.txt';
    
    // Create a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    // Replace with the path to the file you want to upload
    const filePath = 'path/to/your/file.txt';

    // Read the file content
    const fileContent = fs.readFileSync(filePath);

    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.upload(fileContent, fileContent.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

}