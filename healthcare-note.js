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

  if(document.querySelector('.pro-note,.healthcare-note')) return;
  const logo=document.querySelector('.logo');
  if(logo){
    const host=logo.querySelector('div:last-child')||logo;
    const n=document.createElement('small');n.className='healthcare-note';n.textContent=text;host.appendChild(n);return;
  }
  const header=document.querySelector('header');
  if(header){
    const a=header.querySelector('a[href*="index"]')||header.querySelector('a');
    if(a){const n=document.createElement('span');n.className='healthcare-note';n.textContent=text;a.insertAdjacentElement('afterend',n);}
  }
});