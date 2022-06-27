Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

When it comes to open source, there are different ways you can contribute, all of which are valuable. Here's a few guidelines that should help you as you prepare your contribution.

## Setup the project

1. Fork the repo (click the Fork button at the top right of [this page](https://github.com/Navigraph/sdk))
2. Clone your fork locally

```sh
git clone https://github.com/<your_github_username>/sdk.git
cd sdk
```

3. Setup all the dependencies and packages by running `yarn`.

## Development

In order to improve the developer experience, we have opted to use a monorepo powered by [Turborepo](https://github.com/vercel/turborepo).

### Tooling

- [Changeset](https://github.com/atlassian/changesets) for changes
  documentation, changelog generation, and release management.

### Commands

| Command              | Description                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **`yarn`**           | Bootstraps the entire project, symlinks all dependencies for cross-component development and builds all components. |
| **`yarn build`**     | Builds all packages.                                                                                                |
| **`yarn changeset`** | Opens an interactive prompt to handle changelog / versioning.                                                       |

## Found a bug?

Please create an issue and provide thoughtful and constructive feedback. If applicable/reasonable, please also include a reproducible environment.

## Making a Pull Request?

In order for you PR to be merged, it needs to be approved by maintainers at Navigraph. To increase the likelyhood of this happening, please stick to the below guidelines.

### Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

| Category         | Description                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `feat / feature` | All changes that introduce completely new code or new features                                               |
| `fix`            | Changes that fix a bug (ideally you will additionally reference an issue if present)                         |
| `refactor`       | Any code related change that is not a fix nor a feature                                                      |
| `docs`           | Changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)          |
| `build`          | All changes regarding the build of the software, changes to dependencies or the addition of new dependencies |
| `test`           | All changes regarding tests (adding new tests or changing existing ones)                                     |
| `ci`             | All changes regarding the configuration of continuous integration (i.e. github actions, ci system)           |
| `chore`          | All changes to the repository that do not fit into any of the above categories                               |

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Steps to PR

1. Fork of the navigraph-sdk repository and clone your fork

2. Create a new branch out of the `main` branch. We follow the convention
   `[type/scope]`. For example `fix/accordion-hook` or `docs/menu-typo`. `type`
   can be either `docs`, `fix`, `feat`, `build`, or any other conventional
   commit type. `scope` is just a short id that describes the scope of work.

3. Make and commit your changes following the
   [commit convention](https://github.com/Navigraph/sdk/blob/main/CONTRIBUTING.md#commit-convention).
   As you develop, you can run `yarn pkg <module> build` and
   `yarn pkg <module> test` to make sure everything works as expected. Please
   note that you might have to run `yarn boot` first in order to build all
   dependencies.

4. Run `yarn changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/atlassian/changesets/tree/master/packages/cli).
   Please note that you might have to run `git fetch origin main:master` (where
   origin will be your fork on GitHub) before `yarn changeset` works.

5. Commit generated changesets to your branch & create the PR.

## License

By contributing your code to the chakra-ui GitHub repository, you agree to
license your contribution under the MIT license.
