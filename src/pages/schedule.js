import * as React from "react"
import Layout from "../components/layout"

const SchedulePage = () => {
  const scheduleItems = [
    { time: "8:00 AM - 9:00 AM", title: "Registration & Breakfast", description: "Check in, grab breakfast, and network with fellow attendees" },
    { time: "9:00 AM - 9:15 AM", title: "Opening Remarks", speaker: "KCD Istanbul Organizing Team", description: "Welcome to KCD Istanbul 2026!" },
    { time: "9:15 AM - 10:00 AM", title: "Keynote: The Future of Cloud Native", speaker: "TBA", description: "An inspiring keynote exploring the latest trends and innovations" },
    { time: "10:00 AM - 10:30 AM", title: "Coffee Break & Networking", description: "Connect with speakers and attendees over coffee" },
    { time: "10:30 AM - 12:00 PM", title: "Technical Talks", description: "Technical sessions covering Kubernetes, containers, and more" },
    { time: "12:00 PM - 1:00 PM", title: "Lunch & Networking", description: "Enjoy lunch and continue conversations with the community" },
    { time: "1:00 PM - 2:30 PM", title: "Technical Talks", description: "More technical sessions featuring case studies and best practices" },
    { time: "2:30 PM - 3:00 PM", title: "Afternoon Break", description: "Refreshments and networking" },
    { time: "3:00 PM - 4:30 PM", title: "Technical Talks", description: "More technical sessions covering cloud native technologies" },
    { time: "4:30 PM - 5:00 PM", title: "Closing Remarks", speaker: "KCD Istanbul Organizing Team", description: "Wrap up the day" },
    { time: "5:00 PM - 7:00 PM", title: "Networking", description: "Continue the conversation at our after-event social gathering" },
  ]

  return (
    <Layout>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Event Schedule</h1>
            <p className="subtitle is-3">May 15, 2026 | Istanbul, Turkey</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="notification is-info is-light">
            <p className="has-text-centered is-size-5">
              <strong>Schedule coming soon!</strong> The detailed agenda will be published once our Call for Proposals closes.
            </p>
          </div>

          <h2 className="title is-2 mt-6 mb-5">Sample Schedule</h2>
          <p className="subtitle mb-6">Below is a sample schedule to give you an idea of what to expect:</p>

          <div className="timeline">
            {scheduleItems.map((item, index) => (
              <div key={index} className="box mb-4">
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong className="has-text-primary is-size-5">{item.time}</strong>
                        <br />
                        <strong className="is-size-4">{item.title}</strong>
                        {item.speaker && (
                          <>
                            <br />
                            <em className="has-text-grey">{item.speaker}</em>
                          </>
                        )}
                        <br />
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SchedulePage

export const Head = () => <title>Schedule - KCD Istanbul 2026</title>
