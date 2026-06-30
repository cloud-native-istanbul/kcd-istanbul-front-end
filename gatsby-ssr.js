exports.onRenderBody = ({ setHtmlAttributes }) => {
  // Lock the site to Bulma's light theme. The whole design is built for light
  // mode (white cards, light info boxes), so without this Bulma 1.x would
  // auto-switch to dark on dark-OS visitors and break text contrast.
  setHtmlAttributes({ lang: 'en', 'data-theme': 'light' })
}
