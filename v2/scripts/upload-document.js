// Configuration
const API_URL = 'http://localhost:3000/api/documents';
const API_KEY = '12345ars10';
const DOCUMENTS_DIR = './documents';

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

async function uploadDocument(filePath) {
  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath);
  
  const formData = new FormData();
  formData.append('file', fileContent, fileName);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
      },
      body: formData,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error text available');
      console.error(`Server response: ${response.status} ${response.statusText}`);
      console.error(`Response body: ${errorText}`);
      throw new Error(`Failed to upload ${fileName}: ${response.statusText} (${response.status})`);
    }
    
    const result = await response.json();
    console.log(`Successfully uploaded ${fileName}: ${result.chunkCount} chunks processed`);
    
    return result;
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error);
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`);
      console.error(`Stack trace: ${error.stack}`);
    }
    throw error;
  }
}

// Process all Markdown files in the documents directory
async function uploadAllDocuments() {
  try {
    if (!fs.existsSync(DOCUMENTS_DIR)) {
      console.error(`Documents directory '${DOCUMENTS_DIR}' does not exist.`);
      return;
    }
    
    const files = fs.readdirSync(DOCUMENTS_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(DOCUMENTS_DIR, file));
    
    console.log(`Found ${files.length} Markdown files to upload`);
    
    if (files.length === 0) {
      console.log('No markdown files found to upload.');
      return;
    }
    
    for (const file of files) {
      try {
        await uploadDocument(file);
      } catch (error) {
        console.error(`Failed to upload ${file}. Continuing with next file.`);
      }
    }
    
    console.log('All documents processed!');
  } catch (error) {
    console.error('Fatal error during document upload:', error);
  }
}

// Make sure the API server is running before starting
console.log(`Uploading documents to ${API_URL}`);
uploadAllDocuments().catch(error => {
  console.error('Unhandled error during document upload:', error);
  process.exit(1);
}); 