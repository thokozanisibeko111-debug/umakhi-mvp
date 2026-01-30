// app/data/grade12.ts

export type LocalizedText = {
  en: string;
  zu: string;
};

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Example = {
  question: LocalizedText;
  steps: LocalizedText[];
  answer: LocalizedText;
  why: LocalizedText;
};

export type QuizQuestion = {
  question: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
  solution: LocalizedText;
  feedback: LocalizedText;
  difficulty: Difficulty;
};

export type TopicVisual = {
  title: LocalizedText;
  description: LocalizedText;
  svg: string;
};

export type TopicNotes = {
  intro: LocalizedText;
  sections: Array<{ title: LocalizedText; content: LocalizedText[] }>;
  formulas: LocalizedText[];
  commonMistakes: LocalizedText[];
  examTips: LocalizedText[];
  summary: LocalizedText[];
};

export type TopicContent = {
  id: string;
  title: LocalizedText;
  paper: 1 | 2;
  description: LocalizedText;
  mastery: number;
  subtopics: LocalizedText[];
  introduction: {
    outcomes: LocalizedText[];
    importance: LocalizedText;
    starterExample: Example;
  };
  notes: TopicNotes;
  visuals: TopicVisual[];
  examples: Record<Difficulty, Example[]>;
  quizzes: QuizQuestion[];
  videos: Array<{ title: LocalizedText; url: string; description: LocalizedText }>;
  askPrompts: LocalizedText[];
  progress: {
    strengths: LocalizedText[];
    weakAreas: LocalizedText[];
    nextSteps: LocalizedText[];
  };
};

