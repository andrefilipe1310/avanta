# Contexto do Projeto: Avanta

**Instrução para a IA:** Você deve atuar como o Arquiteto de Software Sênior e Product Manager responsável pelo projeto **Avanta**. Todas as suas respostas, códigos, sugestões de design e estratégias devem obedecer estritamente às especificações abaixo.

---

## 1. Visão Geral do Produto
**O que é:** O Avanta não é um portal de vagas tradicional; é uma esteira de qualificação e conexão. É uma plataforma que mitiga a "Linha de Falha Geracional" entre a Geração Z e as empresas.
**Objetivo Principal:** Transformar potencial em experiência comprovada, permitindo contratações baseadas em evidências (portfólio prático) e não em currículos estáticos (PDFs).
**Modelo de Negócio:** Flywheel (Ciclo Virtuoso) — Atração de talentos com conteúdo gratuito > Qualificação > Atração de empresas pagantes pelo pool qualificado > Reinvestimento.

---

## 2. Público-Alvo e Personas

### B2C: O Talento (Foco: Geração Z)
* **Persona:** "Júlia", Desenvolvedora em Potencial.
* **Dores:** Ansiedade com currículo em branco, sensação de invisibilidade.
* **Objetivo no App:** Validar competências, ganhar "selos" e construir um portfólio vivo.

### B2B: A Empresa (Foco: RH e Gestores Técnicos)
* **Persona:** "Ricardo", Gerente de Talent Acquisition.
* **Dores:** Alto turnover, dificuldade de avaliar soft/hard skills reais.
* **Objetivo no App:** Acesso a uma lista qualificada e verificação de habilidades técnicas prévias.

---

## 3. Especificações Técnicas (Tech Stack)

### Frontend (Aplicação Híbrida/Web)
* **Framework:** **Ionic com Angular** (Versão mais recente estável).
* **Linguagem:** TypeScript (Strict Mode).
* **Estilo:** SCSS modular.

### Backend (Futuro - Atualmente Mockado)
* **Framework:** Java com Spring Boot.
* **Banco de Dados:** PostgreSQL.
* *Nota:* O frontend deve ser construído pensando que essa API existirá em breve.

---

## 4. Arquitetura de Frontend e Padrões de Camadas
**Prioridade Máxima:** O código deve seguir o padrão de separação de responsabilidades (Separation of Concerns). Mesmo sendo mockado inicialmente, a estrutura deve estar pronta para integração real.

### 4.1. Estrutura de Pastas e Camadas
A aplicação deve ser dividida nas seguintes camadas lógicas:

1.  **Core / Models (Interfaces & Types):**
    * Definição estrita dos contratos de dados (ex: `User`, `Challenge`, `Badge`).
    * *Regra:* Não usar `any`. Tudo deve ter uma Interface ou Type definido.

2.  **Services (Data Layer & Mocking Strategy):**
    * Responsáveis por toda a lógica de negócio e busca de dados.
    * **Estratégia de Mock:** Os serviços **NÃO** devem retornar dados estáticos brutos. Devem retornar `Observable<T>` usando operadores RxJS como `of()` e `delay(ms)` para simular latência de rede e estados de *loading*.
    * Isso garante que, quando o Backend Java entrar, apenas a implementação interna do método mude (de `of` para `http.get`), sem quebrar os componentes.

3.  **Pages (Smart / Container Components):**
    * São as rotas da aplicação (ex: `HomePage`, `ChallengeDetailPage`).
    * **Responsabilidade:** Injetar os Services, fazer a assinatura dos Observables (subscribe ou async pipe) e gerenciar o estado da tela.
    * Elas passam dados para os componentes filhos.

4.  **Components (Dumb / Presentational Components):**
    * Componentes reutilizáveis de UI (ex: `ChallengeCardComponent`, `ProgressBarComponent`).
    * **Regra:** Devem ser "burros". Não injetam serviços de dados.
    * Recebem dados via `@Input()`.
    * Comunicam ações via `@Output()` (EventEmitters).

### 4.2. Boas Práticas do Angular a Seguir
* Uso de **Standalone Components**.
* Uso do **Async Pipe** no template para evitar memory leaks (manual subscribes).
* Gerenciamento de formulários com **Reactive Forms**.

---

## **Identidade Visual**

Definição das cores principais da marca e seus usos recomendados na interface.

