import * as React from "react"
import Layout from "../components/layout"

const VenuePage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Venue</h1>
            <p className="subtitle is-3">Istanbul Bilgi University, Santralistanbul Campus</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="box has-background-primary-light">
            <h2 className="title is-3 has-text-centered has-text-dark">Istanbul Bilgi University, Santralistanbul Campus</h2>
            <p className="has-text-centered is-size-5 mb-4">
              <strong className="has-text-dark">Eski Silahtarağa Elektrik Santralı, Kazım Karabekir Cad. No: 2/13, 34060 Eyüpsultan, İstanbul</strong>
            </p>
            <p className="has-text-centered mb-5">
              Join us on <strong className="has-text-dark">July 10-11, 2026</strong> at Santralistanbul, a former Ottoman-era power
              plant on the shores of the Golden Horn (Haliç), now a vibrant arts and culture campus home to the Energy Museum,
              concert halls, and exhibition spaces.
            </p>
            <div className="buttons is-centered">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Istanbul+Bilgi+University+Santralistanbul+Campus"
                target="_blank"
                rel="noopener noreferrer"
                className="button is-primary"
              >
                <strong>View on Google Maps</strong>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Istanbul+Bilgi+University+Santralistanbul+Campus"
                target="_blank"
                rel="noopener noreferrer"
                className="button is-primary is-outlined"
              >
                <strong>Get Directions</strong>
              </a>
            </div>
          </div>

          <figure className="image is-16by9 mt-5">
            <iframe
              className="has-ratio"
              title="Map showing Istanbul Bilgi University Santralistanbul Campus"
              src="https://www.google.com/maps?q=Istanbul+Bilgi+University+Santralistanbul+Campus&output=embed"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </figure>

          <div className="content is-medium mt-6">
            <h2 className="title is-2">Getting to the Venue</h2>
            <p>
              Santralistanbul is well connected to the rest of the city by public transport. The closest stop is{" "}
              <strong>"Üniversite"</strong> on the T5 tram line, right next to campus.
            </p>

            <div className="columns is-multiline">
              <div className="column is-6-desktop is-12-mobile">
                <div className="box">
                  <h3 className="title is-4">By Tram</h3>
                  <p>
                    Take the <strong>T5 (Eminönü-Alibeyköy Cep Otogarı)</strong> line and get off at the{" "}
                    <strong>"Üniversite"</strong> stop, just steps from the campus entrance.
                  </p>
                </div>
              </div>

              <div className="column is-6-desktop is-12-mobile">
                <div className="box">
                  <h3 className="title is-4">By Metro</h3>
                  <p>
                    Take the <strong>M7 (Yıldız-Mahmutbey)</strong> line to <strong>Alibeyköy</strong>, then transfer to the{" "}
                    <strong>T5 tram</strong> and ride to the <strong>"Üniversite"</strong> stop.
                  </p>
                </div>
              </div>

              <div className="column is-6-desktop is-12-mobile">
                <div className="box">
                  <h3 className="title is-4">By Marmaray</h3>
                  <p>
                    Get off at <strong>Sirkeci</strong> station, walk to Eminönü, and board the{" "}
                    <strong>T5 tram</strong> toward the university.
                  </p>
                </div>
              </div>

              <div className="column is-6-desktop is-12-mobile">
                <div className="box">
                  <h3 className="title is-4">By Bus &amp; Metrobus</h3>
                  <p>
                    Several bus lines stop directly at <strong>"Bilgi Üniversitesi"</strong>. By Metrobus, exit at{" "}
                    <strong>Halıcıoğlu</strong>, about a 10-minute walk from the campus.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="title is-2 mt-6">Getting to Istanbul</h2>

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
