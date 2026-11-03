const menuToggle=document.querySelector('.menu-toggle');const navLinks=document.querySelector('.nav-links');menuToggle?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.08}):null;document.querySelectorAll('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));
const lightbox=document.querySelector('.lightbox');const lightboxImage=lightbox?.querySelector('img');const lightboxCaption=lightbox?.querySelector('.lightbox-caption');let previousFocus=null;document.querySelectorAll('[data-full]').forEach(btn=>btn.addEventListener('click',()=>{previousFocus=document.activeElement;lightboxImage.src=btn.dataset.full;lightboxImage.alt=btn.dataset.title||'Œuvre';lightboxCaption.textContent=btn.dataset.title||'';lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';lightbox.querySelector('.lightbox-close').focus();}));function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';lightboxImage.removeAttribute('src');previousFocus?.focus();}lightbox?.querySelector('.lightbox-close').addEventListener('click',closeLightbox);lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();if(e.key==='Tab'&&lightbox?.classList.contains('open')){e.preventDefault();lightbox.querySelector('.lightbox-close').focus();}});
const filters=document.querySelectorAll('.filter-btn');filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(item=>item.setAttribute('aria-pressed',String(item===btn)));document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=!(btn.dataset.filter==='all'||card.dataset.category===btn.dataset.filter);});}));
const contactForm=document.querySelector('#contact-form');contactForm?.addEventListener('submit',e=>{e.preventDefault();if(!contactForm.reportValidity())return;const data=new FormData(contactForm);const to=contactForm.dataset.email;const subject=encodeURIComponent('Demande de contact portfolio — '+data.get('name'));const body=encodeURIComponent(`Nom : ${data.get('name')}\nEmail : ${data.get('email')}\n\nMessage :\n${data.get('message')}`);window.location.href=`mailto:${to}?subject=${subject}&body=${body}`;});

// Pause de toutes les animations continues du titre, du soleil et du bandeau.
const motionToggle=document.querySelector('.motion-toggle');
motionToggle?.addEventListener('click',()=>{
  const paused=document.documentElement.classList.toggle('motion-paused');
  motionToggle.setAttribute('aria-pressed',String(paused));
  motionToggle.textContent=paused?'Reprendre les animations':'Mettre les animations en pause';
});

// Pastille « Voir plus » uniquement pour une souris de précision.
const pointerMedia=window.matchMedia('(hover: hover) and (pointer: fine)');
const photoCursor=document.createElement('span');
photoCursor.className='photo-cursor';photoCursor.setAttribute('aria-hidden','true');
photoCursor.textContent='Voir plus';
document.body.append(photoCursor);
const hidePhotoCursor=()=>{photoCursor.classList.remove('is-visible');document.documentElement.classList.remove('cursor-enhanced');};
let photoFrame=0;let photoX=0;let photoY=0;
function movePhotoCursor(e){
 photoX=e.clientX;photoY=e.clientY;
 if(photoFrame)return;
 photoFrame=requestAnimationFrame(()=>{
  const x=Math.min(Math.max(photoX-photoCursor.offsetWidth/2,8),window.innerWidth-photoCursor.offsetWidth-8);
  const y=Math.min(Math.max(photoY-photoCursor.offsetHeight/2,8),window.innerHeight-photoCursor.offsetHeight-8);
  photoCursor.style.transform=`translate3d(${x}px,${y}px,0)`;photoFrame=0;
 });
}
document.querySelectorAll('a.project-media,button.project-media').forEach(photo=>{
 photo.addEventListener('pointerenter',e=>{
  if(!pointerMedia.matches||e.pointerType!=='mouse')return;
  photoCursor.textContent=photo.tagName==='BUTTON'?'Agrandir':'Voir plus';
  photoCursor.classList.add('is-visible');document.documentElement.classList.add('cursor-enhanced');movePhotoCursor(e);
 });
 photo.addEventListener('pointermove',e=>{if(photoCursor.classList.contains('is-visible'))movePhotoCursor(e);});
 photo.addEventListener('pointerleave',hidePhotoCursor);
 photo.addEventListener('click',hidePhotoCursor);
});
window.addEventListener('scroll',hidePhotoCursor,{passive:true});
window.addEventListener('blur',hidePhotoCursor);
pointerMedia.addEventListener('change',hidePhotoCursor);
document.addEventListener('keydown',hidePhotoCursor);

// Révéler les lettres sans couper les mots et sans masquer le titre si JavaScript est désactivé.
// Adobe choisit le nom CSS de la police dans le projet web ; le repérer au chargement.
if(document.fonts){
  document.fonts.ready.then(()=>{
    const heckle=Array.from(document.fonts).find(face=>/heckle/i.test(face.family));
    if(!heckle)return;
    document.querySelectorAll('.heckle-intro').forEach(element=>{
      element.style.fontFamily=`${JSON.stringify(heckle.family)}, Georgia, serif`;
    });
  }).catch(()=>{});
}
document.querySelectorAll('[data-typewriter]').forEach(title=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const label=title.textContent.replace(/\s+/g,' ').trim();
  title.setAttribute('aria-label',label);
  const walker=document.createTreeWalker(title,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  let position=0;
  nodes.forEach(node=>{
    const fragment=document.createDocumentFragment();
    for(const part of node.textContent.split(/(\s+)/)){
      if(!part)continue;
      if(/^\s+$/.test(part)){fragment.append(document.createTextNode(part));continue;}
      const word=document.createElement('span');word.style.display='inline-block';word.setAttribute('aria-hidden','true');
      for(const character of Array.from(part)){
        const letter=document.createElement('span');letter.className='typewriter-letter';letter.style.setProperty('--letter-index',position++);letter.textContent=character;word.append(letter);
      }
      fragment.append(word);
    }
    node.replaceWith(fragment);
  });
});

// Chaque mot reçoit une version différente du logo, dans l'ordre de la liste.
const studioLogos=['images/logos/studio-mecaro-noir.svg','images/logos/studio-mecaro-rose.svg','images/logos/studio-mecaro-pourpre.svg'];
document.querySelectorAll('.studio-word').forEach((word,index)=>{
  let logo=word.querySelector('.studio-word-logo');
  if(!logo){logo=document.createElement('img');logo.className='studio-word-logo';logo.alt='';logo.setAttribute('aria-hidden','true');word.append(logo);}
  logo.src=studioLogos[index%studioLogos.length];
  const positionLogo=event=>{
    if(event.pointerType!=='mouse'||!pointerMedia.matches)return;
    const margin=90;
    logo.style.left=`${Math.max(margin,Math.min(window.innerWidth-margin,event.clientX))}px`;
    logo.style.top=`${Math.max(margin,Math.min(window.innerHeight-margin,event.clientY))}px`;
  };
  word.addEventListener('pointerenter',positionLogo);
  word.addEventListener('pointermove',positionLogo);
});
