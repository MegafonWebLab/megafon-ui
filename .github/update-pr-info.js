#!/usr/bin/env node
const execSync = require('child_process').execSync;

/**
 * Gets envs.
 *
 * @returns {
 *     repo: string,
 *     user: string,
 *     baseBranch: string,
 *     githubPAT: string,
 * }
 */
const getEnvs = () => {
    const { GITHUB_REPOSITORY, BASE_BRANCH, GITHUB_AUTH_TOKEN } = process.env;

    console.log(`Provided envs:`, "\n\tGITHUB_REPOSITORY:", `'${GITHUB_REPOSITORY}'`, "\n\tBASE_BRANCH:", `'${BASE_BRANCH}'`, "\n\tGITHUB_AUTH_TOKEN:", `'${!!GITHUB_AUTH_TOKEN ? '***': ''}'`);

    if (!GITHUB_REPOSITORY || !BASE_BRANCH || !GITHUB_AUTH_TOKEN) {
        throw new Error('Not enough info to make checks.');
    }

    const [ user, repo ] = GITHUB_REPOSITORY.split('/');

    return {
        repo,
        user,
        baseBranch: BASE_BRANCH,
        githubPAT: GITHUB_AUTH_TOKEN,
    };
};

const fetchPullRequests = async (user, repo, baseBranch) => {
    const url = `https://api.github.com/repos/${user}/${repo}/pulls?state=open&base=${baseBranch}`;

    console.log(`Fetching open pull requests for base branch with url: '${url}'`);

    const res = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    });
    const json = await res.json();

    console.log('Fetched.');

    return json;
}

const extractVersions = () => {
    const res = execSync(`git diff HEAD --unified=0 --no-prefix --relative='packages' '*package.json'`).toString();
    const strs = res.split('\n');

    let versions = '';
    for (const s of strs) {
        if (s.includes('+++')) {
            const packageName = s.match(/\s(.*)$/)[1];
            if (versions.length > 0) {
                versions += '\n\n';
            }
            versions += `${packageName}`;
        }
        if (s.includes('version')) {
            versions += `\n${s.substring(3, s.length - 1)}`;
        }
    }

    return versions;
}

const extractChangelogs = () => {
    const res = execSync(`git diff HEAD --unified=0 --no-prefix -- '*CHANGELOG.md'`).toString();

    const strs = res.split('\n');

    let changelogs = '';
    for(const s of strs) {
        if (s.startsWith('+++')) {
            changelogs += `## :memo: ${s.substr(4)}\n`;

            continue;
        }

        if (s.startsWith('+')) {
            changelogs += s.substr(1) + '\n';
        }
    }

    return changelogs;
};

const getOriginalBody = (oldBody) => {
    let originalBody;
    if (oldBody?.includes('<!-- Autogenerated last_sha:')) {
        originalBody = oldBody.split('<!-- Autogenerated last_sha:')[0];
    } else {
        originalBody = oldBody || '';
    }

    return originalBody;
}

const composeConflictDescription = (oldBody, currentSha) => {
    const originalBody = getOriginalBody(oldBody);

    return `${originalBody}<!-- Autogenerated last_sha:${currentSha} -->\n\n\n---\n## Upcoming release changes\n> New commits in branch will trigger this description update.\n\n### Conflicts detected. Resolve conflicts to see release info.`;
}

const composeNewDescription = (oldBody, currentSha, versions, changelogs) => {
    const originalBody = getOriginalBody(oldBody);

    let result = `${originalBody}<!-- Autogenerated last_sha:${currentSha} -->\n\n\n---\n## Upcoming release changes\n> New commits in branch will trigger this description update.\n\n`;

    if (versions) {
        result += `### Version updates:\n\`\`\`\n${versions}\n\`\`\`\n`;
    } else {
        result += `### Version updates:\nNo version changes detected.\n`;
    }

    if (changelogs) {
        result += `### Change logs:\n${changelogs}`;
    } else {
        result += `### Change logs:\nNo updates detected.\n`;
    }

    return result;
}

const getPullRequestDescription = (baseBranch, prNumber, body, currentSha) => {
    execSync(`git reset --merge`);
    execSync(`git checkout -b pr/${prNumber}-merge origin/${baseBranch}`);
    execSync(`git fetch origin pull/${prNumber}/head:pr/${prNumber}`);

    try {
        execSync(`git merge pr/${prNumber} --no-verify --no-edit --allow-unrelated-histories --no-ff`);
    } catch (ex) {
        if (!ex?.output?.toString?.()?.includes('CONFLICT')) {
            throw ex;
        }

        return composeConflictDescription(body, currentSha);
    }

    execSync(`yarn exec lerna version -- --allow-branch=pr/"${prNumber}-merge" --conventional-commits --no-git-tag-version --no-push --yes`);

    const versions = extractVersions();
    const changelogs = extractChangelogs();

    execSync(`git reset --hard`);

    return composeNewDescription(body, currentSha, versions, changelogs);
};

const updatePullRequest = async (user, repo, baseBranch, prNumber, githubPAT, newDescription) => {
    const url = `https://api.github.com/repos/${user}/${repo}/pulls/${prNumber}`;

    console.log(`Updating pull request #${prNumber} description with url: '${url}'`);

    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            Accept: 'application/vnd.github.v3+json',
            'Authorization': 'Basic ' + Buffer.from(user + ':' + githubPAT).toString('base64'),
        },
        body: JSON.stringify({
            body: newDescription,
        })
    });

    const response = await res.json();

    if (res.status === 200) {
        console.log(`Successfully updated pull request #${prNumber} description.`);
    } else {
        console.log(`Error while updating pull request #${prNumber} description, response:`, response);
    }
};

const start = async () => {
    const envs = getEnvs();
    const prs = await fetchPullRequests(envs.user, envs.repo, envs.baseBranch);

    if (!prs || prs.length === 0) {
        console.log('No open pull requests, exiting...');

        return;
    } else {
        console.log(`${prs.length} open pull request(s) found.`);
    }

    execSync(`git config --global user.email "temp@temp.temp"`);
    execSync(`git config --global user.name "temp"`);

    let hasErrors = false;

    for(const pr of prs) {
        console.log(`Check pull request #${pr.number}`);

        try {
            const lastShaExtract = pr.body?.match(/<!-- Autogenerated last_sha:(.*) -->/);

            if (!lastShaExtract || lastShaExtract.length <= 1 || lastShaExtract[1] !== pr.head.sha) {
                console.log(`Updating pull request #${pr.number} description...`);

                const newDescription = getPullRequestDescription(envs.baseBranch, pr.number, pr.body, pr.head.sha);

                await updatePullRequest(envs.user, envs.repo, envs.baseBranch, pr.number, envs.githubPAT, newDescription);

                console.log(`Pull request #${pr.number} description updated.`);
            } else {
                console.log(`Pull request #${pr.number} doesn't need to be updated.`);
            }
        } catch (ex) {
            console.log(`Exception while processing #${pr.number} pull request, ex:`, ex);

            if (ex.output) {
                console.log('Process output: ');
                console.log(ex.output.toString());
            }

            hasErrors = true;
        }
    }

    console.log('Check done.');

    if (hasErrors) {
        process.exit(1);
    }
};


try {
    start();
} catch(ex) {
    console.log('Exception:', ex);
}
