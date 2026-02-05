import { NextResponse } from 'next/server'

import { sql } from '@/lib/db'

let isInitialized = false

async function ensureTable() {
  if (isInitialized) return

  await sql`
    CREATE TABLE IF NOT EXISTS app_kv (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  isInitialized = true
}

export async function GET(request: Request) {
  await ensureTable()

  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 })
  }

  const rows = await sql`
    SELECT value
    FROM app_kv
    WHERE key = ${key}
  `

  if (rows.length === 0) {
    return NextResponse.json({ value: null }, { status: 404 })
  }

  return NextResponse.json({ key, value: rows[0].value })
}

export async function POST(request: Request) {
  await ensureTable()

  const body = await request.json().catch(() => null)
  const key = body?.key
  const value = body?.value

  if (!key) {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 })
  }

  await sql`
    INSERT INTO app_kv (key, value, updated_at)
    VALUES (${key}, ${value}, NOW())
    ON CONFLICT (key)
    DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `

  return NextResponse.json({ key, value })
}

export async function DELETE(request: Request) {
  await ensureTable()

  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json({ error: 'Missing key' }, { status: 400 })
  }

  await sql`
    DELETE FROM app_kv
    WHERE key = ${key}
  `

  return NextResponse.json({ key, deleted: true })
}
