const isEnabled = () => ((window.IntercomIncludeInDevelopment || window.FromURL || process.env.NODE_ENV === `production`) && typeof Intercom === `function` && window.IntercomAppId)

exports.onInitialClientRender = () => {
  if (!isEnabled()) {
    return
  }

  window.Intercom('boot', {
    app_id: window.IntercomAppId
  })
}

exports.onRouteUpdate = function ({ location }) {
  if (!isEnabled()) {
    return
  }

  window.Intercom('update')
}
