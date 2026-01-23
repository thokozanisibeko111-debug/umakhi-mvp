export interface TopicSeed {
  id: string;
  title: string;
  description: string;
}

export interface TopicNotesSeed {
  id: string;
  topic_id: string;
  introduction: string;
  notes_md: string;
  visuals_json: Array<{
    title: string;
    description?: string;
    svg: string;
  }>;
}

export interface VideoSeed {
  id: string;
  topic_id: string;
  title: string;
  url: string;
  source: string;
  description: string;
}

export interface QuizSeed {
  id: string;
  topic_id: string;
  title: string;
}

export interface QuestionSeed {
  id: string;
  quiz_id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
}

export const grade12Topics: TopicSeed[] = [
  {
    id: 'f81cb2f3-a5cb-496c-9382-900f284db215',
    title: 'Paper 1: Functions & Graphs',
    description: 'Key function families, transformations, and interpreting graphs.',
  },
  {
    id: '9d8631fa-4a0a-4531-8280-076d1831abe7',
    title: 'Paper 1: Algebraic Expressions',
    description: 'Simplifying, factorising, and solving equations and inequalities.',
  },
  {
    id: 'a7dbbaca-f864-4d54-acaf-9a198b8e0741',
    title: 'Paper 1: Sequences & Series',
    description: 'Arithmetic and geometric sequences with sigma notation.',
  },
  {
    id: 'f042fc99-f700-4682-bad4-e2997369d4f8',
    title: 'Paper 1: Differential Calculus',
    description: 'Limits, derivatives, and rate of change in real contexts.',
  },
  {
    id: 'e376e0c6-dcc9-4ab5-af05-9dd145ad89ff',
    title: 'Paper 1: Finance & Growth',
    description: 'Simple and compound interest, growth and decay models.',
  },
  {
    id: '58217232-4bef-4a95-8d3f-fffae752673f',
    title: 'Paper 2: Analytical Geometry',
    description: 'Distance, midpoint, gradients, and equations of lines.',
  },
  {
    id: 'b8edbce0-ae3d-4947-9cc1-cd3ffa678352',
    title: 'Paper 2: Trigonometry',
    description: 'Identities, equations, and graph interpretation.',
  },
  {
    id: '42bf39e7-e0ed-4841-aa31-98d0bff61da0',
    title: 'Paper 2: Euclidean Geometry',
    description: 'Theorems, proofs, and circle geometry.',
  },
  {
    id: 'cb7c3532-77e6-41b9-a49e-1697d1183767',
    title: 'Paper 2: Statistics & Probability',
    description: 'Data displays, measures of spread, and probability rules.',
  },
  {
    id: 'b01e1a97-14e4-4a78-affd-948333afb202',
    title: 'Paper 2: Vectors & Transformation Geometry',
    description: 'Vector notation, resultant vectors, and geometric transformations.',
  },
];

