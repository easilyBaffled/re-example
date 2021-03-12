import throttle from "lodash/throttle";
import { get } from "./githubConnection";

let p = null;
const handleReq = (reqFn, time = 2000) =>
    throttle((...args) => {
        if (!p)
            p = reqFn(...args).then(() => {
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
