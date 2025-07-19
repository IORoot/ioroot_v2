<script lang="ts">
  export let tableData: string[][];
  export let headers: string[];
  
  // Parse markdown table string and convert to structured data
  function parseMarkdownTable(markdownTable: string): { headers: string[], data: string[][] } {
    const lines = markdownTable.trim().split('\n');
    
    // Remove empty lines and filter out separator lines
    const validLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.match(/^[\|\-\s:]+$/);
    });
    
    if (validLines.length === 0) {
      return { headers: [], data: [] };
    }
    
    const headers = validLines[0].split('|').map(cell => cell.trim()).filter(cell => cell);
    
    // Get data lines (skip header)
    const dataLines = validLines.slice(1);
    const data = dataLines.map(line => {
      return line.split('|').map(cell => cell.trim()).filter(cell => cell);
    });
    
    return { headers, data };
  }
  
  // Convert markdown table string to component props
  function convertMarkdownTable(markdownTable: string) {
    const parsed = parseMarkdownTable(markdownTable);
    headers = parsed.headers;
    tableData = parsed.data;
  }
  
  // If tableData is a string (markdown), parse it
  if (typeof tableData === 'string') {
    convertMarkdownTable(tableData);
  }
</script>

<div class="overflow-x-auto my-6">
  <table class="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
    <thead class="bg-gray-50 dark:bg-gray-800">
      <tr>
        {#each headers as header}
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600">
            {header}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="bg-white dark:bg-gray-900">
      {#each tableData as row, rowIndex}
        <tr class="{rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-700">
          {#each row as cell, cellIndex}
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              {@html cell}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div> 