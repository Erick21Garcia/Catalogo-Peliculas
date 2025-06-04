# 🎬 Catálogo de Películas - Laravel + React

Este proyecto es una aplicación de catálogo de películas construida con **Laravel** como backend y **React** como frontend. Permite agregar, editar, listar y eliminar películas, cada una con información como título, año de estreno, director y género.

---

## 🚀 Tecnologías utilizadas

### Backend (API RESTful - Laravel)
- Laravel 10
- MySQL o SQLite
- Eloquent ORM
- Laravel Resource Controllers
- Laravel CORS (para permitir conexión externa)
- Laravel Artisan Migrations

### Frontend (Interfaz - React)
- React 18+
- Axios (para consumir la API)
- Tailwind CSS (estilos modernos)
- React Hooks (useState, useEffect)
- Toast notifications (personalizado)

---

## 📁 Estructura del Proyecto

/backend => Proyecto Laravel (API)
└── routes/api.php
└── app/Http/Controllers/
└── app/Models/
└── database/migrations/

/frontend => Proyecto React (Interfaz)
└── src/components/
└── MovieForm.js
└── MoviesList.js
└── Pagination.js
└── src/api/api.js

---

## ⚙️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/catalogo-peliculas.git
cd catalogo-peliculas
```

### 2. Configura el backend (Laravel)

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 3. Configura el frontend (React)

```bash
cd frontend
npm install
npm run dev
```
