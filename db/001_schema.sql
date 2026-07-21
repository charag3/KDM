-- ============================================================
-- KDM Seminuevos — Schema inicial
-- Migración 001
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLA: perfiles_admin
-- Mare (admin) + Soma Space (super_admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS perfiles_admin (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  nombre        VARCHAR(255) NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'admin'
                  CHECK (role IN ('admin', 'super_admin')),
  created_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TABLA: equipos_seminuevos
-- Catálogo autogestionable — Mare lo edita desde el admin panel
-- ============================================================
CREATE TABLE IF NOT EXISTS equipos_seminuevos (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tipo              VARCHAR(20) NOT NULL CHECK (tipo IN ('Tractor', 'Offroad')),
  nombre            VARCHAR(255) NOT NULL,
  ano               INTEGER NOT NULL,
  horas             INTEGER NOT NULL DEFAULT 0,
  precio            DECIMAL(12,2) NOT NULL,
  condicion         VARCHAR(20) NOT NULL CHECK (condicion IN ('Excelente', 'Muy buena', 'Buena', 'Regular')),
  descripcion       TEXT NOT NULL,
  imagen_principal  VARCHAR(500),
  imagenes          JSONB NOT NULL DEFAULT '[]',
  specs             JSONB NOT NULL DEFAULT '{}',
  disponible        BOOLEAN NOT NULL DEFAULT TRUE,
  verificado_kdm    BOOLEAN NOT NULL DEFAULT FALSE,
  orden             INTEGER NOT NULL DEFAULT 0,
  created_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_equipos_tipo       ON equipos_seminuevos(tipo);
CREATE INDEX IF NOT EXISTS idx_equipos_disponible ON equipos_seminuevos(disponible);
CREATE INDEX IF NOT EXISTS idx_equipos_orden      ON equipos_seminuevos(orden);

-- ============================================================
-- TABLA: consignaciones
-- Leads del formulario — Mare los gestiona desde admin
-- ============================================================
CREATE TABLE IF NOT EXISTS consignaciones (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre           VARCHAR(255) NOT NULL,
  telefono         VARCHAR(30) NOT NULL,
  tractor_interes  VARCHAR(255) NOT NULL,
  tiene_equipo     BOOLEAN NOT NULL DEFAULT FALSE,
  tipo_equipo      VARCHAR(100),
  marca_modelo     VARCHAR(255),
  ano_equipo       INTEGER,
  horas_equipo     INTEGER,
  condicion_equipo VARCHAR(50),
  precio_esperado  DECIMAL(12,2),
  mensaje          TEXT,
  status           VARCHAR(20) NOT NULL DEFAULT 'nuevo'
                     CHECK (status IN ('nuevo', 'contactado', 'cerrado', 'descartado')),
  notas_internas   TEXT,
  created_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consignaciones_status ON consignaciones(status);

-- ============================================================
-- FUNCIÓN: updated_at automático
-- ============================================================
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_equipos
  BEFORE UPDATE ON equipos_seminuevos
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_consignaciones
  BEFORE UPDATE ON consignaciones
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ============================================================
-- SEED: inventario inicial (los 8 equipos del prototipo)
-- ============================================================
INSERT INTO equipos_seminuevos (tipo, nombre, ano, horas, precio, condicion, descripcion, imagen_principal, specs, verificado_kdm, orden)
VALUES
(
  'Tractor', 'Kubota B2301', 2019, 1200, 185000.00, 'Muy buena',
  'Tractor compacto en excelente estado. Ideal para huertos y espacios reducidos. Transmisión hidrostática, motor diesel de 3 cilindros. Revisión técnica completa por KDM antes de la venta.',
  'https://images.pexels.com/photos/35510874/pexels-photo-35510874.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Kubota","hp":23,"traccion":"4WD","transmision":"HST"}',
  TRUE, 1
),
(
  'Tractor', 'Kubota L3301', 2018, 2800, 230000.00, 'Buena',
  'Caballo de trabajo de la serie L. Historial de uso en rancho ganadero en Zamora. Motor y sistema hidráulico revisados. Documentación completa disponible.',
  'https://images.pexels.com/photos/29253996/pexels-photo-29253996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Kubota","hp":33,"traccion":"4WD","transmision":"GST"}',
  TRUE, 2
),
(
  'Tractor', 'Kubota L3901', 2020, 1950, 310000.00, 'Excelente',
  'Un solo dueño, uso en finca hortícola. Mantenimiento puntual con registros completos. Llantas al 80%. El más completo de la serie L en inventario.',
  'https://images.pexels.com/photos/30248663/pexels-photo-30248663.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Kubota","hp":39,"traccion":"4WD","transmision":"HST"}',
  TRUE, 3
),
(
  'Tractor', 'Kubota L4701', 2017, 3500, 275000.00, 'Buena',
  'Tractor de trabajo intensivo con historial documentado. Recién salido de servicio mayor en KDM. Ideal para operaciones de carga y labranza en rancho.',
  'https://images.pexels.com/photos/34632627/pexels-photo-34632627.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Kubota","hp":47,"traccion":"4WD","transmision":"HST"}',
  TRUE, 4
),
(
  'Tractor', 'Kubota M5091', 2016, 2100, 420000.00, 'Muy buena',
  'Serie M de alta potencia. Cabina con A/C, motor turbo de 4 cilindros. Operación en grandes extensiones maiceras. Sistema hidráulico de alta capacidad en perfecto estado.',
  'https://images.pexels.com/photos/9422727/pexels-photo-9422727.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Kubota","hp":91,"traccion":"4WD","transmision":"GST"}',
  TRUE, 5
),
(
  'Offroad', 'Polaris RZR Pro R', 2021, 320, 480000.00, 'Excelente',
  'RZR Pro R con pocas horas. Motor ProStar R de 225 HP, suspensión Fox Live Valve. Sin accidentes, uso recreativo ocasional. Incluye jaula reforzada aftermarket.',
  'https://images.pexels.com/photos/11488068/pexels-photo-11488068.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Polaris","hp":225,"capacidad":"2 pasajeros"}',
  TRUE, 6
),
(
  'Offroad', 'Polaris Sportsman 570', 2020, 510, 128000.00, 'Muy buena',
  'ATV versátil para trabajo y aventura. Motor 570cc, tracción AWD en demanda. Uso mixto en rancho y recreativo. Llantas al 70%, sin golpes visibles.',
  'https://images.pexels.com/photos/19995804/pexels-photo-19995804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Polaris","hp":44,"capacidad":"1 pasajero"}',
  TRUE, 7
),
(
  'Offroad', 'Polaris Ranger 1000', 2022, 280, 390000.00, 'Excelente',
  'Ranger casi nuevo, usado principalmente en labores de carga en rancho. Motor ProStar 82 HP, caja de carga 680 kg. Garantía extendida Polaris transferible al comprador.',
  'https://images.pexels.com/photos/14699493/pexels-photo-14699493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '{"marca":"Polaris","hp":82,"capacidad":"3 pasajeros / 680 kg carga"}',
  TRUE, 8
)
ON CONFLICT DO NOTHING;
