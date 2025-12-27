import { SYMPTOM_SIGNALS } from "./signals.js";
import { normalize } from "./normalize.js";

function matchAny(text, signals) {
  const lowerText = text; // already normalized by caller
  for (const s of signals) {
    if (typeof s === "string") {
      const token = normalize(s);
      if (lowerText.includes(token)) return "en"; // assume English when not tagged
    } else if (s && typeof s === "object" && s.text) {
      const token = normalize(s.text);
      if (lowerText.includes(token)) return s.lang || "en";
    }
  }
  return null;
}

export function calculateRisk(text) {
  let score = 0;
  let categories = [];

  let detectedLang = "en";

  for (const [category, signals] of Object.entries(SYMPTOM_SIGNALS)) {
    const lang = matchAny(text, signals);
    if (lang) {
      categories.push(category);
      detectedLang = lang;

      if (category === "cardiac") score += 60;
      else if (category === "neurological") score += 70;
      else if (category === "bleeding") score += 80;
      else if (category === "respiratory") score += 70; // escalated
      else score += 40;
    }
  }

  return { score, categories, detectedLang };
}
