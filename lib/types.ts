import { z } from "zod";

export const registroSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "Nombre demasiado largo"),
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(80, "Apellido demasiado largo"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z
    .string()
    .min(7, "Teléfono inválido")
    .max(15, "Teléfono demasiado largo")
    .regex(/^[\d\s\+\-\(\)]+$/, "Solo se permiten números y símbolos +, -, ()"),
  fecha_nacimiento: z
    .string()
    .refine((val) => {
      const date = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 10 && age <= 100;
    }, "Debes tener al menos 10 años para participar"),
  talla_camiseta: z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
    errorMap: () => ({ message: "Selecciona una talla válida" }),
  }),
  categoria: z.enum(["general", "juvenil", "veterano"], {
    errorMap: () => ({ message: "Selecciona una categoría" }),
  }),
  acepta_terminos: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export type RegistroFormData = z.infer<typeof registroSchema>;

// Tipo tal como viene de Supabase
export type Corredor = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  talla_camiseta: string;
  categoria: string;
  numero_corredor: number | null;
  created_at: string;
};
