-- Seed data for uMakhi Grade 12 Mathematics topics, notes, visuals, videos, and quizzes.
-- Run after schema.sql in the Supabase SQL editor.

INSERT INTO topics (id, title, description)
VALUES
  ('f81cb2f3-a5cb-496c-9382-900f284db215', 'Paper 1: Functions & Graphs', 'Key function families, transformations, and interpreting graphs.'),
  ('9d8631fa-4a0a-4531-8280-076d1831abe7', 'Paper 1: Algebraic Expressions', 'Simplifying, factorising, and solving equations and inequalities.'),
  ('a7dbbaca-f864-4d54-acaf-9a198b8e0741', 'Paper 1: Sequences & Series', 'Arithmetic and geometric sequences with sigma notation.'),
  ('f042fc99-f700-4682-bad4-e2997369d4f8', 'Paper 1: Differential Calculus', 'Limits, derivatives, and rate of change in real contexts.'),
  ('e376e0c6-dcc9-4ab5-af05-9dd145ad89ff', 'Paper 1: Finance & Growth', 'Simple and compound interest, growth and decay models.'),
  ('58217232-4bef-4a95-8d3f-fffae752673f', 'Paper 2: Analytical Geometry', 'Distance, midpoint, gradients, and equations of lines.'),
  ('b8edbce0-ae3d-4947-9cc1-cd3ffa678352', 'Paper 2: Trigonometry', 'Identities, equations, and graph interpretation.'),
  ('42bf39e7-e0ed-4841-aa31-98d0bff61da0', 'Paper 2: Euclidean Geometry', 'Theorems, proofs, and circle geometry.'),
  ('cb7c3532-77e6-41b9-a49e-1697d1183767', 'Paper 2: Statistics & Probability', 'Data displays, measures of spread, and probability rules.'),
  ('b01e1a97-14e4-4a78-affd-948333afb202', 'Paper 2: Vectors & Transformation Geometry', 'Vector notation, resultant vectors, and geometric transformations.');

