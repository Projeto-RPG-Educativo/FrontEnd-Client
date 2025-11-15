# Estágio de build
FROM node:20-alpine AS builder

# Argumento para a URL da API
ARG VITE_API_URL=https://backend-java-vb8r.onrender.com/api

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Definir variável de ambiente para o build
ENV VITE_API_URL=$VITE_API_URL

# Build da aplicação (sem verificação de TypeScript)
RUN npx vite build

# Estágio de produção
FROM nginx:alpine

# Copiar arquivos buildados do estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
