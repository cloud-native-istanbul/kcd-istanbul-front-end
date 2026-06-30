// Shared Sessionize configuration and HTML-embed parsing helpers, used by both
// the Sessions page (talk listing) and the Schedule page (full timetable).
//
// The Sessionize embeds return ready-made HTML. We fetch them and pull the
// structured data out of the markup so we can render it with our own Bulma
// styling instead of the default Sessionize widget.
//
// IMPORTANT: SESSIONIZE_ID is NOT the numeric event ID from the Sessionize
// dashboard URL (e.g. 22517). It is the short alphanumeric ID that Sessionize
// generates when you enable Embeds & API for the event
// (Sessionize > your event > Embeds & API). It looks like "9ddjd9rc".
export const SESSIONIZE_ID = "7djra8c2"
export const SESSIONIZE_BASE = `https://sessionize.com/api/v2/${SESSIONIZE_ID}/view`

export const EVENT_TIMEZONE = "Europe/Istanbul"
export const NO_DAY = "__tba__"
export const NO_ROOM = "__none__"

// Parse a Sessionize "Sessions" or "GridSmart" embed into session objects.
// The GridSmart view additionally includes service sessions (breaks, lunch,
// registration, etc.), flagged via the sz-session--service class.
export const parseSessions = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return Array.from(doc.querySelectorAll("[data-sessionid]")).map((el) => {
    const time = el.querySelector(".sz-session__time")
    // data-sztz packs the times as "format|locale|startISO|endISO"
    const tz = (time?.getAttribute("data-sztz") || "").split("|")
    return {
      id: el.dataset.sessionid,
      title: el.querySelector(".sz-session__title")?.textContent?.trim(),
      description: el.querySelector(".sz-session__description")?.textContent?.trim() || null,
      room: el.querySelector(".sz-session__room")?.textContent?.trim() || null,
      roomId: el.querySelector(".sz-session__room")?.getAttribute("data-roomid"),
      timeDisplay: time?.textContent?.trim(),
      startsAt: tz[2] || null,
      endsAt: tz[3] || null,
      isService: el.classList.contains("sz-session--service"),
      speakers: Array.from(
        el.querySelectorAll(".sz-session__speakers [data-speakerid]")
      ).map((s) => ({
        id: s.dataset.speakerid,
        name: s.querySelector("a")?.textContent?.trim(),
      })),
      // Category tags (level, session format, tracks). Empty unless the event
      // has categories configured in Sessionize; rendered automatically if so.
      tags: Array.from(el.querySelectorAll(".sz-tag")).map((t) => ({
        category: t.getAttribute("data-categoryname"),
        name: t.textContent?.trim(),
      })),
    }
  })
}

// Map of sessionId -> { description, tags } from the "Sessions" embed. Used to
// enrich the GridSmart timetable (which lacks descriptions/tags) on the
// Schedule page.
export const parseSessionDetails = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  const map = new Map()
  Array.from(doc.querySelectorAll("[data-sessionid]")).forEach((el) => {
    map.set(el.dataset.sessionid, {
      description: el.querySelector(".sz-session__description")?.textContent?.trim() || null,
      tags: Array.from(el.querySelectorAll(".sz-tag")).map((t) => ({
        category: t.getAttribute("data-categoryname"),
        name: t.textContent?.trim(),
      })),
    })
  })
  return map
}

// Map of speakerId -> { name, photo, tagline } from the "Speakers" embed, used
// to enrich cards with headshots and roles.
export const parseSpeakers = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  const map = {}
  Array.from(doc.querySelectorAll("[data-speakerid]")).forEach((el) => {
    map[el.dataset.speakerid] = {
      name: el.querySelector(".sz-speaker__name")?.textContent?.trim(),
      photo: el.querySelector(".sz-speaker__photo img")?.getAttribute("src"),
      tagline: el.querySelector(".sz-speaker__tagline")?.textContent?.trim(),
    }
  })
  return map
}

export const byStartTime = (a, b) => {
  if (!a.startsAt && !b.startsAt) return 0
  if (!a.startsAt) return 1
  if (!b.startsAt) return -1
  return new Date(a.startsAt) - new Date(b.startsAt)
}

// Day bucket key (YYYY-MM-DD) for a session, computed in the event's timezone
// so a talk always lands on the calendar day it is actually held.
export const dayKeyOf = (session) => {
  if (!session.startsAt) return NO_DAY
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: EVENT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(session.startsAt))
  const get = (type) => parts.find((p) => p.type === type)?.value
  return `${get("year")}-${get("month")}-${get("day")}`
}

// Human label for a day, e.g. "Friday, July 10".
export const dayLabel = (key) => {
  if (key === NO_DAY) return "To Be Announced"
  return new Date(`${key}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: EVENT_TIMEZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

// Clock time in the event timezone, e.g. "09:30 AM".
export const formatTime = (iso) => {
  if (!iso) return ""
  try {
    return new Date(iso).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: EVENT_TIMEZONE,
    })
  } catch {
    return ""
  }
}

// Sessionize taglines are often comma-joined ("Keymate,DevOps") — tidy them up.
export const formatTagline = (tagline) =>
  (tagline || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" · ")

export const initialsOf = (name) =>
  (name || "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] || "")
    .join("")
    .toUpperCase()
