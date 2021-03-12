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
-   [ ] what does redux-persist want for storage api? https://github.com/rt2zz/redux-persist/blob/master/src/storage/createWebStorage.js https://github.com/rt2zz/redux-persist/blob/d7efde9115a0bd2d6a0309ac6fb1c018bf06dc30/src/storage/getStorage.js
-   [ ] create persist function for github write
-   [ ] am I better off with firebase/store?

## Redux Toolkit

-   [ ] what is https://redux-toolkit.js.org/
-   [ ] how much does https://redux-toolkit.js.org/ replace for me

## Immer

-   [ ] where would Immer best best added
-   [ ] how to debug immer
-   [ ] `immer` vs `merge`

## Perf

-   [ ] Get rid of Lodash
-   [ ] `isObject`
-   [ ] `map`, `reduce`