export const grade12Notes: TopicNotesSeed[] = [
  {
    id: '6a3ea0a9-1f6f-4f20-9a1b-c1f8e5f32f5a',
    topic_id: 'f81cb2f3-a5cb-496c-9382-900f284db215',
    introduction:
      'Functions help us link inputs and outputs. In Grade 12 you interpret and transform graphs like parabolas, hyperbolas, exponentials, and trig graphs.',
    notes_md:
      '## Key ideas\nFunctions are rules. A graph shows how y changes when x changes.\n\n### Methods\n- Identify the base graph first (e.g. y = x^2).\n- Apply shifts: y = f(x) + k moves up, y = f(x + a) moves left.\n- Stretch or compress with y = af(x).\n\n### Common mistakes\n- Forgetting that x-shifts are opposite in sign.\n- Mixing up reflections in the x- and y-axis.\n\n### Summary\n- Know the shapes of standard graphs.\n- Transform step-by-step and label key points.',
    visuals_json: [
      {
        title: 'Parabola shift',
        description: 'Base graph y = x^2 shifted up by 2 units.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='20' y1='110' x2='200' y2='110' stroke='#94a3b8' stroke-width='1'/><line x1='110' y1='20' x2='110' y2='130' stroke='#94a3b8' stroke-width='1'/><path d='M60 110 Q110 50 160 110' fill='none' stroke='#4f46e5' stroke-width='2'/><circle cx='110' cy='50' r='4' fill='#14b8a6'/></svg>",
      },
    ],
  },
  {
    id: 'de4f6f5e-3630-4b3a-8b77-79a4a0c2e69b',
    topic_id: '9d8631fa-4a0a-4531-8280-076d1831abe7',
    introduction:
      'Algebra helps you simplify and solve. These skills support every other topic in Grade 12 Mathematics.',
    notes_md:
      '## Key ideas\nFactorising breaks expressions into simpler parts. Solving means finding values that make the equation true.\n\n### Methods\n- Take out common factors first.\n- Use patterns: a^2 - b^2 = (a-b)(a+b).\n- For quadratics, try factorising before the formula.\n\n### Exam tips\n- Check by substituting your answer back in.\n- Keep your working neat and aligned.',
    visuals_json: [
      {
        title: 'Factorisation flow',
        description: 'Start with common factors, then special patterns.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><rect x='20' y='20' width='180' height='30' rx='8' fill='#e0e7ff'/><text x='110' y='40' text-anchor='middle' font-size='12' fill='#1f2937'>Find common factor</text><rect x='20' y='70' width='180' height='30' rx='8' fill='#ecfeff'/><text x='110' y='90' text-anchor='middle' font-size='12' fill='#1f2937'>Apply pattern</text></svg>",
      },
    ],
  },
  {
    id: '29896c36-4b2a-47ac-a9bd-7d46ed78b2d2',
    topic_id: 'a7dbbaca-f864-4d54-acaf-9a198b8e0741',
    introduction:
      'Sequences show patterns. You will work with arithmetic and geometric sequences and series.',
    notes_md:
      '## Key ideas\nArithmetic: constant difference. Geometric: constant ratio.\n\n### Methods\n- For arithmetic: T_n = a + (n-1)d.\n- For geometric: T_n = ar^(n-1).\n- Sum of arithmetic series: S_n = n/2(2a + (n-1)d).\n\n### Summary\n- Identify d or r early.\n- Use sigma notation carefully.',
    visuals_json: [
      {
        title: 'Arithmetic vs geometric',
        description: 'Difference vs ratio check.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='40' x2='190' y2='40' stroke='#4f46e5' stroke-width='2'/><circle cx='50' cy='40' r='6' fill='#4f46e5'/><circle cx='90' cy='40' r='6' fill='#4f46e5'/><circle cx='130' cy='40' r='6' fill='#4f46e5'/><circle cx='170' cy='40' r='6' fill='#4f46e5'/><line x1='30' y1='100' x2='190' y2='100' stroke='#14b8a6' stroke-width='2'/><circle cx='50' cy='100' r='6' fill='#14b8a6'/><circle cx='80' cy='100' r='8' fill='#14b8a6'/><circle cx='120' cy='100' r='10' fill='#14b8a6'/></svg>",
      },
    ],
  },
  {
    id: '3c1b6a07-bbdf-43db-9fe5-bc62b0ec1d8f',
    topic_id: 'f042fc99-f700-4682-bad4-e2997369d4f8',
    introduction: 'Differential calculus helps you measure how fast things change and how graphs behave.',
    notes_md:
      "## Key ideas\nThe derivative is the gradient of the tangent at a point.\n\n### Methods\n- Use basic rules: (x^n)' = nx^(n-1).\n- Combine with sum, difference, and constant multiple rules.\n- Interpret the derivative as rate of change.\n\n### Summary\n- Always state the derivative clearly.\n- Link algebra to the graph shape.",
    visuals_json: [
      {
        title: 'Tangent slope',
        description: 'A tangent touches the curve at one point.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><path d='M30 110 Q110 30 190 110' fill='none' stroke='#4f46e5' stroke-width='2'/><line x1='70' y1='90' x2='150' y2='50' stroke='#f97316' stroke-width='2'/><circle cx='110' cy='70' r='4' fill='#f97316'/></svg>",
      },
    ],
  },
  {
    id: '24c7f3e3-ec20-4bb1-9b5b-6c45a0f9f3a1',
    topic_id: 'e376e0c6-dcc9-4ab5-af05-9dd145ad89ff',
    introduction: 'Finance math explains how money grows or shrinks over time.',
    notes_md:
      '## Key ideas\nSimple interest grows by the same amount each period. Compound interest grows by a percentage of the current balance.\n\n### Methods\n- Simple: A = P(1 + in).\n- Compound: A = P(1 + i)^n.\n- Growth/decay: N = N0(1 ± r)^t.\n\n### Summary\n- Use the correct formula for the context.\n- Convert percentages to decimals before calculating.',
    visuals_json: [
      {
        title: 'Growth curve',
        description: 'Compound growth rises faster over time.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='110' x2='190' y2='110' stroke='#94a3b8' stroke-width='1'/><line x1='30' y1='110' x2='30' y2='30' stroke='#94a3b8' stroke-width='1'/><path d='M30 110 C70 90 110 70 150 40' fill='none' stroke='#14b8a6' stroke-width='2'/></svg>",
      },
    ],
  },
  {
    id: '2f0b3cc0-7a7e-4d2b-92f7-f82f260a8adb',
    topic_id: '58217232-4bef-4a95-8d3f-fffae752673f',
    introduction: 'Analytical geometry uses coordinates to solve geometry problems.',
    notes_md:
      '## Key ideas\nUse distance, midpoint, and gradient formulas to describe lines and shapes.\n\n### Methods\n- Distance: d = √((x2-x1)^2 + (y2-y1)^2).\n- Gradient: m = (y2-y1)/(x2-x1).\n- Equation of line: y - y1 = m(x - x1).\n\n### Summary\n- Draw a quick sketch to visualize points and lines.',
    visuals_json: [
      {
        title: 'Line through points',
        description: 'Connect two points and find the gradient.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='110' x2='190' y2='30' stroke='#4f46e5' stroke-width='2'/><circle cx='50' cy='90' r='4' fill='#14b8a6'/><circle cx='170' cy='50' r='4' fill='#14b8a6'/></svg>",
      },
    ],
  },
  {
    id: '08f98f4f-4c27-4a01-87e8-3c76492f4f3f',
    topic_id: 'b8edbce0-ae3d-4947-9cc1-cd3ffa678352',
    introduction: 'Trigonometry connects angles and lengths in triangles and graphs.',
    notes_md:
      '## Key ideas\nUse the trig ratios and identities to solve equations and prove statements.\n\n### Methods\n- sin^2(x) + cos^2(x) = 1.\n- Solve trig equations by isolating functions, then using the unit circle.\n- In graphs, note amplitude, period, and shifts.\n\n### Summary\n- Always write the general solution for angle questions.',
    visuals_json: [
      {
        title: 'Trig wave',
        description: 'A simple sine wave shows periodic motion.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><path d='M20 80 C50 40 90 40 120 80 C150 120 190 120 210 80' fill='none' stroke='#4f46e5' stroke-width='2'/><line x1='20' y1='80' x2='210' y2='80' stroke='#94a3b8' stroke-width='1'/></svg>",
      },
    ],
  },
  {
    id: '27b0c2fd-c7fd-4001-8d78-8b5f89edc9ef',
    topic_id: '42bf39e7-e0ed-4841-aa31-98d0bff61da0',
    introduction: 'Euclidean geometry focuses on proofs and relationships in triangles and circles.',
    notes_md:
      '## Key ideas\nUse theorems to justify each step. Circle geometry often uses angles in the same segment.\n\n### Methods\n- State a theorem before using it.\n- Use chord and tangent properties.\n- Show all reasoning clearly.\n\n### Summary\n- A correct diagram helps you see relationships.',
    visuals_json: [
      {
        title: 'Circle angle',
        description: 'Angles subtended by the same chord are equal.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><circle cx='110' cy='70' r='50' fill='none' stroke='#4f46e5' stroke-width='2'/><line x1='60' y1='70' x2='160' y2='70' stroke='#94a3b8' stroke-width='1'/><line x1='110' y1='70' x2='160' y2='30' stroke='#14b8a6' stroke-width='2'/><line x1='110' y1='70' x2='160' y2='110' stroke='#14b8a6' stroke-width='2'/></svg>",
      },
    ],
  },
  {
    id: '645f7e34-3b4b-4c85-8d12-41f6c4b4b9a2',
    topic_id: 'cb7c3532-77e6-41b9-a49e-1697d1183767',
    introduction: 'Statistics and probability help you interpret data and predict outcomes.',
    notes_md:
      '## Key ideas\nSummaries like mean, median, and standard deviation describe data sets.\n\n### Methods\n- Use tables and graphs to spot patterns.\n- Probability of A or B: P(A) + P(B) - P(A and B).\n- Use tree diagrams for multiple events.\n\n### Summary\n- Always label axes and units in statistics questions.',
    visuals_json: [
      {
        title: 'Box plot summary',
        description: 'Median and quartiles show distribution.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='70' x2='190' y2='70' stroke='#94a3b8' stroke-width='1'/><rect x='70' y='50' width='80' height='40' fill='#e0e7ff' stroke='#4f46e5' stroke-width='2'/><line x1='110' y1='50' x2='110' y2='90' stroke='#4f46e5' stroke-width='2'/><line x1='50' y1='70' x2='70' y2='70' stroke='#4f46e5' stroke-width='2'/><line x1='150' y1='70' x2='170' y2='70' stroke='#4f46e5' stroke-width='2'/></svg>",
      },
    ],
  },
  {
    id: '15c0c4b2-2f9b-4b9d-9366-ef03e4f3f8c9',
    topic_id: 'b01e1a97-14e4-4a78-affd-948333afb202',
    introduction: 'Vectors and transformations describe movement and change in the plane.',
    notes_md:
      '## Key ideas\nVectors have magnitude and direction. Transformations move shapes without changing their size or orientation (unless stated).\n\n### Methods\n- Add vectors head-to-tail.\n- Use column vectors for coordinates.\n- Identify transformation type (translation, reflection, rotation).\n\n### Summary\n- Use clear notation: →AB or (x, y).',
    visuals_json: [
      {
        title: 'Vector addition',
        description: 'Head-to-tail method for resultants.',
        svg: "<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='40' y1='100' x2='120' y2='60' stroke='#4f46e5' stroke-width='2'/><line x1='120' y1='60' x2='180' y2='90' stroke='#14b8a6' stroke-width='2'/><line x1='40' y1='100' x2='180' y2='90' stroke='#f97316' stroke-width='2' stroke-dasharray='4 3'/></svg>",
      },
    ],
  },
];

