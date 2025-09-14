// Get ranked triggers and actions for selected apps from Gemini
// Use App type from CreateAutomation.tsx (do not import, just use the shape)
// Use the App type from CreateAutomation.tsx
type App = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }> | null;
  category: string;
  description: string;
};
export async function rankTriggersAndActions(description: string, apps: App[]): Promise<{ triggers: App[], actions: App[] }> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error('Gemini API key not set. Please add it in Settings.');
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  const appList = apps.map(app => `- ${app.name} (${app.category}): ${app.description}`).join('\n');
  const systemPrompt = `You are an expert in workflow automation and make.com scenarios.\nGiven the user's automation description and the following selected apps, rank the apps as possible triggers and actions for the workflow.\nOutput two JSON arrays: 'triggers' and 'actions', each sorted by decreasing probability.\nOnly output valid JSON.\n\nUser Request: ${description}\nSelected Apps:\n${appList}`;
  const body = {
    contents: [{ parts: [{ text: systemPrompt }] }]
  };

  const response = await fetch(`${endpoint}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini API');
  }

  const data = await response.json();
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  text = text.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '').replace(/```$/, '').trim();
  if (text.startsWith('```')) text = text.replace(/^```/, '').replace(/```$/, '').trim();
  try {
    const parsed = JSON.parse(text);
    return {
      triggers: Array.isArray(parsed.triggers) ? parsed.triggers : [],
      actions: Array.isArray(parsed.actions) ? parsed.actions : []
    };
  } catch {
    return { triggers: [], actions: [] };
  }
}
// Get recommended apps/tools for automation from Gemini
// Use App type from CreateAutomation.tsx (do not import, just use the shape)
export async function generateRecommendedApps(prompt: string): Promise<App[]> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error('Gemini API key not set. Please add it in Settings.');
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  const systemPrompt = `You are an expert in workflow automation and make.com scenarios. Your job is to:
1. Understand the user's intent and what they want to automate.
2. Refer to the official make.com documentation and best practices.
3. Surf the internet (your knowledge base) to suggest the best apps, tools, and modules for the automation.
4. Output only a valid JSON array of recommended apps/tools, each with id, name, category, and description. Example:
[
  { "id": "gmail", "name": "Gmail", "category": "Email", "description": "Send and receive emails" },
  { "id": "slack", "name": "Slack", "category": "Communication", "description": "Team messaging and notifications" }
]
Do not output anything except the JSON array.`;
  const body = {
    contents: [{ parts: [{ text: `${systemPrompt}\nUser Request: ${prompt}` }] }]
  };

  const response = await fetch(`${endpoint}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini API');
  }

  const data = await response.json();
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  text = text.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '').replace(/```$/, '').trim();
  if (text.startsWith('```')) text = text.replace(/^```/, '').replace(/```$/, '').trim();
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}
// Gemini API utility for generating tailored automations
// Usage: import { generateAutomationJson } from './gemini';

// Get API key from localStorage (or settings)
export function getGeminiApiKey(): string {
  return import.meta.env.VITE_GEMINI_API_KEY || "";
}

// Main function: send prompt to Gemini, parse response, return make.com-compatible JSON
export async function generateAutomationJson(prompt: string): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error('Gemini API key not set. Please add it in Settings.');
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  const systemPrompt = `You are an expert in workflow automation and make.com scenarios. Your job is to:
1. Understand the user's intent and what they want to automate.
2. Refer to the official make.com documentation and best practices.
3. Surf the internet (your knowledge base) to suggest the best tools, apps, and modules for the automation.
4. Output only a valid make.com scenario JSON, with all required fields and structure, ready to be imported into make.com.
5. If you need to make assumptions, use common tools (e.g., Gmail, Google Sheets, HubSpot, etc.) and explain in comments inside the JSON.
6. Do not output anything except the JSON code block.`;
  const body = {
    contents: [{ parts: [{ text: `${systemPrompt}\nUser Request: ${prompt}` }] }]
  };

  const response = await fetch(`${endpoint}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch from Gemini API');
  }

  const data = await response.json();
  // Extract the generated text from Gemini response
  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  // Try to extract JSON from response (strip code blocks, etc)
  text = text.trim();
  if (text.startsWith('```json')) text = text.replace(/^```json/, '').replace(/```$/, '').trim();
  if (text.startsWith('```')) text = text.replace(/^```/, '').replace(/```$/, '').trim();
  // Validate JSON
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2);
  } catch {
    // If not valid JSON, just return raw text
    return text;
  }
}
