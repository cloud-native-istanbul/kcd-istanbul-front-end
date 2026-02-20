import * as React from "react"
import Layout from "../components/layout"
import hepapiLogo from "../images/sponsors/hepapilogo.png"
import cncfLogo from "../images/sponsors/cncf.png"
import cloudTurkeyLogo from "../images/sponsors/cloud-turkey.png"

const SponsorsPage = () => {
  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Sponsors</h1>
            <p className="subtitle is-3">Support KCD Istanbul 2026</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="box has-background-info-light">
            <h2 className="title is-3 has-text-centered has-text-dark">Become a Sponsor</h2>
            <div className="content">
              <p className="has-text-centered is-size-5">
                KCD Istanbul 2026 is made possible by the generous support of our sponsors. By sponsoring KCD Istanbul,
                you'll connect with the Turkish cloud native community and showcase your commitment to open source innovation.
              </p>
              <div className="has-text-centered mt-5">
                <div className="buttons is-centered is-flex-wrap-wrap">
                  <a
                    href="/KCD Istanbul Sponsor Prospectus 2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-primary is-large"
                  >
                    <strong>Download Sponsorship Prospectus (PDF)</strong>
                  </a>
                  <a href="mailto:istanbul-organizers@kubernetescommunitydays.org" className="button is-outlined is-primary is-large">
                    <strong>Contact Us</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <h2 className="title is-2 mt-6 mb-5">Why Sponsor?</h2>
          <div className="columns is-multiline">
            <div className="column is-6-desktop is-12-mobile">
              <div className="box">
                <h3 className="title is-4">Brand Visibility</h3>
                <p>Get your brand in front of hundreds of cloud native professionals</p>
              </div>
            </div>
            <div className="column is-6-desktop is-12-mobile">
              <div className="box">
                <h3 className="title is-4">Community Engagement</h3>
                <p>Connect directly with developers, architects, and decision-makers</p>
              </div>
            </div>
            <div className="column is-6-desktop is-12-mobile">
              <div className="box">
                <h3 className="title is-4">Talent Acquisition</h3>
                <p>Meet potential candidates in the cloud native space</p>
              </div>
            </div>
            <div className="column is-6-desktop is-12-mobile">
              <div className="box">
                <h3 className="title is-4">Thought Leadership</h3>
                <p>Position your company as a leader in cloud native technologies</p>
              </div>
            </div>
          </div>

          <h2 className="title is-2 mt-6 mb-5 has-text-centered">Sponsorship Tiers</h2>

          <div className="box mb-5" style={{ borderLeft: "6px solid #E5E4E2" }}>
            <div className="columns is-multiline">
              <div className="column is-8-desktop is-12-mobile">
                <h3 className="title is-3" style={{ color: "#C0C0C0" }}>🏆 Platinum Sponsors</h3>
                <p className="mb-3">
                  Platinum sponsors have the biggest impact on the conference. They represent companies for which Cloud Native approach is central in the way they implement their activity.
                </p>
                <p className="mb-3"><strong>6 spots total (1 spot filled)</strong></p>
                <div className="content">
                  <p className="has-text-weight-semibold">What's Included:</p>
                  <ul>
                    <li>Extra Large booth</li>
                    <li>6 tickets</li>
                    <li>Keynote mention</li>
                    <li>3-minute sponsored Keynote</li>
                    <li>Quote in KCD promotions and social channels</li>
                    <li>30% Discount code for guests (10 tickets)</li>
                    <li>Branding in all swag and marketing material</li>
                    <li>Logo on website and all video replays</li>
                  </ul>
                </div>
              </div>
              <div className="column is-4-desktop is-12-mobile">
                <a
                  href="https://hepapi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-logo-link"
                  aria-label="Hepapi sponsor website"
                >
                  <div
                    className="box has-background-light"
                    style={{
                      border: "2px solid #f4d2e5",
                      padding: "1.25rem",
                      minHeight: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      src={hepapiLogo}
                      alt="Hepapi logo"
                      style={{ width: "100%", maxHeight: "120px", objectFit: "contain", display: "block" }}
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="box mb-5" style={{ borderLeft: "6px solid #FFD700" }}>
            <div className="columns is-multiline">
              <div className="column is-8-desktop is-12-mobile">
                <h3 className="title is-3" style={{ color: "#FFD700" }}>🥈 Gold Sponsors</h3>
                <p className="mb-3">
                  Gold sponsors form the backbone of the conference backers. They represent companies that believe the strongest in the Cloud Native movement and have the financial means and the willingness to support it.
                </p>
                <p className="mb-3"><strong>10 available spots</strong></p>
                <div className="content">
                  <p className="has-text-weight-semibold">What's Included:</p>
                  <ul>
                    <li>Large booth</li>
                    <li>4 tickets</li>
                    <li>Quote in KCD promotions and social channels</li>
                    <li>30% Discount code for guests (10 tickets)</li>
                    <li>Branding in all swag and marketing material</li>
                    <li>Logo on website and video replays</li>
                  </ul>
                </div>
              </div>
              <div className="column is-4-desktop is-12-mobile">
                <div className="box has-text-centered has-background-light" style={{ border: "2px dashed #ccc", padding: "3rem" }}>
                  <p className="has-text-grey is-size-5">Your Logo Here</p>
                  <p className="has-text-grey is-size-7 mt-2">(10 spots available)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="box mb-5" style={{ borderLeft: "6px solid #B87333" }}>
            <div className="columns is-multiline">
              <div className="column is-8-desktop is-12-mobile">
                <h3 className="title is-3" style={{ color: "#B87333" }}>🥉 Silver Sponsors</h3>
                <p className="mb-3">
                  Silver sponsors are important contributors to the conference. They represent companies who believe in cloud native technologies and experience daily their benefits for their software and platforms (or those from their customers!).
                </p>
                <p className="mb-3"><strong>12 available spots</strong></p>
                <div className="content">
                  <p className="has-text-weight-semibold">What's Included:</p>
                  <ul>
                    <li>Medium Booth</li>
                    <li>2 tickets</li>
                    <li>30% Discount code for guests (4 tickets)</li>
                    <li>Branding in all swag and marketing material</li>
                    <li>Logo on website</li>
                  </ul>
                </div>
              </div>
              <div className="column is-4-desktop is-12-mobile">
                <div className="box has-text-centered has-background-light" style={{ border: "2px dashed #ccc", padding: "3rem" }}>
                  <p className="has-text-grey is-size-5">Your Logo Here</p>
                  <p className="has-text-grey is-size-7 mt-2">(12 spots available)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="box mb-5" style={{ borderLeft: "6px solid #E91E63" }}>
            <div className="columns is-multiline">
              <div className="column is-8-desktop is-12-mobile">
                <h3 className="title is-3" style={{ color: "#E91E63" }}>💜 Community Partners</h3>
                <p className="mb-3">
                  Community partners, such as cloud native project maintainers, tech community leaders in Open Source, DevOps, or Cloud Native technologies, and Open Source Evangelists, play a unique role as central contributors to our KCD event.
                </p>
                <div className="content">
                  <p className="has-text-weight-semibold">What's Included:</p>
                  <ul>
                    <li>1 Ticket</li>
                    <li>Presence in the community zone: a special place at the venue</li>
                    <li>Logo on website</li>
                  </ul>
                </div>
              </div>
              <div className="column is-4-desktop is-12-mobile">
                <div className="is-flex is-flex-direction-column" style={{ gap: "1rem" }}>
                  <a
                    href="https://www.cncf.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sponsor-logo-link"
                    aria-label="CNCF website"
                  >
                    <div
                      className="box has-background-light"
                      style={{
                        border: "2px solid #f4d2e5",
                        padding: "1.25rem",
                        minHeight: "160px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <img
                        src={cncfLogo}
                        alt="CNCF logo"
                        style={{ width: "100%", maxHeight: "120px", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  </a>
                  <a
                    href="https://aws.cloudturkey.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sponsor-logo-link"
                    aria-label="AWS Cloud Turkey website"
                  >
                    <div
                      className="box has-background-light"
                      style={{
                        border: "2px solid #f4d2e5",
                        padding: "1.25rem",
                        minHeight: "160px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <img
                        src={cloudTurkeyLogo}
                        alt="AWS Cloud Turkey logo"
                        style={{ width: "100%", maxHeight: "120px", objectFit: "contain", display: "block" }}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="box has-background-light mt-6">
            <h3 className="title is-4 has-text-dark">Interested in Sponsoring?</h3>
            <p className="has-text-weight-semibold">
              Contact us to discuss custom opportunities including lunch sponsorship, coffee breaks, swag bags, and more.
            </p>
            <p className="mt-3 has-text-weight-semibold">
              <strong className="has-text-dark">Email:</strong> <a href="mailto:istanbul-organizers@kubernetescommunitydays.org">istanbul-organizers@kubernetescommunitydays.org</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SponsorsPage

export const Head = () => <title>Sponsors - KCD Istanbul 2026</title>
