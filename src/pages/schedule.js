import * as React from "react"
import Layout from "../components/layout"
import {
  SESSIONIZE_BASE,
  parseSessions,
  parseSessionDetails,
  byStartTime,
  dayKeyOf,
  dayLabel,
  formatTime,
} from "../utils/sessionize"

const BOOKMARK_KEY = "kcd-istanbul-2026-bookmarks"

// A small emoji cue for the common service sessions, purely cosmetic.
const serviceIcon = (title = "") => {
  const t = title.toLowerCase()
  if (t.includes("breakfast")) return "🥐"
  if (t.includes("registration")) return "📋"
  if (t.includes("lunch")) return "🍽️"
  if (t.includes("coffee") || t.includes("break")) return "☕"
  if (t.includes("opening")) return "🎉"
  if (t.includes("closing")) return "👋"
  if (t.includes("sponsor")) return "🤝"
  return "📌"
}

const ScheduleCard = ({ session, isMine, onToggle, half }) => (
  <div className={half ? "column is-half" : ""}>
    <div className={`card${session.isService ? " has-background-light" : ""}`}>
      <div className="card-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 className="title is-5 mb-2">
              {session.isService && <span>{serviceIcon(session.title)} </span>}
              {session.title}
            </h3>
            {session.room && !(session.isService && /lunch|breakfast|coffee|break|registration/i.test(session.title)) && (
              <p className="is-size-7 has-text-grey mb-1">
                <strong>Room:</strong> {session.room}
              </p>
            )}
            {session.speakers && session.speakers.length > 0 && (
              <p className="has-text-grey-dark mb-2">
                <em>{session.speakers.map((s) => s.name).join(", ")}</em>
              </p>
            )}
            {session.description && (
              <div className="content is-small mb-3">
                <p>{session.description}</p>
              </div>
            )}
            {session.tags && session.tags.length > 0 && (
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {session.tags.map((t, i) => (
                  <span
                    key={i}
                    className={`tag is-small ${
                      t.category === "level"
                        ? "is-info is-light"
                        : t.category === "session_format"
                        ? "is-primary is-light"
                        : "is-light"
                    }`}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          {!session.isService && (
            <button
              onClick={() => onToggle(session.id)}
              aria-label={isMine ? "Remove from my schedule" : "Add to my schedule"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                lineHeight: 1,
                padding: "0.25rem",
                minWidth: "44px",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: isMine ? "#f5a623" : "#cccccc",
              }}
            >
              {isMine ? "★" : "☆"}
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
)

const SchedulePage = () => {
  const [sessions, setSessions] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [bookmarks, setBookmarks] = React.useState(new Set())
  const [view, setView] = React.useState("all")

  // Load saved bookmarks once on mount.
  React.useEffect(() => {
    if (typeof window === "undefined") return
    try {
      setBookmarks(new Set(JSON.parse(localStorage.getItem(BOOKMARK_KEY) ?? "[]")))
    } catch {
      setBookmarks(new Set())
    }
  }, [])

  React.useEffect(() => {
    Promise.all([
      // GridSmart is the full timetable (talks + breaks/service sessions).
      fetch(`${SESSIONIZE_BASE}/GridSmart?under=True`).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      }),
      // Sessions adds descriptions and tags, which GridSmart omits.
      fetch(`${SESSIONIZE_BASE}/Sessions?under=True`)
        .then((res) => (res.ok ? res.text() : ""))
        .catch(() => ""),
    ])
      .then(([gridHtml, sessionsHtml]) => {
        const details = sessionsHtml ? parseSessionDetails(sessionsHtml) : new Map()
        const merged = parseSessions(gridHtml).map((s) => ({
          ...s,
          ...(details.get(s.id) || {}),
        }))
        setSessions(merged)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      if (typeof window !== "undefined") {
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(Array.from(next)))
      }
      return next
    })
  }

  // Scheduled sessions grouped into time slots keyed by exact start time.
  const scheduled = sessions.filter((s) => s.startsAt).sort(byStartTime)
  const unscheduled = sessions.filter((s) => !s.startsAt)
  const slotsByStart = scheduled.reduce((acc, s) => {
    ;(acc[s.startsAt] || (acc[s.startsAt] = [])).push(s)
    return acc
  }, {})
  const slotKeys = Object.keys(slotsByStart).sort()

  const visibleSlot = (key) =>
    view === "mine"
      ? slotsByStart[key].filter((s) => s.isService || bookmarks.has(s.id))
      : slotsByStart[key]

  const bookmarkCount = bookmarks.size

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Event Schedule</h1>
            <p className="subtitle is-3">July 10-11, 2026 | Istanbul, Turkey</p>
          </div>
        </div>
      </section>

      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "white",
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <div className="container">
          <div className="tabs is-fullwidth mb-0">
            <ul>
              <li className={view === "all" ? "is-active" : ""}>
                <a onClick={() => setView("all")} style={{ cursor: "pointer" }}>
                  Full Schedule
                </a>
              </li>
              <li className={view === "mine" ? "is-active" : ""}>
                <a onClick={() => setView("mine")} style={{ cursor: "pointer" }}>
                  My Schedule
                  {bookmarkCount > 0 && (
                    <span
                      className="tag is-warning is-rounded ml-2"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {bookmarkCount}
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading && (
            <div className="has-text-centered py-6">
              <progress
                className="progress is-primary"
                max="100"
                style={{ maxWidth: "400px", margin: "0 auto" }}
              >
                Loading schedule...
              </progress>
              <p className="mt-3 has-text-grey">Loading schedule...</p>
            </div>
          )}

          {error && (
            <div className="notification is-danger is-light">
              <p>
                <strong>Unable to load schedule.</strong> Please try again later.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length === 0 && (
            <div className="notification is-info is-light">
              <p className="has-text-centered is-size-5">
                <strong>Schedule coming soon!</strong> The full agenda will be published closer to the event date.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length > 0 && view === "mine" && bookmarkCount === 0 && (
            <div className="notification is-light has-text-centered py-6">
              <p className="is-size-5 mb-2">No sessions saved yet.</p>
              <p className="has-text-grey">
                Tap <strong>☆</strong> on any talk in the Full Schedule to add it here.
              </p>
            </div>
          )}

          {!loading && !error && sessions.length > 0 && (
            <>
              {(() => {
                let lastDay = null
                return slotKeys.map((key) => {
                  const slotSessions = visibleSlot(key)
                  if (!slotSessions.length) return null
                  const day = dayKeyOf({ startsAt: key })
                  const showDayHeader = day !== lastDay
                  lastDay = day
                  const start = formatTime(key)
                  const end = slotSessions[0]?.endsAt ? formatTime(slotSessions[0].endsAt) : ""
                  const asColumns = slotSessions.length > 1 && view === "all"
                  return (
                    <React.Fragment key={key}>
                      {showDayHeader && (
                        <h2 className="title is-3 mt-6 mb-4">{dayLabel(day)}</h2>
                      )}
                      <div className="mb-5">
                        <div
                          className="has-background-primary-light px-4 py-2 mb-3"
                          style={{ borderLeft: "4px solid #326ce5", borderRadius: "2px" }}
                        >
                          <strong className="is-size-5 has-text-primary">
                            {start}
                            {end ? ` – ${end}` : ""}
                          </strong>
                        </div>
                        <div className={asColumns ? "columns is-multiline" : ""}>
                          {slotSessions.map((s) => (
                            <ScheduleCard
                              key={s.id}
                              session={s}
                              isMine={bookmarks.has(s.id)}
                              onToggle={toggleBookmark}
                              half={asColumns}
                            />
                          ))}
                        </div>
                      </div>
                    </React.Fragment>
                  )
                })
              })()}

              {view === "all" && unscheduled.length > 0 && (
                <div className="mt-6">
                  <h2 className="title is-4 mb-4">Additional Sessions</h2>
                  <div className="columns is-multiline">
                    {unscheduled.map((s) => (
                      <ScheduleCard
                        key={s.id}
                        session={s}
                        isMine={bookmarks.has(s.id)}
                        onToggle={toggleBookmark}
                        half={unscheduled.length > 1}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default SchedulePage

export const Head = () => <title>Schedule - KCD Istanbul 2026</title>
