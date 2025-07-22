#!/usr/bin/env node

const https = require('https');

async function refreshCache() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5173,
      path: '/api/refresh-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          console.log('✅ Cache refresh result:', result);
          
          if (result.success) {
            console.log(`📦 Repos refreshed: ${result.repos_count}`);
            console.log(`🏷️ Tags refreshed: ${result.tags_count}`);
            if (result.tags && result.tags.length > 0) {
              console.log(`📋 Available tags: ${result.tags.join(', ')}`);
            }
            console.log(`🕒 Last updated: ${result.last_updated}`);
          }
          
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Run the refresh
refreshCache().catch(console.error); 