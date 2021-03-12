import throttle from "lodash/throttle";
import { get } from "./githubConnection";
import { waited } from "./patientMiddleware";

export const patientGitHubConnection = ({ repo, path }) => {
    return waited((state) =>
        // I have to run `get` every time to get a new `sha` from github, I think
        get({ repo, path }).then(({ writeFunc }) => {
            writeFunc(JSON.stringify(state, null, 4));
        })
    );
};

let p = null;
const handleReq = (reqFn, time = 2000) =>
    throttle((state) => {
        if (!p)
            p = reqFn(state).then(() => {
                p = null;
            });
    }, time);

export function configureGithubStorage({ repo, path }) {
    const githubStroage = {
        getItem: () =>
            get({ repo, path }).then(({ fileContent }) => fileContent),
        setItem: handleReq((key, content) =>
            get({ repo, path }).then(({ writeFunc }) => {
                try {
                    content = JSON.stringify(JSON.parse(content), null, 4);
                } catch (e) {
                    console.error(e);
                }
                return writeFunc(content);
            })
        ),
        deleteItem: handleReq(() =>
            get({ repo, path }).then(({ writeFunc }) => writeFunc(""))
        )
    };
    return githubStroage;
}
