const isEnabled = () =>
  (window.IntercomIncludeInDevelopment ||
    process.env.NODE_ENV === `production`) &&
  typeof Intercom === `function` &&
  window.IntercomAppId;

exports.onInitialClientRender = () => {
  if (!isEnabled()) {
    return;
  }

  window.intercomSettings = {
    app_id: window.IntercomAppId,
    From_URL: window.location.href
  };

  if (window.location.pathname !== "/contact/") {
    window.Intercom("boot", {
      app_id: window.IntercomAppId
    });
  }
};

exports.onRouteUpdate = function({ location }) {
  if (!isEnabled()) {
    return;
  }
  window.intercomSettings = {
    app_id: window.IntercomAppId,
    From_URL: location.href
  };
  if (location.pathname !== "/contact/") {
    window.Intercom("update", window.intercomSettings);
  }
};
