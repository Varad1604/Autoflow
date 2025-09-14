import { AppLayout } from '../components/layout/AppLayout';
import React from 'react';

export default function Automations() {
  // ...existing code...
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [jsonResult, setJsonResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setJsonResult(null);
    try {
      // Call Gemini API utility for LLM integration
      const { generateAutomationJson } = await import("../lib/gemini");
      const result = await generateAutomationJson(prompt);
      if (!result || result.trim() === "") {
        setError("No response received from Gemini API. Please check your API key and network connection.");
      } else {
        setJsonResult(result);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError("Error: " + e.message);
        console.error("Gemini API error:", e);
      } else {
        setError("Failed to generate automation JSON.");
        console.error("Unknown error from Gemini API:", e);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <div className="p-6 md:p-10 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Automations</h1>
        <p className="text-muted-foreground mb-8">Describe the automation you want below. The app will generate make.com-compatible JSON using Gemini.</p>
        <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-6">
          <label className="font-medium mb-2">Automation Description</label>
          <textarea
            className="border rounded-lg p-3 text-base resize-vertical min-h-[80px] bg-background"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="e.g. When a new email arrives, create a task in my project management app."
            disabled={loading}
          />
          <button
            className="btn btn-primary w-fit"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Generating..." : "Generate Automation JSON"}
          </button>
          {error && <div className="text-destructive mt-2">{error}</div>}
          {/* Debug info for troubleshooting */}
          {error && (
            <details className="mt-2 text-xs text-muted-foreground">
              <summary>Debug Info</summary>
              <div>Prompt: {prompt}</div>
              <div>API Key Present: {localStorage.getItem('geminiApiKey') ? 'Yes' : 'No'}</div>
            </details>
          )}
          {jsonResult && (
            <div className="mt-6">
              <label className="font-medium mb-2">Generated JSON</label>
              <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto whitespace-pre-wrap max-h-96">{jsonResult}</pre>
              <button
                className="btn btn-secondary mt-2"
                onClick={() => navigator.clipboard.writeText(jsonResult)}
              >Copy JSON</button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
