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

export type VoiceContent = {
  script: LocalizedText;
  audioUrl?: string;
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
  voice?: VoiceContent;
};

const visuals = {
  functionGraph: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <line x1="20" y1="80" x2="220" y2="80" stroke="#94a3b8" />
  <line x1="120" y1="20" x2="120" y2="140" stroke="#94a3b8" />
  <path d="M30 120 L210 40" stroke="#4f46e5" stroke-width="3" fill="none"/>
  <circle cx="70" cy="100" r="4" fill="#14b8a6" />
  <circle cx="170" cy="60" r="4" fill="#14b8a6" />
</svg>`,
  sequenceTable: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <rect x="30" y="30" width="180" height="100" rx="10" fill="#eef2ff" stroke="#c7d2fe"/>
  <line x1="30" y1="70" x2="210" y2="70" stroke="#c7d2fe"/>
  <line x1="30" y1="110" x2="210" y2="110" stroke="#c7d2fe"/>
  <text x="45" y="55" font-size="12" fill="#334155">n: 1 2 3 4</text>
  <text x="45" y="95" font-size="12" fill="#334155">Tn: 3 6 9 12</text>
  <text x="45" y="135" font-size="12" fill="#334155">Δ: +3 +3 +3</text>
</svg>`,
  financeBars: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <rect x="40" y="90" width="24" height="50" fill="#a7f3d0"/>
  <rect x="80" y="70" width="24" height="70" fill="#5eead4"/>
  <rect x="120" y="50" width="24" height="90" fill="#14b8a6"/>
  <rect x="160" y="30" width="24" height="110" fill="#0f766e"/>
  <line x1="30" y1="140" x2="210" y2="140" stroke="#94a3b8"/>
</svg>`,
  algebraBalance: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <line x1="120" y1="40" x2="120" y2="120" stroke="#94a3b8" stroke-width="4"/>
  <line x1="60" y1="80" x2="180" y2="80" stroke="#4f46e5" stroke-width="4"/>
  <circle cx="60" cy="95" r="18" fill="#a7f3d0"/>
  <circle cx="180" cy="95" r="18" fill="#a7f3d0"/>
  <text x="50" y="100" font-size="12" fill="#0f766e">x+3</text>
  <text x="170" y="100" font-size="12" fill="#0f766e">9</text>
</svg>`,
  calculusCurve: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <line x1="20" y1="120" x2="220" y2="120" stroke="#94a3b8"/>
  <line x1="60" y1="20" x2="60" y2="140" stroke="#94a3b8"/>
  <path d="M30 130 C80 40, 140 40, 200 110" stroke="#4f46e5" stroke-width="3" fill="none"/>
  <line x1="90" y1="70" x2="160" y2="40" stroke="#14b8a6" stroke-width="3"/>
</svg>`,
  venn: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <circle cx="90" cy="80" r="50" fill="rgba(79,70,229,0.2)" stroke="#4f46e5"/>
  <circle cx="150" cy="80" r="50" fill="rgba(20,184,166,0.2)" stroke="#14b8a6"/>
  <text x="70" y="85" font-size="12" fill="#334155">A</text>
  <text x="155" y="85" font-size="12" fill="#334155">B</text>
</svg>`,
  trigUnit: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <circle cx="120" cy="80" r="50" fill="none" stroke="#4f46e5" stroke-width="3"/>
  <line x1="120" y1="80" x2="170" y2="60" stroke="#14b8a6" stroke-width="3"/>
  <line x1="120" y1="30" x2="120" y2="130" stroke="#94a3b8"/>
  <line x1="70" y1="80" x2="170" y2="80" stroke="#94a3b8"/>
</svg>`,
  analyticLine: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <line x1="20" y1="80" x2="220" y2="80" stroke="#94a3b8"/>
  <line x1="120" y1="20" x2="120" y2="140" stroke="#94a3b8"/>
  <line x1="40" y1="120" x2="200" y2="40" stroke="#4f46e5" stroke-width="3"/>
</svg>`,
  circleAngle: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <circle cx="120" cy="80" r="50" fill="none" stroke="#4f46e5" stroke-width="3"/>
  <line x1="120" y1="80" x2="170" y2="40" stroke="#14b8a6" stroke-width="3"/>
  <line x1="120" y1="80" x2="170" y2="120" stroke="#14b8a6" stroke-width="3"/>
  <text x="150" y="85" font-size="12" fill="#334155">∠</text>
</svg>`,
  statsBars: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="160" fill="#f8fafc"/>
  <rect x="40" y="70" width="26" height="70" fill="#c7d2fe"/>
  <rect x="80" y="50" width="26" height="90" fill="#a5b4fc"/>
  <rect x="120" y="90" width="26" height="50" fill="#818cf8"/>
  <rect x="160" y="40" width="26" height="100" fill="#4f46e5"/>
  <line x1="30" y1="140" x2="210" y2="140" stroke="#94a3b8"/>
</svg>`,
};

