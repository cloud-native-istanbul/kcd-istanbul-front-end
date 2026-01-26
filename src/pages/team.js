import * as React from "react"
import Layout from "../components/layout"

const TeamPage = () => {
  const teamMembers = [
    { name: "Akin Ozer", role: "Organizer", description: "DevOps Manager @ Hepapi" },
    { name: "Alp Kahvecioglu", role: "Organizer", description: "Platform Software Engineer @ Jumpcloud" },
    { name: "Batuhan Apaydin", role: "Organizer", description: "CNCF Ambassador / Platform Engineer @ Trendyol" },
    { name: "Ceyda Duzgec", role: "Organizer", description: "" },
    { name: "Emin Alemdar", role: "Organizer", description: "CNCF Ambassador / Solutions Architect @ Spacelift" },
    { name: "Halil Ibrahim Bugol", role: "Organizer", description: "CNCF Ambassador" },
    { name: "Mehmet Sinc", role: "Organizer", description: "" },
    { name: "Onur Canoglu", role: "Organizer", description: "" },
    { name: "Onur Kayakiran", role: "Organizer", description: "" },
    { name: "Veysel Faruk", role: "Organizer", description: "" },
    { name: "Zehra Sabaz", role: "Organizer", description: "Account Executive @ Kubermatic" },
  ]

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Organizing Team</h1>
            <p className="subtitle is-3">Meet the people behind KCD Istanbul</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="has-text-centered is-size-5 mb-6">
            KCD Istanbul 2026 is organized by a dedicated team of volunteers from the Turkish cloud native community.
            We're passionate about bringing together technologists, practitioners, and enthusiasts.
          </p>

          <h2 className="title is-2 mb-5 has-text-centered">Organizing Team</h2>

          <div className="columns is-multiline">
            {teamMembers.map((member, index) => (
              <div key={index} className="column is-4">
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
                        👤
                      </div>
                    </div>
                    <p className="title is-4">{member.name}</p>
                    <p className="subtitle is-6">{member.role}</p>
                    <p>{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="box has-background-info-light mt-6">
            <h2 className="title is-3 has-text-centered">Join Our Team</h2>
            <div className="content">
              <p className="has-text-centered">
                We're always looking for passionate volunteers to help make KCD Istanbul a success!
              </p>
              <p className="has-text-centered"><strong>Volunteer opportunities include:</strong></p>
              <div className="columns">
                <div className="column is-6 is-offset-3">
                  <ul>
                    <li>Registration desk and attendee support</li>
                    <li>Speaker liaison and room monitoring</li>
                    <li>Social media and content creation</li>
                    <li>Sponsor coordination</li>
                    <li>Photography and videography</li>
                    <li>Setup and teardown crew</li>
                  </ul>
                </div>
              </div>
              <div className="has-text-centered mt-5">
                <a href="mailto:istanbul-organizers@kubernetescommunitydays.org" className="button is-primary is-large">
                  <strong>Volunteer with Us</strong>
                </a>
              </div>
            </div>
          </div>

          <div className="box has-background-light mt-6">
            <p>
              <strong>Questions for the organizing team?</strong> Reach out to us at{" "}
              <a href="mailto:istanbul-organizers@kubernetescommunitydays.org">istanbul-organizers@kubernetescommunitydays.org</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default TeamPage

export const Head = () => <title>Team - KCD Istanbul 2026</title>
