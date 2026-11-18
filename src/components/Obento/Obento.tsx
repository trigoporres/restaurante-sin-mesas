import { Canvas } from "@react-three/fiber";

/**
 * Obento muy sencillo: una bandeja con cuatro compartimentos vacíos y su tapa
 * apoyada al lado. Solo formas básicas y una luz, para ir afinando desde aquí.
 */

const ANCHO = 3;
const FONDO = 2;
const ALTO = 0.5;
const GROSOR = 0.08;

const LACA = "#5a2e22";
const INTERIOR = "#e6d5b8";

function Pared({
  posicion,
  tamano,
}: {
  posicion: [number, number, number];
  tamano: [number, number, number];
}) {
  return (
    <mesh position={posicion}>
      <boxGeometry args={tamano} />
      <meshStandardMaterial color={LACA} roughness={0.35} />
    </mesh>
  );
}

function Bandeja() {
  return (
    <group>
      {/* base */}
      <mesh position={[0, GROSOR / 2, 0]}>
        <boxGeometry args={[ANCHO, GROSOR, FONDO]} />
        <meshStandardMaterial color={INTERIOR} roughness={0.8} />
      </mesh>

      {/* paredes exteriores */}
      <Pared posicion={[0, ALTO / 2, -FONDO / 2]} tamano={[ANCHO, ALTO, GROSOR]} />
      <Pared posicion={[0, ALTO / 2, FONDO / 2]} tamano={[ANCHO, ALTO, GROSOR]} />
      <Pared posicion={[-ANCHO / 2, ALTO / 2, 0]} tamano={[GROSOR, ALTO, FONDO]} />
      <Pared posicion={[ANCHO / 2, ALTO / 2, 0]} tamano={[GROSOR, ALTO, FONDO]} />

      {/* divisiones: una vertical y una horizontal, cuatro compartimentos */}
      <Pared posicion={[0, ALTO / 2, 0]} tamano={[GROSOR, ALTO, FONDO]} />
      <Pared posicion={[0, ALTO / 2, 0]} tamano={[ANCHO, ALTO, GROSOR]} />
    </group>
  );
}

export function Obento() {
  return (
    <Canvas camera={{ position: [3.2, 3.2, 3.8], fov: 35 }} style={{ background: "#f4ecdf" }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={2} />
      <group rotation={[0, -0.4, 0]}>
        <Bandeja />
      </group>
    </Canvas>
  );
}
