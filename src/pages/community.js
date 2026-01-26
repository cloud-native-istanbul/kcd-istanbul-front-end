import * as React from "react"
import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"

const CommunityPage = () => {

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Our Community</h1>
            <p className="subtitle is-3">The heart of cloud native in Istanbul</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content has-text-centered mb-6">
            <h2 className="title is-2">CNCF Istanbul Meetups</h2>
            <p className="is-size-5">
              Our vibrant community comes together regularly to share knowledge, learn, and connect.
              These photos capture the spirit of collaboration and innovation that defines our meetups.
            </p>
          </div>

          <div className="photo-gallery">
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_0762.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_0816.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_1188.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_2691.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_2717.PNG"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_5050.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_6734.JPG"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_8504.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_9719.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
            <div className="photo-gallery-item">
              <StaticImage
                src="../images/community/IMG_9854.jpg"
                alt="CNCF Istanbul Meetup"
                placeholder="blurred"
              />
            </div>
          </div>

          <div className="box has-background-primary-light mt-6">
            <h3 className="title is-3 has-text-centered has-text-dark">Join Our Community</h3>
            <div className="content has-text-centered">
              <p className="is-size-5">
                Want to be part of the Istanbul cloud native community? Join our #kcd-istanbul-public channel in CNCF Slack workspace
                to connect, learn, and collaborate with fellow cloud native enthusiasts.
              </p>
              <div className="buttons is-centered mt-5">
                <a
                  href="https://communityinviter.com/apps/cloud-native/cncf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button is-primary is-large"
                >
                  <strong>Join CNCF Slack</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default CommunityPage

export const Head = () => <title>Our Community - KCD Istanbul 2026</title>
