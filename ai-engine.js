// MedZamanti AI Assistant Reasoning Engine
// Manages local rule-based diagnostics and real-time Google Gemini API client calls.

/**
 * Generates an assistant response based on API settings and user profile context.
 * 
 * @param {string} userMessage - The message typed by the user.
 * @param {string} apiKey - Optional Gemini API key. If empty, local rule engine is used.
 * @param {Object} profile - User's health profile (allergies, chronic conditions, active meds).
 * @param {Array} drugsDb - The full local drug database.
 * @param {Array} interactionsDb - The drug-drug interactions database.
 * @returns {Promise<string>} The structured assistant response (HTML-formatted).
 */
export async function getAIResponse(userMessage, apiKey, profile, drugsDb, interactionsDb) {
  const query = userMessage.toLowerCase().trim();

  // Create health profile warning context if applicable
  const allergyMatches = [];
  const conditionMatches = [];
  
  // Check if query mentions any drugs that clash with the user's allergies or conditions
  drugsDb.forEach(drug => {
    if (query.includes(drug.name.toLowerCase()) || (drug.brand && query.includes(drug.brand.toLowerCase()))) {
      // Check allergy warning
      if (profile.allergies && profile.allergies.some(allergy => drug.name.toLowerCase().includes(allergy.toLowerCase()) || allergy.toLowerCase().includes(drug.name.toLowerCase()))) {
        allergyMatches.push(drug.name);
      }
      if (profile.allergies && profile.allergies.some(allergy => drug.class.toLowerCase().includes(allergy.toLowerCase()))) {
        allergyMatches.push(`${drug.name} (${drug.class})`);
      }
      
      // Check contraindications for chronic conditions
      if (profile.conditions) {
        profile.conditions.forEach(cond => {
          const condLower = cond.toLowerCase();
          const contraindicated = drug.contraindications.some(contra => contra.toLowerCase().includes(condLower));
          if (contraindicated) {
            conditionMatches.push({ drug: drug.name, condition: cond });
          }
        });
      }
    }
  });

  let safetyAlertHtml = "";
  if (allergyMatches.length > 0) {
    safetyAlertHtml += `
      <div class="safety-alert danger-alert">
        <strong>⚠️ PATIENT ALLERGY WARNING:</strong> Your profile lists allergies to <strong>${profile.allergies.join(", ")}</strong>. 
        You are asking about <strong>${allergyMatches.join(", ")}</strong>, which may trigger a severe allergic reaction. 
        Do NOT take this medication without consulting your doctor.
      </div>
    `;
  }
  if (conditionMatches.length > 0) {
    safetyAlertHtml += `
      <div class="safety-alert warning-alert">
        <strong>⚠️ CONTRAINDICATION ALERT:</strong> You are asking about <strong>${conditionMatches.map(c => c.drug).join(", ")}</strong>. 
        According to your medical profile, you have <strong>${conditionMatches.map(c => c.condition).join(", ")}</strong>. 
        This drug is contraindicated or requires extreme caution for patients with these conditions.
      </div>
    `;
  }

  const DEFAULT_API_KEY = "AIzaSyBx18P_6hxQ1kEhTAt_QJklurbLavUFXaU";
  const activeKey = (apiKey && apiKey.trim().length > 10) ? apiKey.trim() : DEFAULT_API_KEY;

  // --- CASE A: LIVE GEMINI API MODE ---
  if (activeKey) {
    try {
      const systemPrompt = `You are MedZamanti AI, a virtual clinical pharmacist and medical assistant. 
Your goal is to provide precise, evidence-based pharmacological and general medical information.
Always adhere to these guidelines:
1. Speak in a professional, empathetic, and clinically precise tone.
2. Structure your response clearly using HTML elements: Use <h3> for subheadings, <ul>/<li> for lists, <strong> for emphasis, and <table> for comparative charts or dosing schedules. DO NOT use markdown characters like ** or # - use pure HTML tags since your response will be rendered directly inside an HTML container.
3. Integrate the patient profile context provided in the prompt. Proactively warn if any drugs the user asks about conflict with their listed allergies, chronic conditions, or current medications.
4. If a drug-drug interaction is detected (based on user query or active meds), outline it clearly with its clinical mechanism.
5. Critical Safety Directive: Include a standard, compact disclaimer at the very end of your response: "Disclaimer: I am an AI pharmacy assistant, not a doctor. Consult a healthcare professional before altering medication regimens."
6. If the query indicates a medical emergency (e.g. crushing chest pain, symptoms of stroke, anaphylaxis, severe choking), output a high-visibility warning at the VERY TOP directing them to call emergency services (911) immediately.`;

      const patientContext = `
Patient Medical Profile Context:
- Age: ${profile.age || "Not specified"}
- Gender: ${profile.gender || "Not specified"}
- Allergy list: ${profile.allergies && profile.allergies.length > 0 ? profile.allergies.join(", ") : "None declared"}
- Chronic Health Conditions: ${profile.conditions && profile.conditions.length > 0 ? profile.conditions.join(", ") : "None declared"}
- Current active medications: ${profile.medications && profile.medications.length > 0 ? profile.medications.join(", ") : "None declared"}
`;

      const promptText = `${patientContext}\nUser Inquiry: ${userMessage}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: promptText
                }
              ]
            }
          ],
          systemInstruction: {
            parts: [
              {
                text: systemPrompt
              }
            ]
          },
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1200
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status} Error`);
      }

      const responseData = await response.json();
      let aiText = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!aiText) {
        throw new Error("Empty response received from Gemini API.");
      }

      // Convert any leftover markdown style formatting to HTML just in case
      aiText = aiText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/### (.*?)\n/g, '<h3>$1</h3>')
        .replace(/## (.*?)\n/g, '<h2>$1</h2>')
        .replace(/# (.*?)\n/g, '<h1>$1</h1>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');

      return safetyAlertHtml + aiText;

    } catch (apiError) {
      console.error("Gemini API Request Failed: ", apiError);
      return `
        ${safetyAlertHtml}
        <div class="api-error-card">
          <h4>📡 Gemini API Connection Failed</h4>
          <p>We encountered an error contacting the live AI model: <code>${apiError.message}</code></p>
          <p><em>Falling back to Offline Local AI Engine. You can check your API key in Settings.</em></p>
        </div>
        ${getLocalFallbackResponse(query, drugsDb, interactionsDb, profile)}
      `;
    }
  }

  // --- CASE B: OFFLINE LOCAL INTELLIGENT ROUTER ---
  return safetyAlertHtml + getLocalFallbackResponse(query, drugsDb, interactionsDb, profile);
}

