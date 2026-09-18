const FALLBACK_DATA={
  courses:[
    {id:"uti-adulto",title:"Terapia Intensiva Adulto",featured:true,active:true,status:"Lista de interesse",city:"Méier - RJ",mode:"Consulte a equipe",schedule:"Próxima turma sob consulta",seats:"Vagas sob consulta",description:"Formação direcionada ao aperfeiçoamento profissional em cuidados intensivos."},
    {id:"cardiologia",title:"Enfermagem em Cardiologia",featured:false,active:true,status:"Lista de interesse",city:"Rio de Janeiro",mode:"Consulte a equipe",schedule:"Próxima turma sob consulta",seats:"Vagas sob consulta",description:"Formação alinhada à prática e aos conteúdos de cardiologia presentes no perfil profissional."},
    {id:"pocus",title:"Ultrassonografia Point of Care",featured:false,active:true,status:"Novas turmas sob consulta",city:"Rio de Janeiro",mode:"Consulte a equipe",schedule:"Próxima turma sob consulta",seats:"Vagas sob consulta",description:"Capacitação prática em ultrassonografia à beira do leito."}
  ],
  faqs:[
    {q:"Quando serão as próximas turmas?",a:"Datas, dias e horários são definidos pela administração e serão divulgados conforme a abertura de cada turma."},
    {q:"Os cursos são presenciais ou online?",a:"A modalidade é informada individualmente em cada turma e pode variar conforme a formação."},
    {q:"Como recebo valores e condições de pagamento?",a:"Preencha o formulário ou fale pelo WhatsApp para receber as condições atualizadas."},
    {q:"Há certificado?",a:"A certificação e demais regras acadêmicas devem ser confirmadas na apresentação oficial de cada curso."}
  ]
};

const FACEBOOK_URL="https://www.facebook.com/leliolima.ictuspos/";

const PILLAR_MODAL_CONTENT={
  "Especialização multidisciplinar":{
    kicker:"Especialização multidisciplinar",
    title:"Especializações de Elite",
    html:[
      '<p class="modal-lead">Formação voltada para profissionais da saúde que buscam aprofundamento técnico, atualização científica e conexão com uma comunidade acadêmica ativa.</p>',
      '<div class="modal-proof"><strong>+5.300</strong><span>profissionais de saúde ativos compartilhando experiências científicas e casos reais.</span></div>',
      '<div class="modal-highlight"><strong>Coordenação acadêmica</strong><span>Formação com referência institucional UniRedentor / Ictus Pos.</span></div>'
    ].join("")
  },
  "Ictus Cordis":{
    kicker:"Ictus Cordis",
    title:"Infraestrutura e Alta Performance",
    html:[
      '<p class="modal-lead">O Centro de Simulação Realística da Ictus Cordis amplia a experiência prática com recursos voltados à alta performance clínica.</p>',
      '<ul class="modal-rich-list"><li>Estetoscópios Riester</li><li>Monitores multimodais de arritmias em tempo real</li><li>Manequins avançados de CTI</li><li>Ventiladores mecânicos</li></ul>',
      '<p class="modal-closing">É aqui que você aprende na prática de verdade.</p>'
    ].join("")
  },
  "Prática em saúde":{
    kicker:"Prática em saúde",
    title:"Método Prático Sem Neura",
    html:[
      '<p class="modal-lead">Curso M.O.V.E.R. — Abordagens ao Paciente com Dor Torácica: IAM — criado pelo Prof. Lélio Lima, Enfermeiro UERJ e Oficial do GSE-CBMERJ, com foco em desenvolver segurança no atendimento crítico e reduzir o “frio na barriga” diante de situações de alta complexidade.</p>',
      '<div class="modal-highlight"><strong>Cupom especial</strong><span>Use <b>MOVER20</b> para garantir 20% de desconto.</span></div>'
    ].join("")
  },
  "Formação continuada":{
    kicker:"Formação continuada",
    title:"Jornada de Aprendizado Contínuo",
    html:[
      '<p class="modal-lead">Uma jornada estruturada de atualização científica contínua, prática aplicada e conexão com o mercado de trabalho na área da saúde.</p>',
      '<ul class="modal-rich-list"><li>Atualização científica frequente</li><li>Aplicação prática em terapia intensiva</li><li>Conteúdos ligados à emergência</li><li>Conexão com demandas reais do mercado de trabalho</li></ul>'
    ].join("")
  }
};

async function getData(){
  try{
    const local=localStorage.getItem("lelio_site_data");
    if(local) return JSON.parse(local);
  }catch(e){}
  try{
    const response=await fetch("data/site.json",{cache:"no-store"});
    if(response.ok) return await response.json();
  }catch(e){}
  return FALLBACK_DATA;
}

function esc(v){
  return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}

function waUrl(message){
  const number=(window.SITE_CONFIG?.whatsapp||"5521964896857").replace(/\D/g,"");
  return "https://wa.me/"+number+"?text="+encodeURIComponent(message);
}

