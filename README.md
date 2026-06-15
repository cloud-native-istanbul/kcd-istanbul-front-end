# KCD Istanbul 2026 Website

Official website for Kubernetes Community Days Istanbul 2026 - July 10-11, 2026 at Istanbul Bilgi University, Santralistanbul Campus.

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run develop

# Build for production
npm run build

# Serve production build locally![img.png](img.png)
npm run serve
```

Visit http://localhost:8000 to view the site.

---

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Customization Guide](#customization-guide)
- [API Integrations](#api-integrations)
- [Adding Images](#adding-images)
- [Updating Content](#updating-content)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 📁 Project Structure

```
kcd-istanbul-2026/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── layout.js       # Main layout with navbar & footer
│   │   └── layout.css      # Global styles and Bulma customizations
│   ├── images/             # Image assets
│   │   └── icon.png        # Site favicon (update this!)
│   └── pages/              # Page components (auto-routing)
│       ├── index.js        # Homepage
│       ├── about.js        # About KCD Istanbul
│       ├── schedule.js     # Event schedule
│       ├── speakers.js     # Speakers & CFP
│       ├── sponsors.js     # Sponsorship information
│       ├── venue.js        # Venue details
│       ├── team.js         # Organizing team
│       ├── code-of-conduct.js  # Code of Conduct
│       └── 404.js          # 404 error page
├── gatsby-config.js        # Gatsby configuration
├── netlify.toml           # Netlify build configuration
└── package.json           # Dependencies
```

---

## 🎨 Customization Guide

### 1. **Update Event Details**

#### Date & Location
Edit these files to update event information:

**Homepage** (`src/pages/index.js`):
```javascript
// Line ~22
<strong>Date:</strong> July 10-11, 2026 | <strong>Location:</strong> Istanbul Bilgi University, Santralistanbul Campus
```

**All Page Headers**: Update the hero sections in each page file.

#### Site Metadata
**File:** `gatsby-config.js`
```javascript
siteMetadata: {
  title: `KCD Istanbul 2026`,
  siteUrl: `https://kcd.ist` // Update with your domain
}
```

---

### 2. **Update Contact Emails**

Replace placeholder emails throughout the site:

**Files to update:**
- `src/components/layout.js` (footer)
- `src/pages/sponsors.js`
- `src/pages/team.js`
- `src/pages/code-of-conduct.js`

**Current placeholders:**
- `istanbul-organizers@kubernetescommunitydays.org`
- `sponsors@kcd.ist`
- `conduct@kcd.ist`
- `volunteer@kcd.ist`
- `team@kcd.ist`

**Update to:**
- Real team emails or
- Email forwarding service
- Domain-specific emails

---

### 3. **Update Venue Information**

**File:** `src/pages/venue.js`

Current venue: **Istanbul Bilgi University, Santralistanbul Campus**
(Eski Silahtarağa Elektrik Santralı, Kazım Karabekir Cad. No: 2/13, 34060 Eyüpsultan, İstanbul)

The venue page includes the address, an embedded Google Map, and transit directions
(T5 tram "Üniversite" stop, M7 metro, Marmaray, bus). Update there if any details change.

---

## 🖼️ Adding Images

### Where to Add Images

```
src/images/
├── icon.png              # Favicon (512x512px recommended)
├── logo.png              # KCD Istanbul logo
├── hero-background.jpg   # Homepage hero image
├── venue/                # Venue photos
├── speakers/             # Speaker headshots
└── sponsors/             # Sponsor logos
```

### Using Images in Pages

**Option 1: Static Images**
```javascript
import logoImage from '../images/logo.png'

<img src={logoImage} alt="KCD Istanbul Logo" />
```

**Option 2: Gatsby Image (Optimized)**
```javascript
import { StaticImage } from "gatsby-plugin-image"

<StaticImage
  src="../images/hero.jpg"
  alt="KCD Istanbul"
  placeholder="blurred"
  layout="fullWidth"