export const grade12Videos: VideoSeed[] = [
  {
    id: '2a4b4e6f-1237-4e67-a75e-1e51a1a9f1bf',
    topic_id: 'f81cb2f3-a5cb-496c-9382-900f284db215',
    title: 'Transforming basic functions',
    url: 'https://www.youtube.com/watch?v=V5rqJGshW8Q',
    source: 'YouTube',
    description: 'Shifts, stretches, and reflections.',
  },
  {
    id: '76d8b256-1205-4e11-98f3-7c3f2f50d9e0',
    topic_id: '9d8631fa-4a0a-4531-8280-076d1831abe7',
    title: 'Factorising quadratics',
    url: 'https://www.youtube.com/watch?v=IlNAJl36-10',
    source: 'YouTube',
    description: 'Quick factorisation tips.',
  },
  {
    id: '190f1d2e-10e9-4f34-91a0-7bb940d46203',
    topic_id: 'a7dbbaca-f864-4d54-acaf-9a198b8e0741',
    title: 'Arithmetic vs geometric sequences',
    url: 'https://www.youtube.com/watch?v=f0BGcxJp4nk',
    source: 'YouTube',
    description: 'Identify sequences and find terms.',
  },
  {
    id: '5d7b2cf4-97d7-4a52-9145-35151b0c1a01',
    topic_id: 'f042fc99-f700-4682-bad4-e2997369d4f8',
    title: 'Derivative basics',
    url: 'https://www.youtube.com/watch?v=ANyVpMS3HLw',
    source: 'YouTube',
    description: 'Rules for differentiation and slope.',
  },
  {
    id: '24b5c0a8-e58f-4bba-9a08-0ef6c9f4f2b5',
    topic_id: 'e376e0c6-dcc9-4ab5-af05-9dd145ad89ff',
    title: 'Compound interest explained',
    url: 'https://www.youtube.com/watch?v=HhNq8Z1U4UU',
    source: 'YouTube',
    description: 'Understanding compound growth.',
  },
  {
    id: 'e4a3f4c5-1de8-4c47-9e23-12a0c2b5f91c',
    topic_id: '58217232-4bef-4a95-8d3f-fffae752673f',
    title: 'Distance and midpoint formula',
    url: 'https://www.youtube.com/watch?v=JbI4U2upZ3s',
    source: 'YouTube',
    description: 'Coordinate geometry essentials.',
  },
  {
    id: '0f5f92a4-9d9e-4cb6-9550-5e2f843a2c8d',
    topic_id: 'b8edbce0-ae3d-4947-9cc1-cd3ffa678352',
    title: 'Solving trig equations',
    url: 'https://www.youtube.com/watch?v=F8Vlm2nM5xI',
    source: 'YouTube',
    description: 'Working with identities and solutions.',
  },
  {
    id: 'fc8e0d0c-5e35-4d9b-9e58-5b7a2a8f2a89',
    topic_id: '42bf39e7-e0ed-4841-aa31-98d0bff61da0',
    title: 'Circle theorems',
    url: 'https://www.youtube.com/watch?v=1Xb6b5vZQ5U',
    source: 'YouTube',
    description: 'Key Euclidean geometry proofs.',
  },
  {
    id: 'a7c6f0e2-80a4-4a2d-bd4c-2d4d7d7f2c33',
    topic_id: 'cb7c3532-77e6-41b9-a49e-1697d1183767',
    title: 'Statistics revision',
    url: 'https://www.youtube.com/watch?v=xxpc-HPKN28',
    source: 'YouTube',
    description: 'Mean, median, and spread.',
  },
  {
    id: 'bc5e7f2e-6e56-4ab0-8c9e-6c06ac9b7b62',
    topic_id: 'b01e1a97-14e4-4a78-affd-948333afb202',
    title: 'Vector basics',
    url: 'https://www.youtube.com/watch?v=ML7GRm5i1Xs',
    source: 'YouTube',
    description: 'Vector notation and addition.',
  },
];

