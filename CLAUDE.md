# CLAUDE.md — NextIn

Contexto do projeto para o Claude Code. Mantenha este arquivo atualizado quando a arquitetura mudar.

## Visão geral

**NextIn** é um app mobile (React Native + Expo) para **gestão de fila de espera de restaurante**. O funcionário faz login, vê um painel (dashboard) com indicadores, gerencia a fila de clientes (adicionar, chamar, sentar) e acessa configurações/perfil.

Idioma do código, UI e comentários: **português (pt-BR)**. Mantenha esse padrão em nomes de variáveis, funções e textos.

## Stack

- **Expo SDK ~58** (compatível com Expo Go 58.x), React Native 0.88.1, React 19.3
- **TypeScript ~6.0** (`strict: true`, estende `expo/tsconfig.base`) — telas e componentes em `.tsx`; entrada em `.js`
- **React Navigation v7**: `native-stack` + `bottom-tabs`
- **AsyncStorage** — persistência local (e-mail lembrado no login)
- **libphonenumber-js** — validação/formatação de telefone (WhatsApp)
- **@expo/vector-icons** — ícones (Ionicons) na Home, Login e barra de navegação
- **react-native-safe-area-context** — insets no header e tab bar
- Sem backend ainda: tudo é mock/estado local. Sem testes, lint ou formatter configurados (o código segue estilo Prettier: aspas duplas, ponto e vírgula, vírgula final).

## Comandos

```bash
npm install          # node_modules não está versionado
npm start            # expo start
npm run android      # expo start --android
npm run ios          # expo start --ios
npm run web          # expo start --web
npx tsc --noEmit     # checagem de tipos (após npm install)
```

## Estrutura

```
index.js                  # ENTRY POINT real (package.json "main") — registerRootComponent
App.js                    # template padrão do Expo, NÃO É USADO
app.json                  # config Expo (nome "Nextin", portrait, ícone logoNext.png)
assets/
  icons/                  # ícones da tab bar e seta de voltar
  images/                 # logos, fundos, ícones de input, avatar
  videos/videoFundo1.mp4  # não referenciado no código
src/
  context/
    AuthContext.tsx       # isLoggedIn / login() / logout() — só estado em memória
    FilaContext.tsx       # fila de clientes + adicionarCliente / removerCliente
  navigation/
    AuthNavigator.tsx     # Stack raiz: troca entre telas de auth e TabNavigator por isLoggedIn
    TabNavigator.tsx      # Bottom tabs (envolvido por FilaProvider), header e tab bar customizados
    RootNavigator.tsx     # alternativo, NÃO É USADO (o index usa AuthNavigator direto)
  screens/
    login.tsx             # login + "login lembrado" + "problemas com login" (3 estados numa tela)
    logproblem.tsx        # tela antiga de problema de login (ainda registrada no stack)
    home.tsx              # dashboard: saudação, próximo da fila (com ações), KPIs reais, "em seguida", adicionar cliente
    fila.tsx              # lista da fila (FlatList), FAB "+" para novo cliente, modal de detalhes
    configuracoes.tsx     # botão "Sair" (logout)
    perfil.tsx            # placeholder
    ClienteFilaCard.tsx   # card de cliente com animação — está em screens/ mas é componente, NÃO É USADO
  components/
    Header.tsx            # HeaderGlobal: logo (→ home), bolinha online/offline, avatar (→ perfil)
    NavigationBar.tsx     # tab bar branca: Início, Fila (badge c/ tamanho da fila), Ajustes; aba ativa com pílula azul animada; trata safe area. Rotas fora de ABAS (perfil) ficam ocultas
    CustomModal.tsx       # modal genérico com fade + scale animados
    FormNovoCliente.tsx   # formulário: nome, pessoas, WhatsApp, observações (com validação via Alert)
    ClienteDetalhesModal.tsx # detalhes do cliente + botões Chamar/Sentar
    MaskedPhoneInput.tsx  # input com máscara (XX) XXXXX-XXXX + validação em tempo real
    PhoneValidator.tsx    # utilitários libphonenumber: validarTelefone, formatarTelefone, extrairDDD, ehCelular
  services/  styles/  types/  # pastas vazias (só txt.txt explicativo) — reservadas p/ API, estilos e tipos
```

