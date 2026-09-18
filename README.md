# Prof. Lélio Lima — Landing Page de Captação

Projeto profissional de landing page para especializações, cursos e captação de alunos.

## O que já está pronto

- Landing page responsiva e mobile-first
- SEO básico e metatags para compartilhamento
- Especializações renderizadas por dados
- Dias, horários, vagas, modalidade e status fora do HTML fixo
- WhatsApp contextual por curso
- Formulário de captação
- FAQ editável
- Política de privacidade base
- Painel ADM para gestão de conteúdo
- Estrutura preparada para GitHub Pages

## Estrutura

- `index.html` — site público
- `assets/css/style.css` — identidade visual
- `assets/js/app.js` — renderização e captação
- `assets/js/config.js` — WhatsApp e futuras integrações
- `data/site.json` — dados públicos de cursos e FAQ
- `admin/` — painel de administração
- `privacy.html` — política de privacidade

## Regra operacional da ADM

Datas, dias, horários, vagas, modalidade e status das turmas não ficam travados no HTML. A administração pode gerenciar esses campos pelo painel.

Nesta primeira etapa, o painel salva uma prévia no navegador e permite exportar o JSON. A próxima etapa é ligar esse painel a um backend gratuito para publicação global das alterações sem editar o GitHub manualmente.

## Publicação gratuita

No GitHub:

1. Settings
2. Pages
3. Source: Deploy from a branch
4. Branch: main
5. Folder: / (root)
6. Save

URL esperada:

https://daianrj.github.io/prof-lelio-landing/

Painel ADM:

https://daianrj.github.io/prof-lelio-landing/admin/

## Antes do lançamento comercial

- Inserir fotografia oficial autorizada
- Validar dados acadêmicos completos
- Inserir depoimentos reais autorizados
- Confirmar endereço/localização
- Conectar painel ADM a banco em nuvem
- Conectar captação a CRM/banco caso desejado
- Revisar política de privacidade conforme a operação real
