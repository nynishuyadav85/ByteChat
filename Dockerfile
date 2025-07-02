# Multi-stage build for production
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY Backend/package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY Frontend/package*.json ./
RUN npm ci
COPY Frontend/ ./
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend/node_modules ./Backend/node_modules
COPY Backend/ ./Backend/

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist ./Frontend/dist

WORKDIR /app/Backend
EXPOSE 5001

CMD ["npm", "start"]