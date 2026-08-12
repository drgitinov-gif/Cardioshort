(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=111542280','ym');
ym(111542280,'init',{ssr:true,webvisor:true,clickmap:true,ecommerce:'dataLayer',accurateTrackBounce:true,trackLinks:true});

document.addEventListener('DOMContentLoaded',function(){
  var prevent=document.getElementById('prevent');
  if(!prevent) return;
  prevent.innerHTML=''+
    '<div class="calc-head"><div><h2>PREVENT</h2><p class="desc">AHA PREVENT — рабочий калькулятор 10- и 30-летнего сердечно-сосудистого риска.</p></div><span class="badge">СС-РИСК</span></div>'+
    '<p class="interpret">Введите данные пациента непосредственно ниже. Расчёт выполняется внутри CardioShort, без перехода на сторонний сайт.</p>'+
    '<div style="border:1px solid #e5e9ef;border-radius:12px;overflow:hidden;background:#fff">'+
      '<iframe src="prevent.html" title="PREVENT — CardioShort" style="width:100%;height:1850px;border:0;display:block;background:#fff" loading="eager"></iframe>'+
    '</div>';
});