import * as React from "react"
import { useEffect } from "react"

const TICKETS_URL =
  "https://community.cncf.io/events/details/cncf-kcd-istanbul-presents-kcd-istanbul-2026/"

const TicketsPage = () => {
  useEffect(() => {
    window.location.replace(TICKETS_URL)
  }, [])

  return (
    <main className="section">
      <div className="container has-text-centered">
        <p className="mb-3">Redirecting to tickets...</p>
        <a href={TICKETS_URL}>Open tickets page</a>
      </div>
    </main>
  )
}

export default TicketsPage

export const Head = () => (
  <>
    <title>Redirecting to Tickets - KCD Istanbul 2026</title>
    <meta httpEquiv="refresh" content={`0;url=${TICKETS_URL}`} />
    <link rel="canonical" href={TICKETS_URL} />
  </>
)