/**
 * Generates responses using the local database for offline support.
 */
function getLocalFallbackResponse(query, drugsDb, interactionsDb, profile) {
  // Check for multi-drug queries to check interactions
  const mentionedDrugs = [];
  drugsDb.forEach(drug => {
    if (query.includes(drug.name.toLowerCase()) || (drug.brand && query.includes(drug.brand.toLowerCase()))) {
      mentionedDrugs.push(drug);
    }
  });

  // 1. Check for drug-drug interactions in query
  if (mentionedDrugs.length >= 2) {
    const findings = [];
    for (let i = 0; i < mentionedDrugs.length; i++) {
      for (let j = i + 1; j < mentionedDrugs.length; j++) {
        const d1 = mentionedDrugs[i].id;
        const d2 = mentionedDrugs[j].id;
        
        const interaction = interactionsDb.find(inter => 
          (inter.drug1 === d1 && inter.drug2 === d2) || 
          (inter.drug1 === d2 && inter.drug2 === d1)
        );
        if (interaction) {
          findings.push(interaction);
        }
      }
    }

    if (findings.length > 0) {
      let responseHtml = `<h3>🔍 Drug Interaction Analysis</h3><p>I detected potential drug-drug interactions between the medications you mentioned:</p>`;
      findings.forEach(inter => {
        const severityClass = inter.severity === 'severe' ? 'danger-badge' : 'warning-badge';
        responseHtml += `
          <div class="interaction-card ${inter.severity}-border">
            <span class="badge ${severityClass}">${inter.severity.toUpperCase()} RISK</span>
            <h4>${inter.title}</h4>
            <p>${inter.description}</p>
          </div>
        `;
      });
      responseHtml += `
        <p class="medical-disclaimer-box">
          <strong>Clinical Pharmacist Advice:</strong> These interactions are clinical risks. 
          Always speak with your prescriber before taking interacting medications together.
        </p>
      `;
      return responseHtml;
    }
  }

  // 2. Check if a single drug is mentioned to provide structured database search
  if (mentionedDrugs.length === 1) {
    const drug = mentionedDrugs[0];
    return `
      <h3>💊 Medication Profile: ${drug.name} (${drug.brand})</h3>
      <p><strong>Therapeutic Class:</strong> ${drug.class}</p>
      <p><strong>Description:</strong> ${drug.description}</p>
      
      <table class="clinical-table">
        <thead>
          <tr>
            <th style="width: 30%">Category</th>
            <th style="width: 70%">Clinical Guidelines</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Common Indications</strong></td>
            <td>${drug.indications.join(", ")}</td>
          </tr>
          <tr>
            <td><strong>Adult Dosage</strong></td>
            <td>${drug.dosage.adult}</td>
          </tr>
          <tr>
            <td><strong>Pediatric Dosage</strong></td>
            <td>${drug.dosage.child}</td>
          </tr>
          <tr>
            <td><strong>Common Side Effects</strong></td>
            <td>${drug.sideEffects.join(", ")}</td>
          </tr>
          <tr>
            <td><strong>Food & Alcohol</strong></td>
            <td>${drug.foodInteractions}</td>
          </tr>
          <tr>
            <td><strong>Contraindications</strong></td>
            <td>${drug.contraindications.join("<br>• ")}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="alert-box warning-box">
        <strong>⚠️ Clinical Warning:</strong> ${drug.warnings}
      </div>
      <p class="offline-note"><em>Note: You are viewing this information from the secure local database. Setup a Gemini API key in settings for dynamic chat.</em></p>
    `;
  }

  // 3. General symptoms check
  if (query.includes("fever") || query.includes("temperature") || query.includes("pyrexia")) {
    return `
      <h3>🌡️ Fever Assessment Advice</h3>
      <p>A fever is typically a sign that your body is fighting off an infection. Here are some basic pharmacological guidelines:</p>
      <ul>
        <li><strong>Antipyretics:</strong> Paracetamol (Acetaminophen) or Ibuprofen are standard options to reduce fever. Always follow package dosage carefully and check for allergies or liver/kidney conditions.</li>
        <li><strong>Non-Drug Care:</strong> Stay well-hydrated, rest, and wear lightweight clothing. Avoid cold baths as they can cause shivering, which paradoxically increases core temperature.</li>
        <li><strong>Warning Signs:</strong> Seek immediate medical care if the fever exceeds 103°F (39.4°C), lasts more than 3 days, or is accompanied by a stiff neck, severe headache, confusion, or breathing difficulties.</li>
      </ul>
      <p>👉 <em>You can also use our interactive <strong>Symptom Checker</strong> in the sidebar for a step-by-step clinical triage.</em></p>
    `;
  }

  if (query.includes("pain") || query.includes("ache") || query.includes("hurt")) {
    return `
      <h3>pain-management Pain Management Reference</h3>
      <p>For mild to moderate pain relief, the two main over-the-counter options are:</p>
      <ul>
        <li><strong>Paracetamol (Acetaminophen)</strong>: Best for headaches and general mild pain. Safe for the stomach, but must be avoided in patients with liver disease. Maximum 4000mg/day.</li>
        <li><strong>NSAIDs (Ibuprofen, Naproxen, Aspirin)</strong>: Best for inflammatory pain (muscle sprains, arthritis, dental pain). Must be taken with food. Avoid if you have active stomach ulcers, kidney disease, or severe heart failure.</li>
      </ul>
      <p><strong>Emergency warning:</strong> Sudden, crushing chest pain that radiates to the arm or jaw, or severe abdominal pain that is sharp and localized, requires immediate emergency evaluation. Please call 911 or head to an ER.</p>
    `;
  }

  if (query.includes("cough") || query.includes("cold") || query.includes("congest")) {
    return `
      <h3>🤧 Cold, Cough & Congestion Guidance</h3>
      <p>Common colds are viral infections and will not resolve with antibiotics like Amoxicillin. Treatment focus is symptomatic:</p>
      <ul>
        <li><strong>Congestion:</strong> Saline nasal sprays or oral antihistamines (like Cetirizine) can dry up running secretions. Steam inhalation is also beneficial.</li>
        <li><strong>Cough:</strong> Honey (for patients older than 1 year) is a proven natural demulcent. Hydration helps thin mucus. Cough suppressants (e.g. dextromethorphan) or expectorants (e.g. guaifenesin) can be used.</li>
        <li><strong>Fever/Aches:</strong> Use paracetamol or ibuprofen as needed.</li>
      </ul>
      <p>Consult a doctor if you experience wheezing, difficulty breathing, or symptoms lasting longer than 10 days without improvement.</p>
    `;
  }

  // 4. Fallback welcome message / instruction
  return `
    <h3>🤖 MedZamanti AI Pharmacy Assistant (Offline Mode)</h3>
    <p>Hello! I am your clinical pharmacy assistant. Currently running in <strong>Secure Offline Mode</strong>.</p>
    <p>I can help you with:</p>
    <ul>
      <li><strong>Medications:</strong> Ask about drug details (e.g., <em>"Amoxicillin dose"</em>, <em>"Side effects of ibuprofen"</em>, or <em>"What is Metformin?"</em>).</li>
      <li><strong>Drug Interactions:</strong> Enter multiple drugs to check safety (e.g., <em>"Can I take warfarin and aspirin?"</em>).</li>
      <li><strong>Symptom Assessment:</strong> Ask about symptoms or click on the <strong>Symptom Checker</strong> tab to get a triage assessment.</li>
    </ul>
    <div class="api-promo-card">
      💡 <strong>Unlock Live Clinical AI:</strong> Go to the <strong>Settings</strong> tab in the sidebar and enter a <strong>Google Gemini API Key</strong>. 
      This enables real-time, comprehensive answers to any medical or drug question with full generative intelligence!
    </div>
    <small style="color: var(--text-muted)">Disclaimer: This tool is for informational purposes only. Do not make medical decisions without consulting a physician.</small>
  `;
}
