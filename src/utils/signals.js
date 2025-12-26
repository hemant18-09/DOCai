// English + Hindi + Telugu emergency signals (extensible)
export const SYMPTOM_SIGNALS = {
  cardiac: [
    { text: "chest pain", lang: "en" },
    { text: "crushing chest", lang: "en" },
    { text: "pain in left arm", lang: "en" },
    { text: "jaw pain", lang: "en" },
    { text: "heart attack", lang: "en" },
    { text: "tightness in chest", lang: "en" },

    { text: "सीने में दर्द", lang: "hi" },
    { text: "दिल का दौरा", lang: "hi" },
    { text: "बाएं हाथ में दर्द", lang: "hi" },
    { text: "छाती में जकड़न", lang: "hi" },

    { text: "ఛాతిలో నొప్పి", lang: "te" },
    { text: "గుండె నొప్పి", lang: "te" },
    { text: "హృదయాఘాతం", lang: "te" },
  ],

  neurological: [
    "slurred speech",
    "stroke",
    "seizure",
    "arm weakness",

    "बोलने में कठिनाई",
    "लकवा",
    "दौरा",

    "మాట తడబడటం",
    "పక్షవాతం",
    "ఫిట్స్",
  ],

  respiratory: [
    { text: "shortness of breath", lang: "en" },
    { text: "cannot breathe", lang: "en" },
    { text: "gasping for air", lang: "en" },

    { text: "सांस लेने में कठिनाई", lang: "hi" },
    { text: "सांस नहीं आ रही", lang: "hi" },

    { text: "శ్వాస తీసుకోవడంలో ఇబ్బంది", lang: "te" },
    { text: "ఊపిరి రావడం లేదు", lang: "te" },
  ],

  bleeding: [
    "heavy bleeding",
    "vomiting blood",

    "बहुत ज्यादा खून बहना",
    "खून की उल्टी",

    "అధిక రక్తస్రావం",
    "రక్త వాంతులు",
  ],

  trauma: [
    "car accident",
    "head injury",

    "कार दुर्घटना",
    "सिर में चोट",

    "రోడ్డు ప్రమాదం",
    "తల గాయం",
  ],
};

export const CONTEXT_SIGNALS = {
  sudden: ["sudden", "अचानक", "అకస్మాత్తుగా"],
  worsening: ["getting worse", "बढ़ रहा है", "మరింత ఎక్కువవుతోంది"],
  exertion: ["walking", "exercise", "चलते समय", "నడుస్తున్నప్పుడు"],
  duration: ["for hours", "कई घंटों से", "గంటలుగా"],
};
