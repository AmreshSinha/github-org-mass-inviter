# Github Org Mass Inviter

## Usage

- `npm i`
- Create a `.env` with
    - ```
      GITHUB_TOKEN=YOUR-PERSONAL-ACESS-TOKEN
      TEAM_ID=ID-OF-TEAM
      ```
    - You can run the below command to find the required TEAM_ID
        - ```
          curl -H "Authorization: token <very-long-access-token>" https://api.github.com/orgs/<org-name>/teams
          ```
- Specify all the Github Usernames which has to be added inside `githubID.txt`
- Then run `node index.js`