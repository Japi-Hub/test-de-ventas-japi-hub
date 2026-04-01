import { NextResponse } from 'next/server';
import { getSupabaseAdmin, getDiagnosticoTableName } from '../../../lib/supabase-server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      whatsapp,
      company,
      totalScore,
      nivel,
      answers,
      questionnaireVersion,
    } = body;

    if (
      !name ||
      !email ||
      !whatsapp ||
      !company ||
      totalScore === undefined ||
      !nivel ||
      !answers ||
      !questionnaireVersion
    ) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios.' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const table = getDiagnosticoTableName();

    const { error } = await supabase.from(table).insert([
      {
        name,
        email,
        whatsapp,
        company,
        totalScore,
        nivel,
        answers,
        questionnaireVersion,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'No se pudo guardar el diagnóstico.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('API diagnostico error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
