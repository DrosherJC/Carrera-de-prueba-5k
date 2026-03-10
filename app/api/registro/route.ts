import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { registroSchema } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validar datos con Zod
    const parsed = registroSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos inválidos", detalles: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { acepta_terminos, ...datosRegistro } = parsed.data;

    // 2. Verificar que el email no esté ya registrado
    const { data: existente } = await supabase
      .from("corredores")
      .select("id")
      .eq("email", datosRegistro.email)
      .single();

    if (existente) {
      return NextResponse.json(
        { error: "Este correo electrónico ya está registrado" },
        { status: 409 }
      );
    }

    // 3. Insertar en Supabase
    const { data, error } = await supabase
      .from("corredores")
      .insert([datosRegistro])
      .select("id, nombre, apellido, numero_corredor")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Error al guardar el registro. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        mensaje: "¡Registro exitoso!",
        corredor: data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// GET - Obtener conteo de inscritos (público)
export async function GET() {
  const { count, error } = await supabase
    .from("corredores")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }

  return NextResponse.json({ total_inscritos: count ?? 0 });
}