/>
```

### Image Optimization Tips

- **Use WebP or AVIF** for better compression
- **Compress images** before uploading (use TinyPNG, Squoosh)
- **Recommended sizes:**
  - Hero images: 1920x1080px
  - Speaker photos: 400x400px
  - Sponsor logos: 300x150px (transparent PNG)
  - Favicon: 512x512px

---

## 🔌 API Integrations

### Sessionize (Speaker Management & CFP)

**What is Sessionize?**
- Speaker submission platform
- Manages Call for Proposals (CFP)
- Speaker database with photos & bios
- Schedule builder

**Integration Steps:**

1. **Create Sessionize Account**: https://sessionize.com
2. **Set up your event**
3. **Get API Endpoint**:
   ```
   https://sessionize.com/api/v2/{event_id}/view/speakers
   ```

4. **Update `src/pages/speakers.js`**:

```javascript
import { useState, useEffect } from 'react'

const SpeakersPage = () => {
  const [speakers, setSpeakers] = useState([])

  useEffect(() => {
    fetch('https://sessionize.com/api/v2/YOUR_EVENT_ID/view/speakers')
      .then(res => res.json())
      .then(data => setSpeakers(data))
  }, [])

  return (
    <Layout>
      {/* Map through speakers */}
      {speakers.map(speaker => (
        <div key={speaker.id}>
          <img src={speaker.profilePicture} alt={speaker.fullName} />
          <h3>{speaker.fullName}</h3>
          <p>{speaker.bio}</p>
        </div>
      ))}
    </Layout>
  )
}
```

**Sessionize Features to Use:**
- Embed CFP form: `<iframe src="https://sessionize.com/YOUR_EVENT/apply"></iframe>`
- Speaker grid with filters
- Schedule builder
- Session details

---

### Ti.to / Eventbrite (Registration/Ticketing)

**Option 1: Ti.to (Recommended for tech events)**

**File:** `src/pages/index.js`

```javascript
// Add Ti.to widget
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://js.tito.io/v1'
  script.async = true
  document.body.appendChild(script)
}, [])

// Replace registration button
<tito-button event="kcd-istanbul/2026">Register Now</tito-button>
```

**Option 2: Eventbrite**

```javascript
// Embed Eventbrite widget
<div id="eventbrite-widget-container"></div>

<script src="https://www.eventbrite.com/static/widgets/eb_widgets.js"></script>
<script>
  window.EBWidgets.createWidget({
    widgetType: 'checkout',
    eventId: 'YOUR_EVENT_ID',
    iframeContainerId: 'eventbrite-widget-container'
  })
