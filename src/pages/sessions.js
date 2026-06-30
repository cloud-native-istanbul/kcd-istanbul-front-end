import * as React from "react"
import Layout from "../components/layout"
import {
  SESSIONIZE_BASE,
  NO_DAY,
  NO_ROOM,
  parseSessions,
  parseSpeakers,
  byStartTime,
  dayKeyOf,
  dayLabel,
  formatTagline,
  initialsOf,
} from "../utils/sessionize"

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
