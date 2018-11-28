# Using a Decisions From The Outside

## Decisions REST root

Decisions typically serves API calls from a `{base-url}/decisions/Primary/`, e.g.

```
https://example.com/decisions/Primary
```

All other API calls will need to have that URL configured at their root.

## Authentication

If you plan to use variety of Decisions end-points, and unless you're proxying requests and adding credentials to URLs on the server-side, it's recommended that you to log in to Decisions directly and preserve the session ID.

To login, POST credentials:

```javascript
URL: `${restRoot}/REST/AccountService/LoginUser`

Method: 'POST'

Body: {
  outputType: 'JSON',
  username: 'example@decisions.com',
  password: '********'
}
```

Given a successful login, the response body will contain the a session id:

```json
{
  "LoginUserResult": {
    "SessionValue": "<a GUID / UUID string>" // this is the session ID
    //...
  }
}
```

Same origin, Decisions will set some cookies including `DecisionsSessionID` and `DecisionsUsername`. `DecisionsSessionID` will be set, whether you have successful login or not (at least as of 5.0.3). Cross-domain, neither of these will be set. For an external UI or application it is currently advisable to manage session cookies yourself.

## Making API Calls

To make an API call, you need to get a URL for the Decisions Flow, Report, etc. that you
want to call.

You can generate these urls using the [Flow Integrations panel](https://documentation.decisions.com/running-a-flow-from-a-url/), but for friendlier URLs we
recommend [adding a flow alias](https://documentation.decisions.com/running-flow-using-alias/), first.

Or if you prefer, you can [expose a flow as a SOAP web-service](https://documentation.decisions.com/exposing-flow-as-a-web-service/)

For the sake of this exercise (an external UI), assume we are using the "Login" credential option. The integrations Panel might give you a POST url like this:

```http
http://localhost/decisions/Primary/?FlowAlias=TheVeryBestFlow&Action=api
```

In order to authenticate with the session we created above we need to add a `sessionId` query parameter for that session id, like so:

```http
http://localhost/decisions/Primary/?FlowAlias=TheVeryBestFlow&Action=api&sessionId=12345-3xampl3-id-6789
```

Provided that session ID is still valid on the decisions server instance, the flow will run and its output will be returned as the request response.