function renderCourses(data){
  const grid=document.getElementById("coursesGrid");
  const select=document.getElementById("courseSelect");
  if(!grid||!select)return;

  grid.innerHTML="";
  select.innerHTML='<option value="">Selecione</option>';

  window.__LELIO_COURSES__=(data.courses||[]).filter(c=>c.active!==false);

  window.__LELIO_COURSES__.forEach(c=>{
    const row=document.createElement("article");
    row.className="formation-row";
    row.innerHTML=`
      <div class="formation-main">
        <span class="status">${esc(c.status)}</span>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.description)}</p>
      </div>
      <div class="formation-cell"><b>Modalidade</b><span>${esc(c.mode)}</span></div>
      <div class="formation-cell"><b>Dias / horários</b><span>${esc(c.schedule)}</span></div>
      <div class="formation-cell"><b>Local</b><span>${esc(c.city)}</span></div>
      <div class="formation-cell"><b>Vagas</b><span>${esc(c.seats)}</span></div>
      <div class="formation-row-actions">
        <button class="formation-detail-btn" type="button" data-course-modal data-course-id="${esc(c.id)}">Ver detalhes</button>
        <a class="btn btn-primary" href="${waUrl("Olá Professor Lélio, gostaria de informações sobre "+c.title+".")}" target="_blank" rel="noopener">Quero informações</a>
      </div>`;
    grid.appendChild(row);

    const opt=document.createElement("option");
    opt.value=c.title;
    opt.textContent=c.title;
    select.appendChild(opt);
  });
}

function renderFaqs(data){
  const wrap=document.getElementById("faqList");
  if(!wrap)return;
  wrap.innerHTML="";
  (data.faqs||[]).forEach(item=>{
    const details=document.createElement("details");
    details.innerHTML=`<summary>${esc(item.q)}</summary><p>${esc(item.a)}</p>`;
    wrap.appendChild(details);
  });
}

function initWhatsApp(){
  document.querySelectorAll(".wa-link").forEach(a=>{
    a.href=waUrl(a.dataset.message||"Olá, vim pelo site e gostaria de informações.");
  });
}

function initLeadForm(){
  const form=document.getElementById("leadForm");
  if(!form)return;

  form.addEventListener("submit",e=>{
    e.preventDefault();
    const fd=new FormData(form);
    const nome=String(fd.get("nome")||"").trim();
    const whats=String(fd.get("whatsapp")||"").trim();
    const email=String(fd.get("email")||"").trim();
    const profissao=String(fd.get("profissao")||"").trim();
    const curso=String(fd.get("curso")||"").trim();

    const msg=`Olá Professor Lélio, vim pelo site e gostaria de informações.

Nome: ${nome}
WhatsApp: ${whats}
E-mail: ${email||"não informado"}
Profissão / formação: ${profissao||"não informado"}
Formação de interesse: ${curso}`;

    const opened=window.open(waUrl(msg),"_blank","noopener");
    if(opened) form.reset();
  });
}

function injectFacebookLinks(){
  const footerNav=document.querySelector(".footer nav");
  if(footerNav&&!footerNav.querySelector('[data-facebook-link]')){
    const facebook=document.createElement("a");
    facebook.href=FACEBOOK_URL;
    facebook.target="_blank";
    facebook.rel="noopener";
    facebook.dataset.facebookLink="true";
    facebook.textContent="Facebook";\n    facebook.classList.add("social-footer-link");

    const instagram=[...footerNav.querySelectorAll("a")].find(a=>a.textContent.trim()==="Instagram");
    if(instagram) instagram.insertAdjacentElement("afterend",facebook);
    else footerNav.appendChild(facebook);
  }

  const scienceInstagram=[...document.querySelectorAll("#ciencia a")].find(a=>a.textContent.trim()==="Ver Instagram");
  if(scienceInstagram&&!document.querySelector("#ciencia [data-facebook-link]")){
    const facebook=document.createElement("a");
    facebook.href=FACEBOOK_URL;
    facebook.target="_blank";
    facebook.rel="noopener";
    facebook.dataset.facebookLink="true";
    facebook.className="btn btn-on-dark";
    facebook.textContent="Ver Facebook";
    scienceInstagram.insertAdjacentElement("afterend",facebook);

    const parent=scienceInstagram.parentElement;
    if(parent) parent.classList.add("social-actions");
  }
}

let lastModalTrigger=null;

function modalElements(){
  return {
    layer:document.getElementById("infoModal"),
    dialog:document.querySelector("#infoModal .info-modal"),
    kicker:document.getElementById("modalKicker"),
    title:document.getElementById("modalTitle"),
    body:document.getElementById("modalBody"),
    actions:document.getElementById("modalActions")
  };
}

