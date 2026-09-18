const DEFAULT_DATA={
courses:[
{id:"uti-adulto",title:"Terapia Intensiva Adulto",type:"Especialização",featured:true,active:true,status:"Lista de interesse",city:"Méier - RJ",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Formação direcionada ao aperfeiçoamento profissional em cuidados intensivos."},
{id:"cardiologia",title:"Enfermagem em Cardiologia",type:"Especialização",featured:false,active:true,status:"Lista de interesse",city:"Rio de Janeiro",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Formação alinhada à prática e aos conteúdos de cardiologia presentes no perfil profissional."},
{id:"pocus",title:"Ultrassonografia Point of Care",type:"Curso prático",featured:false,active:true,status:"Novas turmas sob consulta",city:"A definir",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:"Capacitação prática em ultrassonografia à beira do leito."}
],
faqs:[
{q:"Quando serão as próximas turmas?",a:"Datas, dias e horários são definidos pela administração e serão divulgados conforme a abertura de cada turma."},
{q:"Os cursos são presenciais ou online?",a:"A modalidade é informada individualmente em cada turma e pode variar conforme a formação."},
{q:"Como recebo valores e condições de pagamento?",a:"Preencha o formulário ou fale pelo WhatsApp para receber as condições atualizadas."},
{q:"Há certificado?",a:"A certificação e demais regras acadêmicas devem ser confirmadas na apresentação oficial de cada curso."}
]};
let data=load();
function load(){try{return JSON.parse(localStorage.getItem("lelio_site_data"))||structuredClone(DEFAULT_DATA)}catch(e){return structuredClone(DEFAULT_DATA)}}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function render(){
 const c=document.getElementById("courseEditor"),f=document.getElementById("faqEditor");c.innerHTML="";f.innerHTML="";
 data.courses.forEach((x,i)=>{const d=document.createElement("div");d.className="editor-card";d.innerHTML=`<div class="editor-top"><strong>Formação ${i+1}</strong><button class="remove" data-remove-course="${i}">Excluir</button></div><div class="grid">
 <label>Título<input data-c="${i}" data-k="title" value="${esc(x.title)}"></label><label>Tipo<input data-c="${i}" data-k="type" value="${esc(x.type)}"></label>
 <label>Status<input data-c="${i}" data-k="status" value="${esc(x.status)}"></label><label>Local<input data-c="${i}" data-k="city" value="${esc(x.city)}"></label>
 <label>Modalidade<input data-c="${i}" data-k="mode" value="${esc(x.mode)}"></label><label>Dias/horários<input data-c="${i}" data-k="schedule" value="${esc(x.schedule)}"></label>
 <label>Vagas<input data-c="${i}" data-k="seats" value="${esc(x.seats)}"></label><label class="check"><input type="checkbox" data-c="${i}" data-k="featured" ${x.featured?"checked":""}> Destaque</label>
 <label class="wide">Descrição<textarea data-c="${i}" data-k="description">${esc(x.description)}</textarea></label><label class="check wide"><input type="checkbox" data-c="${i}" data-k="active" ${x.active!==false?"checked":""}> Exibir no site</label></div>`;c.appendChild(d)});
 data.faqs.forEach((x,i)=>{const d=document.createElement("div");d.className="editor-card";d.innerHTML=`<div class="editor-top"><strong>Pergunta ${i+1}</strong><button class="remove" data-remove-faq="${i}">Excluir</button></div><div class="grid"><label class="wide">Pergunta<input data-f="${i}" data-k="q" value="${esc(x.q)}"></label><label class="wide">Resposta<textarea data-f="${i}" data-k="a">${esc(x.a)}</textarea></label></div>`;f.appendChild(d)});
 bind();
}
function bind(){
 document.querySelectorAll("[data-c]").forEach(el=>el.oninput=()=>{const i=+el.dataset.c,k=el.dataset.k;data.courses[i][k]=el.type==="checkbox"?el.checked:el.value});
 document.querySelectorAll("[data-f]").forEach(el=>el.oninput=()=>{data.faqs[+el.dataset.f][el.dataset.k]=el.value});
 document.querySelectorAll("[data-remove-course]").forEach(b=>b.onclick=()=>{data.courses.splice(+b.dataset.removeCourse,1);render()});
 document.querySelectorAll("[data-remove-faq]").forEach(b=>b.onclick=()=>{data.faqs.splice(+b.dataset.removeFaq,1);render()});
}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
document.getElementById("addCourse").onclick=()=>{data.courses.push({id:"curso-"+Date.now(),title:"Nova formação",type:"Curso",featured:false,active:true,status:"Lista de interesse",city:"A definir",mode:"A definir pela ADM",schedule:"A definir pela ADM",seats:"A definir pela ADM",description:""});render()}
document.getElementById("addFaq").onclick=()=>{data.faqs.push({q:"Nova pergunta",a:"Resposta"});render()}
document.getElementById("saveBtn").onclick=()=>{localStorage.setItem("lelio_site_data",JSON.stringify(data));toast("Alterações salvas neste navegador.")}
document.getElementById("resetBtn").onclick=()=>{if(confirm("Restaurar os dados padrão?")){data=structuredClone(DEFAULT_DATA);localStorage.removeItem("lelio_site_data");render();toast("Padrão restaurado.")}}
document.getElementById("exportBtn").onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="site-data.json";a.click();URL.revokeObjectURL(a.href)}
render();