</script>
```

---

### Mailchimp / Buttondown (Email Collection)

**Add Newsletter Signup Form:**

**File:** `src/components/newsletter-signup.js`

```javascript
const NewsletterSignup = () => {
  return (
    <div className="box">
      <h3>Stay Updated</h3>
      <form action="https://YOUR_MAILCHIMP_URL" method="post">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="email"
              name="EMAIL"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="control">
            <button type="submit" className="button is-primary">
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
```

---

## 📝 Updating Content

### Sponsors Page

**File:** `src/pages/sponsors.js`

The sponsorship tiers are based on the official prospectus:

**Tier Pricing:**
- Platinum: $10,000 (6 available)
- Gold: $7,000 (10 available)
- Silver: $4,000 (12 available)
- Community Partner: In-kind

**To add sponsor logos:**

1. Add logo to `src/images/sponsors/`
2. Update `src/pages/sponsors.js`:

```javascript
// Import logos
import platinumSponsor1 from '../images/sponsors/company-logo.png'

// Replace placeholder boxes
<div className="column is-4">
  <div className="box has-text-centered">
    <img src={platinumSponsor1} alt="Sponsor Name" />
  </div>
</div>
```

---

### Speakers Page

**File:** `src/pages/speakers.js`

**Manual Speaker Addition (before Sessionize integration):**

```javascript
const speakers = [
  {
    name: "Jane Doe",
    role: "Principal Engineer",
    company: "Tech Corp",
    image: "/images/speakers/jane-doe.jpg",
    bio: "Jane is a...",
    twitter: "@janedoe"
  },
  // Add more speakers
]

// Map through speakers array
{speakers.map((speaker, i) => (
  <div key={i} className="column is-4">
    <div className="card">
      <div className="card-image">
        <figure className="image is-square">
          <img src={speaker.image} alt={speaker.name} />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">{speaker.name}</p>
        <p className="subtitle is-6">{speaker.role} @ {speaker.company}</p>
        <p>{speaker.bio}</p>
      </div>
    </div>
  </div>
))}
```

---

### Schedule Page

**File:** `src/pages/schedule.js`

Update the `scheduleItems` array with real event schedule:

```javascript
const scheduleItems = [
  {
    time: "9:00 AM - 9:30 AM",
    title: "Registration & Coffee",
    description: "Check in and network"
  },
  {
    time: "9:30 AM - 10:15 AM",
    title: "Opening Keynote",
    speaker: "Speaker Name",
    description: "Welcome to KCD Istanbul 2026"
  },
  // Add more schedule items
]
```

---

## 🎨 Styling & Branding

### Color Customization

**File:** `src/components/layout.css`

```css
:root {
  --color-primary: #326ce5;    /* Kubernetes Blue */
  --color-secondary: #00d1b2;  /* Teal */
  --color-dark: #363636;
  --color-light: #f5f5f5;
}
```

### Typography

Current fonts: **IBM Plex Sans**, **Nunito Sans**

To change fonts, update `src/components/layout.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

html {
  font-family: 'Your Font', sans-serif;
}
```

---

## 🚀 Deployment

### Netlify (Current Setup)

**Automatic deployments configured!**

Every push to `main` branch triggers a new deployment.

**Build Settings (already configured in `netlify.toml`):**
- Build command: `npm install --legacy-peer-deps && npm run build`
- Publish directory: `public`

### Manual Deployment

```bash
# Build the site
npm run build

# Deploy to Netlify (if using Netlify CLI)
netlify deploy --prod
```

### Custom Domain Setup

1. Purchase domain (e.g., `kcd.ist`)
2. In Netlify Dashboard:
   - Site Settings → Domain management
   - Add custom domain
3. Update DNS records at your registrar:
   - A Record: `@` → `75.2.60.5`
   - CNAME: `www` → `your-site.netlify.app`
4. SSL automatically provisions in ~10 minutes

---

## 🤝 Contributing

### Development Workflow

1. **Clone the repository**
   ```bash
   git clone https://github.com/distributethe6ix/kcd-istanbul-front-end.git
   cd kcd-istanbul-front-end/kcd-istanbul-2026
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Update content, add images, integrate APIs
   - Test locally with `npm run develop`

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

5. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to GitHub repository
   - Create PR from your branch to `main`
   - Request review from team

### Code Style

- Use **Bulma CSS classes** for styling
- Keep components simple and reusable
- Add comments for complex logic
- Use meaningful variable names

---

## 📞 Support & Contact
**Social Media:**
- Twitter: https://x.com/@KCDIstanbul
- LinkedIn: https://www.linkedin.com/company/kcdistanbul

**Official Event Page:**
- istanbul-organizers@kubernetescommunitydays.org

---

## 📄 License

This project is part of the Kubernetes Community Days program, supported by the CNCF.

---

## 🙏 Acknowledgments

- Built with [Gatsby](https://www.gatsbyjs.com/)
- Styled with [Bulma CSS](https://bulma.io/)
- Hosted on [Netlify](https://www.netlify.com/)
- Supported by [Cloud Native Computing Foundation](https://www.cncf.io/)

---

**Ready to make KCD Istanbul 2026 amazing!** 🚀🎉
