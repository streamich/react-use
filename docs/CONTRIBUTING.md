# Contributing

Thanks for being willing to contribute 🙌 If you contribute to this project, you agree to release your work under the license of this project.

**Working on your first Pull Request?** You can learn how from this [First Contributions](https://github.com/firstcontributions/first-contributions)  guide.

## Project setup

1. Fork and clone the repo
1. Run `yarn install` to install dependencies
1. Create a branch for your PR with `git checkout -b pr/your-branch-name`

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```sh
> git remote add upstream https://github.com/streamich/react-use.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Development

This library is a collection of React hooks so a proposal for a new hook will need to utilize the [React Hooks API](https://reactjs.org/docs/hooks-reference.html) internally to be taken into consideration.

### Creating a new hook

1. Create `src/useYourHookName.ts` and `stories/useYourHookName.story.tsx`, run `yarn start` to start the storybook development server and start coding your hook
1. Create `tests/useYourHookName.test.ts`, run `yarn test:watch` to start the test runner in watch mode and start writing tests for your hook
1. Create `docs/useYourHookName.md` and create documentation for your hook
1. Export your hook from `src/index.ts` and add your hook to `README.md`

You can also write your tests first if you prefer [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development).

### Updating an existing hook

1. Run `yarn start` to start the storybook development server and start applying changes
2. Update tests according to your changes using `yarn test:watch`
3. Update documentation according to your changes

## Committing and Pushing changes

### Commit messages

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release) and [conventional commit messages](https://conventionalcommits.org) so prefix your commits with `fix:` or `feat:` if you want your changes to appear in [release notes](https://github.com/streamich/react-use/blob/master/CHANGELOG.md).

### Git hooks

There are git hooks set up with this project that are automatically enabled
when you install dependencies. These hooks automatically test and validate your code when creating commits. They're really handy but can be temporarily disabled by adding a `--no-verify` flag to your commit command. This is useful when you want to commit and push to get feedback on uncompleted code.

## Help needed

Please have a look at the [open issues](https://github.com/streamich/react-use/issues) and respond to questions, bug reports and feature requests. Thanks!

We're also looking to improve the code coverage on this project. To easily know what hooks need tests run `yarn test:coverage` to generate a code coverage report. You can see the report in your terminal or open `coverage/lcov-report/index.html` to see the HTML report.
