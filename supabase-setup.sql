-- ============================================================
-- CARRERA 5K · Setup de base de datos en Supabase
-- Ejecuta este script en: Supabase → SQL Editor → New query
-- ============================================================

-- 1. Crear la tabla de corredores
CREATE TABLE IF NOT EXISTS public.corredores (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre            TEXT NOT NULL,
  apellido          TEXT NOT NULL,
  email             TEXT NOT NULL UNIQUE,
  telefono          TEXT NOT NULL,
  fecha_nacimiento  DATE NOT NULL,
  talla_camiseta    TEXT NOT NULL CHECK (talla_camiseta IN ('XS','S','M','L','XL','XXL')),
  categoria         TEXT NOT NULL CHECK (categoria IN ('general','juvenil','veterano')),
  numero_corredor   SERIAL,           -- se asigna automáticamente
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Índice para búsquedas por email (ya cubierto por UNIQUE, pero explicit)
CREATE INDEX IF NOT EXISTS idx_corredores_email ON public.corredores(email);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE public.corredores ENABLE ROW LEVEL SECURITY;

-- 4. Política: cualquiera puede INSERTAR (registro público, sin login)
CREATE POLICY "Inserción pública"
  ON public.corredores
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. Política: nadie puede leer los datos desde el cliente
--    (el conteo se hace desde el backend con la clave anon, está bien)
CREATE POLICY "Lectura solo conteo"
  ON public.corredores
  FOR SELECT
  TO anon
  USING (false);   -- bloquea SELECT directo; el conteo via API route usa service role

-- ============================================================
-- NOTAS:
-- · La API route /api/registro usa la clave ANON para insertar.
-- · El conteo de inscritos también usa la clave ANON (HEAD request).
-- · Si quieres un panel admin, crea una nueva clave service_role
--   y úsala SOLO en el servidor (nunca en el cliente).
-- ============================================================
