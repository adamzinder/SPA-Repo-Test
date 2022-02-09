# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## React SPA Example App with SSO powered by WorkOS

An example application demonstrating how to use the  [WorkOS Node SDK](https://github.com/workos-inc/workos-node) to authenticate users via SSO. 


# Prerequisites
Node.js version 10+
A free Netlify account which can be obtained [here](https://netlify.com). 

# Project Setup

1. Install the Netlify CLI 
    ```bash
        npm install netlify-cli --global
    ```
    If you run into permissions errors, run with sudo. 
    ```bash
       sudo npm install netlify-cli --global
    ```
    Verify that the package installed by running the following. You may need to use sudo with netlfiy commands. 
    ```bash
        netlify --version
    ```
2. Log in to your Netlify account using the Netlify CLI. 
    ```bash
        netlify login
    ```
    This should launch a new window that offers several authentication options. Authorize the CLI. You should see "You are now logged in to your Netlify account" in the terminal. 

3. Initialize the project so you can run the serverless functions. 
    ```bash
        netlify init
    ```
    Use the default options for most settings except the following:

    -Select the account/team and create a new site. 
    -Ensure that the "Directory to deploy" is set to "public". 
    -Select no when prompted if you'd like to create a netlify.toml file, since it already exists in the project. 

4. Install the rest of the dependencies using npm. 
    ```bash
        npm install
    ```

# Configure your environment

5. Obtain your API Key and Client ID from your WorkOS dashboard. Create a .env file at the root of this project, on the same level as the src folder. Store these variables, along with the localhost url in the .env file. 
    ```bash
        WORKOS_API_KEY=the_api_key_value
        WORKOS_CLIENT_ID=the_client_id_value
        BASE_APP_URL=http://localhost:8888
    ```

# SSO Setup with WorkOS

6. This project is set up to log in using Google OAuth. Follow [the documentation here](https://workos.com/docs/integrations/g-suite-oauth) to complete the setup on the Configuration tab of the WorkOS dashboard. 

7. Add the Redirect URI to the allowlist in your WorkOS dashboard Configuration tab. For local development, the redirect URI will be:
    ```bash
        http://localhost:8888
    ```
In a deployed application the Redirect URI would be the base url for your site. 

# Start the server

8. Run the server using the following command. You may need to preface the command with sudo if you run into issues. 
    ```bash
        netlify dev
    ```

## Need help?

If you get stuck and aren't able to resolve the issue by reading our documentation, API reference, or tutorials, you can reach out to us at support@workos.com and we'll lend a hand.