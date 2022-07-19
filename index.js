import fs from 'fs';
import fetch from 'node-fetch';
import 'dotenv/config';
import { parse } from 'path';

const content = fs.readFileSync('githubID.txt', 'utf8')
const users = content.split(/\r?\n/);

async function verifyGithubId(githubID) {
    const response = await fetch(`https://api.github.com/users/${githubID}`, {
        headers: {'Authorization': `token ${process.env.GITHUB_TOKEN}`}
    });
    if (response.status === 200) {
        const json = await response.json();
        return json.id;
    } else {
        return false;
    }
}

const TEAM_ID = parseInt(process.env.TEAM_ID);

async function sendOrgInvite(githubUser, githubID) {
    var status;
    const response = await fetch('https://api.github.com/orgs/Coding-Club-IITG/invitations', {
            method: 'POST',
            headers: { 'Accept': 'application/vnd.github.v3+json', 'Authorization': `token ${process.env.GITHUB_TOKEN}`},
            body: JSON.stringify({
                'invitee_id': githubID,
                'team_ids': [TEAM_ID]
            })
    })
    .then(res => {status = res.status;return res.json()}).then(json => {
        if (status === 201) {
            console.log('\x1b[32m%s\x1b[0m', `${githubUser} invited to the Team ID ${TEAM_ID} successfully`);
        } else if (status === 422) {
            console.log('\x1b[31m%s\x1b[0m', json.errors[0].message);
        } else if (status === 404) {
            console.log('\x1b[31m%s\x1b[0m', `Resource not found`);
        }
    }).catch(err => console.log(err));
}

for (let i = 0; i < users.length; i++) {
    const githubID = users[i];
    const verified = await verifyGithubId(githubID);
    
    // console.log(verified);
	process.stdout.write(`${i+1}. User: ${users[i]}, Status: `)

    if (verified) {
        await sendOrgInvite(users[i], verified);
    } else {
        console.log('\x1b[31m%s\x1b[0m', `${users[i]} not found`);
    }
    
}