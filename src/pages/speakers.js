import * as React from "react"
import Layout from "../components/layout"

const SpeakersPage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Speakers</h1>
            <p className="subtitle is-3">Meet our amazing speakers</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="box has-background-info-light">
            <h2 className="title is-3 has-text-centered has-text-dark">Call for Proposals</h2>
            <p className="subtitle has-text-centered">We're looking for speakers!</p>
            <div className="content">
              <p className="has-text-centered">
                Whether you're a Kubernetes expert, a cloud native practitioner, or have an interesting story about
                your cloud native journey, we want to hear from you.
              </p>
              <p className="has-text-centered"><strong>Topics we're interested in include:</strong></p>
              <div className="columns">
                <div className="column is-6-desktop is-12-mobile is-offset-3-desktop">
                  <ul>
                    <li>Kubernetes and container orchestration</li>
                    <li>Cloud native architecture and patterns</li>
                    <li>Service mesh, observability, and monitoring</li>
                    <li>CI/CD and GitOps</li>
                    <li>Platform engineering and developer experience</li>
                    <li>Security and compliance</li>
                    <li>Case studies and real-world implementations</li>
                  </ul>
                </div>
              </div>
              <div className="has-text-centered mt-5">
                <a href="/cfp" className="button is-primary is-large">
                  <strong>Submit Your Proposal</strong>
                </a>
              </div>
            </div>
          </div>

          <h2 className="title is-2 mt-6 mb-5 has-text-centered">Featured Speakers</h2>
          <p className="has-text-centered mb-6">Speaker announcements coming soon! Check back after our Call for Proposals closes.</p>

          <div className="columns is-multiline">
            {[1, 2, 3].map((i) => (
              <div key={i} className="column is-4-desktop is-12-mobile">
                <div className="card">
                  <div className="card-content has-text-centered">
                    <div className="mb-4">
                      <div style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "#326ce5",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3rem",
                        color: "white"
                      }}>
                        ?
                      </div>
                    </div>
                    <p className="title is-4">Your Name Here</p>
                    <p className="subtitle is-6">Speaker</p>
                    <p>Submit your proposal to be one of our featured speakers!</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SpeakersPage

export const Head = () => <title>Speakers - KCD Istanbul 2026</title>
