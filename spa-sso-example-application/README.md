# React SPA Example App with SSO powered by WorkOS

An example application demonstrating how to use the  [WorkOS Node SDK](https://github.com/workos-inc/workos-node) to authenticate users via SSO. 


## Prerequisites
-Node.js version 10+

- A free Netlify account which can be obtained [here](https://netlify.com). 
- A free personal Github account which can be obtained [here](https://github.com). 

## Project Setup
This project uses serverless functions through Netlify, which requires Netlify to connect to the Github repository. For security reasons, the WorkOS Github organization does not allow for 3rd party applications to connnect. As part of the setup, you will be creating this project in your own Github account. The necessary steps are included in this README. 

1. Clone this repository using either HTTPS or SSH: 
    ```bash
    # HTTPS
    git clone https://github.com/workos-inc/spa-react-example-applications.git
    ```
    or

    ```bash
    # SSH
    git clone git@github.com:workos-inc/spa-react-example-applications.git
    ```

2. Remove the association to the WorkOS Github Organization by removing the origin. to begin, cd in to the project folder and then view the current git origin. 
    ```bash
        cd spa-sso-example-application
        git remote -v
    ```

    View the output to see the current origin for pushing and fetching. The next step is to remove these with the following command. 
    ```bash
        git remote rm origin
    ```
    Check to ensure this successfully removed the origin. The below command should now yeild no output. 
    ```bash
        git remote -v
    ```
3. Navigate to your Github.com account and create a new empty repository in your personal Github account. Name the project with a unique name of your choosing and copy the .git url that is provided after creating the repo. The format of the url will look like this: 
    ```bash
        https://github.com/your-github-account/spa-react-example-applications.git
    ```
4. Back in the Terminal in the project folder for the SSO app, "spa-sso-example-application", where you removed the git remote origin, you'll now add the new remote origin for the repository you just created. Replace the url origin with the one from your repo that you created in step 3:
    ```bash
        git remote add origin https://github.com/your-github-account/spa-react-example-applications.git
    ```
    Check to ensure that the remote origin was added successfully. 
    ```bash
        git remote -v
    ```
    You should now see the new origin returned. The next step is to push the code up to your new repository. Use the following command. 
    ```bash
        git push origin main
    ```
    Navigate to the Github repo in your personal Github account that you created for this project. You'll now see the code for the project in your personal Github repository. 

5. Next, create a Github personal access token that will be used in the next step to link the Netlify application to your Github repository.

Navigate to your Github account settings by clicking on the user icon in the upper right corner of any Github page after logging in. In the dropdown menu that appears, click on Settings. 

In the left sidebar menu scroll to the last entry and click on "Developer Settings". 

From here, click on "Personal Access Tokens", then "Generate a New Token". 

Select all of the scopes under the "repo" category, then create and save the token. You will only be able to view the token one time, so ensure that you save this token as it will be needed in the next steps. 


6. Install the Netlify CLI 
    In the terminal again, ensure you are in the project folder for the SSO app (spa-sso-example-application) and install the Netlify cli 
    
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
7. Log in to your Netlify account using the Netlify CLI. 
    ```bash
        netlify login
    ```
    This should launch a new window that offers several authentication options. Authorize the CLI. You should see "You are now logged in to your Netlify account" in the terminal. 

8. Check and ensure there is not a current Netlify project linked.
    ```bash
        netlify status
    ```
    If there is a current value under Netlify Site Info > Current Site, then you'll want to unlink the site before continuing. 
    ```bash
        netlify unlink
    ```
    Now you're ready to initialize the Netlify project. 

9. Initialize the Netlify project so you can run the serverless functions. 
    
    ```bash
        netlify init
    ```
    Use the default options for most settings except the following:

    - When prompted select "Create & configure a new site" then choose a name for your Netlify site. This can be anything you'd like. 

    - When prompted, select your team. If you created a new Netlify account as part of this project, there will only be one team to select. Select that team. 

    - When prompted with "Netlify CLI needs acceess to your GitHub account to configure Webhooks and Deploy Keys", select the "Authorize with a GitHub personal access token" option. Paste the access token that you created in step 5.

    - When prompted to enter the Base Directory, Choose the default option (the current directory/sso project directory)

    - When prompted for a build command, hit enter. No build command is necessary at this time. 

    - When prompted for a "Directory to deploy" enter "public", or hit enter if public is already the default. 

    - Select no if prompted to create a netlify.toml file, since it already exists in the project. 

    - When prompted to select the Netlify functions folder, enter "netlify/functions". 

    You should see output in the terminal that the deploy key has been added to the repository and that Netlify Notification Hooks have been added, followed by a success message "Success! Netlify CI/CD Configured!". 


10. Install the rest of the dependencies using npm.
    
    ```bash
        npm install
    ```

## Obtain and configure your WorkOS environment variables

11. Obtain your API Key and Client ID from your WorkOS dashboard. Create a .env file at the root of this project, on the same level as the src folder. Store these variables, along with the localhost url in the .env file. Use localhost:8888 as shown below. 
    ```bash
        WORKOS_API_KEY=the_api_key_value
        WORKOS_CLIENT_ID=the_client_id_value
        BASE_APP_URL=http://localhost:8888
    ```

## SSO Setup with WorkOS

12. This project is set up to log in using Google OAuth. Follow [the documentation here](https://workos.com/docs/integrations/g-suite-oauth) to complete the setup on the Configuration tab of the WorkOS dashboard. 

13. Add the Redirect URI to the allowlist in your WorkOS dashboard Configuration tab. For local development, the redirect URI will be:
    
    ```bash
        http://localhost:8888
    ```
In a deployed application the Redirect URI would be the base url for your site. 

## Start the server

14. Run the server using the following command. You may need to preface the command with sudo if you run into issues. 
    
    ```bash
        netlify dev
    ```
    A new browser window will automatically open to http://localhost:8888 with the app running. 

## Need help?

If you get stuck and aren't able to resolve the issue by reading our documentation, API reference, or tutorials, you can reach out to us at support@workos.com and we'll lend a hand.