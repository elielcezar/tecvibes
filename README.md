# TecVibes - Portal de Notícias sobre Tecnologia

Um site moderno e responsivo sobre Tecnologia, construído com **Next.js 15**. 

## 🎵 Características

- ✨ Design moderno inspirado no SmartMag GoodNews
- 📱 Totalmente responsivo para todos os dispositivos
- 🎯 Hero section com grid de posts destacados
- 📰 Cards de posts com imagens, categorias e metadados
- 🔧 Sidebar com widgets (posts em destaque, redes sociais, newsletter)
- 🌙 Header sticky com menu dinâmico
- ⚡ Performance otimizada com Next.js e Server Components

## 🚀 Como Iniciar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

```bash
npm install
npm run dev
```

Abra o navegador em `http://localhost:3000`

## 📦 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm start` - Servidor de produção
- `npm run lint` - Verificação de linting

## 🔧 Tecnologias

- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca JavaScript
- **React Icons** - Ícones
- **CSS3** - Estilização

## 🌐 Integração com CMS

O site consome APIs externas do CMS:
- `https://scriby.co/api/posts` - Posts
- `https://scriby.co/api/categorias` - Categorias

## 📄 Deploy

O deploy para um servidor VPS (com Nginx + PM2) é automatizado.

### 1. Configuração

- **`ecosystem.config.js`**: Este arquivo controla o PM2. Edite-o para definir a porta (`PORT`) e o nome da aplicação (`name`).
- **`deploy.sh`**: Script que automatiza a atualização, build e reinicialização da aplicação no servidor.
- **Nginx**: Um arquivo de configuração de exemplo para o Nginx está disponível em `DOCS/nginx-example.conf`. Use-o como base para configurar o proxy reverso para a sua aplicação.

### 2. Processo no Servidor

Após configurar o ambiente no seu servidor (clone do git, instalação do Node.js, PM2 e Nginx):

1.  Acesse o diretório do projeto.
2.  Execute o script de deploy para publicar as atualizações mais recentes:

```bash
# Deploy rápido
bash deploy.sh
```
O script irá automaticamente fazer o `git pull`, instalar dependências, fazer o build do projeto e reiniciar a aplicação com PM2.

Para um guia mais detalhado sobre o setup inicial, consulte [DOCS/DEPLOY.md](./DOCS/DEPLOY.md).

