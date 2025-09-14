async function f(p,m){var r,s,i,c,u;const d=h(),y="https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",l=m.map(n=>`- ${n.name} (${n.category}): ${n.description}`).join(`
`),o={contents:[{parts:[{text:`You are an expert in workflow automation and make.com scenarios.
Given the user's automation description and the following selected apps, rank the apps as possible triggers and actions for the workflow.
Output two JSON arrays: 'triggers' and 'actions', each sorted by decreasing probability.
Only output valid JSON.

User Request: ${p}
Selected Apps:
${l}`}]}]},t=await fetch(`${y}?key=${d}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!t.ok)throw new Error("Failed to fetch from Gemini API");const a=await t.json();let e=((u=(c=(i=(s=(r=a==null?void 0:a.candidates)==null?void 0:r[0])==null?void 0:s.content)==null?void 0:i.parts)==null?void 0:c[0])==null?void 0:u.text)||"";e=e.trim(),e.startsWith("```json")&&(e=e.replace(/^```json/,"").replace(/```$/,"").trim()),e.startsWith("```")&&(e=e.replace(/^```/,"").replace(/```$/,"").trim());try{const n=JSON.parse(e);return{triggers:Array.isArray(n.triggers)?n.triggers:[],actions:Array.isArray(n.actions)?n.actions:[]}}catch{return{triggers:[],actions:[]}}}async function w(p){var a,e,r,s,i;const m=h(),d="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",l={contents:[{parts:[{text:`You are an expert in workflow automation and make.com scenarios. Your job is to:
1. Understand the user's intent and what they want to automate.
2. Refer to the official make.com documentation and best practices.
3. Surf the internet (your knowledge base) to suggest the best apps, tools, and modules for the automation.
4. Output only a valid JSON array of recommended apps/tools, each with id, name, category, and description. Example:
[
  { "id": "gmail", "name": "Gmail", "category": "Email", "description": "Send and receive emails" },
  { "id": "slack", "name": "Slack", "category": "Communication", "description": "Team messaging and notifications" }
]
Do not output anything except the JSON array.
User Request: ${p}`}]}]},g=await fetch(`${d}?key=${m}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!g.ok)throw new Error("Failed to fetch from Gemini API");const o=await g.json();let t=((i=(s=(r=(e=(a=o==null?void 0:o.candidates)==null?void 0:a[0])==null?void 0:e.content)==null?void 0:r.parts)==null?void 0:s[0])==null?void 0:i.text)||"";t=t.trim(),t.startsWith("```json")&&(t=t.replace(/^```json/,"").replace(/```$/,"").trim()),t.startsWith("```")&&(t=t.replace(/^```/,"").replace(/```$/,"").trim());try{const c=JSON.parse(t);return Array.isArray(c)?c:[]}catch{return[]}}function h(){return"AIzaSyDX31tyD9cH2bjfdwhjFZ006BdOrBEudOU"}export{w as generateRecommendedApps,h as getGeminiApiKey,f as rankTriggersAndActions};
