(() => {
  const PAGES = [
    'acs.html','stemi4.html','nstemi.html','acute-myocardial-injury.html','acute-myocardial-infarction.html',
    'ihd.html','atrial-fibrillation.html','arrhythmias.html','supraventricular-tachycardia.html','ventricular-arrhythmias.html','bradyarrhythmias.html',
    'heart-failure.html','hypertension.html','cardiogenic-shock.html','cardiomyopathies.html','hypertrophic-cardiomyopathy.html','dilated-cardiomyopathy.html',
    'non-dilated-left-ventricular-cardiomyopathy.html','arrhythmogenic-right-ventricular-cardiomyopathy.html','restrictive-cardiomyopathy.html','left-ventricular-noncompaction.html',
    'valvular.html','aortic-stenosis.html','aortic-regurgitation.html','mitral-regurgitation.html','mitral-stenosis.html','tricuspid-regurgitation.html',
    'pericarditis.html','myocarditis.html','infective-endocarditis.html','congenital-heart-disease.html','pulmonary-embolism.html',
    'anticoagulation.html','lipids.html','prevention.html','prevent.html','echocardiography.html','calculators.html','score2.html','topics.html'
  ];

  const normalize = s => (s || '')
    .toLowerCase()
    .replace(/ё/g,'е')
    .replace(/[–—−]/g,'-')
    .replace(/\s+/g,' ')
    .trim();

  const aliases = {
    'фп':'фибрилляция предсердий', 'тп':'трепетание предсердий', 'нжт':'наджелудочковая тахикардия',
    'жт':'желудочковая тахикардия', 'жэ':'желудочковая экстрасистолия', 'хсн':'сердечная недостаточность',
    'тэла':'тромбоэмболия легочной артерии', 'гкмп':'гипертрофическая кардиомиопатия', 'дкмп':'дилатационная кардиомиопатия',
    'акпж':'аритмогенная кардиомиопатия правого желудочка', 'впс':'врожденные пороки сердца',
    'поак':'прямые оральные антикоагулянты', 'доак':'прямые оральные антикоагулянты',
    'teer':'transcatheter edge-to-edge repair', 'tavi':'transcatheter aortic valve implantation', 'тави':'tavi',
    'grace':'grace', 'has-bled':'has-bled', 'cha2ds2-vasc':'cha2ds2-vasc', 'score2':'score2', 'dapt':'dapt'
  };

  let indexPromise;

  function expandQuery(q){
    const n = normalize(q);
    const parts = [n];
    Object.entries(aliases).forEach(([k,v]) => {
      if (n.includes(k)) parts.push(normalize(v));
    });
    return [...new Set(parts.filter(Boolean))];
  }

  function extractDoc(html, url){
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script,style,nav,footer').forEach(el => el.remove());
    const title = (doc.querySelector('h1')?.textContent || doc.title || url).trim();
    const headings = [...doc.querySelectorAll('h1,h2,h3,h4')].map(x => x.textContent.trim()).join(' · ');
    const body = doc.body?.textContent || '';
    const text = normalize(`${title} ${headings} ${body} ${url.replace(/[-_.]/g,' ')}`);
    return { url, title, headings, text };
  }

  async function buildIndex(){
    if(indexPromise) return indexPromise;
    indexPromise = Promise.all(PAGES.map(async url => {
      try{
        const r = await fetch(url, {cache:'force-cache'});
        if(!r.ok) return null;
        return extractDoc(await r.text(), url);
      }catch(e){ return null; }
    })).then(x => x.filter(Boolean));
    return indexPromise;
  }

  function scoreDoc(doc, queries){
    let best = 0, hit = '';
    const title = normalize(doc.title), heads = normalize(doc.headings);
    for(const q of queries){
      if(!q) continue;
      let s = 0;
      if(title === q) s += 220;
      if(title.includes(q)) s += 120;
      if(heads.includes(q)) s += 70;
      const count = doc.text.split(q).length - 1;
      s += Math.min(count, 10) * 8;
      const words = q.split(' ').filter(Boolean);
      if(words.length > 1) s += words.filter(w => doc.text.includes(w)).length * 5;
      if(s > best){ best = s; hit = q; }
    }
    return {score:best, hit};
  }

  function makeSnippet(doc, hit){
    const raw = doc.text;
    const pos = hit ? raw.indexOf(hit) : -1;
    if(pos < 0) return doc.headings.slice(0,150);
    const start = Math.max(0, pos - 70), end = Math.min(raw.length, pos + hit.length + 110);
    let snippet = raw.slice(start,end).trim();
    if(start > 0) snippet = '…' + snippet;
    if(end < raw.length) snippet += '…';
    return snippet;
  }

  function ensureUI(input){
    let box = document.getElementById('searchResults');
    if(box) return box;
    box = document.createElement('div');
    box.id = 'searchResults';
    box.className = 'search-results';
    input.closest('.search')?.appendChild(box);
    return box;
  }

  function render(box, rows, q){
    if(!q){ box.classList.remove('show'); box.innerHTML=''; return; }
    if(!rows.length){
      box.innerHTML = '<div class="search-empty">Ничего не найдено. Попробуйте другое слово или сокращение.</div>';
      box.classList.add('show'); return;
    }
    box.innerHTML = rows.slice(0,10).map(r => `<a class="search-result" href="${r.url}"><b>${r.title}</b><span>${makeSnippet(r, r.hit)}</span></a>`).join('');
    box.classList.add('show');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('q');
    if(!input) return;
    const box = ensureUI(input);
    let timer;

    input.addEventListener('focus', () => { buildIndex(); if(input.value.trim()) input.dispatchEvent(new Event('input')); });
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const q = input.value.trim();
        if(!q){ render(box,[],q); return; }
        box.innerHTML = '<div class="search-empty">Ищу по CardioShort…</div>';
        box.classList.add('show');
        const docs = await buildIndex();
        const queries = expandQuery(q);
        const rows = docs.map(d => ({...d, ...scoreDoc(d,queries)})).filter(x => x.score > 0).sort((a,b) => b.score-a.score);
        render(box,rows,q);
      },120);
    });

    input.addEventListener('keydown', e => {
      if(e.key === 'Enter'){
        const first = box.querySelector('.search-result');
        if(first){ e.preventDefault(); location.href = first.href; }
      }
      if(e.key === 'Escape') box.classList.remove('show');
    });

    document.addEventListener('click', e => {
      if(!e.target.closest('.search')) box.classList.remove('show');
    });

    document.querySelectorAll('.chips button').forEach(b => b.addEventListener('click', () => {
      input.value = b.textContent.trim();
      input.dispatchEvent(new Event('input'));
      input.focus();
    }));
  });
})();