export const topics: TopicContent[] = [
  {
    id: 'functions',
    title: { en: 'Functions', zu: 'Imisebenzi (Functions)' },
    paper: 1,
    description: {
      en: 'Understand types of functions, domains, ranges, and graph transformations.',
      zu: 'Qonda izinhlobo zemisebenzi, i-domain, i-range, kanye nokuguqulwa kwamagrafu.',
    },
    mastery: 72,
    subtopics: [
      { en: 'Linear, quadratic, exponential, hyperbolic', zu: 'Linear, quadratic, exponential, hyperbolic' },
      { en: 'Domain and range', zu: 'I-domain ne-range' },
      { en: 'Graph interpretation and transformations', zu: 'Ukuhumusha amagrafu nokuguqulwa kwawo' },
    ],
    introduction: {
      outcomes: [
        { en: 'Identify function types from an equation or graph.', zu: 'Khomba uhlobo lomsebenzi kusuka ku-equation noma igrafu.' },
        { en: 'State the domain and range clearly.', zu: 'Bhala i-domain ne-range ngokucacile.' },
        { en: 'Apply shifts and stretches to graphs.', zu: 'Sebenzisa ukushintsha nokwelula amagrafu.' },
      ],
      importance: {
        en: 'Functions appear across Paper 1 questions and link to calculus and modelling.',
        zu: 'Imisebenzi ivela kuyo yonke i-Paper 1 futhi ixhuma ku-calculus nokumodela.',
      },
      starterExample: {
        question: {
          en: 'If f(x) = 2x + 1, find f(3).',
          zu: 'Uma f(x) = 2x + 1, thola f(3).',
        },
        steps: [
          { en: 'Substitute x = 3.', zu: 'Faka x = 3.' },
          { en: 'Compute 2(3) + 1.', zu: 'Bala 2(3) + 1.' },
        ],
        answer: { en: 'f(3) = 7.', zu: 'f(3) = 7.' },
        why: {
          en: 'A function gives one output for every input.',
          zu: 'Umsebenzi unikeza output eyodwa ku-input ngayinye.',
        },
      },
    },
    notes: {
      intro: {
        en: 'A function is a rule that turns an input x into an output y.',
        zu: 'Umsebenzi uwumthetho oguqula i-input x ibe yi-output y.',
      },
      sections: [
        {
          title: { en: 'Types of functions', zu: 'Izinhlobo zemisebenzi' },
          content: [
            { en: 'Linear: straight line, y = mx + c.', zu: 'Linear: umugqa oqondile, y = mx + c.' },
            { en: 'Quadratic: curved parabola, y = ax² + bx + c.', zu: 'Quadratic: i-parabola egobile, y = ax² + bx + c.' },
            { en: 'Exponential: grows/decays, y = ab^x.', zu: 'Exponential: ikhula/nciphisa, y = ab^x.' },
            { en: 'Hyperbolic: inverse, y = a/x.', zu: 'Hyperbolic: inverse, y = a/x.' },
          ],
        },
        {
          title: { en: 'Domain and range', zu: 'I-domain ne-range' },
          content: [
            { en: 'Domain: all allowed x-values.', zu: 'I-domain: wonke ama-x avumelekile.' },
            { en: 'Range: all possible y-values.', zu: 'I-range: wonke ama-y angenzeka.' },
            { en: 'Use restrictions like x ≠ 0 for y = a/x.', zu: 'Sebenzisa ukuvinjelwa njenge x ≠ 0 ku y = a/x.' },
          ],
        },
        {
          title: { en: 'Transformations', zu: 'Ukuguqulwa' },
          content: [
            { en: 'y = f(x) + k shifts up by k.', zu: 'y = f(x) + k kushintsha phezulu ngo k.' },
            { en: 'y = f(x - a) shifts right by a.', zu: 'y = f(x - a) kushintsha kwesokudla ngo a.' },
            { en: 'y = -f(x) reflects in the x-axis.', zu: 'y = -f(x) kubonisa ku-x-axis.' },
          ],
        },
      ],
      formulas: [
        { en: 'Gradient: m = (y2 - y1) / (x2 - x1)', zu: 'I-gradient: m = (y2 - y1) / (x2 - x1)' },
        { en: 'Exponential: y = ab^x', zu: 'Exponential: y = ab^x' },
      ],
      commonMistakes: [
        { en: 'Mixing up domain and range.', zu: 'Ukudidanisa i-domain ne-range.' },
        { en: 'Shifting in the wrong direction (x - a vs x + a).', zu: 'Ukushintsha ngendlela engalungile (x - a vs x + a).' },
      ],
      examTips: [
        { en: 'Label intercepts and asymptotes on sketches.', zu: 'Bhala ama-intercepts nama-asymptotes kumasketch.' },
        { en: 'State domain restrictions in words and symbols.', zu: 'Bhala ukuvinjelwa kwe-domain ngamazwi nangemibhalo.' },
      ],
      summary: [
        { en: 'Identify the function type from its shape or equation.', zu: 'Khomba uhlobo lomsebenzi kusuka ku-shape noma equation.' },
        { en: 'Use transformations to sketch quickly.', zu: 'Sebenzisa ukuguqulwa ukuze usketch ngokushesha.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Linear function sketch', zu: 'Isketch yomsebenzi linear' },
        description: {
          en: 'A straight line with positive gradient.',
          zu: 'Umugqa oqondile one-gradient enhle.',
        },
        svg: visuals.functionGraph,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Find f(4) for f(x) = x² - 1.', zu: 'Thola f(4) ye f(x) = x² - 1.' },
          steps: [
            { en: 'Substitute x = 4.', zu: 'Faka x = 4.' },
            { en: 'Compute 4² - 1 = 16 - 1.', zu: 'Bala 4² - 1 = 16 - 1.' },
          ],
          answer: { en: 'f(4) = 15.', zu: 'f(4) = 15.' },
          why: { en: 'Functions map inputs to outputs.', zu: 'Imisebenzi ixhumanisa ama-input nama-output.' },
        },
        {
          question: { en: 'State the y-intercept of y = 3x + 6.', zu: 'Bhala i-y-intercept ye y = 3x + 6.' },
          steps: [
            { en: 'Set x = 0.', zu: 'Beka x = 0.' },
            { en: 'y = 6.', zu: 'y = 6.' },
          ],
          answer: { en: 'y-intercept is 6.', zu: 'I-y-intercept ingu 6.' },
          why: { en: 'Intercepts occur where x or y is zero.', zu: 'Ama-intercept asenzeka lapho x noma y engu-0.' },
        },
        {
          question: { en: 'Give the domain of y = 1/x.', zu: 'Nikeza i-domain ye y = 1/x.' },
          steps: [
            { en: 'x cannot be 0 because division by 0 is undefined.', zu: 'x ayikwazi ukuba 0 ngoba ukuhlukanisa ngo-0 akuchazeki.' },
          ],
          answer: { en: 'Domain: x ≠ 0.', zu: 'I-domain: x ≠ 0.' },
          why: { en: 'The denominator cannot be zero.', zu: 'I-denominator ayikwazi ukuba 0.' },
        },
      ],
      Medium: [
        {
          question: { en: 'If f(x) = 2x - 3, find x when f(x) = 7.', zu: 'Uma f(x) = 2x - 3, thola x uma f(x) = 7.' },
          steps: [
            { en: 'Set 2x - 3 = 7.', zu: 'Beka 2x - 3 = 7.' },
            { en: 'Solve: 2x = 10, x = 5.', zu: 'Xazulula: 2x = 10, x = 5.' },
          ],
          answer: { en: 'x = 5.', zu: 'x = 5.' },
          why: { en: 'Solve for input given an output.', zu: 'Xazulula i-input uma unikeziwe i-output.' },
        },
        {
          question: { en: 'Describe the shift of y = (x - 2)².', zu: 'Chaza ukushintsha kwe y = (x - 2)².' },
          steps: [
            { en: 'Compare to y = x².', zu: 'Qhathanisa no y = x².' },
            { en: 'x - 2 shifts right by 2.', zu: 'x - 2 kushintsha kwesokudla ngo 2.' },
          ],
          answer: { en: 'Shift 2 units right.', zu: 'Shift ngo 2 kwesokudla.' },
          why: { en: 'Inside change shifts horizontally.', zu: 'Ukuguqulwa ngaphakathi kushintsha ngokuvundlile.' },
        },
        {
          question: { en: 'Find the range of y = -x² + 4.', zu: 'Thola i-range ye y = -x² + 4.' },
          steps: [
            { en: 'Parabola opens down with maximum at y = 4.', zu: 'I-parabola ivuleka phansi ngomaximum y = 4.' },
            { en: 'Range is y ≤ 4.', zu: 'I-range: y ≤ 4.' },
          ],
          answer: { en: 'Range: y ≤ 4.', zu: 'I-range: y ≤ 4.' },
          why: { en: 'Negative a makes the maximum at the vertex.', zu: 'I-a engemihle yenza i-vertex ibe yi-maximum.' },
        },
      ],
      Hard: [
        {
          question: { en: 'For f(x) = 3(x + 1) - 5, simplify.', zu: 'Ye f(x) = 3(x + 1) - 5, yenza kube lula.' },
          steps: [
            { en: 'Expand: 3x + 3 - 5.', zu: 'Khulisa: 3x + 3 - 5.' },
            { en: 'Simplify to 3x - 2.', zu: 'Yenza kube 3x - 2.' },
          ],
          answer: { en: 'f(x) = 3x - 2.', zu: 'f(x) = 3x - 2.' },
          why: { en: 'Use distributive law.', zu: 'Sebenzisa umthetho wokusabalalisa.' },
        },
        {
          question: { en: 'Find the x-intercepts of y = x² - 5x + 6.', zu: 'Thola ama-x-intercept e y = x² - 5x + 6.' },
          steps: [
            { en: 'Set y = 0: x² - 5x + 6 = 0.', zu: 'Beka y = 0: x² - 5x + 6 = 0.' },
            { en: 'Factor: (x - 2)(x - 3) = 0.', zu: 'Faktorisa: (x - 2)(x - 3) = 0.' },
          ],
          answer: { en: 'x = 2 or x = 3.', zu: 'x = 2 noma x = 3.' },
          why: { en: 'Intercepts occur where y = 0.', zu: 'Ama-intercept asenzeka lapho y = 0.' },
        },
        {
          question: { en: 'Sketch y = -2(x - 1)² + 3, state the vertex.', zu: 'Sketcha y = -2(x - 1)² + 3, uveze i-vertex.' },
          steps: [
            { en: 'Vertex form y = a(x - h)² + k.', zu: 'Ifomu ye-vertex y = a(x - h)² + k.' },
            { en: 'Vertex is (h, k) = (1, 3).', zu: 'I-vertex ingu (h, k) = (1, 3).' },
          ],
          answer: { en: 'Vertex (1, 3).', zu: 'I-vertex (1, 3).' },
          why: { en: 'Vertex form shows the maximum point.', zu: 'Ifomu ye-vertex ikhombisa iphuzu eliphezulu.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'Which function is exponential?', zu: 'Yimaphi umsebenzi i-exponential?' },
        options: [
          { en: 'y = 2x + 1', zu: 'y = 2x + 1' },
          { en: 'y = 3x²', zu: 'y = 3x²' },
          { en: 'y = 2(1.5)^x', zu: 'y = 2(1.5)^x' },
          { en: 'y = 4/x', zu: 'y = 4/x' },
        ],
        correctIndex: 2,
        solution: { en: 'Exponential functions have a constant base with variable exponent.', zu: 'I-exponential inesisekelo esingaguquki ne-exponent eguqukayo.' },
        feedback: { en: 'Look for b^x.', zu: 'Bheka b^x.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'State the domain of y = √(x - 4).', zu: 'Bhala i-domain ye y = √(x - 4).' },
        options: [
          { en: 'x ≥ 4', zu: 'x ≥ 4' },
          { en: 'x > 0', zu: 'x > 0' },
          { en: 'x ≤ 4', zu: 'x ≤ 4' },
          { en: 'All real numbers', zu: 'Zonke izinombolo zangempela' },
        ],
        correctIndex: 0,
        solution: { en: 'Inside the root must be non-negative: x - 4 ≥ 0.', zu: 'Okungaphakathi kwe-root kufanele kube ≥ 0: x - 4 ≥ 0.' },
        feedback: { en: 'Roots need non-negative inputs.', zu: 'Ama-root adinga i-input enge-negative.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'If f(x) = x² and g(x) = x - 2, find (f ∘ g)(3).', zu: 'Uma f(x) = x² no g(x) = x - 2, thola (f ∘ g)(3).' },
        options: [
          { en: '1', zu: '1' },
          { en: '9', zu: '9' },
          { en: '4', zu: '4' },
          { en: '7', zu: '7' },
        ],
        correctIndex: 0,
        solution: { en: 'g(3) = 1, then f(1) = 1² = 1.', zu: 'g(3) = 1, bese f(1) = 1² = 1.' },
        feedback: { en: 'Apply g first, then f.', zu: 'Sebenzisa g kuqala, bese f.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Functions overview', zu: 'Isifinyezo semisebenzi' },
        url: 'https://www.youtube.com/watch?v=Yl7bB8Th4ys',
        description: {
          en: 'A short recap of function families and transformations.',
          zu: 'Ukubuyekeza imindeni yemisebenzi nokuguqulwa.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain functions simply.', zu: 'Chaza imisebenzi ngendlela elula.' },
      { en: 'Why is my domain answer wrong?', zu: 'Kungani impendulo yami ye-domain ingalungile?' },
      { en: 'Give me another transformation question.', zu: 'Ngiphe omunye umbuzo wokuguqulwa.' },
    ],
    progress: {
      strengths: [
        { en: 'Identify linear vs quadratic graphs.', zu: 'Ukwehlukanisa igrafu ye-linear ne-ye-quadratic.' },
      ],
      weakAreas: [
        { en: 'Composite functions and inverses.', zu: 'Imisebenzi ehlanganisiwe nama-inverse.' },
      ],
      nextSteps: [
        { en: 'Revise inverse steps and domain restrictions.', zu: 'Buyekeza izinyathelo ze-inverse nokuvinjelwa kwe-domain.' },
      ],
    },
    voice: {
      script: {
        en: 'Think of a function as a machine: you put in x, follow the rule, and read off y. In this topic we look at common function families, how the graph shifts, and why the domain and range matter.',
        zu: 'Cabanga ngomsebenzi njengomshini: ufaka u-x, ulandele umthetho, bese uthola u-y. Kulesi sihloko sibheka izinhlobo zemisebenzi, ukushintsha kwegrafu, nokubaluleka kwe-domain ne-range.',
      },
    },
  },
  {
    id: 'number-patterns',
    title: { en: 'Number Patterns and Sequences', zu: 'Amaphethini Nezingqikithi Zezinombolo' },
    paper: 1,
    description: {
      en: 'Explore arithmetic and geometric sequences, general term, and sigma notation.',
      zu: 'Hlola ama-sequence e-arithmetic ne-geometric, i-term ejwayelekile, ne-sigma notation.',
    },
    mastery: 68,
    subtopics: [
      { en: 'Arithmetic sequences', zu: 'Ama-sequence e-arithmetic' },
      { en: 'Geometric sequences', zu: 'Ama-sequence e-geometric' },
      { en: 'General term and sigma notation', zu: 'I-term ejwayelekile ne-sigma notation' },
    ],
    introduction: {
      outcomes: [
        { en: 'Recognize arithmetic vs geometric patterns.', zu: 'Khomba i-arithmetic vs i-geometric pattern.' },
        { en: 'Find the nth term and sum.', zu: 'Thola i-nth term nesamba.' },
        { en: 'Use sigma notation correctly.', zu: 'Sebenzisa i-sigma notation kahle.' },
      ],
      importance: {
        en: 'Patterns show up in sequences, finance, and exam modelling.',
        zu: 'Amaphethini ayavela kuma-sequence, ezimalini, nasekumodeleni ku-exam.',
      },
      starterExample: {
        question: {
          en: 'Find the next term: 2, 5, 8, 11, ...',
          zu: 'Thola i-term elandelayo: 2, 5, 8, 11, ...',
        },
        steps: [
          { en: 'Common difference is +3.', zu: 'Umehluko ojwayelekile u +3.' },
          { en: 'Add 3 to 11.', zu: 'Engeza 3 ku-11.' },
        ],
        answer: { en: 'Next term = 14.', zu: 'I-term elandelayo = 14.' },
        why: { en: 'Arithmetic sequences add a constant difference.', zu: 'Ama-sequence e-arithmetic engeza umehluko ongaguquki.' },
      },
    },
    notes: {
      intro: {
        en: 'Sequences follow a rule that generates each term.',
        zu: 'Ama-sequence alandela umthetho okhiqiza i-term ngayinye.',
      },
      sections: [
        {
          title: { en: 'Arithmetic sequences', zu: 'Ama-sequence e-arithmetic' },
          content: [
            { en: 'Constant difference d between terms.', zu: 'Umehluko ongaguquki d phakathi kwama-term.' },
            { en: 'Nth term: Tn = a + (n - 1)d.', zu: 'I-nth term: Tn = a + (n - 1)d.' },
          ],
        },
        {
          title: { en: 'Geometric sequences', zu: 'Ama-sequence e-geometric' },
          content: [
            { en: 'Constant ratio r between terms.', zu: 'I-ratio engaguquki r phakathi kwama-term.' },
            { en: 'Nth term: Tn = ar^(n - 1).', zu: 'I-nth term: Tn = ar^(n - 1).' },
          ],
        },
        {
          title: { en: 'Sigma notation', zu: 'I-sigma notation' },
          content: [
            { en: 'Σ means sum of terms.', zu: 'Σ kusho isamba sama-term.' },
            { en: 'Write clear limits (e.g., Σ from n = 1 to 5).', zu: 'Bhala imingcele ecacile (isb. Σ ukusuka ku n = 1 kuya ku 5).' },
          ],
        },
      ],
      formulas: [
        { en: 'Arithmetic sum: Sn = n/2 [2a + (n - 1)d]', zu: 'Isamba se-arithmetic: Sn = n/2 [2a + (n - 1)d]' },
        { en: 'Geometric sum: Sn = a(1 - r^n) / (1 - r)', zu: 'Isamba se-geometric: Sn = a(1 - r^n) / (1 - r)' },
      ],
      commonMistakes: [
        { en: 'Mixing difference and ratio.', zu: 'Ukudidanisa umehluko ne-ratio.' },
        { en: 'Using wrong n in the nth term formula.', zu: 'Ukusebenzisa n engalungile ku-nth term formula.' },
      ],
      examTips: [
        { en: 'Always write the first term a and common difference/ratio clearly.', zu: 'Bhala i-term yokuqala a kanye no d/r ngokucacile.' },
      ],
      summary: [
        { en: 'Arithmetic adds a constant difference.', zu: 'I-arithmetic ingeza umehluko ongaguquki.' },
        { en: 'Geometric multiplies by a constant ratio.', zu: 'I-geometric iphindaphinda nge-ratio engaguquki.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Sequence table', zu: 'Itafula le-sequence' },
        description: {
          en: 'A table shows term numbers and values with a constant difference.',
          zu: 'Itafula libonisa izinombolo zama-term kanye ne-value enomehluko ongaguquki.',
        },
        svg: visuals.sequenceTable,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Find the 5th term of 4, 7, 10, ...', zu: 'Thola i-term yesi-5 ye 4, 7, 10, ...' },
          steps: [
            { en: 'a = 4, d = 3.', zu: 'a = 4, d = 3.' },
            { en: 'T5 = 4 + 4(3) = 16.', zu: 'T5 = 4 + 4(3) = 16.' },
          ],
          answer: { en: '16', zu: '16' },
          why: { en: 'Use Tn = a + (n - 1)d.', zu: 'Sebenzisa Tn = a + (n - 1)d.' },
        },
        {
          question: { en: 'Is 2, 6, 18, ... arithmetic or geometric?', zu: 'Ingabe 2, 6, 18, ... i-arithmetic noma i-geometric?' },
          steps: [
            { en: 'Ratios: 6/2 = 3, 18/6 = 3.', zu: 'Ama-ratio: 6/2 = 3, 18/6 = 3.' },
          ],
          answer: { en: 'Geometric (ratio 3).', zu: 'Geometric (ratio 3).' },
          why: { en: 'Constant ratio means geometric.', zu: 'I-ratio engaguquki isho i-geometric.' },
        },
        {
          question: { en: 'Write Σ notation for 5 + 6 + 7.', zu: 'Bhala i-Σ notation ye 5 + 6 + 7.' },
          steps: [
            { en: 'This is sum of n from 5 to 7.', zu: 'Lena isamba sika n ukusuka ku 5 kuya ku 7.' },
          ],
          answer: { en: 'Σ (n = 5 to 7) n', zu: 'Σ (n = 5 to 7) n' },
          why: { en: 'Sigma shows a compact sum.', zu: 'I-sigma ibonisa isamba esifushane.' },
        },
      ],
      Medium: [
        {
          question: { en: 'Find n if the nth term 2 + (n - 1)3 = 23.', zu: 'Thola n uma i-nth term 2 + (n - 1)3 = 23.' },
          steps: [
            { en: 'Solve: 2 + 3n - 3 = 23.', zu: 'Xazulula: 2 + 3n - 3 = 23.' },
            { en: '3n - 1 = 23, 3n = 24.', zu: '3n - 1 = 23, 3n = 24.' },
          ],
          answer: { en: 'n = 8.', zu: 'n = 8.' },
          why: { en: 'Set the nth term equal to the given value.', zu: 'Beka i-nth term ilingane ne-value enikeziwe.' },
        },
        {
          question: { en: 'Find the 4th term of a geometric sequence with a = 3, r = 2.', zu: 'Thola i-term yesi-4 ye-geometric sequence eno a = 3, r = 2.' },
          steps: [
            { en: 'T4 = 3(2)^(3).', zu: 'T4 = 3(2)^(3).' },
            { en: 'T4 = 3 * 8 = 24.', zu: 'T4 = 3 * 8 = 24.' },
          ],
          answer: { en: '24', zu: '24' },
          why: { en: 'Use Tn = ar^(n - 1).', zu: 'Sebenzisa Tn = ar^(n - 1).' },
        },
        {
          question: { en: 'Find the sum of the first 5 terms of 1, 4, 7, ...', zu: 'Thola isamba sama-term ayi-5 okuqala e 1, 4, 7, ...' },
          steps: [
            { en: 'a = 1, d = 3, n = 5.', zu: 'a = 1, d = 3, n = 5.' },
            { en: 'Sn = 5/2 [2 + 4(3)] = 5/2(14) = 35.', zu: 'Sn = 5/2 [2 + 4(3)] = 5/2(14) = 35.' },
          ],
          answer: { en: '35', zu: '35' },
          why: { en: 'Use arithmetic sum formula.', zu: 'Sebenzisa ifomula yesamba se-arithmetic.' },
        },
      ],
      Hard: [
        {
          question: { en: 'A geometric sequence has T2 = 6 and T4 = 24. Find r.', zu: 'I-geometric sequence inama T2 = 6 ne T4 = 24. Thola r.' },
          steps: [
            { en: 'T2 = ar, T4 = ar^3.', zu: 'T2 = ar, T4 = ar^3.' },
            { en: 'Divide: T4/T2 = r^2 = 24/6 = 4.', zu: 'Hlukanisa: T4/T2 = r^2 = 24/6 = 4.' },
          ],
          answer: { en: 'r = 2 or r = -2.', zu: 'r = 2 noma r = -2.' },
          why: { en: 'Ratio squared equals the term ratio.', zu: 'I-ratio yesikwele ilingana neratio lama-term.' },
        },
        {
          question: { en: 'Find n if Sn = 120 for arithmetic sequence a = 2, d = 2.', zu: 'Thola n uma Sn = 120 ku-arithmetic sequence a = 2, d = 2.' },
          steps: [
            { en: 'Sn = n/2 [2a + (n - 1)d] = n/2 [4 + 2n - 2].', zu: 'Sn = n/2 [2a + (n - 1)d] = n/2 [4 + 2n - 2].' },
            { en: 'Simplify: n/2 (2n + 2) = n(n + 1) = 120.', zu: 'Yenza kube: n/2 (2n + 2) = n(n + 1) = 120.' },
          ],
          answer: { en: 'n = 10 or n = -12 (reject negative).', zu: 'n = 10 noma n = -12 (khahlela okubi).' },
          why: { en: 'Use the sum formula then solve the quadratic.', zu: 'Sebenzisa ifomula yesamba bese uxazulula i-quadratic.' },
        },
        {
          question: { en: 'Write Σ notation for 3 + 6 + 12 + ... + 96.', zu: 'Bhala i-Σ notation ye 3 + 6 + 12 + ... + 96.' },
          steps: [
            { en: 'Sequence is geometric with a = 3, r = 2.', zu: 'I-sequence i-geometric eno a = 3, r = 2.' },
            { en: 'Find n: 3(2)^(n - 1) = 96 → 2^(n - 1) = 32 → n = 6.', zu: 'Thola n: 3(2)^(n - 1) = 96 → 2^(n - 1) = 32 → n = 6.' },
          ],
          answer: { en: 'Σ from n = 1 to 6 of 3(2)^(n - 1).', zu: 'Σ ukusuka ku n = 1 kuya ku 6 ye 3(2)^(n - 1).' },
          why: { en: 'Sigma uses the general term and limits.', zu: 'I-sigma isebenzisa i-term ejwayelekile nemingcele.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'Which sequence is arithmetic?', zu: 'Yiliphi i-sequence i-arithmetic?' },
        options: [
          { en: '2, 4, 8, 16', zu: '2, 4, 8, 16' },
          { en: '3, 7, 11, 15', zu: '3, 7, 11, 15' },
          { en: '5, 10, 20, 40', zu: '5, 10, 20, 40' },
          { en: '1, 2, 4, 8', zu: '1, 2, 4, 8' },
        ],
        correctIndex: 1,
        solution: { en: 'Constant difference of 4.', zu: 'Umehluko ongaguquki u-4.' },
        feedback: { en: 'Check the differences between terms.', zu: 'Hlola umehluko phakathi kwama-term.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Find the 6th term of 1, 3, 9, ...', zu: 'Thola i-term yesi-6 ye 1, 3, 9, ...' },
        options: [
          { en: '243', zu: '243' },
          { en: '162', zu: '162' },
          { en: '729', zu: '729' },
          { en: '81', zu: '81' },
        ],
        correctIndex: 0,
        solution: { en: 'Geometric with r = 3: T6 = 1 * 3^5 = 243.', zu: 'Geometric eno r = 3: T6 = 1 * 3^5 = 243.' },
        feedback: { en: 'Use Tn = ar^(n - 1).', zu: 'Sebenzisa Tn = ar^(n - 1).' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'Find n if Tn = 50 in arithmetic sequence 2, 5, 8, ...', zu: 'Thola n uma Tn = 50 ku-arithmetic sequence 2, 5, 8, ...' },
        options: [
          { en: '17', zu: '17' },
          { en: '16', zu: '16' },
          { en: '15', zu: '15' },
          { en: '18', zu: '18' },
        ],
        correctIndex: 1,
        solution: { en: 'Tn = 2 + (n - 1)3 = 50 → 3n - 1 = 50 → n = 17.', zu: 'Tn = 2 + (n - 1)3 = 50 → 3n - 1 = 50 → n = 17.' },
        feedback: { en: 'Set Tn equal to 50 and solve.', zu: 'Beka Tn ilingane no 50 bese uxazulula.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Sequences refresher', zu: 'Isibuyekezo se-sequence' },
        url: 'https://www.youtube.com/watch?v=_vKDDf0QZkE',
        description: {
          en: 'Learn how to spot arithmetic and geometric sequences quickly.',
          zu: 'Funda ukuthi uwabona kanjani ama-sequence e-arithmetic ne-geometric ngokushesha.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain sigma notation simply.', zu: 'Chaza i-sigma notation ngendlela elula.' },
      { en: 'Give me another geometric sequence question.', zu: 'Ngiphe omunye umbuzo we-geometric sequence.' },
    ],
    progress: {
      strengths: [
        { en: 'Arithmetic difference calculations.', zu: 'Ukubala umehluko ku-arithmetic.' },
      ],
      weakAreas: [
        { en: 'Solving for n in sums.', zu: 'Ukuxazulula n ezisambeni.' },
      ],
      nextSteps: [
        { en: 'Practice sigma notation problems.', zu: 'Zijwayeze izinkinga ze-sigma notation.' },
      ],
    },
  },
  {
    id: 'finance',
    title: { en: 'Finance, Growth and Decay', zu: 'Ezezimali, Ukukhula Nokuncipha' },
    paper: 1,
    description: {
      en: 'Use simple and compound interest, depreciation, and inflation models.',
      zu: 'Sebenzisa izindlela zenzalo elula, i-compound, ukwehla, nokunyuka kwamanani.',
    },
    mastery: 64,
    subtopics: [
      { en: 'Simple and compound interest', zu: 'Inzalo elula ne-compound' },
      { en: 'Depreciation and inflation', zu: 'Ukwehla nokunyuka kwamanani' },
      { en: 'Appreciation and growth models', zu: 'Ukwenyuka kwenani nokukhula' },
    ],
    introduction: {
      outcomes: [
        { en: 'Use the correct finance formula for a situation.', zu: 'Sebenzisa ifomula efanele esimweni sezimali.' },
        { en: 'Interpret growth and decay graphs.', zu: 'Humusha amagrafu okukhula nokuncipha.' },
        { en: 'Calculate future and present values.', zu: 'Bala inani le-future nele-present.' },
      ],
      importance: {
        en: 'Finance questions link maths to real-life money decisions.',
        zu: 'Imibuzo yezimali ixhumanisa izibalo nezinketho zempilo.',
      },
      starterExample: {
        question: {
          en: 'R1000 at 10% simple interest for 2 years. Find interest.',
          zu: 'R1000 ngenxalo elula engu-10% iminyaka emi-2. Thola inzalo.',
        },
        steps: [
          { en: 'Use I = Prt.', zu: 'Sebenzisa I = Prt.' },
          { en: 'I = 1000 × 0.10 × 2 = 200.', zu: 'I = 1000 × 0.10 × 2 = 200.' },
        ],
        answer: { en: 'Interest = R200.', zu: 'Inzalo = R200.' },
        why: { en: 'Simple interest is linear over time.', zu: 'Inzalo elula ikhula ngokulingana ngesikhathi.' },
      },
    },
    notes: {
      intro: {
        en: 'Finance uses exponential models for growth and decay.',
        zu: 'Ezezimali zisebenzisa amamodeli e-exponential okukhula nokuncipha.',
      },
      sections: [
        {
          title: { en: 'Simple interest', zu: 'Inzalo elula' },
          content: [
            { en: 'Formula: I = Prt.', zu: 'Ifomula: I = Prt.' },
            { en: 'Total amount: A = P + I.', zu: 'Inani eliphelele: A = P + I.' },
          ],
        },
        {
          title: { en: 'Compound interest', zu: 'Inzalo ehlanganisiwe' },
          content: [
            { en: 'Formula: A = P(1 + i)^n.', zu: 'Ifomula: A = P(1 + i)^n.' },
            { en: 'Growth is faster because interest earns interest.', zu: 'Ukukhula kushesha ngoba inzalo ithola inzalo.' },
          ],
        },
        {
          title: { en: 'Depreciation and inflation', zu: 'Ukwehla nokunyuka kwamanani' },
          content: [
            { en: 'Use A = P(1 - i)^n for depreciation.', zu: 'Sebenzisa A = P(1 - i)^n ku-depreciation.' },
            { en: 'Inflation increases prices over time.', zu: 'I-inflation inyusa amanani ngokuhamba kwesikhathi.' },
          ],
        },
      ],
      formulas: [
        { en: 'Simple interest: I = Prt', zu: 'Inzalo elula: I = Prt' },
        { en: 'Compound: A = P(1 + i)^n', zu: 'Compound: A = P(1 + i)^n' },
      ],
      commonMistakes: [
        { en: 'Using simple interest formula for compound problems.', zu: 'Ukusebenzisa ifomula elula endaweni ye-compound.' },
        { en: 'Forgetting to convert % to decimals.', zu: 'Ukukhohlwa ukuguqula % ibe ama-decimal.' },
      ],
      examTips: [
        { en: 'Write down P, i, n clearly before calculating.', zu: 'Bhala P, i, n ngokucacile ngaphambi kokubala.' },
      ],
      summary: [
        { en: 'Compound interest grows exponentially.', zu: 'Inzalo ehlanganisiwe ikhula nge-exponential.' },
        { en: 'Depreciation is decay: use (1 - i).', zu: 'Ukwehla kuyincipho: sebenzisa (1 - i).' },
      ],
    },
    visuals: [
      {
        title: { en: 'Growth bars', zu: 'Amabha okukhula' },
        description: {
          en: 'Bar chart shows increasing values over time.',
          zu: 'I-bar chart ibonisa amanani akhuphuka ngokuhamba kwesikhathi.',
        },
        svg: visuals.financeBars,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Calculate simple interest on R500 at 8% for 3 years.', zu: 'Bala inzalo elula ku R500 ngo-8% iminyaka emi-3.' },
          steps: [
            { en: 'I = Prt = 500 × 0.08 × 3.', zu: 'I = Prt = 500 × 0.08 × 3.' },
            { en: 'I = 120.', zu: 'I = 120.' },
          ],
          answer: { en: 'R120', zu: 'R120' },
          why: { en: 'Simple interest multiplies principal, rate, time.', zu: 'Inzalo elula iphindaphinda i-principal, i-rate, nesikhathi.' },
        },
        {
          question: { en: 'Find A if P = R1000, i = 5%, n = 1 (compound).', zu: 'Thola A uma P = R1000, i = 5%, n = 1 (compound).' },
          steps: [
            { en: 'A = 1000(1 + 0.05)^1.', zu: 'A = 1000(1 + 0.05)^1.' },
          ],
          answer: { en: 'R1050', zu: 'R1050' },
          why: { en: 'One period of compound adds 5%.', zu: 'Isikhathi esisodwa se-compound sengeza u-5%.' },
        },
        {
          question: { en: 'A phone loses 20% value yearly. Find value after 1 year on R2000.', zu: 'Ifoni yehlisa inani ngo-20% ngonyaka. Thola inani ngemuva konyaka ku R2000.' },
          steps: [
            { en: 'A = 2000(1 - 0.20).', zu: 'A = 2000(1 - 0.20).' },
          ],
          answer: { en: 'R1600', zu: 'R1600' },
          why: { en: 'Depreciation uses (1 - i).', zu: 'Ukwehla usebenzisa (1 - i).' },
        },
      ],
      Medium: [
        {
          question: { en: 'R1500 grows at 6% compound for 3 years. Find A.', zu: 'R1500 ikhula ngo-6% compound iminyaka emi-3. Thola A.' },
          steps: [
            { en: 'A = 1500(1.06)^3.', zu: 'A = 1500(1.06)^3.' },
            { en: 'A ≈ 1786.52.', zu: 'A ≈ 1786.52.' },
          ],
          answer: { en: '≈ R1786.52', zu: '≈ R1786.52' },
          why: { en: 'Compound applies growth each year.', zu: 'I-compound isebenzisa ukukhula njalo ngonyaka.' },
        },
        {
          question: { en: 'An item depreciates 10% yearly. Find value after 2 years from R5000.', zu: 'Into yehlisa ngo-10% ngonyaka. Thola inani ngemva kweminyaka emi-2 kusuka ku R5000.' },
          steps: [
            { en: 'A = 5000(0.9)^2.', zu: 'A = 5000(0.9)^2.' },
            { en: 'A = 4050.', zu: 'A = 4050.' },
          ],
          answer: { en: 'R4050', zu: 'R4050' },
          why: { en: 'Decay multiplies by (1 - i) each year.', zu: 'Ukuncipha kuphindaphinda ngo (1 - i) njalo ngonyaka.' },
        },
        {
          question: { en: 'Find the interest rate if R2000 becomes R2420 in 2 years (compound).', zu: 'Thola i-rate uma R2000 iba R2420 eminyakeni emi-2 (compound).' },
          steps: [
            { en: '2420 = 2000(1 + i)^2.', zu: '2420 = 2000(1 + i)^2.' },
            { en: '(1 + i)^2 = 1.21 → 1 + i = 1.1.', zu: '(1 + i)^2 = 1.21 → 1 + i = 1.1.' },
          ],
          answer: { en: 'i = 10%.', zu: 'i = 10%.' },
          why: { en: 'Solve for the growth factor.', zu: 'Xazulula i-growth factor.' },
        },
      ],
      Hard: [
        {
          question: { en: 'Inflation is 7% yearly. A basket costs R500. Find cost after 4 years.', zu: 'I-inflation ingu-7% ngonyaka. Ibhasikidi libiza R500. Thola inani ngemva kweminyaka emi-4.' },
          steps: [
            { en: 'A = 500(1.07)^4.', zu: 'A = 500(1.07)^4.' },
            { en: 'A ≈ 655.40.', zu: 'A ≈ 655.40.' },
          ],
          answer: { en: '≈ R655.40', zu: '≈ R655.40' },
          why: { en: 'Inflation is exponential growth.', zu: 'I-inflation iwukukhula kwe-exponential.' },
        },
        {
          question: { en: 'A car value drops from R180 000 to R131 220 in 3 years. Find depreciation rate.', zu: 'Inani lemoto lehla lisuka ku R180 000 liye ku R131 220 eminyakeni emi-3. Thola i-rate yokwehla.' },
          steps: [
            { en: '131220 = 180000(1 - i)^3.', zu: '131220 = 180000(1 - i)^3.' },
            { en: '(1 - i)^3 = 0.729 → 1 - i = 0.9.', zu: '(1 - i)^3 = 0.729 → 1 - i = 0.9.' },
          ],
          answer: { en: 'i = 10%.', zu: 'i = 10%.' },
          why: { en: 'Take cube root of decay factor.', zu: 'Thatha i-cube root ye-decay factor.' },
        },
        {
          question: { en: 'R3000 invested at 5% per year. How long to reach R4000?', zu: 'R3000 itshalwe ngo-5% ngonyaka. Kuthatha isikhathi esingakanani ukufinyelela ku R4000?' },
          steps: [
            { en: '4000 = 3000(1.05)^n.', zu: '4000 = 3000(1.05)^n.' },
            { en: '(1.05)^n = 1.333..., use log: n = log(1.333)/log(1.05).', zu: '(1.05)^n = 1.333..., sebenzisa log: n = log(1.333)/log(1.05).' },
          ],
          answer: { en: 'n ≈ 5.9 years.', zu: 'n ≈ 5.9 iminyaka.' },
          why: { en: 'Use logarithms to solve for time.', zu: 'Sebenzisa ama-log ukuXazulula isikhathi.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'Simple interest formula is:', zu: 'Ifomula yenzalo elula ithi:' },
        options: [
          { en: 'A = P(1 + i)^n', zu: 'A = P(1 + i)^n' },
          { en: 'I = Prt', zu: 'I = Prt' },
          { en: 'A = P(1 - i)^n', zu: 'A = P(1 - i)^n' },
          { en: 'A = P + i', zu: 'A = P + i' },
        ],
        correctIndex: 1,
        solution: { en: 'I = Prt gives interest for simple interest.', zu: 'I = Prt inikeza inzalo elula.' },
        feedback: { en: 'Simple interest uses I = Prt.', zu: 'Inzalo elula isebenzisa I = Prt.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Find A for P = 2000, i = 4%, n = 3 (compound).', zu: 'Thola A uma P = 2000, i = 4%, n = 3 (compound).' },
        options: [
          { en: 'R2240', zu: 'R2240' },
          { en: 'R2249.73', zu: 'R2249.73' },
          { en: 'R2400', zu: 'R2400' },
          { en: 'R2080', zu: 'R2080' },
        ],
        correctIndex: 1,
        solution: { en: 'A = 2000(1.04)^3 = 2249.73.', zu: 'A = 2000(1.04)^3 = 2249.73.' },
        feedback: { en: 'Remember to compound for 3 years.', zu: 'Khumbula ukusebenzisa i-compound iminyaka emi-3.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'A value decays by 15% yearly. What is the decay factor?', zu: 'Inani liyehla ngo-15% ngonyaka. Iyiphi i-decay factor?' },
        options: [
          { en: '0.15', zu: '0.15' },
          { en: '1.15', zu: '1.15' },
          { en: '0.85', zu: '0.85' },
          { en: '15', zu: '15' },
        ],
        correctIndex: 2,
        solution: { en: 'Decay factor is (1 - i) = 0.85.', zu: 'I-decay factor ingu (1 - i) = 0.85.' },
        feedback: { en: 'Subtract the rate from 1.', zu: 'Susa i-rate ku-1.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Compound interest explained', zu: 'I-compound interest ichazwe' },
        url: 'https://www.youtube.com/watch?v=Z4D0uH5GLn0',
        description: {
          en: 'A quick guide to using compound interest formulas.',
          zu: 'Umhlahlandlela omfushane wokusebenzisa ifomula ye-compound interest.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain compound interest simply.', zu: 'Chaza i-compound interest ngendlela elula.' },
      { en: 'Why is my depreciation answer wrong?', zu: 'Kungani impendulo yami ye-depreciation ingalungile?' },
    ],
    progress: {
      strengths: [
        { en: 'Simple interest calculations.', zu: 'Ukubala inzalo elula.' },
      ],
      weakAreas: [
        { en: 'Solving for time using logs.', zu: 'Ukuxazulula isikhathi usebenzisa ama-log.' },
      ],
      nextSteps: [
        { en: 'Practice compound growth with different rates.', zu: 'Zijwayeze ukukhula kwe-compound ngezinga ehlukene.' },
      ],
    },
  },
  {
    id: 'algebra',
    title: { en: 'Algebra', zu: 'I-Algebra' },
    paper: 1,
    description: {
      en: 'Manipulate expressions, solve equations and inequalities, and work with exponents.',
      zu: 'Shintsha izisho, xazulula ama-equation ne-inequalities, futhi usebenze nge-exponents.',
    },
    mastery: 70,
    subtopics: [
      { en: 'Manipulating algebraic expressions', zu: 'Ukushintsha izisho ze-algebra' },
      { en: 'Equations and inequalities', zu: 'Ama-equation ne-inequalities' },
      { en: 'Exponents and surds', zu: 'Ama-exponent ne-surds' },
    ],
    introduction: {
      outcomes: [
        { en: 'Simplify algebraic expressions cleanly.', zu: 'Yenza izisho ze-algebra zibe lula ngokucacile.' },
        { en: 'Solve linear and quadratic equations.', zu: 'Xazulula ama-equation e-linear ne-quadratic.' },
        { en: 'Use exponent rules correctly.', zu: 'Sebenzisa imithetho ye-exponent kahle.' },
      ],
      importance: {
        en: 'Algebra is the language used in every topic of Mathematics.',
        zu: 'I-algebra ulimi olusetshenziswa kuzo zonke izihloko zeMathematics.',
      },
      starterExample: {
        question: { en: 'Simplify 3x + 2x.', zu: 'Yenza kube lula 3x + 2x.' },
        steps: [
          { en: 'Add like terms: 3x + 2x = 5x.', zu: 'Hlanganisa ama-term afanayo: 3x + 2x = 5x.' },
        ],
        answer: { en: '5x', zu: '5x' },
        why: { en: 'Like terms have the same variable and power.', zu: 'Ama-term afanayo anogugu olulodwa ne-power efanayo.' },
      },
    },
    notes: {
      intro: {
        en: 'Algebra uses symbols to represent numbers and relationships.',
        zu: 'I-algebra isebenzisa izimpawu ukumelwa kwezinombolo nobudlelwano.',
      },
      sections: [
        {
          title: { en: 'Expressions', zu: 'Izisho' },
          content: [
            { en: 'Factor and expand carefully.', zu: 'Faktorisa futhi wandise ngokucophelela.' },
            { en: 'Collect like terms.', zu: 'Qoqa ama-term afanayo.' },
          ],
        },
        {
          title: { en: 'Equations and inequalities', zu: 'Ama-equation ne-inequalities' },
          content: [
            { en: 'Perform the same operation on both sides.', zu: 'Yenza isenzo esifanayo ezinhlangothini zombili.' },
            { en: 'Flip inequality sign when multiplying by a negative.', zu: 'Guqula uphawu lwe-inequality uma uphindaphinda ngo-nega.' },
          ],
        },
        {
          title: { en: 'Exponents and surds', zu: 'Ama-exponent ne-surds' },
          content: [
            { en: 'a^m a^n = a^(m+n).', zu: 'a^m a^n = a^(m+n).' },
            { en: '√a √b = √(ab).', zu: '√a √b = √(ab).' },
          ],
        },
      ],
      formulas: [
        { en: '(a + b)² = a² + 2ab + b²', zu: '(a + b)² = a² + 2ab + b²' },
        { en: 'a^0 = 1 (a ≠ 0)', zu: 'a^0 = 1 (a ≠ 0)' },
      ],
      commonMistakes: [
        { en: 'Adding exponents when multiplying different bases.', zu: 'Ukungeza ama-exponent uma uphindaphinda ama-base ahlukene.' },
        { en: 'Forgetting to flip inequality sign with negative.', zu: 'Ukukhohlwa ukuguqula uphawu lwe-inequality ngo-negative.' },
      ],
      examTips: [
        { en: 'Show each algebra step clearly to earn method marks.', zu: 'Khombisa isinyathelo ngasinye ukuze uthole amamaki.' },
      ],
      summary: [
        { en: 'Simplify first, then solve.', zu: 'Yenza kube lula kuqala, bese uxazulula.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Balancing equation', zu: 'Ukulinganisa i-equation' },
        description: {
          en: 'A balance scale shows both sides must stay equal.',
          zu: 'Isikali sokulinganisa sikhombisa ukuthi izinhlangothi zombili kufanele zilingane.',
        },
        svg: visuals.algebraBalance,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Solve 2x + 5 = 13.', zu: 'Xazulula 2x + 5 = 13.' },
          steps: [
            { en: 'Subtract 5: 2x = 8.', zu: 'Susa 5: 2x = 8.' },
            { en: 'Divide by 2: x = 4.', zu: 'Hlukanisa ngo-2: x = 4.' },
          ],
          answer: { en: 'x = 4', zu: 'x = 4' },
          why: { en: 'Keep equation balanced.', zu: 'Gcina i-equation ilinganile.' },
        },
        {
          question: { en: 'Simplify (x + 3) + (2x - 1).', zu: 'Yenza kube lula (x + 3) + (2x - 1).' },
          steps: [
            { en: 'Combine like terms: x + 2x = 3x.', zu: 'Hlanganisa ama-term afanayo: x + 2x = 3x.' },
            { en: 'Combine constants: 3 - 1 = 2.', zu: 'Hlanganisa ama-constant: 3 - 1 = 2.' },
          ],
          answer: { en: '3x + 2', zu: '3x + 2' },
          why: { en: 'Like terms add together.', zu: 'Ama-term afanayo ayahlanganiswa.' },
        },
        {
          question: { en: 'Simplify 5a² / a.', zu: 'Yenza kube lula 5a² / a.' },
          steps: [
            { en: 'Subtract exponents: a^(2-1).', zu: 'Susa ama-exponent: a^(2-1).' },
          ],
          answer: { en: '5a', zu: '5a' },
          why: { en: 'Division subtracts exponents.', zu: 'Ukuhlukanisa kususa ama-exponent.' },
        },
      ],
      Medium: [
        {
          question: { en: 'Solve x² - 9 = 0.', zu: 'Xazulula x² - 9 = 0.' },
          steps: [
            { en: 'Factor: (x - 3)(x + 3) = 0.', zu: 'Faktorisa: (x - 3)(x + 3) = 0.' },
          ],
          answer: { en: 'x = 3 or x = -3', zu: 'x = 3 noma x = -3' },
          why: { en: 'Zero product property.', zu: 'Umthetho we-zero product.' },
        },
        {
          question: { en: 'Solve 3x - 4 < 11.', zu: 'Xazulula 3x - 4 < 11.' },
          steps: [
            { en: 'Add 4: 3x < 15.', zu: 'Engeza 4: 3x < 15.' },
            { en: 'Divide by 3: x < 5.', zu: 'Hlukanisa ngo-3: x < 5.' },
          ],
          answer: { en: 'x < 5', zu: 'x < 5' },
          why: { en: 'Keep inequality direction with positive division.', zu: 'Gcina uphawu lwe-inequality uma uhlukanisa ngo-positive.' },
        },
        {
          question: { en: 'Simplify (2x)(3x²).', zu: 'Yenza kube lula (2x)(3x²).' },
          steps: [
            { en: 'Multiply coefficients: 2 × 3 = 6.', zu: 'Phindaphinda ama-coefficient: 2 × 3 = 6.' },
            { en: 'Add exponents: x^(1+2) = x³.', zu: 'Engeza ama-exponent: x^(1+2) = x³.' },
          ],
          answer: { en: '6x³', zu: '6x³' },
          why: { en: 'Multiply same bases by adding exponents.', zu: 'Phindaphinda ama-base afanayo ngokwengeza ama-exponent.' },
        },
      ],
      Hard: [
        {
          question: { en: 'Solve 2x² - 5x - 3 = 0.', zu: 'Xazulula 2x² - 5x - 3 = 0.' },
          steps: [
            { en: 'Factor: (2x + 1)(x - 3) = 0.', zu: 'Faktorisa: (2x + 1)(x - 3) = 0.' },
          ],
          answer: { en: 'x = -1/2 or x = 3', zu: 'x = -1/2 noma x = 3' },
          why: { en: 'Factorise then apply zero product.', zu: 'Faktorisa bese usebenzisa zero product.' },
        },
        {
          question: { en: 'Solve inequality: -2x + 4 ≥ 10.', zu: 'Xazulula inequality: -2x + 4 ≥ 10.' },
          steps: [
            { en: 'Subtract 4: -2x ≥ 6.', zu: 'Susa 4: -2x ≥ 6.' },
            { en: 'Divide by -2 and flip: x ≤ -3.', zu: 'Hlukanisa ngo -2 bese uguqula: x ≤ -3.' },
          ],
          answer: { en: 'x ≤ -3', zu: 'x ≤ -3' },
          why: { en: 'Negative division flips inequality.', zu: 'Ukuhlukanisa ngo-negative ku-guqula inequality.' },
        },
        {
          question: { en: 'Simplify √50.', zu: 'Yenza kube lula √50.' },
          steps: [
            { en: 'Factor 50 = 25 × 2.', zu: 'Hlanganisa 50 = 25 × 2.' },
            { en: '√50 = √25 √2 = 5√2.', zu: '√50 = √25 √2 = 5√2.' },
          ],
          answer: { en: '5√2', zu: '5√2' },
          why: { en: 'Extract perfect squares.', zu: 'Khipha ama-square aphelele.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'Simplify 4x - 2x.', zu: 'Yenza kube lula 4x - 2x.' },
        options: [
          { en: '2', zu: '2' },
          { en: '2x', zu: '2x' },
          { en: '6x', zu: '6x' },
          { en: '8x', zu: '8x' },
        ],
        correctIndex: 1,
        solution: { en: 'Like terms subtract to 2x.', zu: 'Ama-term afanayo ayasuswa abe 2x.' },
        feedback: { en: 'Only coefficients change.', zu: 'Kushintsha ama-coefficient kuphela.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Solve x² = 16.', zu: 'Xazulula x² = 16.' },
        options: [
          { en: 'x = 4', zu: 'x = 4' },
          { en: 'x = -4', zu: 'x = -4' },
          { en: 'x = ±4', zu: 'x = ±4' },
          { en: 'x = 8', zu: 'x = 8' },
        ],
        correctIndex: 2,
        solution: { en: 'Both 4 and -4 square to 16.', zu: 'Kokubili 4 no -4 baphinda ku-16.' },
        feedback: { en: 'Remember positive and negative roots.', zu: 'Khumbula izimpande ezinhle nezimbi.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'Solve 2^(x) = 32.', zu: 'Xazulula 2^(x) = 32.' },
        options: [
          { en: 'x = 4', zu: 'x = 4' },
          { en: 'x = 5', zu: 'x = 5' },
          { en: 'x = 6', zu: 'x = 6' },
          { en: 'x = 3', zu: 'x = 3' },
        ],
        correctIndex: 1,
        solution: { en: '2^5 = 32.', zu: '2^5 = 32.' },
        feedback: { en: 'Write 32 as a power of 2.', zu: 'Bhala 32 njenge-power ka-2.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Algebra essentials', zu: 'Okubalulekile ku-algebra' },
        url: 'https://www.youtube.com/watch?v=H6WmWQ_d0rE',
        description: {
          en: 'Solve equations and simplify expressions step by step.',
          zu: 'Xazulula ama-equation futhi wenze izisho zibe lula ngesinyathelo ngesinyathelo.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain this equation step by step.', zu: 'Chaza le equation isinyathelo ngesinyathelo.' },
      { en: 'Give me another inequality question.', zu: 'Ngiphe omunye umbuzo we-inequality.' },
    ],
    progress: {
      strengths: [
        { en: 'Solving linear equations.', zu: 'Ukuxazulula ama-equation e-linear.' },
      ],
      weakAreas: [
        { en: 'Quadratic factorisation.', zu: 'I-factoring ye-quadratic.' },
      ],
      nextSteps: [
        { en: 'Practice factorising quadratics.', zu: 'Zijwayeze i-factorisation ye-quadratic.' },
      ],
    },
  },
  {
    id: 'calculus',
    title: { en: 'Differential Calculus', zu: 'I-Differential Calculus' },
    paper: 1,
    description: {
      en: 'Learn limits, differentiation rules, and applications of tangents and optimization.',
      zu: 'Funda ama-limit, imithetho yokudifferentiation, kanye nezicelo zama-tangent nokwenza kahle.',
    },
    mastery: 60,
    subtopics: [
      { en: 'Limits (introductory)', zu: 'Ama-limit (isisekelo)' },
      { en: 'Differentiation rules', zu: 'Imithetho yokudifferentiation' },
      { en: 'Tangents, normals, maxima and minima', zu: 'Ama-tangent, ama-normal, ama-maxima nama-minima' },
    ],
    introduction: {
      outcomes: [
        { en: 'Find derivatives using basic rules.', zu: 'Thola ama-derivative usebenzisa imithetho eyisisekelo.' },
        { en: 'Find equations of tangents and normals.', zu: 'Thola ama-equation e-tangent ne-normal.' },
        { en: 'Apply calculus to optimization problems.', zu: 'Sebenzisa i-calculus ezinkingeni ze-optimization.' },
      ],
      importance: {
        en: 'Calculus links rates of change to graphs and real-world problems.',
        zu: 'I-calculus ixhumanisa izinga lokushintsha namagrafu nezinkinga zangempela.',
      },
      starterExample: {
        question: { en: 'Differentiate f(x) = x².', zu: 'Differenti-ya f(x) = x².' },
        steps: [
          { en: 'Use power rule: d/dx x² = 2x.', zu: 'Sebenzisa umthetho we-power: d/dx x² = 2x.' },
        ],
        answer: { en: 'f\'(x) = 2x.', zu: 'f\'(x) = 2x.' },
        why: { en: 'Power rule reduces the exponent by 1.', zu: 'Umthetho we-power wehlisa i-exponent ngo-1.' },
      },
    },
    notes: {
      intro: {
        en: 'Differentiation measures how fast a function changes.',
        zu: 'I-differentiation ikala ukuthi umsebenzi ushintsha ngokushesha kangakanani.',
      },
      sections: [
        {
          title: { en: 'Basic rules', zu: 'Imithetho eyisisekelo' },
          content: [
            { en: 'd/dx (x^n) = nx^(n-1).', zu: 'd/dx (x^n) = nx^(n-1).' },
            { en: 'd/dx (sin x) = cos x.', zu: 'd/dx (sin x) = cos x.' },
          ],
        },
        {
          title: { en: 'Tangents and normals', zu: 'Ama-tangent nama-normal' },
          content: [
            { en: 'Tangent slope = derivative at a point.', zu: 'I-slope ye-tangent = derivative endaweni.' },
            { en: 'Normal slope is negative reciprocal.', zu: 'I-slope ye-normal ingu-negative reciprocal.' },
          ],
        },
        {
          title: { en: 'Optimization', zu: 'Ukulungiselela (optimization)' },
          content: [
            { en: 'Stationary points where f\'(x) = 0.', zu: 'Amaphuzu ezimiso lapho f\'(x) = 0.' },
            { en: 'Use second derivative or sign chart to classify.', zu: 'Sebenzisa i-second derivative noma ishadi lempawu.' },
          ],
        },
      ],
      formulas: [
        { en: 'Gradient at x = a: m = f\'(a)', zu: 'I-gradient ku x = a: m = f\'(a)' },
        { en: 'Normal slope: m_n = -1/m', zu: 'I-slope ye-normal: m_n = -1/m' },
      ],
      commonMistakes: [
        { en: 'Forgetting to apply chain rule.', zu: 'Ukukhohlwa umthetho we-chain.' },
        { en: 'Using wrong x-value for tangent line.', zu: 'Ukusebenzisa x engalungile kumugqa we-tangent.' },
      ],
      examTips: [
        { en: 'Always state f\'(x) before substituting.', zu: 'Bhala f\'(x) ngaphambi kokufaka.' },
      ],
      summary: [
        { en: 'Derivative gives slope and rate of change.', zu: 'I-derivative inikeza i-slope nezinga lokushintsha.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Curve with tangent', zu: 'I-curve ne-tangent' },
        description: {
          en: 'The tangent touches the curve at one point.',
          zu: 'I-tangent ithinta i-curve endaweni eyodwa.',
        },
        svg: visuals.calculusCurve,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Differentiate f(x) = 5x.', zu: 'Differenti-ya f(x) = 5x.' },
          steps: [
            { en: 'Derivative of ax is a.', zu: 'I-derivative ye ax ingu a.' },
          ],
          answer: { en: 'f\'(x) = 5.', zu: 'f\'(x) = 5.' },
          why: { en: 'Constant multiple rule.', zu: 'Umthetho we-constant multiple.' },
        },
        {
          question: { en: 'Find the gradient of f(x) = x² at x = 2.', zu: 'Thola i-gradient ye f(x) = x² ku x = 2.' },
          steps: [
            { en: 'f\'(x) = 2x.', zu: 'f\'(x) = 2x.' },
            { en: 'f\'(2) = 4.', zu: 'f\'(2) = 4.' },
          ],
          answer: { en: 'Gradient = 4.', zu: 'I-gradient = 4.' },
          why: { en: 'Derivative gives slope at that point.', zu: 'I-derivative inikeza i-slope kulelo phuzu.' },
        },
        {
          question: { en: 'Differentiate f(x) = x³.', zu: 'Differenti-ya f(x) = x³.' },
          steps: [
            { en: 'Power rule: 3x².', zu: 'Umthetho we-power: 3x².' },
          ],
          answer: { en: 'f\'(x) = 3x².', zu: 'f\'(x) = 3x².' },
          why: { en: 'Bring down exponent.', zu: 'Yehlisa i-exponent.' },
        },
      ],
      Medium: [
        {
          question: { en: 'Find equation of tangent to y = x² at x = 1.', zu: 'Thola i-equation ye-tangent ye y = x² ku x = 1.' },
          steps: [
            { en: 'f\'(x) = 2x → slope m = 2.', zu: 'f\'(x) = 2x → i-slope m = 2.' },
            { en: 'Point: (1, 1). Use y - 1 = 2(x - 1).', zu: 'Iphuzu: (1, 1). Sebenzisa y - 1 = 2(x - 1).' },
          ],
          answer: { en: 'y = 2x - 1.', zu: 'y = 2x - 1.' },
          why: { en: 'Use point-slope form.', zu: 'Sebenzisa ifomu le-point-slope.' },
        },
        {
          question: { en: 'Differentiate f(x) = 3x² - 4x + 7.', zu: 'Differenti-ya f(x) = 3x² - 4x + 7.' },
          steps: [
            { en: 'Derivative: 6x - 4.', zu: 'I-derivative: 6x - 4.' },
          ],
          answer: { en: 'f\'(x) = 6x - 4.', zu: 'f\'(x) = 6x - 4.' },
          why: { en: 'Differentiate term by term.', zu: 'Differenti-ya i-term ngayinye.' },
        },
        {
          question: { en: 'Find stationary points of f(x) = x² - 4x.', zu: 'Thola ama-stationary points e f(x) = x² - 4x.' },
          steps: [
            { en: 'f\'(x) = 2x - 4.', zu: 'f\'(x) = 2x - 4.' },
            { en: 'Set 2x - 4 = 0 → x = 2.', zu: 'Beka 2x - 4 = 0 → x = 2.' },
          ],
          answer: { en: 'x = 2 (point is (2, -4)).', zu: 'x = 2 (iphuzu ngu (2, -4)).' },
          why: { en: 'Stationary where derivative is zero.', zu: 'Stationary lapho i-derivative = 0.' },
        },
      ],
      Hard: [
        {
          question: { en: 'Find equation of normal to y = x² at x = 2.', zu: 'Thola i-equation ye-normal ye y = x² ku x = 2.' },
          steps: [
            { en: 'Slope of tangent: f\'(x) = 2x → 4.', zu: 'I-slope ye-tangent: f\'(x) = 2x → 4.' },
            { en: 'Normal slope = -1/4.', zu: 'I-slope ye-normal = -1/4.' },
            { en: 'Point: (2, 4). Use y - 4 = -1/4(x - 2).', zu: 'Iphuzu: (2, 4). Sebenzisa y - 4 = -1/4(x - 2).' },
          ],
          answer: { en: 'y = -1/4 x + 4.5.', zu: 'y = -1/4 x + 4.5.' },
          why: { en: 'Normal is perpendicular to tangent.', zu: 'I-normal i-perpendicular ku-tangent.' },
        },
        {
          question: { en: 'Find x where f(x) = x³ - 3x has a maximum/minimum.', zu: 'Thola x lapho f(x) = x³ - 3x ine-maximum/minimum.' },
          steps: [
            { en: 'f\'(x) = 3x² - 3.', zu: 'f\'(x) = 3x² - 3.' },
            { en: 'Set to zero: 3x² - 3 = 0 → x = ±1.', zu: 'Beka ku-zero: 3x² - 3 = 0 → x = ±1.' },
          ],
          answer: { en: 'x = -1 and x = 1.', zu: 'x = -1 no x = 1.' },
          why: { en: 'Stationary points occur where f\'(x) = 0.', zu: 'Amaphuzu e-stationary lapho f\'(x) = 0.' },
        },
        {
          question: { en: 'Differentiate f(x) = (x + 2)².', zu: 'Differenti-ya f(x) = (x + 2)².' },
          steps: [
            { en: 'Expand: x² + 4x + 4.', zu: 'Khulisa: x² + 4x + 4.' },
            { en: 'Derivative: 2x + 4.', zu: 'I-derivative: 2x + 4.' },
          ],
          answer: { en: 'f\'(x) = 2x + 4.', zu: 'f\'(x) = 2x + 4.' },
          why: { en: 'Differentiate after expanding.', zu: 'Differenti-ya ngemuva kokukhulisa.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'If f(x) = x², then f\'(x) = ?', zu: 'Uma f(x) = x², khona f\'(x) = ?' },
        options: [
          { en: 'x', zu: 'x' },
          { en: '2x', zu: '2x' },
          { en: 'x²', zu: 'x²' },
          { en: '2', zu: '2' },
        ],
        correctIndex: 1,
        solution: { en: 'Power rule: 2x.', zu: 'Umthetho we-power: 2x.' },
        feedback: { en: 'Bring down the exponent.', zu: 'Yehlisa i-exponent.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Find gradient of y = 3x² at x = 1.', zu: 'Thola i-gradient ye y = 3x² ku x = 1.' },
        options: [
          { en: '3', zu: '3' },
          { en: '6', zu: '6' },
          { en: '9', zu: '9' },
          { en: '12', zu: '12' },
        ],
        correctIndex: 1,
        solution: { en: 'f\'(x) = 6x → f\'(1) = 6.', zu: 'f\'(x) = 6x → f\'(1) = 6.' },
        feedback: { en: 'Differentiate then substitute.', zu: 'Differenti-ya bese ufaka.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'Equation of tangent to y = x² at x = 0 is:', zu: 'I-equation ye-tangent ye y = x² ku x = 0 ingu:' },
        options: [
          { en: 'y = 0', zu: 'y = 0' },
          { en: 'y = x', zu: 'y = x' },
          { en: 'y = 2x', zu: 'y = 2x' },
          { en: 'y = -x', zu: 'y = -x' },
        ],
        correctIndex: 0,
        solution: { en: 'Slope at 0 is 0, passes through (0,0).', zu: 'I-slope ku-0 ingu-0, idlula ku (0,0).' },
        feedback: { en: 'At x = 0 the curve is flat.', zu: 'Ku x = 0 i-curve iyisicaba.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Derivatives basics', zu: 'Izisekelo zama-derivative' },
        url: 'https://www.youtube.com/watch?v=ANyVpMS3HL8',
        description: {
          en: 'Intro to differentiation and tangents.',
          zu: 'Isingeniso sokudifferentiation nama-tangent.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain how to find a tangent line.', zu: 'Chaza indlela yokuthola umugqa we-tangent.' },
      { en: 'Give me another maxima/minima question.', zu: 'Ngiphe omunye umbuzo wama-maxima/minima.' },
    ],
    progress: {
      strengths: [
        { en: 'Basic differentiation rules.', zu: 'Imithetho eyisisekelo yokudifferentiation.' },
      ],
      weakAreas: [
        { en: 'Normal line equations.', zu: 'Ama-equation omugqa we-normal.' },
      ],
      nextSteps: [
        { en: 'Practice tangent-normal questions.', zu: 'Zijwayeze imibuzo ye-tangent-normal.' },
      ],
    },
  },
  {
    id: 'probability',
    title: { en: 'Probability', zu: 'I-Probability' },
    paper: 1,
    description: {
      en: 'Use probability rules, tree diagrams, and Venn diagrams.',
      zu: 'Sebenzisa imithetho ye-probability, ama-tree diagram, nama-Venn diagram.',
    },
    mastery: 66,
    subtopics: [
      { en: 'Basic probability rules', zu: 'Imithetho eyisisekelo ye-probability' },
      { en: 'Combined events', zu: 'Imicimbi ehlanganisiwe' },
      { en: 'Tree and Venn diagrams', zu: 'Ama-tree ne-Venn diagram' },
    ],
    introduction: {
      outcomes: [
        { en: 'Calculate probabilities of single events.', zu: 'Bala i-probability yemicimbi eyodwa.' },
        { en: 'Use Venn and tree diagrams to combine events.', zu: 'Sebenzisa ama-Venn ne-tree diagram ukuhlanganisa imicimbi.' },
        { en: 'Apply addition and multiplication rules.', zu: 'Sebenzisa imithetho yokungeza nokuphindaphinda.' },
      ],
      importance: {
        en: 'Probability appears in Paper 1 and in real-life decision making.',
        zu: 'I-probability ivela ku-Paper 1 nasekuthatheni izinqumo zokuphila.',
      },
      starterExample: {
        question: { en: 'A coin is tossed. Find P(heads).', zu: 'Ikhoyini iphonswa. Thola P(heads).' },
        steps: [
          { en: 'Outcomes: heads, tails.', zu: 'Imiphumela: heads, tails.' },
          { en: 'P(heads) = 1/2.', zu: 'P(heads) = 1/2.' },
        ],
        answer: { en: '1/2', zu: '1/2' },
        why: { en: 'All outcomes are equally likely.', zu: 'Yonke imiphumela inamathuba alinganayo.' },
      },
    },
    notes: {
      intro: {
        en: 'Probability measures how likely an event is.',
        zu: 'I-probability ikala ukuthi umcimbi kungenzeka kangakanani.',
      },
      sections: [
        {
          title: { en: 'Basic rules', zu: 'Imithetho eyisisekelo' },
          content: [
            { en: '0 ≤ P(A) ≤ 1.', zu: '0 ≤ P(A) ≤ 1.' },
            { en: 'P(A) + P(not A) = 1.', zu: 'P(A) + P(hhayi A) = 1.' },
          ],
        },
        {
          title: { en: 'Combined events', zu: 'Imicimbi ehlanganisiwe' },
          content: [
            { en: 'P(A or B) = P(A) + P(B) - P(A and B).', zu: 'P(A noma B) = P(A) + P(B) - P(A no B).' },
            { en: 'P(A and B) = P(A)P(B) if independent.', zu: 'P(A no B) = P(A)P(B) uma izimele.' },
          ],
        },
        {
          title: { en: 'Diagrams', zu: 'Amadiagram' },
          content: [
            { en: 'Tree diagrams show step-by-step outcomes.', zu: 'Ama-tree diagram akhombisa imiphumela ngesinyathelo.' },
            { en: 'Venn diagrams show overlap between sets.', zu: 'Ama-Venn diagram akhombisa ukuxhumana phakathi kwamaqoqo.' },
          ],
        },
      ],
      formulas: [
        { en: 'P(A or B) = P(A) + P(B) - P(A and B)', zu: 'P(A noma B) = P(A) + P(B) - P(A no B)' },
        { en: 'P(A and B) = P(A)P(B)', zu: 'P(A no B) = P(A)P(B)' },
      ],
      commonMistakes: [
        { en: 'Forgetting to subtract overlap in OR rule.', zu: 'Ukukhohlwa ukususa i-overlap ku-OR rule.' },
      ],
      examTips: [
        { en: 'Draw a diagram before calculating.', zu: 'Dweba i-diagram ngaphambi kokubala.' },
      ],
      summary: [
        { en: 'Use addition for OR, multiplication for AND.', zu: 'Sebenzisa ukungeza ku-OR, ukuphindaphinda ku-AND.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Venn diagram', zu: 'I-Venn diagram' },
        description: {
          en: 'Overlap shows shared outcomes.',
          zu: 'Ukuhambisana kubonisa imiphumela ehlanganyelwe.',
        },
        svg: visuals.venn,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'A die is rolled. Find P(6).', zu: 'I-die iphonswa. Thola P(6).' },
          steps: [
            { en: 'There are 6 outcomes, one is 6.', zu: 'Kune-6 imiphumela, eyodwa ngu-6.' },
          ],
          answer: { en: '1/6', zu: '1/6' },
          why: { en: 'Probability = favourable / total.', zu: 'Probability = okuthandekayo / okuphelele.' },
        },
        {
          question: { en: 'Find P(not 6) when rolling a die.', zu: 'Thola P(hhayi 6) uma uphonsa i-die.' },
          steps: [
            { en: 'P(not 6) = 1 - P(6) = 1 - 1/6.', zu: 'P(hhayi 6) = 1 - P(6) = 1 - 1/6.' },
          ],
          answer: { en: '5/6', zu: '5/6' },
          why: { en: 'Complement rule.', zu: 'Umthetho we-complement.' },
        },
        {
          question: { en: 'Choose a red ball from 2 red and 3 blue. Find P(red).', zu: 'Khetha ibhola elibomvu ku-2 ebomvu no-3 eluhlaza. Thola P(red).' },
          steps: [
            { en: 'Total = 5, red = 2.', zu: 'Okuphelele = 5, okubomvu = 2.' },
          ],
          answer: { en: '2/5', zu: '2/5' },
          why: { en: 'Probability is favourable over total.', zu: 'I-probability iwukuthandekayo phezu kokuphelele.' },
        },
      ],
      Medium: [
        {
          question: { en: 'Two coins are tossed. Find P(two heads).', zu: 'Ama-coin amabili aphonswa. Thola P(ama-heads amabili).' },
          steps: [
            { en: 'Outcomes: HH, HT, TH, TT.', zu: 'Imiphumela: HH, HT, TH, TT.' },
          ],
          answer: { en: '1/4', zu: '1/4' },
          why: { en: 'One favourable outcome out of four.', zu: 'Umphumela owodwa othandekayo kwabane.' },
        },
        {
          question: { en: 'A card is drawn from 52 cards. Find P(heart or king).', zu: 'Ikhadi likhishwa ku-52. Thola P(heart noma king).' },
          steps: [
            { en: 'P(heart) = 13/52, P(king) = 4/52, overlap = 1/52.', zu: 'P(heart) = 13/52, P(king) = 4/52, overlap = 1/52.' },
            { en: 'Add and subtract overlap: (13 + 4 - 1)/52.', zu: 'Engeza bese ususa i-overlap: (13 + 4 - 1)/52.' },
          ],
          answer: { en: '16/52 = 4/13.', zu: '16/52 = 4/13.' },
          why: { en: 'Use OR rule with overlap.', zu: 'Sebenzisa umthetho we-OR ne-overlap.' },
        },
        {
          question: { en: 'P(A) = 0.4, P(B) = 0.5, independent. Find P(A and B).', zu: 'P(A) = 0.4, P(B) = 0.5, izimele. Thola P(A no B).' },
          steps: [
            { en: 'Multiply: 0.4 × 0.5.', zu: 'Phindaphinda: 0.4 × 0.5.' },
          ],
          answer: { en: '0.2', zu: '0.2' },
          why: { en: 'Independent events multiply.', zu: 'Imicimbi ezimele iphindaphindwa.' },
        },
      ],
      Hard: [
        {
          question: { en: 'P(A) = 0.6, P(B) = 0.5, P(A and B) = 0.3. Find P(A or B).', zu: 'P(A) = 0.6, P(B) = 0.5, P(A no B) = 0.3. Thola P(A noma B).' },
          steps: [
            { en: 'Use OR rule: 0.6 + 0.5 - 0.3.', zu: 'Sebenzisa umthetho we-OR: 0.6 + 0.5 - 0.3.' },
          ],
          answer: { en: '0.8', zu: '0.8' },
          why: { en: 'Subtract overlap once.', zu: 'Susa i-overlap kanye kuphela.' },
        },
        {
          question: { en: 'Two dice are rolled. Find P(sum = 7).', zu: 'Ama-dice amabili aphonswa. Thola P(isamba = 7).' },
          steps: [
            { en: 'There are 36 outcomes.', zu: 'Kune-36 imiphumela.' },
            { en: 'Favourable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6.', zu: 'Okuthandekayo: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6.' },
          ],
          answer: { en: '6/36 = 1/6.', zu: '6/36 = 1/6.' },
          why: { en: 'Count favourable outcomes.', zu: 'Bala imiphumela ethokozisayo.' },
        },
        {
          question: { en: 'A bag has 3 red, 2 blue. Draw two without replacement. Find P(red then blue).', zu: 'Isikhwama sine-3 ezibomvu, 2 eziluhlaza. Khipha ezimbili ngaphandle kokubuyisa. Thola P(red bese blue).' },
          steps: [
            { en: 'P(red) = 3/5, then P(blue) = 2/4.', zu: 'P(red) = 3/5, bese P(blue) = 2/4.' },
            { en: 'Multiply: (3/5)(2/4) = 6/20.', zu: 'Phindaphinda: (3/5)(2/4) = 6/20.' },
          ],
          answer: { en: '3/10', zu: '3/10' },
          why: { en: 'Use multiplication for sequential events.', zu: 'Sebenzisa ukuphindaphinda emicimbini elandelanayo.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'P(not A) = 1 - P(A). This is called:', zu: 'P(hhayi A) = 1 - P(A). Lokhu kubizwa ngokuthi:' },
        options: [
          { en: 'Addition rule', zu: 'Umthetho wokungeza' },
          { en: 'Complement rule', zu: 'Umthetho we-complement' },
          { en: 'Multiplication rule', zu: 'Umthetho wokuphindaphinda' },
          { en: 'Division rule', zu: 'Umthetho wokuhlukanisa' },
        ],
        correctIndex: 1,
        solution: { en: 'It is the complement rule.', zu: 'Kungumthetho we-complement.' },
        feedback: { en: 'Complement means “not A.”', zu: 'Complement kusho “hhayi A.”' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'If P(A) = 0.3 and P(B) = 0.5, independent. Find P(A and B).', zu: 'Uma P(A) = 0.3 no P(B) = 0.5, izimele. Thola P(A no B).' },
        options: [
          { en: '0.15', zu: '0.15' },
          { en: '0.8', zu: '0.8' },
          { en: '0.3', zu: '0.3' },
          { en: '0.5', zu: '0.5' },
        ],
        correctIndex: 0,
        solution: { en: 'Multiply: 0.3 × 0.5 = 0.15.', zu: 'Phindaphinda: 0.3 × 0.5 = 0.15.' },
        feedback: { en: 'Independent events multiply.', zu: 'Imicimbi ezimele iphindaphindwa.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'Which diagram is best for combined events?', zu: 'Yimaphi i-diagram ehamba phambili emicimbini ehlanganisiwe?' },
        options: [
          { en: 'Bar graph', zu: 'I-bar graph' },
          { en: 'Venn diagram', zu: 'I-Venn diagram' },
          { en: 'Line graph', zu: 'I-line graph' },
          { en: 'Pie chart', zu: 'I-pie chart' },
        ],
        correctIndex: 1,
        solution: { en: 'Venn diagrams show overlap clearly.', zu: 'Ama-Venn diagram akhombisa i-overlap ngokucacile.' },
        feedback: { en: 'Use Venn for union/intersection.', zu: 'Sebenzisa i-Venn ku-union/intersection.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Probability basics', zu: 'Izisekelo ze-probability' },
        url: 'https://www.youtube.com/watch?v=G6jJ7C4YQnk',
        description: {
          en: 'Learn the rules with tree and Venn diagrams.',
          zu: 'Funda imithetho usebenzisa ama-tree ne-Venn diagram.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain how to use a Venn diagram.', zu: 'Chaza indlela yokusebenzisa i-Venn diagram.' },
      { en: 'Give me another probability question.', zu: 'Ngiphe omunye umbuzo we-probability.' },
    ],
    progress: {
      strengths: [
        { en: 'Single-event probabilities.', zu: 'I-probability yomcimbi oyedwa.' },
      ],
      weakAreas: [
        { en: 'Combined events with overlap.', zu: 'Imicimbi ehlanganisiwe ene-overlap.' },
      ],
      nextSteps: [
        { en: 'Practice Venn diagram questions.', zu: 'Zijwayeze imibuzo ye-Venn diagram.' },
      ],
    },
  },
  {
    id: 'trigonometry',
    title: { en: 'Trigonometry', zu: 'I-Trigonometry' },
    paper: 2,
    description: {
      en: 'Use identities, solve trig equations, and graph trig functions.',
      zu: 'Sebenzisa ama-identity, xazulula ama-trig equation, futhi ugraph ama-trig function.',
    },
    mastery: 62,
    subtopics: [
      { en: 'Trigonometric identities', zu: 'Ama-identity e-trigonometry' },
      { en: 'Trigonometric equations', zu: 'Ama-equation e-trigonometry' },
      { en: 'Graphs and general solutions', zu: 'Amagrafu nezixazululo ezijwayelekile' },
    ],
    introduction: {
      outcomes: [
        { en: 'Apply sine, cosine, and tangent identities.', zu: 'Sebenzisa ama-identity e-sine, cosine, ne-tangent.' },
        { en: 'Solve trig equations with general solutions.', zu: 'Xazulula ama-trig equation ngezixazululo ezijwayelekile.' },
        { en: 'Sketch trig graphs accurately.', zu: 'Sketcha amagrafu e-trig ngokunembile.' },
      ],
      importance: {
        en: 'Trigonometry is core to Paper 2 and geometry problems.',
        zu: 'I-trigonometry iyisisekelo ku-Paper 2 nasezinkingeni ze-geometry.',
      },
      starterExample: {
        question: { en: 'Find sin 30°.', zu: 'Thola sin 30°.' },
        steps: [
          { en: 'Use special angle values.', zu: 'Sebenzisa ama-value ama-angle akhethekile.' },
        ],
        answer: { en: 'sin 30° = 1/2.', zu: 'sin 30° = 1/2.' },
        why: { en: 'Special triangles give exact values.', zu: 'Ama-triangle akhethekile anika ama-value aqondile.' },
      },
    },
    notes: {
      intro: {
        en: 'Trigonometry connects angles to side ratios and periodic graphs.',
        zu: 'I-trigonometry ixhumanisa ama-angle nama-ratio wamacala namagrafu aphindaphindayo.',
      },
      sections: [
        {
          title: { en: 'Identities', zu: 'Ama-identity' },
          content: [
            { en: 'sin²x + cos²x = 1.', zu: 'sin²x + cos²x = 1.' },
            { en: 'tan x = sin x / cos x.', zu: 'tan x = sin x / cos x.' },
          ],
        },
        {
          title: { en: 'Equations', zu: 'Ama-equation' },
          content: [
            { en: 'Solve within given intervals.', zu: 'Xazulula phakathi kwemingcele enikeziwe.' },
            { en: 'Use unit circle for general solutions.', zu: 'Sebenzisa i-unit circle ezixazululweni ezijwayelekile.' },
          ],
        },
        {
          title: { en: 'Graphs', zu: 'Amagrafu' },
          content: [
            { en: 'Know amplitude, period, and shifts.', zu: 'Yazi i-amplitude, i-period, nokushintsha.' },
            { en: 'Sine and cosine are smooth waves.', zu: 'I-sine ne-cosine zingamagagasi athambile.' },
          ],
        },
      ],
      formulas: [
        { en: 'sin²x + cos²x = 1', zu: 'sin²x + cos²x = 1' },
        { en: 'tan x = sin x / cos x', zu: 'tan x = sin x / cos x' },
      ],
      commonMistakes: [
        { en: 'Forgetting to give general solutions.', zu: 'Ukukhohlwa ukunikeza izixazululo ezijwayelekile.' },
      ],
      examTips: [
        { en: 'Label axes with degrees or radians clearly.', zu: 'Bhala ama-axis ngama-degree noma ama-radian ngokucacile.' },
      ],
      summary: [
        { en: 'Use identities to simplify first.', zu: 'Sebenzisa ama-identity ukuze uSimplify kuqala.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Unit circle', zu: 'I-unit circle' },
        description: {
          en: 'The unit circle helps with trig ratios and angles.',
          zu: 'I-unit circle isiza nge-trig ratio nama-angle.',
        },
        svg: visuals.trigUnit,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Find cos 60°.', zu: 'Thola cos 60°.' },
          steps: [
            { en: 'Use special angle values.', zu: 'Sebenzisa ama-angle akhethekile.' },
          ],
          answer: { en: '1/2', zu: '1/2' },
          why: { en: 'Special triangles give exact ratios.', zu: 'Ama-triangle akhethekile anika ama-ratio aqondile.' },
        },
        {
          question: { en: 'If sin x = 0, give one solution in [0°, 360°].', zu: 'Uma sin x = 0, nikeza isixazululo esisodwa ku [0°, 360°].' },
          steps: [
            { en: 'sin x = 0 at 0° or 180° or 360°.', zu: 'sin x = 0 ku 0° noma 180° noma 360°.' },
          ],
          answer: { en: 'x = 0° (or 180° or 360°).', zu: 'x = 0° (noma 180° noma 360°).' },
          why: { en: 'Sine is zero on x-axis.', zu: 'I-sine i-zero ku-x-axis.' },
        },
        {
          question: { en: 'Simplify tan x using sin and cos.', zu: 'Yenza tan x ibe lula usebenzisa sin ne cos.' },
          steps: [
            { en: 'tan x = sin x / cos x.', zu: 'tan x = sin x / cos x.' },
          ],
          answer: { en: 'sin x / cos x', zu: 'sin x / cos x' },
          why: { en: 'Identity definition.', zu: 'Incazelo ye-identity.' },
        },
      ],
      Medium: [
        {
          question: { en: 'Solve sin x = 1/2 for 0° ≤ x ≤ 360°.', zu: 'Xazulula sin x = 1/2 ku 0° ≤ x ≤ 360°.' },
          steps: [
            { en: 'Reference angle 30°.', zu: 'I-reference angle 30°.' },
            { en: 'Solutions: 30° and 150°.', zu: 'Izixazululo: 30° no 150°.' },
          ],
          answer: { en: 'x = 30° or 150°.', zu: 'x = 30° noma 150°.' },
          why: { en: 'Sine positive in QI and QII.', zu: 'I-sine imuhle ku-QI ne-QII.' },
        },
        {
          question: { en: 'Simplify 1 - cos²x.', zu: 'Yenza kube lula 1 - cos²x.' },
          steps: [
            { en: 'Use identity sin²x + cos²x = 1.', zu: 'Sebenzisa identity sin²x + cos²x = 1.' },
            { en: 'So 1 - cos²x = sin²x.', zu: 'Ngakho 1 - cos²x = sin²x.' },
          ],
          answer: { en: 'sin²x', zu: 'sin²x' },
          why: { en: 'Rearrange the Pythagorean identity.', zu: 'Hlela kabusha i-identity ye-Pythagoras.' },
        },
        {
          question: { en: 'Find the period of y = sin(2x).', zu: 'Thola i-period ye y = sin(2x).' },
          steps: [
            { en: 'Period = 360° / 2.', zu: 'I-period = 360° / 2.' },
          ],
          answer: { en: '180°', zu: '180°' },
          why: { en: 'Frequency changes period inversely.', zu: 'I-frequency ishintsha i-period ngokuphambene.' },
        },
      ],
      Hard: [
        {
          question: { en: 'Solve cos x = -√2/2 for 0° ≤ x ≤ 360°.', zu: 'Xazulula cos x = -√2/2 ku 0° ≤ x ≤ 360°.' },
          steps: [
            { en: 'Reference angle 45°.', zu: 'I-reference angle 45°.' },
            { en: 'Cos negative in QII and QIII.', zu: 'I-cos ine-negative ku-QII ne-QIII.' },
          ],
          answer: { en: 'x = 135° or 225°.', zu: 'x = 135° noma 225°.' },
          why: { en: 'Use quadrant signs.', zu: 'Sebenzisa izimpawu ze-quadrant.' },
        },
        {
          question: { en: 'Simplify (1 - cos x)(1 + cos x).', zu: 'Yenza kube lula (1 - cos x)(1 + cos x).' },
          steps: [
            { en: 'Use difference of squares: 1 - cos²x.', zu: 'Sebenzisa umehluko wama-square: 1 - cos²x.' },
            { en: 'Replace with sin²x.', zu: 'Faka sin²x.' },
          ],
          answer: { en: 'sin²x', zu: 'sin²x' },
          why: { en: 'Identity transforms the expression.', zu: 'I-identity iguqula isisho.' },
        },
        {
          question: { en: 'Solve 2 sin x = 1 for 0° ≤ x ≤ 360°.', zu: 'Xazulula 2 sin x = 1 ku 0° ≤ x ≤ 360°.' },
          steps: [
            { en: 'sin x = 1/2.', zu: 'sin x = 1/2.' },
            { en: 'Solutions: 30° and 150°.', zu: 'Izixazululo: 30° no 150°.' },
          ],
          answer: { en: 'x = 30° or 150°.', zu: 'x = 30° noma 150°.' },
          why: { en: 'Reduce to standard trig equation.', zu: 'Yehlisa kube i-trig equation ejwayelekile.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'sin²x + cos²x = ?', zu: 'sin²x + cos²x = ?' },
        options: [
          { en: '0', zu: '0' },
          { en: '1', zu: '1' },
          { en: 'tan x', zu: 'tan x' },
          { en: '2', zu: '2' },
        ],
        correctIndex: 1,
        solution: { en: 'Pythagorean identity equals 1.', zu: 'I-identity ye-Pythagoras ilingana no-1.' },
        feedback: { en: 'This identity is always true.', zu: 'Le identity iyiqiniso njalo.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Find x if sin x = 0.5 for 0° ≤ x ≤ 360°.', zu: 'Thola x uma sin x = 0.5 ku 0° ≤ x ≤ 360°.' },
        options: [
          { en: '30° and 150°', zu: '30° no 150°' },
          { en: '60° and 120°', zu: '60° no 120°' },
          { en: '45° and 315°', zu: '45° no 315°' },
          { en: '90° and 270°', zu: '90° no 270°' },
        ],
        correctIndex: 0,
        solution: { en: 'Reference angle 30° in QI and QII.', zu: 'I-reference angle 30° ku-QI ne-QII.' },
        feedback: { en: 'Sine is positive in QI and QII.', zu: 'I-sine imuhle ku-QI ne-QII.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'If tan x is undefined, x = ?', zu: 'Uma tan x ingachazeki, x = ?' },
        options: [
          { en: '0°', zu: '0°' },
          { en: '90°', zu: '90°' },
          { en: '180°', zu: '180°' },
          { en: '270°', zu: '270°' },
        ],
        correctIndex: 1,
        solution: { en: 'tan x is undefined when cos x = 0, at 90° and 270°.', zu: 'tan x ingachazeki uma cos x = 0, ku 90° no 270°.' },
        feedback: { en: 'Cosine is zero at 90° and 270°.', zu: 'I-cosine i-zero ku 90° no 270°.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Trig identities in minutes', zu: 'Ama-identity e-trig ngemizuzu' },
        url: 'https://www.youtube.com/watch?v=2odD1wqWf1Y',
        description: {
          en: 'Quick review of identities and equations.',
          zu: 'Ukubuyekeza okusheshayo kwe-identity nama-equation.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain general solutions for trig equations.', zu: 'Chaza izixazululo ezijwayelekile zama-trig equation.' },
      { en: 'Give me a hint only.', zu: 'Ngiphe umkhondo kuphela.' },
    ],
    progress: {
      strengths: [
        { en: 'Using special angles.', zu: 'Ukusebenzisa ama-angle akhethekile.' },
      ],
      weakAreas: [
        { en: 'General solutions with intervals.', zu: 'Izixazululo ezijwayelekile nemingcele.' },
      ],
      nextSteps: [
        { en: 'Practice solving trig equations in intervals.', zu: 'Zijwayeze ukuxazulula ama-trig equation ngemingcele.' },
      ],
    },
  },
  {
    id: 'analytical-geometry',
    title: { en: 'Analytical Geometry', zu: 'I-Analytical Geometry' },
    paper: 2,
    description: {
      en: 'Work with distance, midpoint, gradient, straight lines, and circles.',
      zu: 'Sebenza nebanga, midpoint, gradient, umugqa oqondile, namajikelezo.',
    },
    mastery: 58,
    subtopics: [
      { en: 'Distance and midpoint', zu: 'Ibanga ne-midpoint' },
      { en: 'Gradient and line equation', zu: 'I-gradient ne-equation yomugqa' },
      { en: 'Circle equations', zu: 'Ama-equation omjikelezo' },
    ],
    introduction: {
      outcomes: [
        { en: 'Compute distance and midpoint between points.', zu: 'Bala ibanga ne-midpoint phakathi kwamaphuzu.' },
        { en: 'Find gradients and equations of lines.', zu: 'Thola ama-gradient nama-equation emigqa.' },
        { en: 'Use circle equations in coordinate geometry.', zu: 'Sebenzisa ama-equation omjikelezo ku-coordinate geometry.' },
      ],
      importance: {
        en: 'Coordinate geometry is a big part of Paper 2 exams.',
        zu: 'I-coordinate geometry iyingxenye enkulu ye-Paper 2.',
      },
      starterExample: {
        question: { en: 'Find distance between A(0,0) and B(3,4).', zu: 'Thola ibanga phakathi kwe A(0,0) no B(3,4).' },
        steps: [
          { en: 'Use distance formula: √((3-0)² + (4-0)²).', zu: 'Sebenzisa ifomula yebanga: √((3-0)² + (4-0)²).' },
        ],
        answer: { en: '5', zu: '5' },
        why: { en: 'It forms a 3-4-5 right triangle.', zu: 'Kwakha i-3-4-5 right triangle.' },
      },
    },
    notes: {
      intro: {
        en: 'Analytical geometry uses algebra on the coordinate plane.',
        zu: 'I-analytical geometry isebenzisa i-algebra ku-coordinate plane.',
      },
      sections: [
        {
          title: { en: 'Distance and midpoint', zu: 'Ibanga ne-midpoint' },
          content: [
            { en: 'Distance: √((x2 - x1)² + (y2 - y1)²).', zu: 'Ibanga: √((x2 - x1)² + (y2 - y1)²).' },
            { en: 'Midpoint: ((x1 + x2)/2, (y1 + y2)/2).', zu: 'I-midpoint: ((x1 + x2)/2, (y1 + y2)/2).' },
          ],
        },
        {
          title: { en: 'Gradient and lines', zu: 'I-gradient nemigqa' },
          content: [
            { en: 'Gradient: m = (y2 - y1)/(x2 - x1).', zu: 'I-gradient: m = (y2 - y1)/(x2 - x1).' },
            { en: 'Line equation: y - y1 = m(x - x1).', zu: 'I-equation yomugqa: y - y1 = m(x - x1).' },
          ],
        },
        {
          title: { en: 'Circles', zu: 'Imijikelezo' },
          content: [
            { en: '(x - a)² + (y - b)² = r².', zu: '(x - a)² + (y - b)² = r².' },
            { en: 'Center is (a, b), radius is r.', zu: 'I-center ingu (a, b), i-radius ngu r.' },
          ],
        },
      ],
      formulas: [
        { en: 'm = (y2 - y1)/(x2 - x1)', zu: 'm = (y2 - y1)/(x2 - x1)' },
        { en: '(x - a)² + (y - b)² = r²', zu: '(x - a)² + (y - b)² = r²' },
      ],
      commonMistakes: [
        { en: 'Switching x and y differences.', zu: 'Ukushintsha umehluko we-x nowe-y.' },
      ],
      examTips: [
        { en: 'Sketch points to see the geometry.', zu: 'Sketcha amaphuzu ukuze ubone i-geometry.' },
      ],
      summary: [
        { en: 'Use formulas carefully with correct points.', zu: 'Sebenzisa amafomula ngokucophelela ngamaphuzu afanele.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Line on a grid', zu: 'Umugqa ku-grid' },
        description: {
          en: 'A straight line on a coordinate plane.',
          zu: 'Umugqa oqondile ku-coordinate plane.',
        },
        svg: visuals.analyticLine,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Find midpoint of A(2, 4) and B(6, 8).', zu: 'Thola i-midpoint ye A(2, 4) no B(6, 8).' },
          steps: [
            { en: 'Midpoint = ((2+6)/2, (4+8)/2).', zu: 'I-midpoint = ((2+6)/2, (4+8)/2).' },
          ],
          answer: { en: '(4, 6)', zu: '(4, 6)' },
          why: { en: 'Average the coordinates.', zu: 'Thatha isilinganiso sama-coordinate.' },
        },
        {
          question: { en: 'Find gradient between (1,2) and (3,6).', zu: 'Thola i-gradient phakathi (1,2) no (3,6).' },
          steps: [
            { en: 'm = (6-2)/(3-1) = 4/2 = 2.', zu: 'm = (6-2)/(3-1) = 4/2 = 2.' },
          ],
          answer: { en: '2', zu: '2' },
          why: { en: 'Rise over run.', zu: 'Ukukhuphuka phezu kokugijima.' },
        },
        {
          question: { en: 'Write equation of circle with center (0,0) and radius 3.', zu: 'Bhala i-equation yomjikelezo one-center (0,0) ne-radius 3.' },
          steps: [
            { en: '(x - 0)² + (y - 0)² = 3².', zu: '(x - 0)² + (y - 0)² = 3².' },
          ],
          answer: { en: 'x² + y² = 9', zu: 'x² + y² = 9' },
          why: { en: 'Use standard circle form.', zu: 'Sebenzisa ifomu ye-circle ejwayelekile.' },
        },
      ],
      Medium: [
        {
          question: { en: 'Find distance between A(-2,1) and B(4,5).', zu: 'Thola ibanga phakathi A(-2,1) no B(4,5).' },
          steps: [
            { en: 'Use formula: √((4+2)² + (5-1)²) = √(36 + 16).', zu: 'Sebenzisa ifomula: √((4+2)² + (5-1)²) = √(36 + 16).' },
          ],
          answer: { en: '√52 = 2√13', zu: '√52 = 2√13' },
          why: { en: 'Apply distance formula.', zu: 'Sebenzisa ifomula yebanga.' },
        },
        {
          question: { en: 'Find equation of line through (2,3) with gradient -1.', zu: 'Thola i-equation yomugqa odlula (2,3) one-gradient -1.' },
          steps: [
            { en: 'Use y - 3 = -1(x - 2).', zu: 'Sebenzisa y - 3 = -1(x - 2).' },
          ],
          answer: { en: 'y = -x + 5', zu: 'y = -x + 5' },
          why: { en: 'Point-slope form.', zu: 'Ifomu le-point-slope.' },
        },
        {
          question: { en: 'Find circle center and radius: x² + y² - 4x + 6y + 4 = 0.', zu: 'Thola i-center ne-radius: x² + y² - 4x + 6y + 4 = 0.' },
          steps: [
            { en: 'Complete the square: (x - 2)² + (y + 3)² = 9.', zu: 'Qeda i-square: (x - 2)² + (y + 3)² = 9.' },
          ],
          answer: { en: 'Center (2, -3), radius 3.', zu: 'I-center (2, -3), i-radius 3.' },
          why: { en: 'Standard form shows center and radius.', zu: 'Ifomu ejwayelekile ikhombisa i-center ne-radius.' },
        },
      ],
      Hard: [
        {
          question: { en: 'Find equation of line perpendicular to y = 2x + 1 through (4,0).', zu: 'Thola i-equation yomugqa i-perpendicular ku y = 2x + 1 odlula (4,0).' },
          steps: [
            { en: 'Slope of given line is 2, perpendicular slope is -1/2.', zu: 'I-slope yomugqa onikeziwe ngu 2, i-perpendicular slope ngu -1/2.' },
            { en: 'Use y - 0 = -1/2(x - 4).', zu: 'Sebenzisa y - 0 = -1/2(x - 4).' },
          ],
          answer: { en: 'y = -1/2 x + 2', zu: 'y = -1/2 x + 2' },
          why: { en: 'Perpendicular slopes multiply to -1.', zu: 'Ama-slope e-perpendicular aphindaphindeka abe -1.' },
        },
        {
          question: { en: 'Find gradient of line through (-1,4) and (3,-2).', zu: 'Thola i-gradient yomugqa odlula (-1,4) no (3,-2).' },
          steps: [
            { en: 'm = (-2 - 4)/(3 - (-1)) = -6/4 = -3/2.', zu: 'm = (-2 - 4)/(3 - (-1)) = -6/4 = -3/2.' },
          ],
          answer: { en: '-3/2', zu: '-3/2' },
          why: { en: 'Apply gradient formula.', zu: 'Sebenzisa ifomula ye-gradient.' },
        },
        {
          question: { en: 'Find equation of circle with center (1, -2) passing through (4,2).', zu: 'Thola i-equation yomjikelezo one-center (1, -2) odlula (4,2).' },
          steps: [
            { en: 'Find radius: r = distance between points.', zu: 'Thola i-radius: r = ibanga phakathi kwamaphuzu.' },
            { en: 'r² = (4-1)² + (2+2)² = 9 + 16 = 25.', zu: 'r² = (4-1)² + (2+2)² = 9 + 16 = 25.' },
          ],
          answer: { en: '(x - 1)² + (y + 2)² = 25', zu: '(x - 1)² + (y + 2)² = 25' },
          why: { en: 'Circle equation uses center and radius.', zu: 'I-equation yomjikelezo isebenzisa i-center ne-radius.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'Distance formula is:', zu: 'Ifomula yebanga ithi:' },
        options: [
          { en: '(x2 - x1) + (y2 - y1)', zu: '(x2 - x1) + (y2 - y1)' },
          { en: '√((x2 - x1)² + (y2 - y1)²)', zu: '√((x2 - x1)² + (y2 - y1)²)' },
          { en: '(x1 + x2)/2', zu: '(x1 + x2)/2' },
          { en: 'y = mx + c', zu: 'y = mx + c' },
        ],
        correctIndex: 1,
        solution: { en: 'Distance uses Pythagoras in the plane.', zu: 'Ibanga lisebenzisa i-Pythagoras ku-plane.' },
        feedback: { en: 'Remember the square root.', zu: 'Khumbula i-square root.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Gradient between (1,1) and (4,7) is:', zu: 'I-gradient phakathi (1,1) no (4,7) ingu:' },
        options: [
          { en: '2', zu: '2' },
          { en: '3', zu: '3' },
          { en: '6', zu: '6' },
          { en: '1/2', zu: '1/2' },
        ],
        correctIndex: 0,
        solution: { en: '(7-1)/(4-1) = 6/3 = 2.', zu: '(7-1)/(4-1) = 6/3 = 2.' },
        feedback: { en: 'Rise over run.', zu: 'Ukukhuphuka phezu kokugijima.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'Equation of a circle with center (0,0) and radius 5 is:', zu: 'I-equation yomjikelezo one-center (0,0) ne-radius 5 ingu:' },
        options: [
          { en: 'x² + y² = 25', zu: 'x² + y² = 25' },
          { en: 'x² + y² = 5', zu: 'x² + y² = 5' },
          { en: '(x - 5)² + y² = 0', zu: '(x - 5)² + y² = 0' },
          { en: 'x² + y² = 10', zu: 'x² + y² = 10' },
        ],
        correctIndex: 0,
        solution: { en: 'r² = 25, so x² + y² = 25.', zu: 'r² = 25, ngakho x² + y² = 25.' },
        feedback: { en: 'Square the radius.', zu: 'Phinda i-radius ukuze ube i-square.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Coordinate geometry basics', zu: 'Izisekelo ze-coordinate geometry' },
        url: 'https://www.youtube.com/watch?v=6YB3BqQj5N0',
        description: {
          en: 'Review distance, gradient, and circle equations.',
          zu: 'Buyekeza ibanga, i-gradient, nama-equation omjikelezo.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain how to find a line equation.', zu: 'Chaza indlela yokuthola i-equation yomugqa.' },
      { en: 'Give me another circle question.', zu: 'Ngiphe omunye umbuzo womjikelezo.' },
    ],
    progress: {
      strengths: [
        { en: 'Midpoint calculations.', zu: 'Ukubala i-midpoint.' },
      ],
      weakAreas: [
        { en: 'Completing the square for circles.', zu: 'Ukuqedela i-square ku-circle.' },
      ],
      nextSteps: [
        { en: 'Practice circle equation rearrangement.', zu: 'Zijwayeze ukuhlela kabusha ama-equation omjikelezo.' },
      ],
    },
  },
  {
    id: 'euclidean-geometry',
    title: { en: 'Euclidean Geometry', zu: 'I-Euclidean Geometry' },
    paper: 2,
    description: {
      en: 'Use geometric relationships, theorems, and circle geometry.',
      zu: 'Sebenzisa ubudlelwano be-geometry, ama-theorem, ne-circle geometry.',
    },
    mastery: 55,
    subtopics: [
      { en: 'Geometric relationships', zu: 'Ubudlelwano be-geometry' },
      { en: 'Theorems and proofs', zu: 'Ama-theorem nobufakazi' },
      { en: 'Circle geometry', zu: 'I-geometry yomjikelezo' },
    ],
    introduction: {
      outcomes: [
        { en: 'Apply theorems to solve geometry problems.', zu: 'Sebenzisa ama-theorem ukuxazulula izinkinga ze-geometry.' },
        { en: 'Write clear geometric proofs.', zu: 'Bhala ubufakazi be-geometry obucacile.' },
        { en: 'Use circle theorems correctly.', zu: 'Sebenzisa ama-theorem omjikelezo ngendlela efanele.' },
      ],
      importance: {
        en: 'Geometry proofs are a major section of Paper 2.',
        zu: 'Ubufakazi be-geometry yisigaba esikhulu ku-Paper 2.',
      },
      starterExample: {
        question: { en: 'State the theorem: angles in a semicircle.', zu: 'Bhala i-theorem: ama-angle ku-semicircle.' },
        steps: [
          { en: 'Angle in a semicircle is 90°.', zu: 'I-angle ku-semicircle ingu-90°.' },
        ],
        answer: { en: 'Angle in a semicircle is a right angle.', zu: 'I-angle ku-semicircle iyi-right angle.' },
        why: { en: 'This is a core circle theorem.', zu: 'Lena yi-theorem esemqoka yomjikelezo.' },
      },
    },
    notes: {
      intro: {
        en: 'Euclidean geometry uses logical steps to prove relationships.',
        zu: 'I-Euclidean geometry isebenzisa izinyathelo ezinengqondo ukufakazela ubudlelwano.',
      },
      sections: [
        {
          title: { en: 'Lines and angles', zu: 'Imigqa nama-angle' },
          content: [
            { en: 'Opposite angles are equal.', zu: 'Ama-angle aphambene ayalingana.' },
            { en: 'Angles on a straight line sum to 180°.', zu: 'Ama-angle emugqeni oqondile enza u-180°.' },
          ],
        },
        {
          title: { en: 'Triangles', zu: 'Ama-triangle' },
          content: [
            { en: 'Sum of angles in a triangle is 180°.', zu: 'Isamba sama-angle ku-triangle singu-180°.' },
            { en: 'Equal sides have equal opposite angles.', zu: 'Imigqa elinganayo inama-angle aphambene alinganayo.' },
          ],
        },
        {
          title: { en: 'Circle theorems', zu: 'Ama-theorem omjikelezo' },
          content: [
            { en: 'Angles in the same segment are equal.', zu: 'Ama-angle esegimenti efanayo ayalingana.' },
            { en: 'Tangent is perpendicular to radius.', zu: 'I-tangent i-perpendicular ku-radius.' },
          ],
        },
      ],
      formulas: [
        { en: 'Sum of angles in triangle = 180°', zu: 'Isamba sama-angle ku-triangle = 180°' },
        { en: 'Angle at center = 2 × angle at circumference', zu: 'I-angle esikhungweni = 2 × i-angle eseceleni' },
      ],
      commonMistakes: [
        { en: 'Skipping reasons in proofs.', zu: 'Ukweqa izizathu ekufakazeni.' },
      ],
      examTips: [
        { en: 'Write the theorem name next to each step.', zu: 'Bhala igama le-theorem eduze kwesinyathelo.' },
      ],
      summary: [
        { en: 'Justify every statement with a theorem.', zu: 'Qinisekisa isitatimende ngasinye nge-theorem.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Circle angle', zu: 'I-angle yomjikelezo' },
        description: {
          en: 'Angles subtended by the same arc are equal.',
          zu: 'Ama-angle axhumene ne-arc efanayo ayalingana.',
        },
        svg: visuals.circleAngle,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Find x if angles on a straight line are 120° and x.', zu: 'Thola x uma ama-angle emugqeni oqondile engu 120° no x.' },
          steps: [
            { en: 'Sum to 180°: 120° + x = 180°.', zu: 'Isamba singu 180°: 120° + x = 180°.' },
          ],
          answer: { en: 'x = 60°', zu: 'x = 60°' },
          why: { en: 'Straight line angles sum to 180°.', zu: 'Ama-angle emugqeni oqondile enza u-180°.' },
        },
        {
          question: { en: 'If two angles are vertically opposite, and one is 35°, find the other.', zu: 'Uma ama-angle ephambene, elinye lingu 35°, thola elinye.' },
          steps: [
            { en: 'Vertically opposite angles are equal.', zu: 'Ama-angle aphambene ayalingana.' },
          ],
          answer: { en: '35°', zu: '35°' },
          why: { en: 'Opposite angles are equal.', zu: 'Ama-angle aphambene ayalingana.' },
        },
        {
          question: { en: 'Angle in a semicircle is ?', zu: 'I-angle ku-semicircle ingu?' },
          steps: [
            { en: 'Use semicircle theorem.', zu: 'Sebenzisa i-theorem ye-semicircle.' },
          ],
          answer: { en: '90°', zu: '90°' },
          why: { en: 'Semicircle theorem.', zu: 'I-theorem ye-semicircle.' },
        },
      ],
      Medium: [
        {
          question: { en: 'In triangle ABC, A = 50°, B = 60°. Find C.', zu: 'Ku-triangle ABC, A = 50°, B = 60°. Thola C.' },
          steps: [
            { en: 'Sum of angles = 180°.', zu: 'Isamba sama-angle = 180°.' },
            { en: 'C = 180° - 110° = 70°.', zu: 'C = 180° - 110° = 70°.' },
          ],
          answer: { en: '70°', zu: '70°' },
          why: { en: 'Angles in triangle sum to 180°.', zu: 'Ama-angle ku-triangle enza u-180°.' },
        },
        {
          question: { en: 'Angles in the same segment are equal. If one is 42°, find the other.', zu: 'Ama-angle esegimenti efanayo ayalingana. Uma elinye lingu 42°, thola elinye.' },
          steps: [
            { en: 'Equal angles in same segment.', zu: 'Ama-angle alinganayo esegimenti efanayo.' },
          ],
          answer: { en: '42°', zu: '42°' },
          why: { en: 'Circle theorem: same segment.', zu: 'I-theorem yomjikelezo: same segment.' },
        },
        {
          question: { en: 'If an exterior angle is 130°, find interior adjacent angle.', zu: 'Uma i-exterior angle ingu 130°, thola i-interior angle eduze.' },
          steps: [
            { en: 'Angles on a straight line sum to 180°.', zu: 'Ama-angle emugqeni oqondile enza u-180°.' },
          ],
          answer: { en: '50°', zu: '50°' },
          why: { en: 'Linear pair sums to 180°.', zu: 'Ama-angle e-linear pair enza u-180°.' },
        },
      ],
      Hard: [
        {
          question: { en: 'Prove that opposite angles of a cyclic quadrilateral sum to 180°.', zu: 'Fakazela ukuthi ama-angle aphambene ku-cyclic quadrilateral enza u-180°.' },
          steps: [
            { en: 'Use angles in same segment theorem.', zu: 'Sebenzisa i-theorem yam-angle esegimenti efanayo.' },
            { en: 'Show supplementary angles form a straight line.', zu: 'Khombisa ama-angle angezelelana enza umugqa oqondile.' },
          ],
          answer: { en: 'Opposite angles are supplementary (sum to 180°).', zu: 'Ama-angle aphambene ayangezelelana (enza u-180°).' },
          why: { en: 'Circle theorems link arc angles.', zu: 'Ama-theorem omjikelezo axhumanisa ama-angle we-arc.' },
        },
        {
          question: { en: 'If tangent PT touches circle at T and OT is radius, find ∠OTP.', zu: 'Uma i-tangent PT ithinta umjikelezo ku T no OT iyi-radius, thola ∠OTP.' },
          steps: [
            { en: 'Tangent is perpendicular to radius at point of contact.', zu: 'I-tangent i-perpendicular ku-radius endaweni yokuthinta.' },
          ],
          answer: { en: '90°', zu: '90°' },
          why: { en: 'Tangent-radius theorem.', zu: 'I-theorem ye-tangent-radius.' },
        },
        {
          question: { en: 'In triangle, two angles are equal. What can you conclude?', zu: 'Ku-triangle, ama-angle amabili ayalingana. Ungaphetha ukuthini?' },
          steps: [
            { en: 'Equal angles imply opposite sides equal.', zu: 'Ama-angle alinganayo asho imigqa ephambene ilingana.' },
          ],
          answer: { en: 'Opposite sides are equal (isosceles).', zu: 'Imigqa ephambene ilingana (isosceles).' },
          why: { en: 'Isosceles triangle theorem.', zu: 'I-theorem ye-isosceles triangle.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'Angles on a straight line sum to:', zu: 'Ama-angle emugqeni oqondile enza u:' },
        options: [
          { en: '90°', zu: '90°' },
          { en: '180°', zu: '180°' },
          { en: '360°', zu: '360°' },
          { en: '45°', zu: '45°' },
        ],
        correctIndex: 1,
        solution: { en: 'Straight line angles add to 180°.', zu: 'Ama-angle emugqeni oqondile enza u-180°.' },
        feedback: { en: 'Remember linear pair rule.', zu: 'Khumbula umthetho we-linear pair.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Angle in a semicircle is:', zu: 'I-angle ku-semicircle ingu:' },
        options: [
          { en: '45°', zu: '45°' },
          { en: '90°', zu: '90°' },
          { en: '120°', zu: '120°' },
          { en: '180°', zu: '180°' },
        ],
        correctIndex: 1,
        solution: { en: 'Semicircle theorem gives 90°.', zu: 'I-theorem ye-semicircle inikeza u-90°.' },
        feedback: { en: 'Think right angle.', zu: 'Cabanga i-right angle.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'Opposite angles of a cyclic quadrilateral are:', zu: 'Ama-angle aphambene ku-cyclic quadrilateral ayi:' },
        options: [
          { en: 'Equal', zu: 'Equal' },
          { en: 'Complementary', zu: 'Complementary' },
          { en: 'Supplementary', zu: 'Supplementary' },
          { en: 'None', zu: 'None' },
        ],
        correctIndex: 2,
        solution: { en: 'They sum to 180°.', zu: 'Azenza u-180°.' },
        feedback: { en: 'Cyclic quadrilateral theorem.', zu: 'I-theorem ye-cyclic quadrilateral.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Circle geometry theorems', zu: 'Ama-theorem e-circle geometry' },
        url: 'https://www.youtube.com/watch?v=ZCQp0Rerxug',
        description: {
          en: 'Key circle theorems explained with sketches.',
          zu: 'Ama-theorem abalulekile omjikelezo achazwe ngezisketch.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain this proof step.', zu: 'Chaza lesi sinyathelo sobufakazi.' },
      { en: 'Give me a hint only.', zu: 'Ngiphe umkhondo kuphela.' },
    ],
    progress: {
      strengths: [
        { en: 'Angle sum facts.', zu: 'Amaqiniso esamba sama-angle.' },
      ],
      weakAreas: [
        { en: 'Proof writing structure.', zu: 'Isakhiwo sokubhala ubufakazi.' },
      ],
      nextSteps: [
        { en: 'Practice theorem-based proofs.', zu: 'Zijwayeze ubufakazi obusekelwe kuma-theorem.' },
      ],
    },
  },
  {
    id: 'statistics',
    title: { en: 'Statistics', zu: 'I-Statistics' },
    paper: 2,
    description: {
      en: 'Study averages, spread, and data representation.',
      zu: 'Funda ama-average, ukusabalala, nokumelwa kwedatha.',
    },
    mastery: 73,
    subtopics: [
      { en: 'Measures of central tendency', zu: 'Izilinganiso ze-central tendency' },
      { en: 'Measures of dispersion', zu: 'Izilinganiso zokusabalala' },
      { en: 'Data representation and interpretation', zu: 'Ukwethula nokuhumusha idatha' },
    ],
    introduction: {
      outcomes: [
        { en: 'Calculate mean, median, and mode.', zu: 'Bala i-mean, median, ne-mode.' },
        { en: 'Use range and interquartile range.', zu: 'Sebenzisa i-range ne-interquartile range.' },
        { en: 'Interpret graphs and charts.', zu: 'Humusha amagrafu namashathi.' },
      ],
      importance: {
        en: 'Statistics helps interpret data in real contexts.',
        zu: 'I-statistics isiza ukuhumusha idatha ezimeni zangempela.',
      },
      starterExample: {
        question: { en: 'Find the mean of 2, 4, 6.', zu: 'Thola i-mean ye 2, 4, 6.' },
        steps: [
          { en: 'Sum = 12, divide by 3.', zu: 'Isamba = 12, hlukanisa ngo-3.' },
        ],
        answer: { en: '4', zu: '4' },
        why: { en: 'Mean is total divided by number of values.', zu: 'I-mean isamba sihlukaniswe ngenani lezinto.' },
      },
    },
    notes: {
      intro: {
        en: 'Statistics summarizes data with numbers and graphs.',
        zu: 'I-statistics ifingqa idatha ngezibalo namagrafu.',
      },
      sections: [
        {
          title: { en: 'Central tendency', zu: 'Central tendency' },
          content: [
            { en: 'Mean = average.', zu: 'Mean = isilinganiso.' },
            { en: 'Median = middle value.', zu: 'Median = inani eliphakathi.' },
            { en: 'Mode = most frequent value.', zu: 'Mode = inani eliphindaphindayo.' },
          ],
        },
        {
          title: { en: 'Dispersion', zu: 'Ukusabalala' },
          content: [
            { en: 'Range = max - min.', zu: 'Range = max - min.' },
            { en: 'IQR = Q3 - Q1.', zu: 'IQR = Q3 - Q1.' },
          ],
        },
        {
          title: { en: 'Representation', zu: 'Ukwethula' },
          content: [
            { en: 'Use bar charts, histograms, box-and-whisker.', zu: 'Sebenzisa ama-bar chart, ama-histogram, box-and-whisker.' },
            { en: 'Read axes carefully.', zu: 'Funda ama-axis ngokucophelela.' },
          ],
        },
      ],
      formulas: [
        { en: 'Mean = sum of values / number of values', zu: 'Mean = isamba sezinani / inani lezinto' },
        { en: 'Range = max - min', zu: 'Range = max - min' },
      ],
      commonMistakes: [
        { en: 'Not ordering data before finding median.', zu: 'Ukungahleleli idatha ngaphambi kokuthola median.' },
      ],
      examTips: [
        { en: 'Always label units on graphs.', zu: 'Bhala amayunithi kumagrafu njalo.' },
      ],
      summary: [
        { en: 'Use averages to describe center, range to describe spread.', zu: 'Sebenzisa ama-average ukuchaza isikhungo, range ukuchaza ukusabalala.' },
      ],
    },
    visuals: [
      {
        title: { en: 'Bar chart', zu: 'I-bar chart' },
        description: {
          en: 'Bars compare categories clearly.',
          zu: 'Amabha aqhathanisa izigaba ngokucacile.',
        },
        svg: visuals.statsBars,
      },
    ],
    examples: {
      Easy: [
        {
          question: { en: 'Find the median of 3, 7, 9.', zu: 'Thola i-median ye 3, 7, 9.' },
          steps: [
            { en: 'Middle value is 7.', zu: 'Inani eliphakathi lingu 7.' },
          ],
          answer: { en: '7', zu: '7' },
          why: { en: 'Median is the middle number.', zu: 'Median iyinombolo ephakathi.' },
        },
        {
          question: { en: 'Find the mode of 1, 2, 2, 3.', zu: 'Thola i-mode ye 1, 2, 2, 3.' },
          steps: [
            { en: '2 appears most.', zu: '2 ivele kakhulu.' },
          ],
          answer: { en: '2', zu: '2' },
          why: { en: 'Mode is most frequent value.', zu: 'Mode iyinani eliphindaphindayo.' },
        },
        {
          question: { en: 'Find the range of 4, 8, 10.', zu: 'Thola i-range ye 4, 8, 10.' },
          steps: [
            { en: 'Max 10 minus min 4.', zu: 'Max 10 minus min 4.' },
          ],
          answer: { en: '6', zu: '6' },
          why: { en: 'Range is max minus min.', zu: 'Range ingu max minus min.' },
        },
      ],
      Medium: [
        {
          question: { en: 'Find mean of 5, 7, 8, 10.', zu: 'Thola i-mean ye 5, 7, 8, 10.' },
          steps: [
            { en: 'Sum = 30, divide by 4.', zu: 'Isamba = 30, hlukanisa ngo-4.' },
          ],
          answer: { en: '7.5', zu: '7.5' },
          why: { en: 'Mean = total / number.', zu: 'Mean = isamba / inani.' },
        },
        {
          question: { en: 'Find IQR for data: 2, 4, 6, 8, 10, 12.', zu: 'Thola i-IQR yedatha: 2, 4, 6, 8, 10, 12.' },
          steps: [
            { en: 'Q1 = 4, Q3 = 10.', zu: 'Q1 = 4, Q3 = 10.' },
          ],
          answer: { en: 'IQR = 6', zu: 'IQR = 6' },
          why: { en: 'IQR = Q3 - Q1.', zu: 'IQR = Q3 - Q1.' },
        },
        {
          question: { en: 'Data set has mean 6 for 5 values. Total sum is?', zu: 'Isethi yedatha inom-mean 6 yezinani ezi-5. Isamba singaki?' },
          steps: [
            { en: 'Sum = mean × number = 6 × 5.', zu: 'Isamba = mean × inani = 6 × 5.' },
          ],
          answer: { en: '30', zu: '30' },
          why: { en: 'Mean formula rearranged.', zu: 'Ifomula ye-mean ihleliwe kabusha.' },
        },
      ],
      Hard: [
        {
          question: { en: 'Find median of 2, 5, 8, 9, 12, 13.', zu: 'Thola i-median ye 2, 5, 8, 9, 12, 13.' },
          steps: [
            { en: 'Even number of values: average of 3rd and 4th.', zu: 'Inani elingalingani: thatha isilinganiso se-3rd ne-4th.' },
          ],
          answer: { en: '(8 + 9)/2 = 8.5', zu: '(8 + 9)/2 = 8.5' },
          why: { en: 'Median is average of middle two.', zu: 'Median iyisilinganiso samaphakathi amabili.' },
        },
        {
          question: { en: 'A value is added to data. Mean increases from 10 to 11 for 4 values. Find added value.', zu: 'Inani lengezwa kudatha. I-mean ikhuphuka isuka ku-10 iye ku-11 yezinani ezi-4. Thola inani elengeziwe.' },
          steps: [
            { en: 'Original sum = 10 × 3 = 30.', zu: 'Isamba sokuqala = 10 × 3 = 30.' },
            { en: 'New sum = 11 × 4 = 44.', zu: 'Isamba esisha = 11 × 4 = 44.' },
          ],
          answer: { en: 'Added value = 14.', zu: 'Inani elengeziwe = 14.' },
          why: { en: 'Difference in totals gives new value.', zu: 'Umehluko wamasamba unikeza inani elisha.' },
        },
        {
          question: { en: 'Interpret a box plot: if Q1 = 5, Q3 = 13, find IQR.', zu: 'Humusha i-box plot: uma Q1 = 5, Q3 = 13, thola IQR.' },
          steps: [
            { en: 'IQR = 13 - 5.', zu: 'IQR = 13 - 5.' },
          ],
          answer: { en: '8', zu: '8' },
          why: { en: 'IQR uses quartiles.', zu: 'IQR isebenzisa ama-quartile.' },
        },
      ],
    },
    quizzes: [
      {
        question: { en: 'Mean of 3, 3, 6 is:', zu: 'I-mean ye 3, 3, 6 ingu:' },
        options: [
          { en: '3', zu: '3' },
          { en: '4', zu: '4' },
          { en: '5', zu: '5' },
          { en: '6', zu: '6' },
        ],
        correctIndex: 1,
        solution: { en: '(3+3+6)/3 = 12/3 = 4.', zu: '(3+3+6)/3 = 12/3 = 4.' },
        feedback: { en: 'Add then divide by count.', zu: 'Hlanganisa bese uhlukanisa ngenani.' },
        difficulty: 'Easy',
      },
      {
        question: { en: 'Range of 2, 9, 4, 15 is:', zu: 'I-range ye 2, 9, 4, 15 ingu:' },
        options: [
          { en: '13', zu: '13' },
          { en: '11', zu: '11' },
          { en: '9', zu: '9' },
          { en: '7', zu: '7' },
        ],
        correctIndex: 0,
        solution: { en: '15 - 2 = 13.', zu: '15 - 2 = 13.' },
        feedback: { en: 'Range is max minus min.', zu: 'Range ingu max minus min.' },
        difficulty: 'Medium',
      },
      {
        question: { en: 'Median of 1, 4, 5, 8, 9 is:', zu: 'I-median ye 1, 4, 5, 8, 9 ingu:' },
        options: [
          { en: '4', zu: '4' },
          { en: '5', zu: '5' },
          { en: '6', zu: '6' },
          { en: '8', zu: '8' },
        ],
        correctIndex: 1,
        solution: { en: 'Middle value is 5.', zu: 'Inani eliphakathi lingu 5.' },
        feedback: { en: 'Order the data first.', zu: 'Hlela idatha kuqala.' },
        difficulty: 'Hard',
      },
    ],
    videos: [
      {
        title: { en: 'Statistics crash course', zu: 'Isifundo esifushane se-statistics' },
        url: 'https://www.youtube.com/watch?v=Oo12-qPzSxQ',
        description: {
          en: 'Learn mean, median, mode, and spread.',
          zu: 'Funda i-mean, median, mode, nokusabalala.',
        },
      },
    ],
    askPrompts: [
      { en: 'Explain how to find the median.', zu: 'Chaza indlela yokuthola i-median.' },
      { en: 'Give me another statistics question.', zu: 'Ngiphe omunye umbuzo we-statistics.' },
    ],
    progress: {
      strengths: [
        { en: 'Mean and median calculations.', zu: 'Ukubala i-mean ne-median.' },
      ],
      weakAreas: [
        { en: 'Interpreting box plots.', zu: 'Ukuhumusha ama-box plot.' },
      ],
      nextSteps: [
        { en: 'Practice data interpretation questions.', zu: 'Zijwayeze imibuzo yokuhumusha idatha.' },
      ],
    },
  },
];

export const paperTopics = {
  1: topics.filter((topic) => topic.paper === 1),
  2: topics.filter((topic) => topic.paper === 2),
};

export const uiLabels = {
  dashboardTitle: { en: 'Grade 12 Mathematics Dashboard', zu: 'I-Dashboard yeMathematics yeBanga 12' },
  paper1: { en: 'Paper 1', zu: 'Iphepha 1' },
  paper2: { en: 'Paper 2', zu: 'Iphepha 2' },
  progressSummary: { en: 'Progress summary', zu: 'Isifinyezo senqubekela phambili' },
  topicsCompleted: { en: 'Topics completed', zu: 'Izihloko eziqediwe' },
  averageMastery: { en: 'Average mastery score', zu: 'Isilinganiso samamaki obungcweti' },
  startTopic: { en: 'Start', zu: 'Qala' },
  continueTopic: { en: 'Continue', zu: 'Qhubeka' },
  introduction: { en: 'Introduction', zu: 'Isingeniso' },
  notes: { en: 'Notes', zu: 'Amanothi' },
  workedExamples: { en: 'Worked Examples', zu: 'Izibonelo Ezichaziwe' },
  quizzes: { en: 'Quizzes', zu: 'Imibuzo Yokuzivivinya' },
  videos: { en: 'Videos', zu: 'Amavidiyo' },
  ask: { en: 'Ask uMakhi', zu: 'Buza uMakhi' },
  progress: { en: 'Progress', zu: 'Inqubekela phambili' },
  masteryScore: { en: 'Mastery score', zu: 'Isikolo sobungcweti' },
  chooseLanguage: { en: 'Language', zu: 'Ulimi' },
  english: { en: 'English', zu: 'IsiNgisi' },
  zulu: { en: 'isiZulu', zu: 'isiZulu' },
};
