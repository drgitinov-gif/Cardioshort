// CardioShort — detailed H2FPEF calculator
// Criteria: BMI >30 (+2), >=2 antihypertensives (+1), AF (+3), PASP >35 (+1), age >60 (+1), E/e' >9 (+1).
// Reddy YNV et al. Circulation. 2018; JACC HF validation.
function calculateH2FPEF({age, weightKg, heightCm, antihypertensives, atrialFibrillation, pasp, ee}) {
  const heightM = Number(heightCm) / 100;
  const bmi = heightM > 0 ? Number(weightKg) / (heightM * heightM) : NaN;
  let score = 0;
  const components = [];

  if (bmi > 30) { score += 2; components.push(['Ожирение: ИМТ >30 кг/м²', 2]); }
  else components.push(['Ожирение: ИМТ >30 кг/м²', 0]);

  if (Number(antihypertensives) >= 2) { score += 1; components.push(['≥2 антигипертензивных препаратов', 1]); }
  else components.push(['≥2 антигипертензивных препаратов', 0]);

  if (atrialFibrillation) { score += 3; components.push(['Фибрилляция предсердий', 3]); }
  else components.push(['Фибрилляция предсердий', 0]);

  if (Number(pasp) > 35) { score += 1; components.push(['СДЛА >35 мм рт. ст.', 1]); }
  else components.push(['СДЛА >35 мм рт. ст.', 0]);

  if (Number(age) > 60) { score += 1; components.push(['Возраст >60 лет', 1]); }
  else components.push(['Возраст >60 лет', 0]);

  if (Number(ee) > 9) { score += 1; components.push(["E/e′ >9", 1]); }
  else components.push(["E/e′ >9", 0]);

  let category, interpretation;
  if (score <= 1) {
    category = 'Низкая вероятность';
    interpretation = 'СНсФВ маловероятна (<25%). Рассмотрите другие причины одышки.';
  } else if (score <= 5) {
    category = 'Промежуточная вероятность';
    interpretation = 'Диагноз СНсФВ остаётся неопределённым; требуется дальнейшая функциональная оценка в соответствующей клинической ситуации.';
  } else {
    category = 'Высокая вероятность';
    interpretation = 'СНсФВ весьма вероятна (>90%).';
  }

  return { score, maxScore: 9, bmi, category, interpretation, components };
}
