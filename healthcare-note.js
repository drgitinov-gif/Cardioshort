document.addEventListener('DOMContentLoaded', function () {
  const text = 'Информация на сайте предназначена только для специалистов здравоохранения';

  const style = document.createElement('style');
  style.textContent = `
    .heart{width:80px!important;height:80px!important;flex:0 0 80px!important;font-size:44px!important;border-width:3px!important}
    header a::before{width:80px!important;height:80px!important;flex:0 0 80px!important;font-size:44px!important;border-width:3px!important}
    header{min-height:104px!important}
    .healthcare-note{display:block;color:#fff;font-size:10px;line-height:1.35;font-weight:600;max-width:360px;margin-left:14px}
    .side .healthcare-note{margin:6px 0 0;color:#fff;max-width:150px}
    .logo .healthcare-note{margin:6px 0 0;color:#fff}
    .renal-compare{margin:14px 0 20px;background:#fff;border:1px solid #dfe5ec;border-radius:14px;overflow:hidden}
    .renal-compare table{width:100%;border-collapse:collapse;font-size:11px;line-height:1.45}
    .renal-compare th,.renal-compare td{padding:10px;border:1px solid #e2e8ef;vertical-align:top;text-align:left}
    .renal-compare th{background:#f4f6f9}.renal-compare .eu{background:#f6fbf7}.renal-compare .us{background:#f7f9fc}
    @media(max-width:720px){
      .heart{width:64px!important;height:64px!important;flex-basis:64px!important;font-size:34px!important}
      header a::before{width:64px!important;height:64px!important;flex-basis:64px!important;font-size:34px!important}
      header{min-height:88px!important}.healthcare-note{font-size:9px;max-width:220px;margin-left:10px}
    }
  `;
  document.head.appendChild(style);

  if (location.pathname.endsWith('/anticoagulation.html')) {
    const s = document.createElement('style');
    s.textContent = `body .factor.join-right:after{content:"↙"!important;left:-34px!important;right:auto!important;top:auto!important;bottom:-82px!important;transform:none!important;font-size:34px!important;line-height:34px!important;color:#5f6f80!important;background:#fff!important;padding:0 5px!important;z-index:6!important}`;
    document.head.appendChild(s);

    const renal = document.getElementById('renal');
    if (renal && !renal.querySelector('.renal-compare')) {
      const grid = renal.querySelector('.organ-grid');
      if (grid) {
        grid.innerHTML = `
          <div class="organ"><h3>CrCl ≥50</h3><span class="pill-ok">обычные дозы</span><p>ПОАК обычно в стандартной дозе, если нет иных критериев снижения конкретного препарата.</p></div>
          <div class="organ"><h3>CrCl 30–49</h3><span class="pill-warn">проверить препарат</span><p>Для апиксабана при ФП CrCl 30–49 сам по себе не требует редукции. Для ривароксабана/эдоксабана правила другие.</p></div>
          <div class="organ"><h3>CrCl 15–29</h3><span class="pill-warn">ESC/EMA ≠ ACC/AHA</span><p><b>ФП:</b> EMA/EHRA предусматривают апиксабан <b>2,5 мг 2 раза/сут</b>. Американский подход не использует CrCl 15–29 как автоматический критерий редукции.</p></div>
          <div class="organ"><h3>CrCl &lt;15 / диализ</h3><span class="pill-no">разные подходы</span><p><b>Европа:</b> апиксабан не рекомендован. <b>ACC/AHA 2023:</b> у отдельных пациентов с ФП может быть разумен варфарин или апиксабан.</p></div>`;
        const cmp = document.createElement('div');
        cmp.className = 'renal-compare';
        cmp.innerHTML = `<table><tr><th>ФП + функция почек</th><th>Европа: EMA / EHRA</th><th>США: ACC/AHA</th></tr><tr><td><b>CrCl ≥30</b></td><td class="eu">Апиксабан 5 мг 2 р/сут; 2,5 мг 2 р/сут при ≥2 из 3: возраст ≥80 лет, масса ≤60 кг, креатинин ≥1,5 мг/дл.</td><td class="us">То же стандартное правило редукции.</td></tr><tr><td><b>CrCl 15–29</b></td><td class="eu"><b>Апиксабан 2,5 мг 2 р/сут.</b></td><td class="us"><b>Нет автоматической редукции только из-за CrCl 15–29.</b></td></tr><tr><td><b>CrCl &lt;15 / диализ</b></td><td class="eu">Апиксабан <b>не рекомендован</b>.</td><td class="us">У отдельных пациентов может быть разумен варфарин (МНО 2,0–3,0) или обоснованная доза апиксабана.</td></tr></table>`;
        grid.insertAdjacentElement('afterend', cmp);
      }
      const w = renal.querySelector('.warn');
      if (w) w.innerHTML = '<b>Важно:</b> эта таблица относится к <b>ФП</b>. Не переносите критерии снижения дозы апиксабана при ФП на лечение острого ТГВ/ТЭЛА.';
    }
  }

  if (!document.querySelector('.pro-note,.healthcare-note')) {
    const logo = document.querySelector('.logo');
    if (logo) {
      const host = logo.querySelector('div:last-child') || logo;
      const n = document.createElement('small'); n.className = 'healthcare-note'; n.textContent = text; host.appendChild(n);
    } else {
      const h = document.querySelector('header');
      if (h) {
        const a = h.querySelector('a[href*="index"]') || h.querySelector('a');
        if (a) { const n = document.createElement('span'); n.className = 'healthcare-note'; n.textContent = text; a.insertAdjacentElement('afterend', n); }
      }
    }
  }

  // Padua и Caprini: вставляем непосредственно перед CHA2DS2-VASc / CHA2DS2-VA.
  const cha = document.getElementById('cha');
  if (cha && !document.getElementById('padua')) {
    const pad = document.createElement('section');
    pad.className = 'calc'; pad.id = 'padua';
    pad.innerHTML = `
      <div class="calc-head"><div><h2>Padua Prediction Score</h2><p class="desc">Риск ВТЭО у госпитализированных пациентов терапевтического профиля.</p></div><span class="badge">ВТЭО</span></div>
      <p class="interpret"><b>Когда применять:</b> у остро госпитализированного нехирургического пациента. <b>≥4 баллов — высокий риск ВТЭО; &lt;4 — низкий риск.</b> После оценки риска ВТЭО отдельно оцените риск кровотечения и противопоказания к фармакологической профилактике.</p>
      <div class="fields">
        <div class="field"><label>По 3 балла</label>
          <label class="check"><input class="pad3" type="checkbox">Активное злокачественное новообразование — +3</label>
          <label class="check"><input class="pad3" type="checkbox">ВТЭО в анамнезе, кроме поверхностного тромбоза — +3</label>
          <label class="check"><input class="pad3" type="checkbox">Сниженная мобильность ≥3 суток — +3</label>
          <label class="check"><input class="pad3" type="checkbox">Известная тромбофилия — +3</label>
        </div>
        <div class="field"><label>2 и 1 балл</label>
          <label class="check"><input class="pad2" type="checkbox">Травма и/или операция ≤1 месяца — +2</label>
          <label class="check"><input class="pad1" type="checkbox">Возраст ≥70 лет — +1</label>
          <label class="check"><input class="pad1" type="checkbox">Сердечная и/или дыхательная недостаточность — +1</label>
          <label class="check"><input class="pad1" type="checkbox">Острый инфаркт миокарда или ишемический инсульт — +1</label>
          <label class="check"><input class="pad1" type="checkbox">Острая инфекция и/или ревматологическое заболевание — +1</label>
          <label class="check"><input class="pad1" type="checkbox">Ожирение, ИМТ ≥30 кг/м² — +1</label>
          <label class="check"><input class="pad1" type="checkbox">Продолжающаяся гормональная терапия — +1</label>
        </div>
      </div>
      <div class="actions"><button onclick="paduaCalc()">Рассчитать Padua</button><button class="clear" onclick="clearCalc('padua','padRes')">Очистить</button></div>
      <div id="padRes" class="res">Отметьте критерии пациента.</div>
      <p class="interpret"><b>Интерпретация:</b> ≥4 баллов указывает на высокий риск госпитального ВТЭО. Шкала не заменяет оценку риска кровотечения и выбор метода профилактики по клиническим рекомендациям.</p>`;

    const cap = document.createElement('section');
    cap.className = 'calc'; cap.id = 'caprini';
    cap.innerHTML = `
      <div class="calc-head"><div><h2>Caprini Risk Assessment Model (2013)</h2><p class="desc">Стратификация риска ВТЭО преимущественно у хирургических пациентов.</p></div><span class="badge">ВТЭО</span></div>
      <p class="interpret"><b>Как использовать:</b> суммируются все применимые факторы. Практическая градация: <b>0–1 — низкий, 2 — умеренный, 3–4 — высокий, ≥5 — очень высокий риск.</b> Профилактика определяется типом операции, риском кровотечения и профильными рекомендациями.</p>
      <div class="fields">
        <div class="field"><label>1 балл каждый</label>
          <label class="check"><input class="cap1" type="checkbox">Возраст 41–60 лет</label>
          <label class="check"><input class="cap1" type="checkbox">ИМТ &gt;25 кг/м²</label>
          <label class="check"><input class="cap1" type="checkbox">Отёк нижних конечностей</label>
          <label class="check"><input class="cap1" type="checkbox">Варикозные вены</label>
          <label class="check"><input class="cap1" type="checkbox">Беременность или послеродовый период</label>
          <label class="check"><input class="cap1" type="checkbox">ОК/ЗГТ/эстрогены</label>
          <label class="check"><input class="cap1" type="checkbox">Сепсис / серьёзная инфекция или пневмония ≤1 мес</label>
          <label class="check"><input class="cap1" type="checkbox">ХОБЛ / нарушение функции лёгких</label>
          <label class="check"><input class="cap1" type="checkbox">Острый ИМ ≤1 мес</label>
          <label class="check"><input class="cap1" type="checkbox">СН ≤1 мес</label>
          <label class="check"><input class="cap1" type="checkbox">ВЗК</label>
          <label class="check"><input class="cap1" type="checkbox">Малая операция &lt;45 мин</label>
          <label class="check"><input class="cap1" type="checkbox">Курение</label>
          <label class="check"><input class="cap1" type="checkbox">СД, требующий инсулина</label>
          <label class="check"><input class="cap1" type="checkbox">Химиотерапия</label>
          <label class="check"><input class="cap1" type="checkbox">Гемотрансфузия ≤1 мес</label>
        </div>
        <div class="field"><label>2 балла каждый</label>
          <label class="check"><input class="cap2" type="checkbox">Возраст 61–74 года</label>
          <label class="check"><input class="cap2" type="checkbox">Большая операция &gt;45 мин</label>
          <label class="check"><input class="cap2" type="checkbox">Злокачественное новообразование</label>
          <label class="check"><input class="cap2" type="checkbox">Постельный режим / ограничение мобильности ≥72 ч</label>
          <label class="check"><input class="cap2" type="checkbox">Иммобилизирующая гипсовая повязка</label>
          <label class="check"><input class="cap2" type="checkbox">Центральный венозный доступ</label>
          <br><label>3 балла каждый</label>
          <label class="check"><input class="cap3" type="checkbox">Возраст ≥75 лет</label>
          <label class="check"><input class="cap3" type="checkbox">ТГВ/ТЭЛА в анамнезе</label>
          <label class="check"><input class="cap3" type="checkbox">Семейный анамнез ВТЭО</label>
          <label class="check"><input class="cap3" type="checkbox">Известная врождённая/приобретённая тромбофилия</label>
          <br><label>5 баллов каждый</label>
          <label class="check"><input class="cap5" type="checkbox">Эндопротезирование тазобедренного/коленного сустава</label>
          <label class="check"><input class="cap5" type="checkbox">Перелом бедра, таза или нижней конечности</label>
          <label class="check"><input class="cap5" type="checkbox">Тяжёлая травма</label>
          <label class="check"><input class="cap5" type="checkbox">Инсульт ≤1 мес</label>
          <label class="check"><input class="cap5" type="checkbox">Острое повреждение спинного мозга ≤1 мес</label>
        </div>
      </div>
      <div class="actions"><button onclick="capriniCalc()">Рассчитать Caprini</button><button class="clear" onclick="clearCalc('caprini','capRes')">Очистить</button></div>
      <div id="capRes" class="res">Отметьте критерии пациента.</div>
      <p class="interpret"><b>Важно:</b> возрастные категории взаимоисключающие; один и тот же клинический фактор не следует учитывать дважды.</p>`;

    cha.insertAdjacentElement('beforebegin', pad);
    cha.insertAdjacentElement('beforebegin', cap);

    const navCha = document.querySelector('.calcnav a[href="#cha"]');
    if (navCha) {
      const p = document.createElement('a'); p.href = '#padua'; p.textContent = 'Padua';
      const c = document.createElement('a'); c.href = '#caprini'; c.textContent = 'Caprini';
      navCha.insertAdjacentElement('beforebegin', p);
      navCha.insertAdjacentElement('beforebegin', c);
    }

    const src = document.querySelector('.sources ul');
    if (src && !src.textContent.includes('Padua / Caprini')) {
      const li = document.createElement('li');
      li.innerHTML = '<b>Padua / Caprini</b> — валидированные модели оценки риска ВТЭО; Padua для остро госпитализированных терапевтических пациентов, Caprini RAM 2013 преимущественно для хирургических пациентов.';
      src.insertBefore(li, src.children[4] || null);
    }
  }

  window.paduaCalc = function () {
    const s = document.querySelectorAll('#padua .pad3:checked').length * 3 + document.querySelectorAll('#padua .pad2:checked').length * 2 + document.querySelectorAll('#padua .pad1:checked').length;
    const r = document.getElementById('padRes');
    if (r) r.innerHTML = '<b>Padua: ' + s + ' баллов — ' + (s >= 4 ? 'ВЫСОКИЙ риск ВТЭО' : 'низкий риск ВТЭО') + '</b><br>' + (s >= 4 ? 'Порог высокого риска ≥4. Оцените риск кровотечения и показания к профилактике.' : 'Порог высокого риска по Padua не достигнут (&lt;4).');
  };

  window.capriniCalc = function () {
    const s = document.querySelectorAll('#caprini .cap1:checked').length + document.querySelectorAll('#caprini .cap2:checked').length * 2 + document.querySelectorAll('#caprini .cap3:checked').length * 3 + document.querySelectorAll('#caprini .cap5:checked').length * 5;
    const cat = s <= 1 ? 'низкий' : s === 2 ? 'умеренный' : s <= 4 ? 'высокий' : 'очень высокий';
    const r = document.getElementById('capRes');
    if (r) r.innerHTML = '<b>Caprini: ' + s + ' баллов — ' + cat + ' риск ВТЭО</b><br>Интерпретируйте вместе с типом операции, риском кровотечения и рекомендациями по профилактике.';
  };

  // sPESI
  const pesi = document.getElementById('pesi');
  if (pesi && !document.getElementById('spesi')) {
    const head = pesi.querySelector('.calc-head');
    if (head && !pesi.querySelector('.pesi-explain')) {
      const p = document.createElement('p'); p.className = 'interpret pesi-explain'; p.innerHTML = '<b>PESI</b> оценивает риск 30-дневной общей смертности при подтверждённой острой ТЭЛА.'; head.insertAdjacentElement('afterend', p);
    }
    const sp = document.createElement('section'); sp.className = 'calc'; sp.id = 'spesi';
    sp.innerHTML = '<div class="calc-head"><div><h2>sPESI</h2><p class="desc">Упрощённый индекс тяжести ТЭЛА.</p></div><span class="badge">ТЭЛА</span></div><div class="fields"><div class="field"><label>Критерии</label><label class="check"><input id="speAge" type="checkbox">Возраст &gt;80 — +1</label><label class="check"><input id="speCa" type="checkbox">Активный рак — +1</label><label class="check"><input id="speCardioPulm" type="checkbox">ХСН/хроническое заболевание лёгких — +1</label></div><div class="field"><label>Показатели</label><label class="check"><input id="speHr" type="checkbox">ЧСС ≥110 — +1</label><label class="check"><input id="speSbp" type="checkbox">САД &lt;100 — +1</label><label class="check"><input id="speSat" type="checkbox">SpO₂ &lt;90% — +1</label></div></div><div class="actions"><button onclick="spesiCalc()">Рассчитать sPESI</button></div><div id="speRes" class="res">Отметьте критерии.</div>';
    pesi.insertAdjacentElement('afterend', sp);
    const n = document.querySelector('.calcnav a[href="#pesi"]');
    if (n) { const a = document.createElement('a'); a.href = '#spesi'; a.textContent = 'sPESI'; n.insertAdjacentElement('afterend', a); }
  }
  window.spesiCalc = function () {
    const ids = ['speAge','speCa','speCardioPulm','speHr','speSbp','speSat'];
    const s = ids.reduce((n,id) => n + (document.getElementById(id) && document.getElementById(id).checked ? 1 : 0), 0);
    const r = document.getElementById('speRes');
    if (r) r.innerHTML = '<b>sPESI: ' + s + ' — ' + (s === 0 ? 'низкий риск' : 'повышенный риск') + '</b>';
  };
});