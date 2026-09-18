const DEFAULT_DATA={
  courses:[
    {id:"uti-adulto",title:"Terapia Intensiva Adulto",type:"Especialização",featured:true,status:"Lista de interesse",city:"Méier - RJ",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Formação direcionada ao aperfeiçoamento profissional em cuidados intensivos."},
    {id:"cardiologia",title:"Enfermagem em Cardiologia",type:"Especialização",featured:false,status:"Lista de interesse",city:"Rio de Janeiro",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Formação alinhada à prática e aos conteúdos de cardiologia presentes no perfil profissional."},
    {id:"pocus",title:"Ultrassonografia Point of Care",type:"Curso prático",featured:false,status:"Novas turmas sob consulta",city:"A definir",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Capacitação prática em ultrassonografia à beira do leito."}
  ],
  faqs:[
    {q:"Quando serão as próximas turmas?",a:"Datas, dias e horários são definidos pela administração e serão divulgados conforme a abertura de cada turma."},
    {q:"Os cursos são presenciais ou online?",a:"A modalidade é informada individualmente em cada turma e pode variar conforme a formação."},
    {q:"Como recebo valores e condições de pagamento?",a:"Preencha o formulário ou fale pelo WhatsApp para receber as condições atualizadas."},
    {q:"Há certificado?",a:"A certificação e demais regras acadêmicas devem ser confirmadas na apresentação oficial de cada curso."}
  ]
};

function getData(){
  try{
    const local=localStorage.getItem("lelio_site_data");
    if(local) return JSON.parse(local);
  }catch(e){}
  return DEFAULT_DATA;
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
  (data.courses||[]).filter(c=>c.active!==false).forEach((c,i)=>{
    const card=document.createElement("article");
    card.className="course-card"+(c.featured?" featured":"");
    card.innerHTML=`<span class="status">${esc(c.status||c.type||"Formação")}</span>
      <h3>${esc(c.title)}</h3><p>${esc(c.description||"")}</p>
      <div class="course-meta">
        <span><b>Modalidade</b><br>${esc(c.mode||"A definir")}</span>
        <span><b>Dias/horários</b><br>${esc(c.schedule||"A definir")}</span>
        <span><b>Local</b><br>${esc(c.city||"A definir")}</span>
        <span><b>Vagas</b><br>${esc(c.seats||"A definir")}</span>
      </div>
      <a class="btn ${c.featured?"btn-primary":"btn-ghost"}" target="_blank" rel="noopener" href="${waUrl("Olá Professor Lélio, gostaria de informações sobre "+c.title+".")}">Quero informações</a>`;
    grid.appendChild(card);
    const opt=document.createElement("option");opt.value=c.title;opt.textContent=c.title;select.appendChild(opt);
  });
  const all=document.createElement("option");all.value="Quero conhecer todas as opções";all.textContent="Quero conhecer todas as opções";select.appendChild(all);
}

function renderFaqs(data){
  const wrap=document.getElementById("faqList");if(!wrap)return;wrap.innerHTML="";
  (data.faqs||[]).forEach(item=>{
    const d=document.createElement("details");
    d.innerHTML=`<summary>${esc(item.q)}</summary><p>${esc(item.a)}</p>`;
    wrap.appendChild(d);
  });
}

function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function initWhatsApp(){
  document.querySelectorAll(".wa-link").forEach(a=>a.href=waUrl(a.dataset.message||"Olá, vim pelo site e gostaria de informações."));
}

function initLeadForm(){
  const form=document.getElementById("leadForm");if(!form)return;
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const fd=new FormData(form);
    const nome=String(fd.get("nome")||"").trim();
    const whats=String(fd.get("whatsapp")||"").trim();
    const email=String(fd.get("email")||"").trim();
    const profissao=String(fd.get("profissao")||"").trim();
    const curso=String(fd.get("curso")||"").trim();
    const msg=`Olá Professor Lélio, vim pelo site e gostaria de informações.\n\nNome: ${nome}\nMeu WhatsApp: ${whats}\nE-mail: ${email||"não informado"}\nProfissão/formação: ${profissao||"não informado"}\nInteresse: ${curso}`;
    window.open(waUrl(msg),"_blank","noopener");
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  const data=getData();
  renderCourses(data);renderFaqs(data);initWhatsApp();initLeadForm();
});