INSERT INTO topic_notes (topic_id, introduction, notes_md, visuals_json)
VALUES
  (
    'f81cb2f3-a5cb-496c-9382-900f284db215',
    'Functions help us link inputs and outputs. In Grade 12 you interpret and transform graphs like parabolas, hyperbolas, exponentials, and trig graphs.',
    '## Key ideas\nFunctions are rules. A graph shows how y changes when x changes.\n\n### Methods\n- Identify the base graph first (e.g. y = x^2).\n- Apply shifts: y = f(x) + k moves up, y = f(x + a) moves left.\n- Stretch or compress with y = af(x).\n\n### Common mistakes\n- Forgetting that x-shifts are opposite in sign.\n- Mixing up reflections in the x- and y-axis.\n\n### Summary\n- Know the shapes of standard graphs.\n- Transform step-by-step and label key points.',
    $$[
      {
        "title":"Parabola shift",
        "description":"Base graph y = x^2 shifted up by 2 units.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='20' y1='110' x2='200' y2='110' stroke='#94a3b8' stroke-width='1'/><line x1='110' y1='20' x2='110' y2='130' stroke='#94a3b8' stroke-width='1'/><path d='M60 110 Q110 50 160 110' fill='none' stroke='#4f46e5' stroke-width='2'/><circle cx='110' cy='50' r='4' fill='#14b8a6'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    '9d8631fa-4a0a-4531-8280-076d1831abe7',
    'Algebra helps you simplify and solve. These skills support every other topic in Grade 12 Mathematics.',
    '## Key ideas\nFactorising breaks expressions into simpler parts. Solving means finding values that make the equation true.\n\n### Methods\n- Take out common factors first.\n- Use patterns: a^2 - b^2 = (a-b)(a+b).\n- For quadratics, try factorising before the formula.\n\n### Exam tips\n- Check by substituting your answer back in.\n- Keep your working neat and aligned.',
    $$[
      {
        "title":"Factorisation flow",
        "description":"Start with common factors, then special patterns.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><rect x='20' y='20' width='180' height='30' rx='8' fill='#e0e7ff'/><text x='110' y='40' text-anchor='middle' font-size='12' fill='#1f2937'>Find common factor</text><rect x='20' y='70' width='180' height='30' rx='8' fill='#ecfeff'/><text x='110' y='90' text-anchor='middle' font-size='12' fill='#1f2937'>Apply pattern</text></svg>"
      }
    ]$$::jsonb
  ),
  (
    'a7dbbaca-f864-4d54-acaf-9a198b8e0741',
    'Sequences show patterns. You will work with arithmetic and geometric sequences and series.',
    '## Key ideas\nArithmetic: constant difference. Geometric: constant ratio.\n\n### Methods\n- For arithmetic: T_n = a + (n-1)d.\n- For geometric: T_n = ar^(n-1).\n- Sum of arithmetic series: S_n = n/2(2a + (n-1)d).\n\n### Summary\n- Identify d or r early.\n- Use sigma notation carefully.',
    $$[
      {
        "title":"Arithmetic vs geometric",
        "description":"Difference vs ratio check.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='40' x2='190' y2='40' stroke='#4f46e5' stroke-width='2'/><circle cx='50' cy='40' r='6' fill='#4f46e5'/><circle cx='90' cy='40' r='6' fill='#4f46e5'/><circle cx='130' cy='40' r='6' fill='#4f46e5'/><circle cx='170' cy='40' r='6' fill='#4f46e5'/><line x1='30' y1='100' x2='190' y2='100' stroke='#14b8a6' stroke-width='2'/><circle cx='50' cy='100' r='6' fill='#14b8a6'/><circle cx='80' cy='100' r='8' fill='#14b8a6'/><circle cx='120' cy='100' r='10' fill='#14b8a6'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    'f042fc99-f700-4682-bad4-e2997369d4f8',
    'Differential calculus helps you measure how fast things change and how graphs behave.',
    '## Key ideas\nThe derivative is the gradient of the tangent at a point.\n\n### Methods\n- Use basic rules: (x^n)\' = nx^(n-1).\n- Combine with sum, difference, and constant multiple rules.\n- Interpret the derivative as rate of change.\n\n### Summary\n- Always state the derivative clearly.\n- Link algebra to the graph shape.',
    $$[
      {
        "title":"Tangent slope",
        "description":"A tangent touches the curve at one point.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><path d='M30 110 Q110 30 190 110' fill='none' stroke='#4f46e5' stroke-width='2'/><line x1='70' y1='90' x2='150' y2='50' stroke='#f97316' stroke-width='2'/><circle cx='110' cy='70' r='4' fill='#f97316'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    'e376e0c6-dcc9-4ab5-af05-9dd145ad89ff',
    'Finance math explains how money grows or shrinks over time.',
    '## Key ideas\nSimple interest grows by the same amount each period. Compound interest grows by a percentage of the current balance.\n\n### Methods\n- Simple: A = P(1 + in).\n- Compound: A = P(1 + i)^n.\n- Growth/decay: N = N0(1 ± r)^t.\n\n### Summary\n- Use the correct formula for the context.\n- Convert percentages to decimals before calculating.',
    $$[
      {
        "title":"Growth curve",
        "description":"Compound growth rises faster over time.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='110' x2='190' y2='110' stroke='#94a3b8' stroke-width='1'/><line x1='30' y1='110' x2='30' y2='30' stroke='#94a3b8' stroke-width='1'/><path d='M30 110 C70 90 110 70 150 40' fill='none' stroke='#14b8a6' stroke-width='2'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    '58217232-4bef-4a95-8d3f-fffae752673f',
    'Analytical geometry uses coordinates to solve geometry problems.',
    '## Key ideas\nUse distance, midpoint, and gradient formulas to describe lines and shapes.\n\n### Methods\n- Distance: d = √((x2-x1)^2 + (y2-y1)^2).\n- Gradient: m = (y2-y1)/(x2-x1).\n- Equation of line: y - y1 = m(x - x1).\n\n### Summary\n- Draw a quick sketch to visualize points and lines.',
    $$[
      {
        "title":"Line through points",
        "description":"Connect two points and find the gradient.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='110' x2='190' y2='30' stroke='#4f46e5' stroke-width='2'/><circle cx='50' cy='90' r='4' fill='#14b8a6'/><circle cx='170' cy='50' r='4' fill='#14b8a6'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    'b8edbce0-ae3d-4947-9cc1-cd3ffa678352',
    'Trigonometry connects angles and lengths in triangles and graphs.',
    '## Key ideas\nUse the trig ratios and identities to solve equations and prove statements.\n\n### Methods\n- sin^2(x) + cos^2(x) = 1.\n- Solve trig equations by isolating functions, then using the unit circle.\n- In graphs, note amplitude, period, and shifts.\n\n### Summary\n- Always write the general solution for angle questions.',
    $$[
      {
        "title":"Trig wave",
        "description":"A simple sine wave shows periodic motion.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><path d='M20 80 C50 40 90 40 120 80 C150 120 190 120 210 80' fill='none' stroke='#4f46e5' stroke-width='2'/><line x1='20' y1='80' x2='210' y2='80' stroke='#94a3b8' stroke-width='1'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    '42bf39e7-e0ed-4841-aa31-98d0bff61da0',
    'Euclidean geometry focuses on proofs and relationships in triangles and circles.',
    '## Key ideas\nUse theorems to justify each step. Circle geometry often uses angles in the same segment.\n\n### Methods\n- State a theorem before using it.\n- Use chord and tangent properties.\n- Show all reasoning clearly.\n\n### Summary\n- A correct diagram helps you see relationships.',
    $$[
      {
        "title":"Circle angle",
        "description":"Angles subtended by the same chord are equal.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><circle cx='110' cy='70' r='50' fill='none' stroke='#4f46e5' stroke-width='2'/><line x1='60' y1='70' x2='160' y2='70' stroke='#94a3b8' stroke-width='1'/><line x1='110' y1='70' x2='160' y2='30' stroke='#14b8a6' stroke-width='2'/><line x1='110' y1='70' x2='160' y2='110' stroke='#14b8a6' stroke-width='2'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    'cb7c3532-77e6-41b9-a49e-1697d1183767',
    'Statistics and probability help you interpret data and predict outcomes.',
    '## Key ideas\nSummaries like mean, median, and standard deviation describe data sets.\n\n### Methods\n- Use tables and graphs to spot patterns.\n- Probability of A or B: P(A) + P(B) - P(A and B).\n- Use tree diagrams for multiple events.\n\n### Summary\n- Always label axes and units in statistics questions.',
    $$[
      {
        "title":"Box plot summary",
        "description":"Median and quartiles show distribution.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='30' y1='70' x2='190' y2='70' stroke='#94a3b8' stroke-width='1'/><rect x='70' y='50' width='80' height='40' fill='#e0e7ff' stroke='#4f46e5' stroke-width='2'/><line x1='110' y1='50' x2='110' y2='90' stroke='#4f46e5' stroke-width='2'/><line x1='50' y1='70' x2='70' y2='70' stroke='#4f46e5' stroke-width='2'/><line x1='150' y1='70' x2='170' y2='70' stroke='#4f46e5' stroke-width='2'/></svg>"
      }
    ]$$::jsonb
  ),
  (
    'b01e1a97-14e4-4a78-affd-948333afb202',
    'Vectors and transformations describe movement and change in the plane.',
    '## Key ideas\nVectors have magnitude and direction. Transformations move shapes without changing their size or orientation (unless stated).\n\n### Methods\n- Add vectors head-to-tail.\n- Use column vectors for coordinates.\n- Identify transformation type (translation, reflection, rotation).\n\n### Summary\n- Use clear notation: \u2192AB or (x, y).',
    $$[
      {
        "title":"Vector addition",
        "description":"Head-to-tail method for resultants.",
        "svg":"<svg width='220' height='140' viewBox='0 0 220 140' xmlns='http://www.w3.org/2000/svg'><rect width='220' height='140' fill='#fff'/><line x1='40' y1='100' x2='120' y2='60' stroke='#4f46e5' stroke-width='2'/><line x1='120' y1='60' x2='180' y2='90' stroke='#14b8a6' stroke-width='2'/><line x1='40' y1='100' x2='180' y2='90' stroke='#f97316' stroke-width='2' stroke-dasharray='4 3'/></svg>"
      }
    ]$$::jsonb
  );

INSERT INTO videos (topic_id, title, url, source, description)
VALUES
  ('f81cb2f3-a5cb-496c-9382-900f284db215', 'Transforming basic functions', 'https://www.youtube.com/watch?v=V5rqJGshW8Q', 'YouTube', 'Shifts, stretches, and reflections.'),
  ('9d8631fa-4a0a-4531-8280-076d1831abe7', 'Factorising quadratics', 'https://www.youtube.com/watch?v=IlNAJl36-10', 'YouTube', 'Quick factorisation tips.'),
  ('a7dbbaca-f864-4d54-acaf-9a198b8e0741', 'Arithmetic vs geometric sequences', 'https://www.youtube.com/watch?v=f0BGcxJp4nk', 'YouTube', 'Identify sequences and find terms.'),
  ('f042fc99-f700-4682-bad4-e2997369d4f8', 'Derivative basics', 'https://www.youtube.com/watch?v=ANyVpMS3HLw', 'YouTube', 'Rules for differentiation and slope.'),
  ('e376e0c6-dcc9-4ab5-af05-9dd145ad89ff', 'Compound interest explained', 'https://www.youtube.com/watch?v=HhNq8Z1U4UU', 'YouTube', 'Understanding compound growth.'),
  ('58217232-4bef-4a95-8d3f-fffae752673f', 'Distance and midpoint formula', 'https://www.youtube.com/watch?v=JbI4U2upZ3s', 'YouTube', 'Coordinate geometry essentials.'),
  ('b8edbce0-ae3d-4947-9cc1-cd3ffa678352', 'Solving trig equations', 'https://www.youtube.com/watch?v=F8Vlm2nM5xI', 'YouTube', 'Working with identities and solutions.'),
  ('42bf39e7-e0ed-4841-aa31-98d0bff61da0', 'Circle theorems', 'https://www.youtube.com/watch?v=1Xb6b5vZQ5U', 'YouTube', 'Key Euclidean geometry proofs.'),
  ('cb7c3532-77e6-41b9-a49e-1697d1183767', 'Statistics revision', 'https://www.youtube.com/watch?v=xxpc-HPKN28', 'YouTube', 'Mean, median, and spread.'),
  ('b01e1a97-14e4-4a78-affd-948333afb202', 'Vector basics', 'https://www.youtube.com/watch?v=ML7GRm5i1Xs', 'YouTube', 'Vector notation and addition.');

INSERT INTO quizzes (id, topic_id, title)
VALUES
  ('6b7b9f5e-62f1-4c3e-9739-8854480f999f', 'f81cb2f3-a5cb-496c-9382-900f284db215', 'Functions & Graphs Warm-up'),
  ('82698f3a-ef1c-41ed-a978-274a6abb1cfa', '9d8631fa-4a0a-4531-8280-076d1831abe7', 'Algebra Essentials'),
  ('2f66411e-591f-4198-ae1a-52697860422e', 'a7dbbaca-f864-4d54-acaf-9a198b8e0741', 'Sequences & Series Check'),
  ('03a963e2-f7c9-4753-809b-ea8ab266ab88', 'f042fc99-f700-4682-bad4-e2997369d4f8', 'Differential Calculus Check'),
  ('e0d4dd2e-8546-4029-a17f-f17ddbf1def9', 'e376e0c6-dcc9-4ab5-af05-9dd145ad89ff', 'Finance & Growth Quiz'),
  ('cde27866-6352-4eae-aa00-b7c707dd7cdb', '58217232-4bef-4a95-8d3f-fffae752673f', 'Analytical Geometry Quiz'),
  ('13636325-7d38-4b85-8436-49489bbed8de', 'b8edbce0-ae3d-4947-9cc1-cd3ffa678352', 'Trigonometry Quiz'),
  ('727bc754-2304-464d-a1a0-984124150bd0', '42bf39e7-e0ed-4841-aa31-98d0bff61da0', 'Euclidean Geometry Quiz'),
  ('4a39d294-eb40-4b73-af6e-f7e2dac67126', 'cb7c3532-77e6-41b9-a49e-1697d1183767', 'Statistics & Probability Quiz'),
  ('7b5e0b93-0f86-40e6-9c9a-ea82726a961a', 'b01e1a97-14e4-4a78-affd-948333afb202', 'Vectors & Transformations Quiz');

INSERT INTO questions (quiz_id, question, option_a, option_b, option_c, option_d, correct_option, explanation)
VALUES
  ('6b7b9f5e-62f1-4c3e-9739-8854480f999f', 'Which transformation shifts y = x^2 up by 3 units?', 'y = x^2 - 3', 'y = x^2 + 3', 'y = (x+3)^2', 'y = (x-3)^2', 'B', 'Adding a constant to the output shifts the graph up.'),
  ('6b7b9f5e-62f1-4c3e-9739-8854480f999f', 'The graph of y = -f(x) is a reflection in the ...', 'x-axis', 'y-axis', 'line y = x', 'origin', 'A', 'A negative sign on the output reflects over the x-axis.'),
  ('6b7b9f5e-62f1-4c3e-9739-8854480f999f', 'If f(2) = 5, then f(2) + 4 equals ...', '1', '4', '9', '10', 'C', 'Add 4 to the output 5.'),
  ('82698f3a-ef1c-41ed-a978-274a6abb1cfa', 'Factorise: x^2 - 9', '(x-9)(x+1)', '(x-3)(x+3)', '(x-1)(x+9)', '(x-3)^2', 'B', 'Use difference of squares.'),
  ('82698f3a-ef1c-41ed-a978-274a6abb1cfa', 'Solve: 2x + 5 = 13', 'x = 2', 'x = 4', 'x = 6', 'x = 8', 'B', 'Subtract 5 then divide by 2.'),
  ('82698f3a-ef1c-41ed-a978-274a6abb1cfa', 'Simplify: 3(x - 2) + 4', '3x - 6 + 4', '3x - 2', '3x - 10', '3x + 2', 'D', 'Distribute then combine like terms.'),
  ('2f66411e-591f-4198-ae1a-52697860422e', 'Which sequence has a common difference?', '2, 4, 8, 16', '3, 6, 12, 24', '5, 8, 11, 14', '1, 2, 4, 8', 'C', 'The difference is +3 each time.'),
  ('2f66411e-591f-4198-ae1a-52697860422e', 'Find the 5th term of an arithmetic sequence with a=2, d=3', '11', '14', '17', '20', 'B', 'T5 = 2 + 4*3 = 14.'),
  ('2f66411e-591f-4198-ae1a-52697860422e', 'For a geometric sequence with a=3 and r=2, T4 equals ...', '12', '18', '24', '30', 'C', 'T4 = 3 * 2^3 = 24.'),
  ('03a963e2-f7c9-4753-809b-ea8ab266ab88', 'If f(x) = x^2, f\'(x) is ...', '2x', 'x', 'x^2', '2', 'A', 'Use power rule.'),
  ('03a963e2-f7c9-4753-809b-ea8ab266ab88', 'The derivative represents the ...', 'area under a curve', 'rate of change', 'average value', 'x-intercept', 'B', 'Derivative is instantaneous rate of change.'),
  ('03a963e2-f7c9-4753-809b-ea8ab266ab88', 'If f\'(3) = -2, the graph is ...', 'increasing', 'decreasing', 'horizontal', 'constant', 'B', 'Negative slope means decreasing.'),
  ('e0d4dd2e-8546-4029-a17f-f17ddbf1def9', 'Compound interest uses the formula ...', 'A = P(1 + in)', 'A = P(1 - i)^n', 'A = P(1 + i)^n', 'A = P + in', 'C', 'Compound interest applies a power to the growth factor.'),
  ('e0d4dd2e-8546-4029-a17f-f17ddbf1def9', 'If P = 1 000 and i = 0.1, after 2 years A equals ...', '1 200', '1 210', '1 300', '1 400', 'B', 'A = 1000(1.1)^2 = 1210.'),
  ('e0d4dd2e-8546-4029-a17f-f17ddbf1def9', 'Growth of 5% means multiply by ...', '0.95', '1.05', '5', '105', 'B', 'Increase factor is 1 + 0.05.'),
  ('cde27866-6352-4eae-aa00-b7c707dd7cdb', 'Distance between (0,0) and (3,4) is ...', '5', '7', '12', '1', 'A', 'Use the 3-4-5 triangle.'),
  ('cde27866-6352-4eae-aa00-b7c707dd7cdb', 'Gradient of line through (1,2) and (3,6) is ...', '1', '2', '3', '4', 'B', 'm = (6-2)/(3-1) = 2.'),
  ('cde27866-6352-4eae-aa00-b7c707dd7cdb', 'Midpoint of (2,4) and (6,8) is ...', '(4,6)', '(2,6)', '(6,4)', '(8,2)', 'A', 'Average the x and y coordinates.'),
  ('13636325-7d38-4b85-8436-49489bbed8de', 'sin^2(x) + cos^2(x) equals ...', '0', '1', '2', 'sin(x)', 'B', 'Fundamental identity.'),
  ('13636325-7d38-4b85-8436-49489bbed8de', 'If sin(\u03b8) = 1/2, one solution in [0,360] is ...', '30\u00b0', '60\u00b0', '90\u00b0', '120\u00b0', 'B', 'sin 60° = 1/2.'),
  ('13636325-7d38-4b85-8436-49489bbed8de', 'A period of 360\u00b0 belongs to ...', 'sin x', 'sin 2x', 'sin 0.5x', 'sin 3x', 'A', 'Standard sine has period 360°.'),
  ('727bc754-2304-464d-a1a0-984124150bd0', 'Opposite angles of a cyclic quadrilateral are ...', 'equal', 'complementary', 'supplementary', 'right angles', 'C', 'They add to 180°.'),
  ('727bc754-2304-464d-a1a0-984124150bd0', 'A tangent is perpendicular to the ...', 'radius at point of contact', 'diameter', 'chord', 'arc', 'A', 'Tangent-radius theorem.'),
  ('727bc754-2304-464d-a1a0-984124150bd0', 'Angles in the same segment are ...', 'different', 'equal', 'complementary', 'supplementary', 'B', 'Same segment theorem.'),
  ('4a39d294-eb40-4b73-af6e-f7e2dac67126', 'The mean of 2, 4, 6, 8 is ...', '4', '5', '6', '7', 'B', 'Sum is 20, divide by 4.'),
  ('4a39d294-eb40-4b73-af6e-f7e2dac67126', 'Probability of both A and B is written as ...', 'P(A) + P(B)', 'P(A or B)', 'P(A and B)', 'P(A)/P(B)', 'C', 'Use intersection for both events.'),
  ('4a39d294-eb40-4b73-af6e-f7e2dac67126', 'A fair coin has probability of heads ...', '0', '0.25', '0.5', '1', 'C', 'Two equally likely outcomes.'),
  ('7b5e0b93-0f86-40e6-9c9a-ea82726a961a', 'A vector has ...', 'only size', 'only direction', 'size and direction', 'no direction', 'C', 'Vectors include magnitude and direction.'),
  ('7b5e0b93-0f86-40e6-9c9a-ea82726a961a', 'Translate (x, y) by (3, -2) gives ...', '(x+3, y-2)', '(x-3, y+2)', '(x+3, y+2)', '(x-3, y-2)', 'A', 'Add the translation vector.'),
  ('7b5e0b93-0f86-40e6-9c9a-ea82726a961a', 'The resultant of (2,1) + (1,3) is ...', '(1,2)', '(3,4)', '(2,4)', '(4,2)', 'B', 'Add components: (2+1, 1+3).');
