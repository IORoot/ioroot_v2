import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');
    
    // Verify webhook signature (you should add your GitHub webhook secret)
    // const expectedSignature = crypto
    //   .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET || '')
    //   .update(body)
    //   .digest('hex');
    // 
    // if (signature !== `sha256=${expectedSignature}`) {
    //   return new Response('Unauthorized', { status: 401 });
    // }
    
    const payload = JSON.parse(body);
    
    // Handle different webhook events
    switch (request.headers.get('x-github-event')) {
      case 'push':
        // Repository was updated
        console.log('Repository updated:', payload.repository.full_name);
        break;
        
      case 'create':
        // New repository was created
        console.log('New repository created:', payload.repository.full_name);
        break;
        
      case 'delete':
        // Repository was deleted
        console.log('Repository deleted:', payload.repository.full_name);
        break;
        
      default:
        console.log('Unhandled webhook event:', request.headers.get('x-github-event'));
    }
    
    // In a real implementation, you would:
    // 1. Update your cache/database
    // 2. Trigger a rebuild of the site
    // 3. Send notifications
    
    return json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}; 