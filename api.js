function start() {
    gapi.client.init({
      apiKey: 'YOUR_API_KEY',
      clientId: 'YOUR_CLIENT_ID',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar.readonly"
    }).then(() => {
      return gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 5,
        'orderBy': 'startTime'
      });
    }).then(response => {
      const events = response.result.items;
      const el = document.getElementById('calendar');
      el.innerHTML = "<strong>Today’s Events:</strong><br>" + events.map(e => `🗓 ${e.summary}`).join('<br>');
    });
  }

  gapi.load('client:auth2', start);