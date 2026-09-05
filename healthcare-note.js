document.addEventListener('DOMContentLoaded',function(){
  const text='Информация на сайте предназначена только для специалистов здравоохранения';
  const style=document.createElement('style');
  style.textContent=`
    .heart{width:80px!important;height:80px!important;flex:0 0 80px!important;font-size:44px!important;border-width:3px!important}
    header a::before{width:80px!important;height:80px!important;flex:0 0 80px!important;font-size:44px!important;border-width:3px!important}
    header{min-height:104px!important}
    .healthcare-note{display:block;color:#fff;font-size:10px;line-height:1.35;font-weight:600;max-width:360px;margin-left:14px}
    .side .healthcare-note{margin:6px 0 0;color:#fff;max-width:150px}
    .logo .healthcare-note{margin:6px 0 0;color:#fff}
    .healthcare-note-wrap{display:flex;align-items:center;min-width:0}
    @media(max-width:720px){
      .heart{width:64px!important;height:64px!important;flex-basis:64px!important;font-size:34px!important}
      header a::before{width:64px!important;height:64px!important;flex-basis:64px!important;font-size:34px!important}
      header{min-height:88px!important}
      .healthcare-note{font-size:9px;max-width:220px;margin-left:10px}
    }`;
  document.head.appendChild(style);

  if(location.pathname.endsWith('/anticoagulation.html')){
    const cascadeFix=document.createElement('style');
    cascadeFix.textContent=`
      body .factor.join-right:after{
        content:"↙"!important;left:-34px!important;right:auto!important;top:auto!important;bottom:-82px!important;transform:none!important;font-size:34px!important;line-height:34px!important;color:#5f6f80!important;background:#fff!important;padding:0 5px!important;z-index:6!important;
      }
      .renal-compare{margin:14px 0 20px;background:#fff;border:1px solid #dfe5ec;border-radius:14px;overflow:hidden}.renal-compare table{width:100%;border-collapse:collapse;font-size:11px;line-height:1.45}.renal-compare th,.renal-compare td{padding:10px;border:1px solid #e2e8ef;vertical-align:top;text-align:left}.renal-compare th{background:#f4f6f9}.renal-compare .eu{background:#f6fbf7}.renal-compare .us{background:#f7f9fc}
    `;
    document.head.appendChild(cascadeFix);

    const renal=document.getElementById('renal');
    if(renal && !renal.querySelector('.renal-compare')){
      const grid=renal.querySelector('.organ-grid');
      if(grid){
        grid.innerHTML='<div class="organ"><h3>CrCl ≥50</h3><span class="pill-ok">обычные дозы</span><p>ПОАК обычно в стандартной дозе, если нет иных критериев снижения конкретного препарата.</p></div><div class="organ"><h3>CrCl 30–49</h3><span class="pill-warn">проверить препарат</span><p>Для апиксабана при ФП CrCl 30–49 сам по себе не требует редукции. Для ривароксабана/эдоксабана правила другие.</p></div><div class="organ"><h3>CrCl 15–29</h3><span class="pill-warn">ESC/EMA ≠ ACC/AHA</span><p><b>ФП:</b> европейская инструкция (EMA SmPC) и EHRA предусматривают апиксабан <b>2,5 мг 2 раза/сут</b> при CrCl 15–29 как самостоятельный критерий. Американский подход не использует CrCl 15–29 как автоматический критерий редукции апиксабана.</p></div><div class="organ"><h3>CrCl &lt;15 / диализ</h3><span class="pill-no">разные регуляторные подходы</span><p><b>Европа:</b> апиксабан не рекомендован при CrCl &lt;15 или диализе по EMA SmPC. <b>ACC/AHA 2023:</b> при ФП может быть разумен варфарин (МНО 2,0–3,0) или evidence-based dose апиксабана у отдельных пациентов; решение индивидуальное.</p></div>';
        const cmp=document.createElement('div');cmp.className='renal-compare';cmp.innerHTML='<table><tr><th>ФП + функция почек</th><th>Европа: EMA / EHRA</th><th>США: ACC/AHA</th></tr><tr><td><b>CrCl ≥30 мл/мин</b></td><td class="eu">Апиксабан 5 мг 2 р/сут; 2,5 мг 2 р/сут при ≥2 из 3: возраст ≥80 лет, масса ≤60 кг, креатинин ≥1,5 мг/дл.</td><td class="us">Апиксабан 5 мг 2 р/сут; 2,5 мг 2 р/сут при ≥2 из тех же 3 критериев.</td></tr><tr><td><b>CrCl 15–29 мл/мин</b></td><td class="eu"><b>Апиксабан 2,5 мг 2 р/сут.</b> Тяжёлая ХБП является самостоятельным основанием для сниженной дозы при ФП.</td><td class="us"><b>Нет автоматической редукции только из-за CrCl 15–29.</b> Дозу 2,5 мг 2 р/сут используют при выполнении критериев редукции; доказательства при тяжёлой ХБП ограничены.</td></tr><tr><td><b>CrCl &lt;15 / диализ</b></td><td class="eu">По EMA SmPC апиксабан <b>не рекомендован</b> из-за отсутствия достаточного клинического опыта.</td><td class="us">ACC/AHA 2023: при повышенном риске инсульта <b>может быть разумен</b> варфарин (МНО 2,0–3,0) или evidence-based dose апиксабана (класс 2b, B-NR).</td></tr></table>';
        grid.insertAdjacentElement('afterend',cmp);
      }
      const warn=renal.querySelector('.warn');
      if(warn) warn.innerHTML='<b>Важно:</b> эта таблица относится к <b>ФП</b>. Не переносите критерии снижения дозы апиксабана при ФП на лечение острого ТГВ/ТЭЛА. По EMA при ВТЭО даже при CrCl 15–29 нет автоматической редукции схемы апиксабана; препарат применяют с осторожностью.';
    }
  }

  if(!document.querySelector('.pro-note,.healthcare-note')){
    const logo=document.querySelector('.logo');
    if(logo){const host=logo.querySelector('div:last-child')||logo;const n=document.createElement('small');n.className='healthcare-note';n.textContent=text;host.appendChild(n);}else{const header=document.querySelector('header');if(header){const a=header.querySelector('a[href*="index"]')||header.querySelector('a');if(a){const n=document.createElement('span');n.className='healthcare-note';n.textContent=text;a.insertAdjacentElement('afterend',n);}}}
  }

  const pesi=document.getElementById('pesi');
  if(pesi && !document.getElementById('spesi')){
    const head=pesi.querySelector('.calc-head');
    if(head && !pesi.querySelector('.pesi-explain')){const p=document.createElement('p');p.className='interpret pesi-explain';p.innerHTML='<b>PESI (Pulmonary Embolism Severity Index)</b> — прогностическая шкала для пациентов с подтверждённой острой ТЭЛА. Она оценивает риск 30-дневной общей смертности и помогает выделить пациентов низкого риска. <b>Класс I ≤65</b> — очень низкий риск (0–1,6%); <b>II 66–85</b> — низкий (1,7–3,5%); <b>III 86–105</b> — промежуточный (3,2–7,1%); <b>IV 106–125</b> — высокий (4,0–11,4%); <b>V >125</b> — очень высокий (10,0–24,5%). Классы I–II соответствуют низкому риску по PESI.';head.insertAdjacentElement('afterend',p);}
    const sp=document.createElement('section');sp.className='calc';sp.id='spesi';sp.innerHTML='<div class="calc-head"><div><h2>sPESI</h2><p class="desc">Упрощённый индекс тяжести ТЭЛА — быстрая оценка риска 30-дневной смертности.</p></div><span class="badge">ТЭЛА</span></div><p class="interpret"><b>sPESI (simplified PESI)</b> использует 6 признаков, каждый из которых даёт 1 балл. <b>0 баллов</b> — низкий риск (в исходной валидации около 1% 30-дневной смертности); <b>≥1 балла</b> — повышенный риск (около 10,9%).</p><div class="fields"><div class="field"><label>Критерии sPESI</label><label class="check"><input id="speAge" type="checkbox">Возраст &gt;80 лет — +1</label><label class="check"><input id="speCa" type="checkbox">Активное злокачественное новообразование — +1</label><label class="check"><input id="speCardioPulm" type="checkbox">Хроническая сердечная недостаточность и/или хроническое заболевание лёгких — +1</label></div><div class="field"><label>Показатели при оценке</label><label class="check"><input id="speHr" type="checkbox">ЧСС ≥110/мин — +1</label><label class="check"><input id="speSbp" type="checkbox">САД &lt;100 мм рт. ст. — +1</label><label class="check"><input id="speSat" type="checkbox">SpO₂ &lt;90% — +1</label></div></div><div class="actions"><button onclick="spesiCalc()">Рассчитать sPESI</button><button class="clear" onclick="clearCalc(\'spesi\',\'speRes\')">Очистить</button></div><div id="speRes" class="res">Отметьте критерии пациента.</div>';pesi.insertAdjacentElement('afterend',sp);
    const navPesi=document.querySelector('.calcnav a[href="#pesi"]');if(navPesi){const a=document.createElement('a');a.href='#spesi';a.textContent='sPESI';navPesi.insertAdjacentElement('afterend',a);}
    document.querySelectorAll('.sources li').forEach(function(li){if(li.textContent.includes('Wells / Revised Geneva / PESI')&&!li.textContent.includes('sPESI'))li.innerHTML=li.innerHTML.replace('Wells / Revised Geneva / PESI','Wells / Revised Geneva / PESI / sPESI');});
  }
  window.spesiCalc=function(){const ids=['speAge','speCa','speCardioPulm','speHr','speSbp','speSat'];let s=ids.reduce((n,id)=>n+(document.getElementById(id)&&document.getElementById(id).checked?1:0),0);const r=document.getElementById('speRes');if(!r)return;if(s===0)r.innerHTML='<b>sPESI: 0 — низкий риск</b><br>В исходной валидации 30-дневная общая смертность около 1,0%.';else r.innerHTML='<b>sPESI: '+s+' — повышенный риск</b><br>Наличие ≥1 критерия исключает категорию низкого риска по sPESI. В исходной валидации 30-дневная общая смертность для группы ≥1 балла составляла около 10,9%.';};
});