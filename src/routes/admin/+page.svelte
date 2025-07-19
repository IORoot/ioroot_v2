<script lang="ts">
  import Navigation from '$lib/components/Navigation.svelte';
  
  let cacheInfo: any = null;
  let loading = false;
  let message = '';
  let messageType: 'success' | 'error' = 'success';
  
  async function loadCacheInfo() {
    try {
      const response = await fetch('/api/refresh-cache');
      const data = await response.json();
      if (data.success) {
        cacheInfo = data;
      }
    } catch (error) {
      console.error('Error loading cache info:', error);
    }
  }
  
  async function refreshCache() {
    loading = true;
    message = '';
    
    try {
      const response = await fetch('/api/refresh-cache', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        message = `✅ ${data.message} (${data.repos_count} repos)`;
        messageType = 'success';
        await loadCacheInfo();
      } else {
        message = `❌ ${data.message}`;
        messageType = 'error';
      }
    } catch (error) {
      message = '❌ Failed to refresh cache';
      messageType = 'error';
    } finally {
      loading = false;
    }
  }
  
  async function clearCache() {
    if (!confirm('Are you sure you want to clear the cache?')) return;
    
    loading = true;
    message = '';
    
    try {
      const response = await fetch('/api/refresh-cache', { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        message = '✅ Cache cleared successfully';
        messageType = 'success';
        cacheInfo = null;
      } else {
        message = `❌ ${data.message}`;
        messageType = 'error';
      }
    } catch (error) {
      message = '❌ Failed to clear cache';
      messageType = 'error';
    } finally {
      loading = false;
    }
  }
  
  // Load cache info on mount
  loadCacheInfo();
</script>

<svelte:head>
  <title>Admin - GitHub Cache</title>
  <meta name="description" content="Admin panel for managing GitHub cache" />
</svelte:head>

<div class="min-h-screen">
  <Navigation theme="tech" />
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">GitHub Cache Admin</h1>
    
    {#if message}
      <div class="mb-6 p-4 rounded-lg {messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}">
        {message}
      </div>
    {/if}
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Cache Info -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Cache Information</h2>
        
        {#if cacheInfo}
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="font-medium">Total Repos:</span>
              <span class="text-gray-600">{cacheInfo.repos_count}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Last Updated:</span>
              <span class="text-gray-600">{new Date(cacheInfo.cache_info?.last_updated || '').toLocaleString()}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-medium">Username:</span>
              <span class="text-gray-600">{cacheInfo.cache_info?.username || 'N/A'}</span>
            </div>
          </div>
          
          {#if cacheInfo.repos && cacheInfo.repos.length > 0}
            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Cached Repositories</h3>
              <div class="space-y-2 max-h-60 overflow-y-auto">
                {#each cacheInfo.repos as repo}
                  <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span class="font-medium">{repo.name}</span>
                    <span class="text-sm text-gray-500">{repo.language || 'N/A'}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {:else}
          <p class="text-gray-500">No cache information available</p>
        {/if}
      </div>
      
      <!-- Actions -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Actions</h2>
        
        <div class="space-y-4">
          <button 
            on:click={refreshCache}
            disabled={loading}
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? '🔄 Refreshing...' : '🔄 Refresh Cache'}
          </button>
          
          <button 
            on:click={clearCache}
            disabled={loading}
            class="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            {loading ? '🗑️ Clearing...' : '🗑️ Clear Cache'}
          </button>
          
          <button 
            on:click={loadCacheInfo}
            disabled={loading}
            class="w-full bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            📊 Reload Info
          </button>
        </div>
        
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 class="font-medium text-yellow-800 mb-2">How it works:</h3>
          <ul class="text-sm text-yellow-700 space-y-1">
            <li>• Cache updates automatically every 24 hours</li>
            <li>• Manual refresh forces immediate update</li>
            <li>• Cache stores README files and repo metadata</li>
            <li>• Improves performance and reduces API calls</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div> 