// script.js - interactions and background circuit animation
document.addEventListener('DOMContentLoaded',()=>{

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // Skill bar animation
  const fills = document.querySelectorAll('.fill');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const p = el.getAttribute('data-percent')||70;
        el.style.width = p + '%';
      }
    });
  },{threshold:0.3});
  fills.forEach(f=>obs.observe(f));

  // Project modal content
  const projects = {
    p1:{
      title:'Heart Disease Risk Prediction',
      body:`<p><strong>Summary</strong><br>AI-powered system for heart disease risk estimation using Logistic Regression, XGBoost and Deep Learning models for comparative evaluation.</p>
            <p><strong>Tech</strong>: Python, Scikit-learn, TensorFlow</p>
            <p><strong>Role</strong>: Data preprocessing, feature engineering, modelling and evaluation.</p>`
    },
    p2:{
      title:'Fake News Detection System',
      body:`<p><strong>Summary</strong><br>Microproject to classify fake news using TF-IDF vectorization with Naive Bayes and Decision Tree models.</p>
            <p><strong>Tech</strong>: Python, Scikit-learn, Pandas</p>`
    }
  };

  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('[data-project]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.getAttribute('data-project');
      const p = projects[id];
      if(p){
        modalBody.innerHTML = '<h2>'+p.title+'</h2>' + p.body + '<div style="margin-top:12px;"><a href="#" class="btn small">View repo</a></div>';
        modal.setAttribute('aria-hidden','false');
      }
    });
  });

  modalClose.addEventListener('click',()=>modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });

  // Download resume button (downloads resume.txt included in package)
  document.getElementById('downloadBtn').addEventListener('click',()=>{
    window.location.href = 'resume.txt';
  });

  // Menu toggle for mobile
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.addEventListener('click',()=>{
    const nav = document.querySelector('.nav');
    if(nav.style.display === 'flex') nav.style.display = 'none'; else nav.style.display = 'flex';
  });

  // Tiny interactive hover effect on project cards
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.style.transform = `translate3d(${x*0.02}px, ${y*0.02}px, 0)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform='translate3d(0,0,0)'; });
  });

  // Background canvas: simple animated circuit-like nodes and lines
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let W, H, nodes;
  function initCanvas(){
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    nodes = [];
    const count = Math.floor((W*H)/70000);
    for(let i=0;i<count;i++){
      nodes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        vx: (Math.random()-0.5)*0.4,
        vy: (Math.random()-0.5)*0.4,
        r: 1 + Math.random()*2
      });
    }
  }
  function step(){
    ctx.clearRect(0,0,W,H);
    // draw subtle grid
    ctx.globalCompositeOperation = 'source-over';
    for(let i=0;i<nodes.length;i++){
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>W) n.vx *= -1;
      if(n.y<0||n.y>H) n.vy *= -1;
      // draw node
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,240,255,0.12)';
      ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
      ctx.fill();
    }
    // draw connections
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i], b=nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d<140){
          ctx.beginPath();
          const alpha = 0.12*(1 - d/140);
          ctx.strokeStyle = 'rgba(0,240,255,'+alpha+')';
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }
  initCanvas();
  step();
  addEventListener('resize',initCanvas);
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});
