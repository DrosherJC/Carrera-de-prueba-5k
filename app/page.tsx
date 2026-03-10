import FormularioRegistro from "./components/FormularioRegistro";
import ContadorInscritos from "./components/ContadorInscritos";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden noise">
        {/* Background decoration */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% -10%, rgba(255,77,0,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5 pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg at 100% 0%, #FF4D00 0deg, transparent 90deg)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div className="animate-fade-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                <span className="text-brand-orange text-xs font-medium uppercase tracking-widest">
                  Registro Gratuito
                </span>
              </div>

              <h1 className="font-display text-7xl lg:text-9xl leading-none tracking-wide text-brand-light mb-4">
                CORRE
                <br />
                <span className="text-brand-orange">5K</span>
              </h1>

              <p className="text-brand-muted text-lg leading-relaxed max-w-md mb-8">
                Una carrera urbana para todos. Entrena, compite y cruza la meta.
                Sin costo, sin excusas.
              </p>

              {/* Info cards */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: "📅", label: "Fecha", value: "15 Jun 2025" },
                  { icon: "📍", label: "Lugar", value: "Parque Central" },
                  { icon: "🏁", label: "Distancia", value: "5 km" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-brand-card border border-brand-border rounded-xl p-3"
                  >
                    <span className="text-xl mb-1 block">{item.icon}</span>
                    <p className="text-brand-muted text-xs uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-brand-light font-medium text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <ContadorInscritos />

              {/* Categorías */}
              <div className="mt-10 pt-8 border-t border-brand-border">
                <p className="text-brand-muted text-xs uppercase tracking-widest mb-4">
                  Categorías
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { nombre: "Juvenil", rango: "10–17 años" },
                    { nombre: "General", rango: "18–49 años" },
                    { nombre: "Veterano", rango: "50+ años" },
                  ].map((cat) => (
                    <div
                      key={cat.nombre}
                      className="bg-brand-mid border border-brand-border rounded-lg px-4 py-2"
                    >
                      <span className="text-brand-light text-sm font-medium">
                        {cat.nombre}
                      </span>
                      <span className="text-brand-muted text-xs ml-2">
                        {cat.rango}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="animate-fade-up-delay-2">
              <div className="bg-brand-card border border-brand-border rounded-2xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="font-display text-3xl text-brand-light tracking-wider mb-1">
                    INSCRIPCIÓN
                  </h2>
                  <p className="text-brand-muted text-sm">
                    Completa el formulario · 100% gratis
                  </p>
                </div>
                <FormularioRegistro />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-brand-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-xl text-brand-muted tracking-widest">
            CORRE<span className="text-brand-orange">5K</span>
          </p>
          <p className="text-brand-muted text-sm">
            © {new Date().getFullYear()} · Todos los derechos reservados
          </p>
        </div>
      </footer>
    </main>
  );
}
