(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=111542280','ym');
ym(111542280,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',accurateTrackBounce:true,trackLinks:true});

document.addEventListener('DOMContentLoaded',function(){
  const box=document.getElementById('prevent');
  if(!box) return;

  box.innerHTML=`
    <div class="calc-head"><div><h2>PREVENT</h2><p class="desc">AHA PREVENT — оценка 10- и 30-летнего сердечно-сосудистого риска в первичной профилактике.</p></div><span class="badge">СС-РИСК</span></div>
    <p class="interpret">Расчёт выполняется прямо в CardioShort. Базовая модель использует возраст, пол, САД, общий холестерин, ХС-ЛВП, ИМТ, сахарный диабет, курение, рСКФ, антигипертензивную и статиновую терапию.</p>
    <div class="fields">
      <div class="field"><label>Возраст, лет</label><p class="hint">30–79 лет; 30-летний прогноз — 30–59 лет.</p><input id="pAge" type="number" min="30" max="79" placeholder="55"></div>
      <div class="field"><label>Пол</label><select id="pSex"><option value="male">Мужчина</option><option value="female">Женщина</option></select></div>
      <div class="field"><label>Общий холестерин, мг/дл</label><input id="pTc" type="number" min="130" max="320" placeholder="200"></div>
      <div class="field"><label>ХС-ЛВП, мг/дл</label><input id="pHdl" type="number" min="20" max="100" placeholder="45"></div>
      <div class="field"><label>САД, мм рт. ст.</label><input id="pSbp" type="number" min="90" max="180" placeholder="130"></div>
      <div class="field"><label>ИМТ, кг/м²</label><input id="pBmi" type="number" step="0.1" min="18.5" max="39.9" placeholder="27.0"></div>
      <div class="field"><label>рСКФ, мл/мин/1,73 м²</label><input id="pEgfr" type="number" min="15" max="140" placeholder="90"></div>
      <div class="field"><label>Факторы / терапия</label>
        <label class="check"><input id="pSmoke" type="checkbox">Курит сейчас</label>
        <label class="check"><input id="pDm" type="checkbox">Сахарный диабет</label>
        <label class="check"><input id="pBpTx" type="checkbox">Антигипертензивная терапия</label>
        <label class="check"><input id="pStatin" type="checkbox">Статин</label>
      </div>
    </div>
    <div class="actions"><button id="pCalc">Рассчитать PREVENT</button><button id="pClear" class="clear">Очистить</button><button id="pExample" class="clear">Проверочный пример</button></div>
    <div id="pStatus" class="interpret">Подготовка расчётного модуля…</div>
    <div id="pRes" class="res">Введите параметры пациента.</div>
    <p class="interpret"><b>CVD</b> — общий сердечно-сосудистый риск; <b>ASCVD</b> — атеросклеротические события; <b>HF</b> — сердечная недостаточность; дополнительно показываются CHD и инсульт. Проценты нельзя складывать между собой.</p>
    <p class="interpret"><b>Важно:</b> PREVENT применяется для первичной профилактики и не заменяет клиническую оценку.</p>`;

  const el=id=>document.getElementById(id), num=id=>Number(el(id).value), chk=id=>el(id).checked;
  const pct=x=>(Number(x)*100).toFixed(1).replace('.',',')+'%';
  const render=(years,o)=>`<div style="margin-top:12px;border:1px solid #dfe5ec;border-radius:10px;padding:12px;background:#fff"><b>${years}-летний риск</b><br>CVD: <b>${pct(o.total_cvd)}</b> · ASCVD: <b>${pct(o.ascvd)}</b> · HF: <b>${pct(o.heart_failure)}</b><br>CHD: ${pct(o.chd)} · Инсульт: ${pct(o.stroke)}</div>`;
  let webR=null, ready=false, loading=null;

  async function init(){
    if(ready) return;
    if(loading) return loading;
    el('pCalc').disabled=true;
    el('pStatus').textContent='Загружаю модуль PREVENT… при первом открытии это может занять несколько секунд.';
    loading=(async()=>{
      const mod=await import('https://webr.r-wasm.org/latest/webr.mjs');
      webR=new mod.WebR({interactive:false});
      await webR.init();
      await webR.installPackages(['preventr']);
      await webR.evalRVoid('suppressPackageStartupMessages(library(preventr))');
      ready=true;
      el('pCalc').disabled=false;
      el('pStatus').textContent='✓ PREVENT готов к расчёту.';
    })().catch(err=>{
      console.error(err);
      el('pStatus').textContent='Не удалось загрузить расчётный модуль. Обновите страницу и проверьте интернет.';
      el('pCalc').disabled=false;
      throw err;
    });
    return loading;
  }

  function validate(){
    const a=num('pAge'),tc=num('pTc'),hdl=num('pHdl'),sbp=num('pSbp'),bmi=num('pBmi'),egfr=num('pEgfr');
    const e=[];
    if(!(a>=30&&a<=79)) e.push('возраст 30–79 лет');
    if(!(tc>=130&&tc<=320)) e.push('общий холестерин 130–320 мг/дл');
    if(!(hdl>=20&&hdl<=100)) e.push('ХС-ЛВП 20–100 мг/дл');
    if(!(sbp>=90&&sbp<=180)) e.push('САД 90–180 мм рт. ст.');
    if(!(bmi>=18.5&&bmi<=39.9)) e.push('ИМТ 18,5–39,9 кг/м²');
    if(!(egfr>=15&&egfr<=140)) e.push('рСКФ 15–140 мл/мин/1,73 м²');
    return e;
  }

  el('pClear').onclick=()=>{
    ['pAge','pTc','pHdl','pSbp','pBmi','pEgfr'].forEach(id=>el(id).value='');
    ['pSmoke','pDm','pBpTx','pStatin'].forEach(id=>el(id).checked=false);
    el('pSex').value='male'; el('pRes').innerHTML='Введите параметры пациента.';
  };

  el('pExample').onclick=()=>{
    el('pAge').value=50; el('pSex').value='female'; el('pTc').value=200; el('pHdl').value=45; el('pSbp').value=160; el('pBmi').value=35; el('pEgfr').value=90;
    el('pSmoke').checked=false; el('pDm').checked=true; el('pBpTx').checked=true; el('pStatin').checked=false;
    el('pRes').innerHTML='Проверочный профиль загружен. Ожидаемо для базовой модели: около 14,7% CVD, 9,2% ASCVD и 8,1% HF за 10 лет.';
  };

  el('pCalc').onclick=async()=>{
    const problems=validate();
    if(problems.length){el('pRes').innerHTML='<b>Проверьте данные:</b><br>• '+problems.join('<br>• ');return;}
    try{
      await init();
      const age=num('pAge'),sex=el('pSex').value,sbp=num('pSbp'),tc=num('pTc'),hdl=num('pHdl'),bmi=num('pBmi'),egfr=num('pEgfr');
      const code=`x<-estimate_risk(age=${age},sex='${sex}',sbp=${sbp},bp_tx=${chk('pBpTx')?'TRUE':'FALSE'},total_c=${tc},hdl_c=${hdl},statin=${chk('pStatin')?'TRUE':'FALSE'},dm=${chk('pDm')?'TRUE':'FALSE'},smoking=${chk('pSmoke')?'TRUE':'FALSE'},egfr=${egfr},bmi=${bmi},model='base',time='both',chol_unit='mg/dL',quiet=TRUE); paste(c(x$risk_est_10yr$total_cvd,x$risk_est_10yr$ascvd,x$risk_est_10yr$heart_failure,x$risk_est_10yr$chd,x$risk_est_10yr$stroke,x$risk_est_30yr$total_cvd,x$risk_est_30yr$ascvd,x$risk_est_30yr$heart_failure,x$risk_est_30yr$chd,x$risk_est_30yr$stroke),collapse='|')`;
      const r=await webR.evalRString(code);
      const vals=String(r).split('|').map(Number);
      const ten={total_cvd:vals[0],ascvd:vals[1],heart_failure:vals[2],chd:vals[3],stroke:vals[4]};
      let html=render(10,ten);
      if(age<=59){const thirty={total_cvd:vals[5],ascvd:vals[6],heart_failure:vals[7],chd:vals[8],stroke:vals[9]};html+=render(30,thirty);}
      else html+='<div class="hint" style="margin-top:10px">30-летний риск для возраста старше 59 лет не выводится.</div>';
      el('pRes').innerHTML=html;
    }catch(err){el('pRes').innerHTML='<b>Ошибка расчёта.</b><br>Обновите страницу и попробуйте ещё раз.';}
  };

  init();
});