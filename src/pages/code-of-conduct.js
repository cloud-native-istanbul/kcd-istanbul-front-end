import * as React from "react"
import Layout from "../components/layout"

const CodeOfConductPage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Code of Conduct</h1>
            <p className="subtitle is-3">Creating a welcoming environment for everyone</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="notification is-warning">
            <p className="is-size-5 has-text-weight-semibold">
              KCD Istanbul is dedicated to providing a harassment-free experience for everyone, and we do not
              tolerate harassment of participants in any form.
            </p>
          </div>

          <div className="content is-medium mt-6">
            <h2 className="title is-2">Our Commitment</h2>
            <p>
              KCD Istanbul is committed to providing a friendly, safe, and welcoming environment for all,
              regardless of gender, gender identity and expression, sexual orientation, disability, physical
              appearance, body size, race, age, religion, nationality, or other similar characteristics.
            </p>

            <h2 className="title is-2 mt-6">Expected Behavior</h2>
            <ul>
              <li>Be respectful and considerate in your speech and actions</li>
              <li>Participate in an authentic and active way</li>
              <li>Refrain from demeaning, discriminatory, or harassing behavior</li>
              <li>Be mindful of your surroundings and fellow participants</li>
              <li>Alert organizers if you notice a dangerous situation</li>
              <li>Use welcoming and inclusive language</li>
            </ul>

            <h2 className="title is-2 mt-6">Unacceptable Behavior</h2>
            <p>Unacceptable behaviors include, but are not limited to:</p>
            <ul>
              <li>Harassment, intimidation, or discrimination in any form</li>
              <li>Verbal comments that reinforce social structures of domination</li>
              <li>Sexual images in public spaces or inappropriate physical contact</li>
              <li>Deliberate intimidation, stalking, or following</li>
              <li>Sustained disruption of talks or other events</li>
              <li>Inappropriate or unwelcome attention</li>
            </ul>

            <h2 className="title is-2 mt-6">Reporting</h2>
            <p>
              If you are being harassed, notice that someone else is being harassed, or have any other
              concerns, please contact a member of the organizing team immediately.
            </p>

            <div className="box has-background-info-light mt-4">
              <p className="has-text-weight-semibold">
                Email: <a href="mailto:istanbul-organizers@kubernetescommunitydays.org">istanbul-organizers@kubernetescommunitydays.org</a>
              </p>
            </div>

            <h2 className="title is-2 mt-6">Additional Resources</h2>
            <p>
              This Code of Conduct is based on the CNCF Code of Conduct. For more information, see:{" "}
              <a href="https://www.cncf.io/conduct/" target="_blank" rel="noopener noreferrer">
                CNCF Code of Conduct
              </a>
            </p>
          </div>

          <div className="notification is-primary mt-6">
            <p className="has-text-centered has-text-weight-semibold">
              Thank you for helping make KCD Istanbul a welcoming, friendly event for everyone.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CodeOfConductPage

export const Head = () => <title>Code of Conduct - KCD Istanbul 2026</title>
