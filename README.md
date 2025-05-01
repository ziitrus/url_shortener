# URL Shortener

Un service de raccourcissement d'URL développé avec Node.js, Express, TypeScript, Prisma et Redis.

## Prérequis

- Node.js (v16 ou supérieur)
- Docker et Docker Compose
- npm ou yarn

## Installation

1. Clonez le dépôt :
```bash
git clone git@github.com:ziitrus/url_shortener.git
cd url-shortener
```

## Configuration

1. Créez un fichier `.env` à la racine du projet avec les variables d'environnement nécessaires :
```env
DATABASE_URL="postgresql://username:password@postgres:5432/url_shortener"
REDIS_URL="redis://localhost:6379"
PORT=3000

POSTGRES_USER= username # The PostgreSQL user (useful to connect to the database)
POSTGRES_PASSWORD= password # The PostgreSQL password (useful to connect to the database)
POSTGRES_DB= url_shortener # The PostgreSQL default database (automatically created at first launch)

```

## Démarrage

### Avec Docker (recommandé)

1. Lancez l'application et ses dépendances :
```bash
docker-compose up -d
```

L'application sera accessible sur `http://localhost:3000`

## Documentation API

La documentation Swagger de l'API est disponible à l'adresse :
`http://localhost:3000/api-docs`

## Technologies utilisées

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- Redis (Cache)
- PostgreSQL
- Swagger (Documentation API)
- Docker & Docker Compose