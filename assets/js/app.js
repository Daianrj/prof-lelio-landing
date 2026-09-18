const FALLBACK_DATA={
  courses:[
    {id:"uti-adulto",title:"Terapia Intensiva Adulto",featured:true,active:true,status:"Lista de interesse",city:"Méier - RJ",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Formação direcionada ao aperfeiçoamento profissional em cuidados intensivos."},
    {id:"cardiologia",title:"Enfermagem em Cardiologia",featured:false,active:true,status:"Lista de interesse",city:"Rio de Janeiro",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Formação alinhada à prática e aos conteúdos de cardiologia presentes no perfil profissional."},
    {id:"pocus",title:"Ultrassonografia Point of Care",featured:false,active:true,status:"Novas turmas sob consulta",city:"A definir",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Capacitação prática em ultrassonografia à beira do leito."}
  ],
  faqs:[
    {q:"Quando serão as próximas turmas?",a:"Datas, dias e horários são definidos pela administração e serão divulgados conforme a abertura de cada turma."},
    {q:"Os cursos são presenciais ou online?",a:"A modalidade é informada individualmente em cada turma e pode variar conforme a formação."},
    {q:"Como recebo valores e condições de pagamento?",a:"Preencha o formulário ou fale pelo WhatsApp para receber as condições atualizadas."},
    {q:"Há certificado?",a:"A certificação e demais regras acadêmicas devem ser confirmadas na apresentação oficial de cada curso."}
  ]
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

  (data.courses||[]).filter(c=>c.active!==false).forEach(c=>{
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
      <a class="btn btn-primary" href="${waUrl("Olá Professor Lélio, gostaria de informações sobre "+c.title+".")}" target="_blank" rel="noopener">Quero informações</a>`;
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
    const msg=`Olá Professor Lélio, vim pelo site e gostaria de informações.\n\nNome: ${nome}\nWhatsApp: ${whats}\nE-mail: ${email||"não informado"}\nProfissão / formação: ${profissao||"não informado"}\nFormação de interesse: ${curso}`;
    window.open(waUrl(msg),"_blank","noopener");
  });
}

document.addEventListener("DOMContentLoaded",async()=>{
  const data=await getData();
  renderCourses(data);
  renderFaqs(data);
  initWhatsApp();
  initLeadForm();
});