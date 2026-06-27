import * as React from "react"
import Layout from "../components/layout"

// Sessionize "Embeds & API" endpoint ID for this event.
//
// IMPORTANT: This is NOT the numeric event ID you see in the Sessionize
// dashboard URL (e.g. 22517). It is the short alphanumeric ID that Sessionize
// generates when you enable Embeds & API for the event
// (Sessionize > your event > Embeds & API > create an "All sessions" embed).
// It looks like "9ddjd9rc". Paste that value here once you have it.
const SESSIONIZE_ID = "7djra8c2"
const SESSIONIZE_BASE = `https://sessionize.com/api/v2/${SESSIONIZE_ID}/view`

const EVENT_TIMEZONE = "Europe/Istanbul"
const NO_DAY = "__tba__"
const NO_ROOM = "__none__"

// The Sessionize embeds return ready-made HTML. We fetch them and pull the
// structured data out of the markup so we can render it with our own Bulma
// styling instead of the default Sessionize widget.
const parseSessions = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return Array.from(doc.querySelectorAll("[data-sessionid]")).map((el) => {
    const time = el.querySelector(".sz-session__time")
    // data-sztz packs the times as "tz|tz|startISO|endISO"
    const tz = (time?.getAttribute("data-sztz") || "").split("|")
    return {
      id: el.dataset.sessionid,
      title: el.querySelector(".sz-session__title")?.textContent?.trim(),
      description: el.querySelector(".sz-session__description")?.textContent?.trim(),
      room: el.querySelector(".sz-session__room")?.textContent?.trim(),
      roomId: el.querySelector(".sz-session__room")?.getAttribute("data-roomid"),
      timeDisplay: time?.textContent?.trim(),
      startsAt: tz[2] || null,
      endsAt: tz[3] || null,
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

// Map of speakerId -> { name, photo, tagline } from the Speakers embed, used to
// enrich session cards with headshots and roles.
const parseSpeakers = (html) => {
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

const byStartTime = (a, b) => {
  if (!a.startsAt && !b.startsAt) return 0
  if (!a.startsAt) return 1
  if (!b.startsAt) return -1
  return new Date(a.startsAt) - new Date(b.startsAt)
}

// Day bucket key (YYYY-MM-DD) for a session, computed in the event's timezone
// so a talk always lands on the calendar day it is actually held.
const dayKeyOf = (session) => {
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

// Human label for a day tab, e.g. "Friday, July 10".
const dayLabel = (key) => {
  if (key === NO_DAY) return "To Be Announced"
  return new Date(`${key}T12:00:00Z`).toLocaleDateString("en-US", {
    timeZone: EVENT_TIMEZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

// Sessionize taglines are often comma-joined ("Keymate,DevOps") — tidy them up.
const formatTagline = (tagline) =>
  (tagline || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" · ")

const initialsOf = (name) =>
  (name || "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] || "")
    .join("")
    .toUpperCase()

const SpeakerRow = ({ speaker }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
    {speaker.photo ? (
      <img
        src={speaker.photo}
        alt={speaker.name}
        loading="lazy"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
    ) : (
      <span
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "#326ce5",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {initialsOf(speaker.name)}
      </span>
    )}
    <div>
      <p className="has-text-weight-semibold" style={{ lineHeight: 1.15 }}>
        {speaker.name}
      </p>
      {speaker.tagline && (
        <p className="is-size-7 has-text-grey">{formatTagline(speaker.tagline)}</p>
      )}
    </div>
  </div>
)

const SessionCard = ({ session, speakersById }) => {
  const level = session.tags.find((t) => t.category === "level")
  const format = session.tags.find((t) => t.category === "session_format")
  const otherTags = session.tags.filter(
    (t) => t.category !== "level" && t.category !== "session_format"
  )
  const speakers = session.speakers.map((s) => ({
    ...s,
    ...(speakersById[s.id] || {}),
  }))

  return (
    <div className="card mb-4">
      <div className="card-content">
        <h3 className="title is-5 mb-3">{session.title}</h3>

        <div
          className="mb-4"
          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          {session.timeDisplay && (
            <span className="tag is-primary is-light">🕑 {session.timeDisplay}</span>
          )}
          {session.room && (
            <span className="tag is-link is-light">📍 {session.room}</span>
          )}
          {level && <span className="tag is-info is-light">{level.name}</span>}
          {format && <span className="tag is-warning is-light">{format.name}</span>}
          {otherTags.map((t, i) => (
            <span key={i} className="tag is-light">
              {t.name}
            </span>
          ))}
        </div>

        {speakers.length > 0 && (
          <div
            className="mb-4"
            style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
          >
            {speakers.map((s) => (
              <SpeakerRow key={s.id} speaker={s} />
            ))}
          </div>
        )}

        {session.description && (
          <div className="content is-small mb-0">
            <p>{session.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const SessionsPage = () => {
  const [sessions, setSessions] = React.useState([])
  const [speakersById, setSpeakersById] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [activeDay, setActiveDay] = React.useState(null)

  React.useEffect(() => {
    Promise.all([
      // Sessions are required; speakers are best-effort enrichment.
      fetch(`${SESSIONIZE_BASE}/Sessions?under=True`).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      }),
      fetch(`${SESSIONIZE_BASE}/Speakers?under=True`)
        .then((res) => (res.ok ? res.text() : ""))
        .catch(() => ""),
    ])
      .then(([sessionsHtml, speakersHtml]) => {
        setSessions(parseSessions(sessionsHtml))
        setSpeakersById(speakersHtml ? parseSpeakers(speakersHtml) : {})
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Group sessions by calendar day (the two event days), then by room within
  // each day. Real days sort first (chronologically); TBA, if any, goes last.
  const days = Array.from(new Set(sessions.map(dayKeyOf))).sort((a, b) => {
    if (a === NO_DAY) return 1
    if (b === NO_DAY) return -1
    return a < b ? -1 : a > b ? 1 : 0
  })
  const roomsForDay = (day) =>
    Array.from(
      new Set(sessions.filter((s) => dayKeyOf(s) === day).map((s) => s.room || NO_ROOM))
    ).sort((a, b) => (a === NO_ROOM ? 1 : b === NO_ROOM ? -1 : a < b ? -1 : 1))
  const sessionsFor = (day, room) =>
    sessions
      .filter((s) => dayKeyOf(s) === day && (s.room || NO_ROOM) === room)
      .sort(byStartTime)

  React.useEffect(() => {
    if (days.length > 0 && activeDay === null) setActiveDay(days[0])
  }, [days.length])

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Sessions</h1>
            <p className="subtitle is-3">KCD Istanbul 2026 — July 10-11, 2026</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading && (
            <div className="has-text-centered py-6">
              <progress
                className="progress is-primary"
                max="100"
                style={{ maxWidth: "400px", margin: "0 auto" }}
              >
                Loading sessions...
              </progress>
              <p className="mt-3 has-text-grey">Loading sessions...</p>
            </div>
          )}

          {error && (
            <div className="notification is-danger is-light">
              <p>
                <strong>Unable to load sessions.</strong> Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length === 0 && (
            <div className="notification is-info is-light">
              <p className="has-text-centered">
                <strong>Sessions will be announced soon!</strong> Check back closer to the event.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length > 0 && (
            <>
              <div className="tabs is-medium is-boxed mb-5">
                <ul>
                  {days.map((day) => (
                    <li key={day} className={activeDay === day ? "is-active" : ""}>
                      <a onClick={() => setActiveDay(day)} style={{ cursor: "pointer" }}>
                        {dayLabel(day)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {days.map((day) => (
                <div key={day} style={{ display: activeDay === day ? "block" : "none" }}>
                  <h2 className="title is-3 mb-2">{dayLabel(day)}</h2>
                  <p className="subtitle is-6 has-text-grey mb-5">
                    {sessions.filter((s) => dayKeyOf(s) === day).length} sessions
                  </p>
                  {roomsForDay(day).map((room) => (
                    <div key={room} className="mb-6">
                      <h3 className="title is-4 mb-4">
                        {room === NO_ROOM ? "General / Service" : room}
                      </h3>
                      {sessionsFor(day, room).map((session) => (
                        <SessionCard
                          key={session.id}
                          session={session}
                          speakersById={speakersById}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default SessionsPage

export const Head = () => <title>Sessions - KCD Istanbul 2026</title>
