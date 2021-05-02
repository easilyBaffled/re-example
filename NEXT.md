## Example

-   [x] Add buttons to tie to actions
-   [x] add thunk-able `start` from https://gist.github.com/karlwestin/bf765090a2a5c9248606
-   [x] Add selectors for stopwatch data
-   [x] A better way to write `dispatch` actions
-   [x] Where can my `thunk` actions live?
-   [x] Share with Julian for a review

## Persist State

> This will give me confidence in my app that I will not _just_ lose my state one day because `localStorage` wiped.
> It will also give me the comfort knowing that there is a reliable history and well used place to edit state directly if necessary

-   [x] how to write a throttled and promise aware middleware that wont blow up my usage
-   [x] Create util to write to a github repo
-   [x] create function to configure github write
-   [x] create github middleware
-   [x] what does redux-persist want for storage api? https://github.com/rt2zz/redux-persist/blob/master/src/storage/createWebStorage.js https://github.com/rt2zz/redux-persist/blob/d7efde9115a0bd2d6a0309ac6fb1c018bf06dc30/src/storage/getStorage.js
-   [x] create persist function for github write
-   [x] am I better off with firebase/store?
-   [x] move firebase to `index.js`
-   [x] move redux-persist into module with firebase connection
-   [x] test firebase-persistance

## 1st Test

-   [ ] install redux module to https://codesandbox.io/s/task-tagging-and-sorting-47dss?file=/src/styles.scss
-   [ ] create firebase db
-   [ ] install firebase persist

## Redux Toolkit

-   [ ] what is https://redux-toolkit.js.org/
-   [ ] how much does https://redux-toolkit.js.org/ replace for me

## NPM Module Template

-   [x] how does https://github.com/chalk/chalk setup and deploy
-   [x] what does https://www.npmjs.com/package/generator-nm create? - nothhing for publishing
-   [x] should I use https://www.pika.dev/blog/introducing-pika-pack/
-   [x] use example from https://github.com/easilyBaffled/console.tap/blob/master/package.json
-   [x] add script to test and publish
-   [x] add eslint
-   [ ] which actions would I need https://github.com/actions/setup-node/tree/main/.github/workflows
-   [ ] how to encoprerate https://docs.skypack.dev/package-authors/package-checks
-   [ ] add script to create gh repo
-   [ ] would snowpack help or hurt
-   [ ] is https://kentcdodds.com/blog/stop-mocking-fetch?ck_subscriber_id=668659225 good for testing?
-   [ ] add https://netflix.github.io/pollyjs/#/quick-start for testing
-   [ ] greenkeeper replacement
-   [ ] security audit
-   [ ] testing dashboards
-   [ ] github action to publish npm on successful PR
-   [x] https://github.com/sindresorhus/np
-   [ ] ci connection

### Which Parts to split out

## Immer

-   [ ] where would Immer best best added
-   [ ] how to debug immer
-   [ ] `immer` vs `merge`

## Perf

-   [ ] Get rid of Lodash
-   [ ] `isObject`
-   [ ] `map`, `reduce`
