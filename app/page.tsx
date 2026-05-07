/**
 * Root page — rendered as plain JSON to confirm the SDUI server is online.
 * All real logic lives at /api/ui/bottom-sheet
 */
export default function HomePage() {
  const info = {
    service: 'Locazar SDUI Server',
    version: '1.0.0',
    status: 'healthy',
    endpoints: {
      health: 'GET /',
      templates: 'GET /api/ui/bottom-sheet?action=intents',
      metadata: 'GET /api/ui/bottom-sheet?action=metadata',
      resolve: 'POST /api/ui/bottom-sheet',
    },
    documentation: 'See SDUI_README.md for full usage guide',
  };

  return (
    <pre style={{ fontFamily: 'monospace', padding: '2rem', whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(info, null, 2)}
    </pre>
  );
}
