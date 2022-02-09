const { default: WorkOS } = require("@workos-inc/node");

exports.handler = async function (event) {
    console.log(event.body);
    const code = event.body;
    const api_key = process.env.WORKOS_API_KEY;
    const client_id = process.env.WORKOS_CLIENT_ID;
    const base_url = process.env.BASE_APP_URL;
    const workos = new WorkOS(api_key);

    const profile = await workos.sso.getProfileAndToken({
        code,
        clientID: client_id
      });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: profile,
            base_url: base_url
        })
    }
}