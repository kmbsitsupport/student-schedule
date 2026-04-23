export interface ScheduleRow {
  time: string
  event: string
  speaker: string
  location: string
}

export interface ScheduleDay {
  label: string
  rows: ScheduleRow[]
}

export async function fetchSchedule(sheetUrl: string): Promise<ScheduleDay[]> {
  const res = await fetch(sheetUrl, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`)

  const text = await res.text()
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return []

  const rows: ScheduleRow[] = []
  for (const line of lines.slice(1)) {
    const cols = parseCsvLine(line)
    if (!cols[0] && !cols[1]) continue
    rows.push({
      time: cols[0] ?? '',
      event: cols[1] ?? '',
      speaker: cols[2] ?? '',
      location: cols[3] ?? '',
    })
  }

  return groupByDay(rows)
}

function groupByDay(rows: ScheduleRow[]): ScheduleDay[] {
  const days: ScheduleDay[] = []
  let current: ScheduleDay | null = null

  for (const row of rows) {
    const isDayHeader =
      !row.time && row.event && !row.speaker && !row.location

    if (isDayHeader) {
      current = { label: row.event, rows: [] }
      days.push(current)
      continue
    }

    if (!current) {
      current = { label: '', rows: [] }
      days.push(current)
    }
    current.rows.push(row)
  }

  return days.filter(d => d.rows.length > 0)
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  result.push(current.trim())
  return result
}
