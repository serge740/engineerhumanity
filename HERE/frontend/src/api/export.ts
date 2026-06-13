import api from './axios';

/**
 * Download all pages of a site as a self-contained ZIP.
 * Uses an anchor-click trick so the browser shows a native Save dialog.
 */
export async function downloadSiteZip(siteId: string, siteName: string): Promise<void> {
  const response = await api.get(`/sites/${siteId}/export`, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data], { type: 'application/zip' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `${siteName.replace(/[^a-z0-9]/gi, '_')}-export.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
