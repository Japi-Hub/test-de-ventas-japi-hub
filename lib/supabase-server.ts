import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase env vars');
  }

  return createClient(url, serviceRoleKey);
}

export function getDiagnosticoTableName() {
  return process.env.SUPABASE_DIAGNOSTICO_TABLE || 'diagnostico_submissions';
}
