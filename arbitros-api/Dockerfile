FROM node:18

# Seguridad básica: crea usuario no root
RUN useradd -m appuser
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# Cambia permisos
RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 3000

CMD ["npm", "start"]