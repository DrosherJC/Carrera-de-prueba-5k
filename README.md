# 🏃 Carrera 5K · Proyecto Web

Sitio de registro gratuito para una carrera 5K, construido con **Next.js 14**, **Supabase** y desplegado en **Vercel**.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router) + React |
| Estilos | Tailwind CSS |
| Validación | React Hook Form + Zod |
| Base de datos | Supabase (PostgreSQL) |
| Backend | API Routes de Next.js |
| Deploy | Vercel |

---

## Estructura del proyecto

```
carrera-5k/
├── app/
│   ├── api/
│   │   └── registro/
│   │       └── route.ts        ← POST (registrar) / GET (conteo)
│   ├── components/
│   │   ├── FormularioRegistro.tsx
│   │   └── ContadorInscritos.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                ← Landing + formulario
├── lib/
│   ├── supabase.ts             ← Cliente de Supabase
│   └── types.ts                ← Tipos TypeScript + esquema Zod
├── supabase-setup.sql          ← Script SQL para crear la tabla
├── .env.example                ← Variables de entorno (plantilla)
└── ...
```

---

## 🚀 Setup paso a paso

### 1. Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. En el menú lateral ve a **SQL Editor**
4. Copia y pega el contenido de `supabase-setup.sql` y ejecútalo
5. Ve a **Settings → API** y copia:
   - `Project URL`
   - `anon public` key

### 2. Variables de entorno (local)

```bash
cp .env.example .env.local
```

Edita `.env.local` y pega los valores de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Instalar y correr localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

### 4. Deploy en Vercel

1. Sube el proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com) → **New Project** → importa el repo
3. En la sección **Environment Variables** agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Haz clic en **Deploy** ✅

---

## API Endpoints

### `POST /api/registro`

Registra un nuevo corredor.

**Body (JSON):**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@correo.com",
  "telefono": "+57 300 123 4567",
  "fecha_nacimiento": "1990-05-15",
  "talla_camiseta": "M",
  "categoria": "general",
  "acepta_terminos": true
}
```

**Respuestas:**
- `201` → Registro exitoso
- `400` → Datos inválidos
- `409` → Email ya registrado
- `500` → Error del servidor

---

### `GET /api/registro`

Devuelve el conteo total de inscritos.

```json
{ "total_inscritos": 42 }
```

---

## Campos del formulario

| Campo | Tipo | Validación |
|-------|------|-----------|
| Nombre | texto | 2–80 caracteres |
| Apellido | texto | 2–80 caracteres |
| Email | email | formato válido, único |
| Teléfono | tel | 7–15 dígitos |
| Fecha de nacimiento | date | edad ≥ 10 años |
| Talla de camiseta | select | XS/S/M/L/XL/XXL |
| Categoría | select | juvenil/general/veterano |
| Acepta términos | checkbox | obligatorio |

---

## Próximas mejoras sugeridas

- [ ] Envío de email de confirmación (Resend o SendGrid)
- [ ] Panel de administración para ver inscritos
- [ ] Exportar lista a Excel/CSV
- [ ] Límite máximo de participantes
- [ ] Múltiples fechas/ediciones de carrera