export const grade12Quizzes: QuizSeed[] = [
  {
    id: '6b7b9f5e-62f1-4c3e-9739-8854480f999f',
    topic_id: 'f81cb2f3-a5cb-496c-9382-900f284db215',
    title: 'Functions & Graphs Warm-up',
  },
  {
    id: '82698f3a-ef1c-41ed-a978-274a6abb1cfa',
    topic_id: '9d8631fa-4a0a-4531-8280-076d1831abe7',
    title: 'Algebra Essentials',
  },
  {
    id: '2f66411e-591f-4198-ae1a-52697860422e',
    topic_id: 'a7dbbaca-f864-4d54-acaf-9a198b8e0741',
    title: 'Sequences & Series Check',
  },
  {
    id: '03a963e2-f7c9-4753-809b-ea8ab266ab88',
    topic_id: 'f042fc99-f700-4682-bad4-e2997369d4f8',
    title: 'Differential Calculus Check',
  },
  {
    id: 'e0d4dd2e-8546-4029-a17f-f17ddbf1def9',
    topic_id: 'e376e0c6-dcc9-4ab5-af05-9dd145ad89ff',
    title: 'Finance & Growth Quiz',
  },
  {
    id: 'cde27866-6352-4eae-aa00-b7c707dd7cdb',
    topic_id: '58217232-4bef-4a95-8d3f-fffae752673f',
    title: 'Analytical Geometry Quiz',
  },
  {
    id: '13636325-7d38-4b85-8436-49489bbed8de',
    topic_id: 'b8edbce0-ae3d-4947-9cc1-cd3ffa678352',
    title: 'Trigonometry Quiz',
  },
  {
    id: '727bc754-2304-464d-a1a0-984124150bd0',
    topic_id: '42bf39e7-e0ed-4841-aa31-98d0bff61da0',
    title: 'Euclidean Geometry Quiz',
  },
  {
    id: '4a39d294-eb40-4b73-af6e-f7e2dac67126',
    topic_id: 'cb7c3532-77e6-41b9-a49e-1697d1183767',
    title: 'Statistics & Probability Quiz',
  },
  {
    id: '7b5e0b93-0f86-40e6-9c9a-ea82726a961a',
    topic_id: 'b01e1a97-14e4-4a78-affd-948333afb202',
    title: 'Vectors & Transformations Quiz',
  },
];

