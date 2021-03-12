import { Octokit } from "@octokit/core";

// https://github.com/settings/tokens/new?scopes=rep
const octokit = new Octokit({
    auth: `6449bb786eb29c2029f6213ead910dcb9dae7f17`
});

const getRepoData = ({ repo, path }) =>
    octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "easilyBaffled",
        repo,
        path
    });

const getFileContent = (octokitReq) => window.atob(octokitReq.data.content);

const createWriteFunc = ({ repo, path }, octokitReq) => (
    str,
    commitMessage = "trying programetic writes"
) =>
    octokit
        .request("PUT /repos/{owner}/{repo}/contents/{path}", {
            owner: "easilyBaffled",
            repo,
            path,
            message: commitMessage,
            content: window.btoa(str),
            sha: octokitReq.data.sha
        })
        // .then(console.log)
        .catch(console.error);

export async function get({ repo, path }) {
    const res = await getRepoData({ repo, path });
    const fileContent = getFileContent(res);
    const writeFunc = createWriteFunc({ repo, path }, res);
    return { fileContent, writeFunc };
}
