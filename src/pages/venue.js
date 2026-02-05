import * as React from "react"
import Layout from "../components/layout"

const VenuePage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Venue</h1>
            <p className="subtitle is-3">Getting to KCD Istanbul</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="box has-background-primary-light">
            <h2 className="title is-3 has-text-centered has-text-dark">Venue To Be Announced</h2>
            <p className="has-text-centered is-size-5 mb-4">
              <strong className="has-text-dark">Istanbul, Turkey</strong>
            </p>
            <p className="has-text-centered mb-5">
              Join us on <strong className="has-text-dark">May 15-16, 2026</strong> in Istanbul. Venue details will be announced soon!
            </p>
          </div>

          <div className="content is-medium mt-6">
            <h2 className="title is-2">Getting to Istanbul</h2>

            <div className="columns is-multiline">
              <div className="column is-6-desktop is-12-mobile">
                <div className="box">
                  <h3 className="title is-4">By Air</h3>
                  <p>
                    <strong>Istanbul Airport (IST)</strong> is the main international airport serving Istanbul,
                    with connections worldwide. The airport is connected to the city center via metro, bus, and taxi services.
                  </p>
                </div>
              </div>

              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">By Train</h3>
                  <p>
                    <strong>Istanbul</strong> is well connected by high-speed rail to Ankara and other major Turkish cities.
                    International train connections are also available from European destinations.
                  </p>
                </div>
              </div>

              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">Public Transit</h3>
                  <p>
                    Istanbul has an extensive public transportation network including metro, tram, bus, and ferry services.
                    The Istanbulkart is the city's transit card accepted on all public transport.
                  </p>
                </div>
              </div>

              <div className="column is-6">
                <div className="box">
                  <h3 className="title is-4">By Car</h3>
                  <p>
                    Istanbul is accessible by car from all directions. Traffic can be heavy in the city center,
                    so public transit is often recommended.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="title is-2 mt-6">Explore Istanbul</h2>
            <p>While you're in Istanbul for KCD, take some time to explore this historic city that bridges Europe and Asia!</p>
            <ul>
              <li><strong>Hagia Sophia:</strong> Historic architectural marvel and museum</li>
              <li><strong>Blue Mosque:</strong> Stunning Ottoman-era mosque with six minarets</li>
              <li><strong>Grand Bazaar:</strong> One of the world's largest and oldest covered markets</li>
              <li><strong>Topkapi Palace:</strong> Former residence of Ottoman sultans</li>
              <li><strong>Bosphorus Strait:</strong> Scenic waterway connecting two continents</li>
              <li><strong>Galata Tower:</strong> Medieval stone tower with panoramic city views</li>
            </ul>
          </div>

          <div className="box has-background-light mt-6">
            <p className="has-text-weight-semibold">
              <strong className="has-text-dark">Questions about the venue or getting to Istanbul?</strong> Contact us at{" "}
              <a href="mailto:istanbul-organizers@kubernetescommunitydays.org">istanbul-organizers@kubernetescommunitydays.org</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default VenuePage

export const Head = () => <title>Venue - KCD Istanbul 2026</title>