export const grade12Questions: QuestionSeed[] = [
  {
    id: '0e2f45c7-9270-4e71-8c28-c3f3f8d1e1a2',
    quiz_id: '6b7b9f5e-62f1-4c3e-9739-8854480f999f',
    question: 'Which transformation shifts y = x^2 up by 3 units?',
    option_a: 'y = x^2 - 3',
    option_b: 'y = x^2 + 3',
    option_c: 'y = (x+3)^2',
    option_d: 'y = (x-3)^2',
    correct_option: 'B',
    explanation: 'Adding a constant to the output shifts the graph up.',
  },
  {
    id: '76cb5f52-4b9f-4e0e-a3b2-bd8b2ccf75e4',
    quiz_id: '6b7b9f5e-62f1-4c3e-9739-8854480f999f',
    question: 'The graph of y = -f(x) is a reflection in the ...',
    option_a: 'x-axis',
    option_b: 'y-axis',
    option_c: 'line y = x',
    option_d: 'origin',
    correct_option: 'A',
    explanation: 'A negative sign on the output reflects over the x-axis.',
  },
  {
    id: '4e2bff8c-8ac9-4d0c-9f06-2fb7d5b1c2bd',
    quiz_id: '6b7b9f5e-62f1-4c3e-9739-8854480f999f',
    question: 'If f(2) = 5, then f(2) + 4 equals ...',
    option_a: '1',
    option_b: '4',
    option_c: '9',
    option_d: '10',
    correct_option: 'C',
    explanation: 'Add 4 to the output 5.',
  },
  {
    id: '8d8fbcde-c5d9-4d44-97a0-71e30f3c577b',
    quiz_id: '82698f3a-ef1c-41ed-a978-274a6abb1cfa',
    question: 'Factorise: x^2 - 9',
    option_a: '(x-9)(x+1)',
    option_b: '(x-3)(x+3)',
    option_c: '(x-1)(x+9)',
    option_d: '(x-3)^2',
    correct_option: 'B',
    explanation: 'Use difference of squares.',
  },
  {
    id: '7a9cc840-b0f0-45a6-bc8f-1a4e377dadc6',
    quiz_id: '82698f3a-ef1c-41ed-a978-274a6abb1cfa',
    question: 'Solve: 2x + 5 = 13',
    option_a: 'x = 2',
    option_b: 'x = 4',
    option_c: 'x = 6',
    option_d: 'x = 8',
    correct_option: 'B',
    explanation: 'Subtract 5 then divide by 2.',
  },
  {
    id: '4f8429e8-5ef6-4d1f-9090-6c2f6f0e5c67',
    quiz_id: '82698f3a-ef1c-41ed-a978-274a6abb1cfa',
    question: 'Simplify: 3(x - 2) + 4',
    option_a: '3x - 6 + 4',
    option_b: '3x - 2',
    option_c: '3x - 10',
    option_d: '3x + 2',
    correct_option: 'D',
    explanation: 'Distribute then combine like terms.',
  },
  {
    id: '59b2bdb3-6a1e-4c28-8b62-7e42bb6a12a4',
    quiz_id: '2f66411e-591f-4198-ae1a-52697860422e',
    question: 'Which sequence has a common difference?',
    option_a: '2, 4, 8, 16',
    option_b: '3, 6, 12, 24',
    option_c: '5, 8, 11, 14',
    option_d: '1, 2, 4, 8',
    correct_option: 'C',
    explanation: 'The difference is +3 each time.',
  },
  {
    id: '111eecfa-7cd2-4ff8-9e5c-1dd08f6f9f95',
    quiz_id: '2f66411e-591f-4198-ae1a-52697860422e',
    question: 'Find the 5th term of an arithmetic sequence with a=2, d=3',
    option_a: '11',
    option_b: '14',
    option_c: '17',
    option_d: '20',
    correct_option: 'B',
    explanation: 'T5 = 2 + 4*3 = 14.',
  },
  {
    id: '9b5d7b6b-0a6f-4bcb-8c62-9c66f7b41d5c',
    quiz_id: '2f66411e-591f-4198-ae1a-52697860422e',
    question: 'For a geometric sequence with a=3 and r=2, T4 equals ...',
    option_a: '12',
    option_b: '18',
    option_c: '24',
    option_d: '30',
    correct_option: 'C',
    explanation: 'T4 = 3 * 2^3 = 24.',
  },
  {
    id: 'f1dfc616-707a-4ed1-97f5-dc6cc12b2a37',
    quiz_id: '03a963e2-f7c9-4753-809b-ea8ab266ab88',
    question: "If f(x) = x^2, f'(x) is ...",
    option_a: '2x',
    option_b: 'x',
    option_c: 'x^2',
    option_d: '2',
    correct_option: 'A',
    explanation: 'Use power rule.',
  },
  {
    id: '4e34365d-8c60-4f5a-9c6f-3e0b0e7e3b63',
    quiz_id: '03a963e2-f7c9-4753-809b-ea8ab266ab88',
    question: 'The derivative represents the ...',
    option_a: 'area under a curve',
    option_b: 'rate of change',
    option_c: 'average value',
    option_d: 'x-intercept',
    correct_option: 'B',
    explanation: 'Derivative is instantaneous rate of change.',
  },
  {
    id: '15976b22-3f01-48a9-a0e0-b929a3aa8d33',
    quiz_id: '03a963e2-f7c9-4753-809b-ea8ab266ab88',
    question: "If f'(3) = -2, the graph is ...",
    option_a: 'increasing',
    option_b: 'decreasing',
    option_c: 'horizontal',
    option_d: 'constant',
    correct_option: 'B',
    explanation: 'Negative slope means decreasing.',
  },
  {
    id: '35fe11c6-b9db-4f88-9cfe-98e7c2d67671',
    quiz_id: 'e0d4dd2e-8546-4029-a17f-f17ddbf1def9',
    question: 'Compound interest uses the formula ...',
    option_a: 'A = P(1 + in)',
    option_b: 'A = P(1 - i)^n',
    option_c: 'A = P(1 + i)^n',
    option_d: 'A = P + in',
    correct_option: 'C',
    explanation: 'Compound interest applies a power to the growth factor.',
  },
  {
    id: '1f0d1c21-ec1f-4c68-9a45-2d7a9e2f9c0f',
    quiz_id: 'e0d4dd2e-8546-4029-a17f-f17ddbf1def9',
    question: 'If P = 1 000 and i = 0.1, after 2 years A equals ...',
    option_a: '1 200',
    option_b: '1 210',
    option_c: '1 300',
    option_d: '1 400',
    correct_option: 'B',
    explanation: 'A = 1000(1.1)^2 = 1210.',
  },
  {
    id: 'cb2af0f5-3f3a-4d9a-9df6-1f6d4f9a7c47',
    quiz_id: 'e0d4dd2e-8546-4029-a17f-f17ddbf1def9',
    question: 'Growth of 5% means multiply by ...',
    option_a: '0.95',
    option_b: '1.05',
    option_c: '5',
    option_d: '105',
    correct_option: 'B',
    explanation: 'Increase factor is 1 + 0.05.',
  },
  {
    id: '0c4d8c2a-11bf-4f51-9d36-9a1b0d0a5f4f',
    quiz_id: 'cde27866-6352-4eae-aa00-b7c707dd7cdb',
    question: 'Distance between (0,0) and (3,4) is ...',
    option_a: '5',
    option_b: '7',
    option_c: '12',
    option_d: '1',
    correct_option: 'A',
    explanation: 'Use the 3-4-5 triangle.',
  },
  {
    id: 'f6cfc1c9-0c4b-4371-81ac-2ebae8a66a2f',
    quiz_id: 'cde27866-6352-4eae-aa00-b7c707dd7cdb',
    question: 'Gradient of line through (1,2) and (3,6) is ...',
    option_a: '1',
    option_b: '2',
    option_c: '3',
    option_d: '4',
    correct_option: 'B',
    explanation: 'm = (6-2)/(3-1) = 2.',
  },
  {
    id: 'a1c7f1c2-9c7d-4bdf-99a7-2a1b0c8a9e1a',
    quiz_id: 'cde27866-6352-4eae-aa00-b7c707dd7cdb',
    question: 'Midpoint of (2,4) and (6,8) is ...',
    option_a: '(4,6)',
    option_b: '(2,6)',
    option_c: '(6,4)',
    option_d: '(8,2)',
    correct_option: 'A',
    explanation: 'Average the x and y coordinates.',
  },
  {
    id: '1b0d88b7-3e7e-4a88-9f3c-1a2b3c4d5e6f',
    quiz_id: '13636325-7d38-4b85-8436-49489bbed8de',
    question: 'sin^2(x) + cos^2(x) equals ...',
    option_a: '0',
    option_b: '1',
    option_c: '2',
    option_d: 'sin(x)',
    correct_option: 'B',
    explanation: 'Fundamental identity.',
  },
  {
    id: '2c1d2e3f-4a5b-6c7d-8e9f-0a1b2c3d4e5f',
    quiz_id: '13636325-7d38-4b85-8436-49489bbed8de',
    question: 'If sin(θ) = 1/2, one solution in [0,360] is ...',
    option_a: '30°',
    option_b: '60°',
    option_c: '90°',
    option_d: '120°',
    correct_option: 'B',
    explanation: 'sin 60° = 1/2.',
  },
  {
    id: '3d2c1b0a-9f8e-7d6c-5b4a-3c2d1e0f9a8b',
    quiz_id: '13636325-7d38-4b85-8436-49489bbed8de',
    question: 'A period of 360° belongs to ...',
    option_a: 'sin x',
    option_b: 'sin 2x',
    option_c: 'sin 0.5x',
    option_d: 'sin 3x',
    correct_option: 'A',
    explanation: 'Standard sine has period 360°.',
  },
  {
    id: '4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b',
    quiz_id: '727bc754-2304-464d-a1a0-984124150bd0',
    question: 'Opposite angles of a cyclic quadrilateral are ...',
    option_a: 'equal',
    option_b: 'complementary',
    option_c: 'supplementary',
    option_d: 'right angles',
    correct_option: 'C',
    explanation: 'They add to 180°.',
  },
  {
    id: '5f6e7d8c-9b0a-1c2d-3e4f-5a6b7c8d9e0f',
    quiz_id: '727bc754-2304-464d-a1a0-984124150bd0',
    question: 'A tangent is perpendicular to the ...',
    option_a: 'radius at point of contact',
    option_b: 'diameter',
    option_c: 'chord',
    option_d: 'arc',
    correct_option: 'A',
    explanation: 'Tangent-radius theorem.',
  },
  {
    id: '6a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d',
    quiz_id: '727bc754-2304-464d-a1a0-984124150bd0',
    question: 'Angles in the same segment are ...',
    option_a: 'different',
    option_b: 'equal',
    option_c: 'complementary',
    option_d: 'supplementary',
    correct_option: 'B',
    explanation: 'Same segment theorem.',
  },
  {
    id: '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e',
    quiz_id: '4a39d294-eb40-4b73-af6e-f7e2dac67126',
    question: 'The mean of 2, 4, 6, 8 is ...',
    option_a: '4',
    option_b: '5',
    option_c: '6',
    option_d: '7',
    correct_option: 'B',
    explanation: 'Sum is 20, divide by 4.',
  },
  {
    id: '8c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f',
    quiz_id: '4a39d294-eb40-4b73-af6e-f7e2dac67126',
    question: 'Probability of both A and B is written as ...',
    option_a: 'P(A) + P(B)',
    option_b: 'P(A or B)',
    option_c: 'P(A and B)',
    option_d: 'P(A)/P(B)',
    correct_option: 'C',
    explanation: 'Use intersection for both events.',
  },
  {
    id: '9d0e1f2a-3b4c-5d6e-7f8a-9b0c1d2e3f4a',
    quiz_id: '4a39d294-eb40-4b73-af6e-f7e2dac67126',
    question: 'A fair coin has probability of heads ...',
    option_a: '0',
    option_b: '0.25',
    option_c: '0.5',
    option_d: '1',
    correct_option: 'C',
    explanation: 'Two equally likely outcomes.',
  },
  {
    id: '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
    quiz_id: '7b5e0b93-0f86-40e6-9c9a-ea82726a961a',
    question: 'A vector has ...',
    option_a: 'only size',
    option_b: 'only direction',
    option_c: 'size and direction',
    option_d: 'no direction',
    correct_option: 'C',
    explanation: 'Vectors include magnitude and direction.',
  },
  {
    id: '1b2c3d4e-5f6a-7b8c-9d0e-1f2a3b4c5d6e',
    quiz_id: '7b5e0b93-0f86-40e6-9c9a-ea82726a961a',
    question: 'Translate (x, y) by (3, -2) gives ...',
    option_a: '(x+3, y-2)',
    option_b: '(x-3, y+2)',
    option_c: '(x+3, y+2)',
    option_d: '(x-3, y-2)',
    correct_option: 'A',
    explanation: 'Add the translation vector.',
  },
  {
    id: '2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f',
    quiz_id: '7b5e0b93-0f86-40e6-9c9a-ea82726a961a',
    question: 'The resultant of (2,1) + (1,3) is ...',
    option_a: '(1,2)',
    option_b: '(3,4)',
    option_c: '(2,4)',
    option_d: '(4,2)',
    correct_option: 'B',
    explanation: 'Add components: (2+1, 1+3).',
  },
];