## Fluxo de navegação

```
index.js
└─ NavigationContainer
   └─ AuthProvider
      └─ AuthNavigator (Stack, headerShown: false, animação fade)
         ├─ isLoggedIn = false → "login", "logproblem"
         └─ isLoggedIn = true  → "TabNavigator"
                                  └─ FilaProvider
                                     └─ Tabs: "home", "fila", "configuracoes", "perfil"
                                        header = HeaderGlobal, tabBar = NavigationBar
```

- Nomes de rotas são **minúsculos** (`home`, `fila`, `configuracoes`, `perfil`) e a navegação usa `navigation.navigate("<nome>")`.
- Navegação não é tipada (`navigation: any` / `useNavigation<any>()`).
- `FilaProvider` fica dentro do TabNavigator → a fila é **resetada a cada logout/login**.

## Regras de negócio atuais

### Login ([src/screens/login.tsx](src/screens/login.tsx))
- Credenciais **hardcoded**: `teste@gmail.com` / `Teste` (com `trim()`).
- No sucesso salva no AsyncStorage `email` e `lembrar = "true"` e chama `login()` do contexto.
- Ao abrir: se `lembrar === "true"` e há e-mail salvo → estado `"lembrado"` (card "Continuar como…", toca para revelar campo de senha).
- A tela tem 3 estados internos (`telaAtual`: `"login" | "lembrado" | "problema"`) renderizados dentro de um único card branco, com transição `Animated` (fade + deslize curto no eixo X). A rota `logproblem` separada existe mas não é acionada pelo fluxo atual.
- Visual: capa no topo com `bgabstract.png` (triângulos azul-marinho) + véu na cor da marca, logo original `iconHeader.png` (mesma do header, `resizeMode: "contain"`), slogan e selos `DESTAQUES`; card branco sobreposto à capa (`marginTop` negativo); status bar clara (`expo-status-bar`); rodapé. Componente interno `Campo` (rótulo + ícone Ionicons + borda azul no foco / vermelha no erro). Paleta no objeto `C` no topo do arquivo.
- Erros aparecem **inline** (caixa vermelha acima do botão), não em `Alert`. Botão mostra `ActivityIndicator` durante o login.
- Teclado: e-mail com `keyboardType="email-address"`, "próximo" foca a senha, "ir" na senha faz login.
- "Recuperar acesso" é mock: valida e-mail preenchido e mostra `Alert` de confirmação.
- "Entrar com outra conta" limpa e-mail/senha e volta ao estado `login`.
- `logout()` só muda o estado; **não limpa** o AsyncStorage (o e-mail continua lembrado).

### Fila ([src/context/FilaContext.tsx](src/context/FilaContext.tsx))
- Modelo `ClienteFila`: `id, nome, pessoas, whatsapp, observacoes, posicao, horaChegada (ms epoch)`.
- Estado inicial com 2 clientes mock (João Silva, Maria Souza).
- `adicionarCliente`: anexa ao final; a tela calcula `posicao = fila.length + 1` e `id = Math.random().toString(36)`.
- `removerCliente` ("Sentar"): remove, **renumera** as posições e incrementa `atendidosHoje` (contador em memória, zera no logout).
- O tipo `ClienteFila` é exportado de `FilaContext.tsx` — importe de lá.
- "Chamar" só exibe um `Alert`. Na Home há também um botão de WhatsApp que abre `https://wa.me/55<numero>` com mensagem pronta.
- Tempo de espera é calculado a partir de `horaChegada`; `fila.tsx` força re-render a cada 1 s via `setInterval` (a Home a cada 15 s).