function openInfoModal(config,trigger){
  const m=modalElements();
  if(!m.layer||!m.dialog)return;

  lastModalTrigger=trigger||document.activeElement;
  m.kicker.textContent=config.kicker||"Informações";
  m.title.textContent=config.title||"Detalhes";

  if(config.html){
    m.body.innerHTML=config.html;
  }else{
    let bodyHtml="";
    if(config.text) bodyHtml+="<p>"+esc(config.text)+"</p>";

    if(config.details&&config.details.length){
      bodyHtml+='<div class="modal-detail-list">';
      config.details.forEach(d=>{
        bodyHtml+="<div><strong>"+esc(d.label)+"</strong><span>"+esc(d.value)+"</span></div>";
      });
      bodyHtml+="</div>";
    }

    m.body.innerHTML=bodyHtml;
  }

  m.actions.innerHTML="";
  (config.actions||[]).forEach(a=>{
    const link=document.createElement("a");
    link.className="btn "+(a.className||"btn-primary");
    link.href=a.href;
    link.textContent=a.label;
    if(a.target){
      link.target=a.target;
      link.rel="noopener";
    }
    m.actions.appendChild(link);
  });

  m.layer.classList.add("is-open");
  m.layer.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");\n  document.documentElement.classList.add("modal-open-root");

  requestAnimationFrame(()=>m.dialog.focus());
}

function closeInfoModal(){
  const m=modalElements();
  if(!m.layer||!m.layer.classList.contains("is-open"))return;

  m.layer.classList.remove("is-open");
  m.layer.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");\n  document.documentElement.classList.remove("modal-open-root");

  if(lastModalTrigger&&typeof lastModalTrigger.focus==="function"){
    lastModalTrigger.focus();
  }
}

function openPillarModal(title,trigger){
  const config=PILLAR_MODAL_CONTENT[title]||{
    kicker:"Sobre a atuação",
    title,
    text:trigger?.dataset?.modalText||""
  };

  openInfoModal(config,trigger);
}

function enhancePillarRows(){
  document.querySelectorAll(".attribute-list>div").forEach(row=>{
    const dt=row.querySelector("dt");
    if(!dt)return;

    row.classList.add("pillar-clickable");
    row.setAttribute("role","button");
    row.setAttribute("tabindex","0");
    row.setAttribute("aria-label","Ver detalhes sobre "+dt.textContent.trim());

    row.addEventListener("click",e=>{
      if(e.target.closest("a,button"))return;
      openPillarModal(dt.textContent.trim(),row);
    });

    row.addEventListener("keydown",e=>{
      if(e.key==="Enter"||e.key===" "){
        e.preventDefault();
        openPillarModal(dt.textContent.trim(),row);
      }
    });
  });
}

function bindDirectModalTriggers(){
  document.querySelectorAll(".info-trigger").forEach(button=>{
    if(button.dataset.modalBound==="1") return;
    button.dataset.modalBound="1";

    button.addEventListener("click",e=>{
      e.preventDefault();
      e.stopPropagation();
      openPillarModal(button.dataset.modalTitle||"Informações",button);
    });
  });

  document.querySelectorAll("[data-course-modal]").forEach(button=>{
    if(button.dataset.modalBound==="1") return;
    button.dataset.modalBound="1";

    button.addEventListener("click",e=>{
      e.preventDefault();
      e.stopPropagation();

      const courses=window.__LELIO_COURSES__||[];
      const course=courses.find(c=>String(c.id)===String(button.dataset.courseId));
      if(!course)return;

      openInfoModal({
        kicker:course.status||"Formação",
        title:course.title,
        text:course.description,
        details:[
          {label:"Modalidade",value:course.mode||"Consulte a equipe"},
          {label:"Dias / horários",value:course.schedule||"Próxima turma sob consulta"},
          {label:"Local",value:course.city||"Consulte a equipe"},
          {label:"Vagas",value:course.seats||"Vagas sob consulta"}
        ],
        actions:[
          {label:"Quero informações",className:"btn-primary",href:waUrl("Olá Professor Lélio, gostaria de informações sobre "+course.title+"."),target:"_blank"},
          {label:"Entrar na lista",className:"btn-secondary",href:"#alunos"}
        ]
      },button);
    });
  });
}

function initInfoModals(){
  document.addEventListener("click",e=>{
    if(e.target.closest("[data-modal-close]")){
      closeInfoModal();
    }
  });

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){
      closeInfoModal();
      return;
    }

    if(e.key!=="Tab")return;

    const m=modalElements();
    if(!m.layer||!m.layer.classList.contains("is-open"))return;

    const focusables=Array.from(
      m.dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')
    );

    if(!focusables.length)return;

    const first=focusables[0];
    const last=focusables[focusables.length-1];

    if(e.shiftKey&&document.activeElement===first){
      e.preventDefault();
      last.focus();
    }else if(!e.shiftKey&&document.activeElement===last){
      e.preventDefault();
      first.focus();
    }
  });

  bindDirectModalTriggers();
}
document.addEventListener("DOMContentLoaded",async()=>{
  const data=await getData();

  renderCourses(data);
  renderFaqs(data);
  initWhatsApp();
  initLeadForm();
  injectFacebookLinks();
  enhancePillarRows();
  initInfoModals();
  bindDirectModalTriggers();
});