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
        content:"↙"!important;
        left:-34px!important;
        right:auto!important;
        top:auto!important;
        bottom:-82px!important;
        transform:none!important;
        font-size:34px!important;
        line-height:34px!important;
        color:#5f6f80!important;
        background:#fff!important;
        padding:0 5px!important;
        z-index:6!important;
      }
    `;
    document.head.appendChild(cascadeFix);
  }

  if(!document.querySelector('.pro-note,.healthcare-note')){
    const logo=document.querySelector('.logo');
    if(logo){
      const host=logo.querySelector('div:last-child')||logo;
      const n=document.createElement('small');n.className='healthcare-note';n.textContent=text;host.appendChild(n);
    }else{
      const header=document.querySelector('header');
      if(header){
        const a=header.querySelector('a[href*="index"]')||header.querySelector('a');
        if(a){const n=document.createElement('span');n.className='healthcare-note';n.textContent=text;a.insertAdjacentElement('afterend',n);}
      }
    }
  }

  const pesi=document.getElementById('pesi');
  if(pesi && !document.getElementById('spesi')){
    const head=pesi.querySelector('.calc-head');
    if(head && !pesi.querySelector('.pesi-explain')){
      const p=document.createElement('p');
      p.className='interpret pesi-explain';
      p.innerHTML='<b>PESI (Pulmonary Embolism Severity Index)</b> — прогностическая шкала для пациентов с подтверждённой острой ТЭЛА. Она оценивает риск 30-дневной общей смертности и помогает выделить пациентов низкого риска. <b>Класс I ≤65</b> — очень низкий риск (0–1,6%); <b>II 66–85</b> — низкий (1,7–3,5%); <b>III 86–105</b> — промежуточный (3,2–7,1%); <b>IV 106–125</b> — высокий (4,0–11,4%); <b>V >125</b> — очень высокий (10,0–24,5%). Классы I–II соответствуют низкому риску по PESI.';
      head.insertAdjacentElement('afterend',p);
    }

    const sp=document.createElement('section');
    sp.className='calc';sp.id='spesi';
    sp.innerHTML='<div class="calc-head"><div><h2>sPESI</h2><p class="desc">Упрощённый индекс тяжести ТЭЛА — быстрая оценка риска 30-дневной смертности.</p></div><span class="badge">ТЭЛА</span></div><p class="interpret"><b>sPESI (simplified PESI)</b> использует 6 признаков, каждый из которых даёт 1 балл. <b>0 баллов</b> — низкий риск (в исходной валидации около 1% 30-дневной смертности); <b>≥1 балла</b> — повышенный риск (около 10,9%). Шкала применяется для прогностической стратификации после подтверждения ТЭЛА и не заменяет оценку гемодинамической стабильности, функции ПЖ и биомаркеров.</p><div class="fields"><div class="field"><label>Критерии sPESI</label><label class="check"><input id="speAge" type="checkbox">Возраст &gt;80 лет — +1</label><label class="check"><input id="speCa" type="checkbox">Активное злокачественное новообразование — +1</label><label class="check"><input id="speCardioPulm" type="checkbox">Хроническая сердечная недостаточность и/или хроническое заболевание лёгких — +1</label></div><div class="field"><label>Показатели при оценке</label><label class="check"><input id="speHr" type="checkbox">ЧСС ≥110/мин — +1</label><label class="check"><input id="speSbp" type="checkbox">САД &lt;100 мм рт. ст. — +1</label><label class="check"><input id="speSat" type="checkbox">SpO₂ &lt;90% — +1</label></div></div><div class="actions"><button onclick="spesiCalc()">Рассчитать sPESI</button><button class="clear" onclick="clearCalc(\'spesi\',\'speRes\')">Очистить</button></div><div id="speRes" class="res">Отметьте критерии пациента.</div>';
    pesi.insertAdjacentElement('afterend',sp);

    const navPesi=document.querySelector('.calcnav a[href="#pesi"]');
    if(navPesi){const a=document.createElement('a');a.href='#spesi';a.textContent='sPESI';navPesi.insertAdjacentElement('afterend',a);}

    document.querySelectorAll('.sources li').forEach(function(li){
      if(li.textContent.includes('Wells / Revised Geneva / PESI') && !li.textContent.includes('sPESI')) li.innerHTML=li.innerHTML.replace('Wells / Revised Geneva / PESI','Wells / Revised Geneva / PESI / sPESI');
    });
  }

  window.spesiCalc=function(){
    const ids=['speAge','speCa','speCardioPulm','speHr','speSbp','speSat'];
    let s=ids.reduce((n,id)=>n+(document.getElementById(id)&&document.getElementById(id).checked?1:0),0);
    const r=document.getElementById('speRes');if(!r)return;
    if(s===0) r.innerHTML='<b>sPESI: 0 — низкий риск</b><br>В исходной валидации 30-дневная общая смертность около 1,0%. При отсутствии других признаков повышенного риска пациент относится к низкому риску по sPESI.';
    else r.innerHTML='<b>sPESI: '+s+' — повышенный риск</b><br>Наличие ≥1 критерия исключает категорию низкого риска по sPESI. В исходной валидации 30-дневная общая смертность для группы ≥1 балла составляла около 10,9%.';
  };
});