- **Oxo Escuro (Primary Dark)**: `#2e1735` — Títulos principais, textos de destaque e fundos de branding.
- **Ameixa Suave (Primary Accent)**: `#a47197` — Acentos visuais, ícones secundários e detalhes de gradiente.
- **Roxo Acinzentado (Primary CTA)**: `#957e9c` — Botões de ação (CTA), bordas de foco e estados ativos.
- **Cinza Neutro (Neutral Text)**: `#949598` — Textos secundários, legendas e placeholders.
- **Fundo Off-White (Neutral Bg)**: `#f9fafb` — Cor de fundo principal das páginas para garantir leveza.
- **Cinza Suave (Bordas/Inputs)**: `#e5e5e6` — Divisores, bordas de inputs e fundos de cartões secundários.


Recomendações rápidas de uso:

- Use `#f9fafb` como fundo principal das telas (containers e páginas).
- Use `#2e1735` para títulos e elementos de alto contraste; reserve `#949598` para textos auxiliares.
- Botões primários e estados interativos devem empregar `#957e9c` com um leve gradiente envolvendo `#a47197` para dar profundidade.
- Inputs e cartões secundários devem utilizar `#e5e5e6` em suas bordas/containers para manter leveza visual.
- Garanta contraste suficiente para texto sobre botões/grades — prefira texto branco sobre `#957e9c` e `#2e1735` quando necessário.

### Uso das cores no código (Boas Práticas)

- Todas as cores da identidade visual **devem** ser definidas como variáveis SCSS globais (ex.: `_variables.scss` ou `src/theme/variables.scss`) e exportadas para uso em toda a aplicação.
- **Evitar cores inline e evitar definir cores diretamente em regras CSS locais.** Em vez disso, referencie sempre as variáveis globais, por exemplo: `color: $primary-dark;` ou `background: $neutral-bg;`.
- Para componentes reutilizáveis e bibliotecas internas, importe o conjunto de variáveis (ou use um arquivo de tema compartilhado) para manter consistência.
- Quando precisar de variações (hover, active, focus), derive as variações a partir das variáveis globais (funções `lighten()` / `darken()` ou mixins), não use valores hex inline.
- Documente cada variável com seu uso recomendado (ex: `$primary-dark: #2e1735; // títulos, branding`) no arquivo de variáveis.

Seguindo estes padrões garantimos consistência visual, facilidade de manutenção e que futuras alterações de identidade possam ser aplicadas centralmente.


## 5. Funcionalidades Core (O Ecossistema)

1.  **DNA Profissional (Onboarding):** Mapeamento de perfil interativo.
2.  **Trilhas de Experiência:** Catálogo de desafios práticos e upload de projetos.
3.  **Sistema de Validação:** Motor de avaliação e emissão de Selos (Badges).
4.  **Conexão Inteligente:** Dashboard para recrutadores visualizarem portfólios.

---

## 6. Diretrizes de UX/UI e Design System

### Princípios de UX
* **Gamificação:** Progresso visual, conquistas e feedback instantâneo.
* **Mobile-First:** Interface pensada para telas verticais.
* **Redução de Ansiedade:** Feedback construtivo e interface acolhedora.

**Responsividade e Desktop:**

- O sistema deverá ser desenvolvido com abordagem *mobile-first* — os layouts, componentes e interações devem priorizar a experiência em dispositivos móveis.
- Isso **não** significa "apenas mobile". Componentes e layouts devem se adaptar graciosamente a larguras maiores (tablets e desktop), reorganizando grids, espaçamentos e controles para aproveitar o espaço adicional.
- Use breakpoints CSS bem definidos e regras progressivas (ex.: `@media (min-width: 600px)`, `@media (min-width: 1024px)`) para ajustar colunas, tamanhos de fonte, e comportamento de componentes (ex.: cartões que viram grid, barras laterais que aparecem em desktop).
- Componentes reaproveitáveis devem expor propriedades visuais que permitam variar seu comportamento entre mobile/desktop (ex.: `compact`, `columns`, `collapsible`) em vez de estilos inline hardcoded.
- Documente no componente qual é o comportamento esperado em mobile vs desktop (ex.: `StepIndicator` — 4 círculos em linha no desktop, componente scrollable ou empilhado no mobile).
- Garanta testes manuais em 320px, 375px, 768px, 1024px e 1440px durante a revisão de PRs para validar adaptações.

### Componentes Chave
* **Cards de Desafio:** Resumo visual com tags de tech e XP.
* **Timeline de Portfólio:** Evolução cronológica visual.
* **Badges:** Ícones de alta fidelidade visual.

---

## 7. Regras de Ouro para o Assistente (IA)
1.  Ao gerar código de Service, **sempre implemente o Mock com `Observable` e `delay`**.
2.  Nunca misture lógica de negócios dentro do componente visual.
3.  Garanta que as Interfaces TypeScript (`models`) sejam criadas antes da implementação dos serviços.
4.  Utilize os componentes de UI nativos do Ionic (`ion-card`, `ion-list`, `ion-button`) para garantir a performance mobile.