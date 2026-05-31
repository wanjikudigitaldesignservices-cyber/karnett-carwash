document.addEventListener('DOMContentLoaded',()=>{
    const nb=document.getElementById('navbar');window.addEventListener('scroll',()=>nb.classList.toggle('scrolled',window.scrollY>50));
    const h=document.getElementById('hamburger'),l=document.getElementById('navLinks');
    h.addEventListener('click',()=>{h.classList.toggle('active');l.classList.toggle('active')});
    l.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('active');l.classList.remove('active')}));
    
    // Category Filter
    const catBtns=document.querySelectorAll('.cat-btn');
    const prods=document.querySelectorAll('.product');
    catBtns.forEach(btn=>{
        btn.addEventListener('click',()=>{
            catBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
            const cat=btn.dataset.cat;
            prods.forEach(p=>{
                if(cat==='all'||p.dataset.cat===cat){p.style.display='block';p.style.animation='fadeInUp 0.4s ease'}
                else{p.style.display='none'}
            });
        });
    });

    const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible')}),{threshold:0.1});
    document.querySelectorAll('.pkg,.product,.deal,.ci,.split-card').forEach(el=>{el.classList.add('fade-in');obs.observe(el)});

    document.getElementById('washForm').addEventListener('submit',e=>{
        e.preventDefault();const d=Object.fromEntries(new FormData(e.target));d.id=Date.now();d.submittedAt=new Date().toISOString();d.status='New';
        const all=JSON.parse(localStorage.getItem('karnett_bookings')||'[]');all.push(d);localStorage.setItem('karnett_bookings',JSON.stringify(all));
        e.target.reset();document.getElementById('washBooking').style.display='none';showToast('✅ Booking confirmed! We will contact you shortly.');
    });
});
function bookWash(service){document.getElementById('washSvc').value=service;document.getElementById('washBooking').style.display='block';document.getElementById('washBooking').scrollIntoView({behavior:'smooth'})}
function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),4000)}
window.bookWash=bookWash;
