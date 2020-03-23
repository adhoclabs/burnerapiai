# api.ai Agent for Burner

### Prerequisites

* [Burner account + at least one Burner number](https://www.burnerapp.com)
* [Heroku account](https://www.heroku.com) (free)
* [Dialog Flow Agent](http://dialogflow.com) (free)

[earlier versions of this tutorial reference api.ai. Google acquired api.ai and renamed it dialogflow]

### Tutorial

1) On your Burner account, enable the Developer Connection from the [Developer Console](https://app.burnerapp.com/developer).

2) Generate an incoming webhook

3) [Setup a dialogflow agent](https://dialogflow.com/docs/integrations/actions/setup)

4) Make a note of your agent's token, obtainable from the [settings button](https://dialogflow.com/docs/reference/agent#authentication).

5) Deploy the api.ai+burner bot to your Heroku account by tapping the button below. This will install the bot as an app running on your heroku account.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

6) When prompted, enter the Copy and paste the incoming webhook url that was generated above into the `incomingwebhookurl` field, and your API agent's client access token into the `accesstoken` of the Heroku form.

7) Tap "Manage" after the app has finished deploying to heroku.

8) Find your heroku url under `Settings -> Domains` and paste it into the Outgoing webhook field on the Burner developer console with `/listen` appended to it. e.g. if your heroku url is `myapp.herokuapp.com` you would use `https://myapp.herokuapp.com/listen` as the outgoing webhook url. Make sure you add `http` as well. __you must append /listen to the url in order for the app to hear the texts it is being sent.

9) That's it, you're done! Send your newly configured Burner number a text and it should reply back. The first time you send a message it might take a few seconds to reply, so if it doesn't reply immediately be patient.
