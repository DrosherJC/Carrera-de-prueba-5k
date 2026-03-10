"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema, type RegistroFormData } from "@/lib/types";

type Estado = "idle" | "loading" | "success" | "error";

export default function FormularioRegistro() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensajeError, setMensajeError] = useState("");
  const [corredor, setCorredor] = useState<{
    nombre: string;
    apellido: string;
    numero_corredor: number | null;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
  });

  const onSubmit = async (data: RegistroFormData) => {
    setEstado("loading");
    setMensajeError("");

    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Error desconocido");
      }

      setCorredor(json.corredor);
      setEstado("success");
      reset();
    } catch (err: any) {
      setMensajeError(err.message);
      setEstado("error");
    }
  };

  if (estado === "success" && corredor) {
    return (
      <div className="animate-fade-up text-center py-12 px-6">
        <div className="text-6xl mb-4">🏃</div>
        <h2 className="font-display text-5xl text-brand-orange mb-2 tracking-wider">
          ¡LISTO!
        </h2>
        <p className="text-brand-light text-lg mb-6">
          <span className="font-bold">
            {corredor.nombre} {corredor.apellido}
          </span>
          , estás inscrito/a en la carrera.
        </p>
        {corredor.numero_corredor && (
          <div className="inline-block border-2 border-brand-orange rounded-xl px-8 py-4 mb-6 pulse-orange">
            <p className="text-brand-muted text-sm uppercase tracking-widest mb-1">
              Tu número de corredor
            </p>
            <p className="font-display text-6xl text-brand-orange">
              #{corredor.numero_corredor}
            </p>
          </div>
        )}
        <p className="text-brand-muted text-sm">
          Recibirás un correo con los detalles del evento.
        </p>
        <button
          onClick={() => setEstado("idle")}
          className="mt-8 text-brand-muted hover:text-brand-orange transition-colors text-sm underline"
        >
          Registrar otro participante
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Nombre</label>
          <input
            {...register("nombre")}
            type="text"
            placeholder="Juan"
            className={`input-field ${errors.nombre ? "input-error" : ""}`}
          />
          {errors.nombre && (
            <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>
          )}
        </div>
        <div>
          <label className="label">Apellido</label>
          <input
            {...register("apellido")}
            type="text"
            placeholder="Pérez"
            className={`input-field ${errors.apellido ? "input-error" : ""}`}
          />
          {errors.apellido && (
            <p className="text-red-400 text-xs mt-1">
              {errors.apellido.message}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="label">Correo electrónico</label>
        <input
          {...register("email")}
          type="email"
          placeholder="juan@correo.com"
          className={`input-field ${errors.email ? "input-error" : ""}`}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Teléfono y Fecha */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Teléfono</label>
          <input
            {...register("telefono")}
            type="tel"
            placeholder="+593 300 123 456"
            className={`input-field ${errors.telefono ? "input-error" : ""}`}
          />
          {errors.telefono && (
            <p className="text-red-400 text-xs mt-1">
              {errors.telefono.message}
            </p>
          )}
        </div>
        <div>
          <label className="label">Fecha de nacimiento</label>
          <input
            {...register("fecha_nacimiento")}
            type="date"
            className={`input-field ${
              errors.fecha_nacimiento ? "input-error" : ""
            }`}
          />
          {errors.fecha_nacimiento && (
            <p className="text-red-400 text-xs mt-1">
              {errors.fecha_nacimiento.message}
            </p>
          )}
        </div>
      </div>

      {/* Categoría y Talla */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Categoría</label>
          <select
            {...register("categoria")}
            className={`input-field ${errors.categoria ? "input-error" : ""}`}
          >
            <option value="">Selecciona...</option>
            <option value="juvenil">Juvenil (10–17 años)</option>
            <option value="general">General (18–49 años)</option>
            <option value="veterano">Veterano (50+ años)</option>
          </select>
          {errors.categoria && (
            <p className="text-red-400 text-xs mt-1">
              {errors.categoria.message}
            </p>
          )}
        </div>
        <div>
          <label className="label">Talla de camiseta</label>
          <select
            {...register("talla_camiseta")}
            className={`input-field ${
              errors.talla_camiseta ? "input-error" : ""
            }`}
          >
            <option value="">Selecciona...</option>
            {["XS", "S", "M", "L", "XL", "XXL"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.talla_camiseta && (
            <p className="text-red-400 text-xs mt-1">
              {errors.talla_camiseta.message}
            </p>
          )}
        </div>
      </div>

      {/* Términos */}
      <div className="flex items-start gap-3 pt-2">
        <input
          {...register("acepta_terminos")}
          type="checkbox"
          id="terminos"
          className="mt-0.5 w-4 h-4 accent-brand-orange cursor-pointer flex-shrink-0"
        />
        <label
          htmlFor="terminos"
          className="text-sm text-brand-muted cursor-pointer leading-relaxed"
        >
          Acepto los{" "}
          <a href="#" className="text-brand-orange hover:underline">
            términos y condiciones
          </a>{" "}
          del evento y autorizo el uso de mis datos para efectos del registro.
        </label>
      </div>
      {errors.acepta_terminos && (
        <p className="text-red-400 text-xs -mt-3">
          {errors.acepta_terminos.message}
        </p>
      )}

      {/* Error general */}
      {estado === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
          ⚠️ {mensajeError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={estado === "loading"}
        className="btn-primary"
      >
        {estado === "loading" ? "REGISTRANDO..." : "INSCRIBIRME GRATIS →"}
      </button>
    </form>
  );
}
