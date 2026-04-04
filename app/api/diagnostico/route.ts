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

    const payload = {
      name,
      email,
      whatsapp,
      company,
      totalScore,
      nivel,
      answers,
      questionnaireVersion,
    };

    const supabase = getSupabaseAdmin();
    const table = getDiagnosticoTableName();

    const { error } = await supabase.from(table).insert([payload]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'No se pudo guardar el diagnóstico.' },
        { status: 500 }
      );
    }

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (makeWebhookUrl) {
      try {
        await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (makeError) {
        console.error('Make webhook error:', makeError);
      }
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