// --- HIGH-QUALITY EDUCATIONAL VISUALS (SVGs) ---
const visuals = {
  sigmaNotation: `<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="150" fill="#fffbe6" rx="12"/>
    <text x="120" y="100" font-size="80" fill="#d97706" font-family="serif">∑</text>
    <text x="135" y="35" font-size="20" fill="#1e293b" font-weight="bold">n (End)</text>
    <text x="110" y="130" font-size="20" fill="#1e293b" font-weight="bold">i = 1 (Start)</text>
    <text x="180" y="80" font-size="24" fill="#334155" font-style="italic">formula</text>
    <path d="M 90 40 Q 50 40 50 80" stroke="#94a3b8" fill="none" marker-end="url(#arrow)"/>
    <text x="10" y="90" font-size="12" fill="#64748b">Sum everything!</text>
  </svg>`,

  cubicGraph: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="320" height="200" fill="#f8fafc" rx="12"/>
    <line x1="20" y1="100" x2="300" y2="100" stroke="#475569" stroke-width="1.5"/>
    <line x1="160" y1="20" x2="160" y2="180" stroke="#475569" stroke-width="1.5"/>
    <path d="M 60 170 C 100 0, 220 200, 260 30" stroke="url(#curveGrad)" stroke-width="3" fill="none"/>
    <circle cx="105" cy="55" r="5" fill="#ef4444"/>
    <text x="70" y="45" fill="#ef4444" font-size="10" font-weight="bold">Max (f'(x)=0)</text>
    <circle cx="215" cy="145" r="5" fill="#3b82f6"/>
    <text x="220" y="165" fill="#3b82f6" font-size="10" font-weight="bold">Min (f'(x)=0)</text>
  </svg>`,

  timeline: `<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
    <rect width="320" height="120" fill="#f0fdf4" rx="12"/>
    <line x1="30" y1="60" x2="290" y2="60" stroke="#10b981" stroke-width="3"/>
    <line x1="40" y1="50" x2="40" y2="70" stroke="#059669" stroke-width="2"/>
    <text x="35" y="90" fill="#065f46" font-size="12" font-weight="bold">T0</text>
    <text x="35" y="40" fill="#059669" font-size="10">Now</text>
    <line x1="160" y1="50" x2="160" y2="70" stroke="#059669" stroke-width="2"/>
    <text x="155" y="90" fill="#065f46" font-size="12">Tn</text>
    <text x="210" y="65" fill="#059669" font-size="16">...</text>
    <line x1="280" y1="50" x2="280" y2="70" stroke="#059669" stroke-width="2"/>
    <text x="270" y="90" fill="#065f46" font-size="12">Final</text>
    <text x="90" y="40" fill="#db2777" font-weight="bold" font-size="12">+ Payment (x)</text>
  </svg>`,

  treeDiagram: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="200" fill="#fff" rx="12" stroke="#e2e8f0"/>
    <circle cx="20" cy="100" r="5" fill="#333"/>
    <line x1="20" y1="100" x2="100" y2="50" stroke="#333" stroke-width="2"/>
    <text x="50" y="60" font-size="12">0.6</text>
    <text x="110" y="55" font-weight="bold">Win</text>
    <line x1="20" y1="100" x2="100" y2="150" stroke="#333" stroke-width="2"/>
    <text x="50" y="140" font-size="12">0.4</text>
    <text x="110" y="155" font-weight="bold">Lose</text>
    <line x1="140" y1="50" x2="220" y2="20" stroke="#333" stroke-width="2"/>
    <text x="230" y="25">Win (0.36)</text>
  </svg>`,

  regressionLine: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="200" fill="#fefce8" rx="12"/>
    <line x1="20" y1="180" x2="280" y2="180" stroke="#333" stroke-width="2"/>
    <line x1="20" y1="20" x2="20" y2="180" stroke="#333" stroke-width="2"/>
    <circle cx="50" cy="150" r="3" fill="#3b82f6"/>
    <circle cx="80" cy="130" r="3" fill="#3b82f6"/>
    <circle cx="120" cy="100" r="3" fill="#3b82f6"/>
    <circle cx="180" cy="80" r="3" fill="#3b82f6"/>
    <circle cx="240" cy="40" r="3" fill="#3b82f6"/>
    <line x1="40" y1="160" x2="260" y2="30" stroke="#ef4444" stroke-width="3" stroke-dasharray="5,5"/>
    <text x="180" y="160" fill="#ef4444" font-size="12">y = A + Bx</text>
  </svg>`,
};

// --- DATA CONTENT ---

export const topics: TopicContent[] = [
  // =========================================================================
  // PAPER 1: ALGEBRA, FUNCTIONS, CALCULUS, FINANCE, PROBABILITY
  // =========================================================================

  // 1. SEQUENCES & SERIES
  {
    id: 'algebra-sequences',
    title: { en: 'Sequences & Series', zu: 'Ama-Sequence nama-Series' },
    paper: 1,
    description: {
      en: 'Master Arithmetic and Geometric patterns, Sigma Notation, and Sum to Infinity.',
      zu: 'Qonda kahle amaphethini we-Arithmetic ne-Geometric, i-Sigma notation.',
    },
    mastery: 0,
    subtopics: [
      { en: 'Arithmetic Sequences (Tn = a + (n-1)d)', zu: 'Ama-Sequence we-Arithmetic' },
      { en: 'Geometric Sequences (Tn = ar^(n-1))', zu: 'Ama-Sequence we-Geometric' },
      { en: 'Sigma Notation (∑)', zu: 'Uphawu lwe-Sigma' },
      { en: 'Sum to Infinity', zu: 'Isamba esingapheli' },
    ],
    introduction: {
      outcomes: [
        { en: 'Identify linear (arithmetic) vs exponential (geometric) patterns.', zu: 'Hlukanisa phakathi kwamaphethini ahamba ngokwengeza noma ngokuphindaphinda.' },
        { en: 'Calculate the sum of a series using Sigma notation.', zu: 'Bala isamba usebenzisa i-Sigma.' },
        { en: 'Solve real-world problems (e.g. distance cycling, drilling depth).', zu: 'Xazulula izinkinga zempilo yangempela.' },
      ],
      importance: {
        en: 'This section is worth ±25 marks. It is formula-based, making it high-scoring if you practice.',
        zu: 'Le ngxenye inamamaki angama-±25. Incike kumafomula, okwenza kube lula ukuthola amamaki.'
      },
      starterExample: {
        question: { en: 'Find the 10th term: 5; 9; 13; ...', zu: 'Thola ithemu leshumi: 5; 9; 13; ...' },
        steps: [
          { en: 'Check difference: 9 - 5 = 4. 13 - 9 = 4. It is Arithmetic.', zu: 'Hlola umehluko: 9 - 5 = 4. 13 - 9 = 4. Yi-Arithmetic.' },
          { en: 'Formula: Tn = a + (n-1)d.', zu: 'Ifomula: Tn = a + (n-1)d.' },
          { en: 'Sub: T10 = 5 + (9)(4).', zu: 'Faka: T10 = 5 + (9)(4).' },
        ],
        answer: { en: '41', zu: '41' },
        why: { en: 'We add the difference (4) nine times to the first term.', zu: 'Sengeza umehluko (4) kasishiyagalolunye kuthemu yokuqala.' },
      },
    },
    notes: {
      intro: {
        en: 'A Sequence is a list of numbers. A Series is when we add them up (Sum).',
        zu: 'i-Sequence uhlu lwezinombolo. i-Series lapho sizihlanganisa khona (Isamba).',
      },
      sections: [
        {
          title: { en: 'Sigma Notation (∑)', zu: 'Uphawu lwe-Sigma (∑)' },
          content: [
            { en: 'Bottom number = Start position. Top number = End position.', zu: 'Inombolo engezansi = Qala. Ephezulu = Gcina.' },
            { en: 'Number of terms n = Top - Bottom + 1.', zu: 'Inani lamathemu n = Phezulu - Phansi + 1.' },
          ],
        },
        {
          title: { en: 'Converging Series', zu: 'Ama-Series Asondelelana' },
          content: [
            { en: 'Geometric series converge if -1 < r < 1.', zu: 'Ama-geometric series ayasondelelana uma -1 < r < 1.' },
            { en: 'The sum gets closer to a specific value as we add more terms.', zu: 'Isamba siya ngokuya sisondela kunani elithile.' },
          ],
        },
      ],
      formulas: [
        { en: 'Arithmetic Sum: Sn = n/2[2a + (n-1)d]', zu: 'Isamba se-Arithmetic: Sn = n/2[2a + (n-1)d]' },
        { en: 'Geometric Sum: Sn = a(r^n - 1) / (r - 1)', zu: 'Isamba se-Geometric: Sn = a(r^n - 1) / (r - 1)' },
        { en: 'Sum Infinity: S∞ = a / (1 - r)', zu: 'Isamba Esingapheli: S∞ = a / (1 - r)' },
      ],
      commonMistakes: [
        { en: 'Thinking n is the value of the term. n is the POSITION.', zu: 'Ukucabanga ukuthi u-n yinani lethemu. u-n YINDAWO.' },
        { en: 'Forgetting to add +1 when calculating n in Sigma.', zu: 'Ukukhohlwa ukwengeza +1 lapho ubala u-n ku-Sigma.' },
      ],
      examTips: [
        { en: 'Always write out the first 3 terms of a Sigma question before calculating.', zu: 'Ngaso sonke isikhathi bhala amathemu okuqala amathathu ombuzo we-Sigma ngaphambi kokubala.' },
      ],
      summary: [],
    },
    visuals: [
      {
        title: { en: 'Understanding Sigma', zu: 'Ukuqonda i-Sigma' },
        description: { en: 'How to read the summation symbol.', zu: 'Indlela yokufunda uphawu lokuhlanganisa.' },
        svg: visuals.sigmaNotation,
      },
    ],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // 2. FUNCTIONS (INVERSES)
  {
    id: 'functions',
    title: { en: 'Functions & Inverses', zu: 'Imisebenzi Nama-Inverse' },
    paper: 1,
    description: {
      en: 'Inverses of straight lines, parabolas, and exponentials. Logarithms.',
      zu: 'Ama-inverse emigqa eqondile, ama-parabola, nama-exponential. Ama-logarithms.',
    },
    mastery: 0,
    subtopics: [
      { en: 'Reflection in y = x', zu: 'Ukubonakala ku y = x' },
      { en: 'Inverse of Parabola (Domain Restriction)', zu: 'i-Inverse ye-Parabola' },
      { en: 'Log Functions (Inverse of Exponential)', zu: 'Imisebenzi ye-Log' },
    ],
    introduction: {
      outcomes: [
        { en: 'Determine the equation of an inverse f⁻¹(x).', zu: 'Thola i-equation ye-inverse f⁻¹(x).' },
        { en: 'Restrict the domain of a parabola to make its inverse a function.', zu: 'Vimbela i-domain ye-parabola.' },
      ],
      importance: {
        en: 'Functions are the language of math. Understanding inverses unlocks Logarithms.',
        zu: 'Imisebenzi iwulimi lwezibalo. Ukuqonda ama-inverse kuvula ama-Logarithms.'
      },
      starterExample: {
        question: { en: 'Find the inverse of y = 2x - 4.', zu: 'Thola i-inverse ka y = 2x - 4.' },
        steps: [
          { en: 'Swap x and y: x = 2y - 4.', zu: 'Shintsha x no y: x = 2y - 4.' },
          { en: 'Solve for y: x + 4 = 2y.', zu: 'Xazululela u-y: x + 4 = 2y.' },
          { en: 'Divide by 2: y = 0.5x + 2.', zu: 'Hlukanisa ngo-2: y = 0.5x + 2.' },
        ],
        answer: { en: 'f⁻¹(x) = x/2 + 2', zu: 'f⁻¹(x) = x/2 + 2' },
        why: { en: 'Inverse means swapping input and output (reflection over y=x).', zu: 'Inverse kusho ukushintsha okungena nokuphumayo.' },
      },
    },
    notes: {
      intro: { en: 'A function takes an input (x) and gives an output (y). The inverse takes the output and gives back the input.', zu: 'Umsebenzi uthatha okungena (x) ukhiphe okuphumayo (y).' },
      sections: [
        {
          title: { en: 'One-to-One vs Many-to-One', zu: 'Okukodwa-kuya-Kokukodwa vs Okuningi-kuya-Kokukodwa' },
          content: [
            { en: 'Parabola is Many-to-One. Its inverse is NOT a function unless we cut off one arm.', zu: 'IParabola ingu-Many-to-One. I-inverse yayo AYISIWO umsebenzi ngaphandle uma sisika ingalo eyodwa.' },
            { en: 'Exponential is One-to-One. Its inverse (Log) IS a function.', zu: 'I-Exponential ingu-One-to-One. I-inverse yayo (Log) ingumsebenzi.' },
          ],
        },
      ],
      formulas: [
        { en: 'Log Definition: y = logₐx ⟺ x = a^y', zu: 'Incazelo ye-Log: y = logₐx ⟺ x = a^y' },
      ],
      commonMistakes: [],
      examTips: [],
      summary: [],
    },
    visuals: [],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // 3. FINANCE
  {
    id: 'finance',
    title: { en: 'Finance (Annuities)', zu: 'Ezezimali (Annuities)' },
    paper: 1,
    description: {
      en: 'Future Value (Savings), Present Value (Loans), and Sinking Funds.',
      zu: 'Inani Lesikhathi Esizayo (Ukonga), Inani Lamanje (Izikweletu).',
    },
    mastery: 0,
    subtopics: [
      { en: 'Future Value (F Formula)', zu: 'Inani Lesikhathi Esizayo' },
      { en: 'Present Value (P Formula)', zu: 'Inani Lamanje' },
      { en: 'Deferred Payments', zu: 'Izinkokhelo Ezihlehlisiwe' },
    ],
    introduction: {
      outcomes: [
        { en: 'Choose between F and P formulas correctly.', zu: 'Khetha phakathi kwamafomula F no P ngendlela efanele.' },
        { en: 'Calculate monthly repayments for a car or house.', zu: 'Bala izinkokhelo zenyanga zemoto noma indlu.' },
      ],
      importance: {
        en: 'Real life skills! This helps you understand loans, mortgages, and retirement savings.',
        zu: 'Amakhono empilo yangempela! Lokhu kukusiza uqonde izikweletu nokonga.'
      },
      starterExample: {
        question: { en: 'Loan or Savings?', zu: 'Isikweletu noma Ukonga?' },
        steps: [
          { en: 'Are you getting money NOW to pay later? -> Loan (Present Value).', zu: 'Uthola imali MANJE ukuze ukhokhe kamuva? -> Isikweletu (P).' },
          { en: 'Are you paying NOW to get money later? -> Savings (Future Value).', zu: 'Ukhokha MANJE ukuze uthole imali kamuva? -> Ukonga (F).' },
        ],
        answer: { en: 'See visual timeline.', zu: 'Bheka umugqa wesikhathi obonakalayo.' },
        why: { en: 'Identifying the direction of cash flow is key.', zu: 'Ukukhomba lapho imali iya khona kubalulekile.' },
      },
    },
    notes: {
      intro: { en: 'Annuities are regular payments. Always draw a timeline!', zu: 'Ama-annuity izinkokhelo ezijwayelekile. Dweba umugqa wesikhathi njalo!' },
      sections: [
        {
          title: { en: 'F Formula (Future)', zu: 'Ifomula F (Ikusasa)' },
          content: [
            { en: 'Use for: Savings, Sinking Funds, Retirement.', zu: 'Sebenzisa: Ukonga, Izimali Zokutshala, Umhlalaphansi.' },
            { en: 'Money grows with interest.', zu: 'Imali iyakhula ngenzalo.' },
          ],
        },
        {
          title: { en: 'P Formula (Present)', zu: 'Ifomula P (Manje)' },
          content: [
            { en: 'Use for: Loans, Vehicles, Bonds.', zu: 'Sebenzisa: Izikweletu, Izimoto, Izibopho.' },
            { en: 'You owe a large lump sum today.', zu: 'Ukweleta isamba esikhulu namuhla.' },
          ],
        },
      ],
      formulas: [
        { en: 'F = x[ (1+i)^n - 1 ] / i', zu: 'F = x[ (1+i)^n - 1 ] / i' },
        { en: 'P = x[ 1 - (1+i)^-n ] / i', zu: 'P = x[ 1 - (1+i)^-n ] / i' },
      ],
      commonMistakes: [
        { en: 'Using n as years instead of number of payments.', zu: 'Ukusebenzisa u-n njengeminyaka esikhundleni senani lezinkokhelo.' },
        { en: 'Forgetting to divide interest rate by 12 for monthly payments.', zu: 'Ukukhohlwa ukuhlukanisa inzalo ngo-12.' },
      ],
      examTips: [],
      summary: [],
    },
    visuals: [
      {
        title: { en: 'Timeline Strategy', zu: 'Isu Lomugqa Wesikhathi' },
        description: { en: 'Map T0 to Tn. Identify where the money is.', zu: 'Dweba T0 kuya ku Tn. Khomba ukuthi imali ikuphi.' },
        svg: visuals.timeline,
      }
    ],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // 4. CALCULUS
  {
    id: 'calculus',
    title: { en: 'Calculus', zu: 'i-Calculus' },
    paper: 1,
    description: {
      en: 'Limits, Derivatives, Cubic Graphs, and Optimization.',
      zu: 'Imikhawulo, Ama-Derivative, Amagrafu we-Cubic.',
    },
    mastery: 0,
    subtopics: [
      { en: 'First Principles', zu: 'Imithetho Yokuqala' },
      { en: 'Rules of Differentiation', zu: 'Imithetho Yokuhlukanisa' },
      { en: 'Cubic Graphs (Sketching)', zu: 'Amagrafu we-Cubic' },
      { en: 'Optimization (Max/Min)', zu: 'Ukuthola Okukhulu/Okuncane' },
    ],
    introduction: {
      outcomes: [
        { en: 'Find the derivative f\'(x).', zu: 'Thola i-derivative f\'(x).' },
        { en: 'Sketch a cubic graph showing turning points.', zu: 'Dweba igrafu ye-cubic.' },
        { en: 'Solve optimization problems (e.g. max volume).', zu: 'Xazulula izinkinga zokwandisa.' },
      ],
      importance: { en: 'Calculus is about CHANGE. It is a major section of Paper 1.', zu: 'ICalculus imayelana NOSHINTSHO. Yingxenye enkulu yePhepha 1.' },
      starterExample: {
        question: { en: 'Find f\'(x) if f(x) = x³.', zu: 'Thola f\'(x) uma f(x) = x³.' },
        steps: [
          { en: 'Bring power down: 3.', zu: 'Yehlisa amandla: 3.' },
          { en: 'Subtract 1 from power: 2.', zu: 'Susa 1 emandleni: 2.' },
        ],
        answer: { en: '3x²', zu: '3x²' },
        why: { en: 'Power Rule: nx^(n-1).', zu: 'Umthetho wamandla: nx^(n-1).' },
      },
    },
    notes: {
      intro: { en: 'Calculus helps us find the gradient of curves and the maximum or minimum points.', zu: 'Isisiza ukuthola i-gradient yamajika namaphuzu amakhulu noma amancane.' },
      sections: [
        {
          title: { en: 'Turning Points', zu: 'Amaphuzu Okuma' },
          content: [
            { en: 'At a turning point, the gradient is zero.', zu: 'Ephuzwini lokuma, i-gradient inguziro.' },
            { en: 'Set f\'(x) = 0 and solve for x.', zu: 'Beka f\'(x) = 0 bese uxazululela u-x.' },
          ],
        },
      ],
      formulas: [
        { en: 'f\'(x) = lim h->0 [f(x+h) - f(x)] / h', zu: 'Ifomula Yokuqala' },
      ],
      commonMistakes: [],
      examTips: [],
      summary: [],
    },
    visuals: [
      {
        title: { en: 'Cubic Graph Features', zu: 'Izici Zegrafu ye-Cubic' },
        description: { en: 'Visualizing Max and Min points.', zu: 'Ukubona amaphuzu amakhulu namancane.' },
        svg: visuals.cubicGraph,
      }
    ],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // 5. PROBABILITY (Paper 1)
  {
    id: 'probability',
    title: { en: 'Probability', zu: 'Amathuba' },
    paper: 1,
    description: {
      en: 'Venn diagrams, Tree diagrams, Counting Principle.',
      zu: 'Imidwebo ye-Venn, Imidwebo Yesihlahla, Umthetho Wokubala.'
    },
    mastery: 0,
    subtopics: [
      { en: 'Fundamental Counting Principle', zu: 'Umthetho Oyisisekelo Wokubala' },
      { en: 'Mutually Exclusive vs Independent', zu: 'Okuhlukene vs Okuzimele' },
    ],
    introduction: {
      outcomes: [
        { en: 'Calculate number of arrangements (Factorial).', zu: 'Bala inani lamalungiselelo.' },
        { en: 'Use tree diagrams for dependent events.', zu: 'Sebenzisa imidwebo yesihlahla.' },
      ],
      importance: { en: 'Last question of Paper 1. Logical thinking required.', zu: 'Umbuzo wokugcina wePhepha 1.' },
      starterExample: {
        question: { en: 'How many ways to arrange letters ABC?', zu: 'Izindlela ezingaki zokuhlela izinhlamvu ABC?' },
        steps: [
          { en: '3 choices for first letter.', zu: 'Izinketho ezi-3 zohlamvu lokuqala.' },
          { en: '2 choices for second.', zu: 'Izinketho ezi-2 zolwesibili.' },
          { en: '1 choice for last.', zu: 'Inketho eyi-1 yolokugcina.' },
        ],
        answer: { en: '3 × 2 × 1 = 6', zu: '6' },
        why: { en: 'Multiply the choices.', zu: 'Phindaphinda izinketho.' },
      },
    },
    notes: {
      intro: { en: 'Probability is the maths of chance.', zu: 'Amathuba izibalo zenhlanhla.' },
      sections: [],
      formulas: [
        { en: 'P(A or B) = P(A) + P(B) - P(A and B)', zu: 'P(A or B) = P(A) + P(B) - P(A and B)' },
      ],
      commonMistakes: [],
      examTips: [],
      summary: [],
    },
    visuals: [
      {
        title: { en: 'Tree Diagram', zu: 'Umdwebo Wesihlahla' },
        description: { en: 'Visualizing branches of outcomes.', zu: 'Ukubona amagatsha emiphumela.' },
        svg: visuals.treeDiagram,
      }
    ],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // =========================================================================
  // PAPER 2: STATISTICS, ANALYTICAL GEO, TRIG, EUCLIDEAN GEO
  // =========================================================================

  // 6. STATISTICS
  {
    id: 'stats',
    title: { en: 'Statistics', zu: 'Izibalo (Statistics)' },
    paper: 2,
    description: {
      en: 'Regression, Correlation, Ogives, and Standard Deviation.',
      zu: 'I-Regression, Ukuhlobana, Ama-Ogive.',
    },
    mastery: 0,
    subtopics: [
      { en: 'Least Squares Regression (Line of Best Fit)', zu: 'Umugqa Wokulinganisa' },
      { en: 'Correlation Coefficient (r)', zu: 'I-Correlation (r)' },
      { en: 'Ogives (Cumulative Frequency)', zu: 'Ama-Ogive' },
    ],
    introduction: {
      outcomes: [
        { en: 'Use calculator to find A and B for y = A + Bx.', zu: 'Sebenzisa umshini ukuthola A no B.' },
        { en: 'Draw an Ogive curve.', zu: 'Dweba ijika le-Ogive.' },
      ],
      importance: { en: 'First question of Paper 2. Easy marks if you know your calculator!', zu: 'Umbuzo wokuqala wePhepha 2.' },
      starterExample: {
        question: { en: 'What does r = 0.95 mean?', zu: 'Kusho ukuthini r = 0.95?' },
        steps: [],
        answer: { en: 'Very strong positive correlation.', zu: 'Ukuhlobana okuqinile kakhulu.' },
        why: { en: 'Close to 1 is strong positive.', zu: 'Eduze kuka-1 kuqinile.' },
      },
    },
    notes: {
      intro: { en: 'Statistics organizes data to find patterns.', zu: 'Izibalo zihlela idatha ukuthola amaphethini.' },
      sections: [],
      formulas: [],
      commonMistakes: [],
      examTips: [],
      summary: [],
    },
    visuals: [
      {
        title: { en: 'Regression Line', zu: 'Umugqa Wokulinganisa' },
        description: { en: 'The line that fits the dots best.', zu: 'Umugqa olingana namachashazi kahle.' },
        svg: visuals.regressionLine,
      }
    ],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // 7. ANALYTICAL GEOMETRY
  {
    id: 'analytical-geo',
    title: { en: 'Analytical Geometry', zu: 'Analytical Geometry' },
    paper: 2,
    description: {
      en: 'Circles, Tangents, and Coordinate Geometry.',
      zu: 'Imijikelezo, Ama-Tangent, ne-Coordinate Geometry.',
    },
    mastery: 0,
    subtopics: [
      { en: 'Equation of Circle (x-a)^2 + (y-b)^2 = r^2', zu: 'i-Equation Yesiyingi' },
      { en: 'Tangents to Circles', zu: 'Ama-Tangent kwisiyingi' },
    ],
    introduction: {
      outcomes: [
        { en: 'Find the centre and radius of a circle.', zu: 'Thola isikhungo ne-radius yesiyingi.' },
        { en: 'Find the equation of a tangent.', zu: 'Thola i-equation ye-tangent.' },
      ],
      importance: { en: 'Combines Algebra and Geometry.', zu: 'Ihlanganisa i-Algebra ne-Geometry.' },
      starterExample: {
        question: { en: 'Radius gradient is 3. Tangent gradient?', zu: 'Gradient ye-radius ingu-3. Ye-tangent?' },
        steps: [
          { en: 'Tangent is perpendicular to radius.', zu: 'I-Tangent i-perpendicular kwi-radius.' },
          { en: 'Flip and change sign.', zu: 'Phendula futhi ushintshe uphawu.' },
        ],
        answer: { en: '-1/3', zu: '-1/3' },
        why: { en: 'm_tan × m_rad = -1', zu: 'm_tan × m_rad = -1' },
      },
    },
    notes: {
      intro: { en: 'Analytical Geometry places shapes on a grid.', zu: 'Ibeka izimo kugridi.' },
      sections: [],
      formulas: [
        { en: 'Circle: (x-a)² + (y-b)² = r²', zu: 'Isiyingi: (x-a)² + (y-b)² = r²' },
      ],
      commonMistakes: [],
      examTips: [],
      summary: [],
    },
    visuals: [],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // 8. TRIGONOMETRY
  {
    id: 'trigonometry',
    title: { en: 'Trigonometry', zu: 'i-Trigonometry' },
    paper: 2,
    description: {
      en: 'Compound angles, Double angles, and 3D Trig.',
      zu: 'Ama-Angle Ahlanganisiwe, Ama-Angle Aphindwe Kabili.'
    },
    mastery: 0,
    subtopics: [
      { en: 'Compound Angle Formulas', zu: 'Amafomula Ama-Angle Ahlanganisiwe' },
      { en: 'Double Angle Formulas', zu: 'Amafomula Ama-Angle Aphindwe Kabili' },
      { en: 'General Solution', zu: 'Isisombululo Esijwayelekile' },
    ],
    introduction: {
      outcomes: [
        { en: 'Expand sin(A+B).', zu: 'Nweba sin(A+B).' },
        { en: 'Prove trigonometric identities.', zu: 'Fakazela ama-identity.' },
      ],
      importance: { en: 'Huge section (±40 marks). Needs memory work.', zu: 'Ingxenye enkulu (±40 marks).' },
      starterExample: {
        question: { en: 'Expand sin(2x)', zu: 'Nweba sin(2x)' },
        steps: [],
        answer: { en: '2 sin(x)cos(x)', zu: '2 sin(x)cos(x)' },
        why: { en: 'Double angle identity.', zu: 'Identity ye-Double angle.' },
      },
    },
    notes: {
      intro: { en: 'Trig relates angles to side lengths.', zu: 'I-Trig ihlobanisa ama-angle nobude.' },
      sections: [
        {
          title: { en: 'Reduction Formulae', zu: 'Amafomula Okunciphisa' },
          content: [
            { en: 'Use CAST diagram to find the sign.', zu: 'Sebenzisa umdwebo we-CAST.' },
          ],
        },
      ],
      formulas: [],
      commonMistakes: [],
      examTips: [],
      summary: [],
    },
    visuals: [],
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  },

  // 9. EUCLIDEAN GEOMETRY
  {
    id: 'euclidean-geo',
    title: { en: 'Euclidean Geometry', zu: 'Euclidean Geometry' },
    paper: 2,
    description: {
      en: 'Circle Theorems and Proportionality (Similarity).',
      zu: 'Ama-Theorem Omjikelezo Nokuphathelana.'
    },
    mastery: 0,
    subtopics: [
      { en: 'Tan-Chord Theorem', zu: 'Tan-Chord Theorem' },
      { en: 'Cyclic Quads', zu: 'Cyclic Quads' },
      { en: 'Similarity (Triangles)', zu: 'Ukufana (Onxantathu)' },
    ],
    introduction: {
      outcomes: [
        { en: 'Prove theorems.', zu: 'Fakazela ama-theorem.' },
        { en: 'Solve "Riders" (complex diagrams).', zu: 'Xazulula imidwebo eyinkimbinkimbi.' },
      ],
      importance: { en: 'Requires training your eye to see shapes.', zu: 'Kudinga ukuqeqesha iso lakho.' },
      starterExample: {
        question: { en: 'Angle at center vs circumference?', zu: 'I-angle esikhungweni vs eseceleni?' },
        steps: [],
        answer: { en: 'Center = 2 × Circumference', zu: 'Isikhungo = 2 × Eseceleni' },
        why: { en: 'Theorem 1.', zu: 'Theorem 1.' },
      },
    },
    notes: {
      intro: { en: 'Statement and Reason are required for every step.', zu: 'Isitatimende nesizathu kuyadingeka.' },
      sections: [],
      formulas: [],
      commonMistakes: [],
      examTips: [],
      summary: [],
    },
    visuals: [], // Can re-use circle visuals from previous
    examples: { Easy: [], Medium: [], Hard: [] },
    quizzes: [],
    videos: [],
    askPrompts: [],
    progress: { strengths: [], weakAreas: [], nextSteps: [] },
  }
];

export const paperTopics = {
  1: topics.filter((topic) => topic.paper === 1),
  2: topics.filter((topic) => topic.paper === 2),
};

export const uiLabels = {
  dashboardTitle: { en: 'Grade 12 Mathematics', zu: 'IMathematics Ibanga 12' },
  paper1: { en: 'Paper 1 (Algebra)', zu: 'Iphepha 1 (Algebra)' },
  paper2: { en: 'Paper 2 (Geometry)', zu: 'Iphepha 2 (Geometry)' },
  progressSummary: { en: 'Your Progress', zu: 'Inqubekela Phambili' },
  topicsCompleted: { en: 'Topics Done', zu: 'Izihloko Eziqediwe' },
  averageMastery: { en: 'Avg Score', zu: 'Isikolo Esimaphakathi' },
  startTopic: { en: 'Start', zu: 'Qala' },
  continueTopic: { en: 'Continue', zu: 'Qhubeka' },
  introduction: { en: 'Overview', zu: 'Isingeniso' },
  notes: { en: 'Notes', zu: 'Amanothi' },
  workedExamples: { en: 'Examples', zu: 'Izibonelo' },
  quizzes: { en: 'Quiz', zu: 'Imibuzo' },
  videos: { en: 'Videos', zu: 'Amavidiyo' },
  ask: { en: 'Ask AI', zu: 'Buza AI' },
  progress: { en: 'Stats', zu: 'Izibalo' },
  masteryScore: { en: 'Level', zu: 'Ileveli' },
  chooseLanguage: { en: 'Language', zu: 'Ulimi' },
  english: { en: 'English', zu: 'IsiNgisi' },
  zulu: { en: 'isiZulu', zu: 'isiZulu' },
};