### Home ([src/screens/home.tsx](src/screens/home.tsx))
- Saudação por horário + data por extenso (arrays em pt-BR, sem depender de `Intl`) + pill "Fila ativa".
- Card escuro de destaque com o **próximo da fila** (`fila[0]`): avatar, pessoas, observações, tempo de espera colorido (verde ≤15 min, amarelo ≤30, vermelho >30) e ações Chamar / Sentar / WhatsApp. Estado vazio quando a fila está vazia.
- 4 KPIs **calculados da fila**: grupos na fila, pessoas aguardando, espera média, atendidos hoje.
- Lista "Em seguida" (posições 2–4) → toque abre `ClienteDetalhesModal`; "Ver fila completa" navega para `fila`.
- Botão "Adicionar cliente à fila" abre `CustomModal` + `FormNovoCliente` direto na Home.
- Ícones via `@expo/vector-icons` (Ionicons). Paleta da tela fica no objeto `C` no topo do arquivo.

## Estilo / UI

- Estilos com `StyleSheet.create` no final de cada arquivo; não há tema/tokens centralizados (pasta `styles/` vazia).
- Paleta recorrente: fundo escuro `#0d0d0d` (tab bar), creme `#FAF6EE` (cards/form), azul `#3e6eff` (botão login, pressed `#2846a0`), verde `#4CD964` (sucesso/online/adicionar), vermelho `#FF3B30` (erro/offline/cancelar), azul `#007AFF`.
- Assets via `require("../../assets/...")`.
- Animações com a API `Animated` nativa (`useNativeDriver: true`).

## Problemas conhecidos / dívidas técnicas

Ao mexer nessas áreas, considere corrigir:

1. **Tipo `ClienteFila` ainda redeclarado** em `fila.tsx` e `ClienteDetalhesModal.tsx` — trocar por `import { ClienteFila } from "../context/FilaContext"`.
2. Erros de TS restantes: `styles.box` inexistente + chave duplicada em `logproblem.tsx` (tela não usada — candidata a remoção).
3. Telas fora da Home ainda usam o visual antigo — alinhar à paleta/estilo da nova Home.
4. `MOCK_DATA` em `fila.tsx` não é usado (dados mock vivem no contexto).
5. Os KPIs da Home não contam mesas (não há modelo de mesas ainda).
6. `fila.tsx` usa non-null assertion `clienteSelecionado!` nos handlers do modal.
7. `calcularTempoEspera` duplicado em `fila.tsx` e `ClienteDetalhesModal.tsx`; o modal não atualiza o tempo em tempo real.
8. Arquivos mortos: `App.js`, `RootNavigator.tsx`, `ClienteFilaCard.tsx` (em `screens/` mas é componente), `logproblem.tsx` (praticamente substituída), imports não usados (`ImageBackground`, `BackHandler`, `SafeAreaInsetsContext`, etc.).
9. `perfil.tsx` usa `SafeAreaView` de `react-native` (as outras telas usam de `react-native-safe-area-context`).
10. Header (`Header.tsx`) ainda usa ícones PNG e visual antigo — alinhar ao estilo da barra/login.
11. Status online/offline do header é `useState(true)` fixo.
12. `MaskedPhoneInput` mantém estado interno `numeroFormatado` sem sincronizar com a prop `value` (não reflete reset externo).
13. Autenticação fake e credenciais no código — substituir por serviço real em `src/services/` (o txt menciona Supabase como opção).

## Convenções para novas mudanças

- Novas telas em `src/screens/` (arquivo minúsculo, componente `export default` em PascalCase) e registrar no navigator correspondente.
- Componentes reutilizáveis em `src/components/`; estado global via Context + hook `useX()` que lança erro fora do Provider (padrão de `useAuth`/`useFila`).
- Chamadas de API/backend em `src/services/`; tipos compartilhados em `src/types/`.
- Textos da UI em português.
