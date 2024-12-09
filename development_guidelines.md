# Development Guidelines

- [GIT Policies](#git-policies)

## GIT Policies

- `master` and `develop` branches are *protected branches*

- Push straight to the `master` branch is forbidden:

  - The only way to push to the `master` branch is through **PR merge** from the `develop` branch

- Push straight to the `develop` branch is restricted and in general should only be permitted as exceptional measure

- PR conventions:
  - Approval of at **least 1 peer** from *mkt-strategy* squad is required to merge PR
  - PR should include concise description of what the PR commits are about
  - PR must only be opened when the code base is tested locally
  - PR may be opened while some codebase parts are undergoing minor adjustment, the PR name *should include "WIP:" prefix* in such case. For example:
    - "WIP: adds branch policies to README.md"

- Deployment:
  - Code base from the `develop` branch is being deployed to the `stage` AWS account
  - Code base from the `master` branch is being deployed to the `prod` AWS account

- IaaC:
  - Applying terraform code for infra must be only performed using service account `terraform-root`
  - Applying terraform code for infra should in general be only permitted through ci-pipeline/fully programmatic way

- Feature branches should be checkout following the convention:
  - Checkout from the `master` branch
  - Merge to `develop` first to test in `stage env`, merge `develop` to `master` afterward only
  - Naming convention:
    - Prefix:
      - feature: for services features
      - infra: for infra related topics
      - data: for data/modelling related topics
      - bug: bugfix related tasks
      - chore: AOB related tasks (e.g. to modify README/LICENSE files)
    - Identifier:
      - JIRA ticket name
      - Short ticket ID/description
    - Example:
      - chore/docu -> to modify documentation
      - feature/MKTI-1111 -> feature as per the ticket MKTI-1111
      - bug/missing_aws_envvar -> bugfix to add missing env vars

- Commits:
  - Commit subject shouldn't exceed 50 characters
  - Commit subject should start with the following words:
    - adds: when new functionality is being added as result of the commit
    - removes: when a method is being removed as result of the commit
    - fixes: when a fix is delivered with the commit
    - enhances: when a refactoring is delivered with the commit
    - cleanup: generic word used to tidy up the repo structure
