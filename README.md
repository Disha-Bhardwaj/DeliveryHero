# MSOS/MMM Project Frontend Codebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
ng build

## Production build
ng build --prod

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deployment

Deployments are performed using Github Actions and terraform. The following section
describes how to perform deployments manually.

### Manual Deployment

#### Requirements

- terraform
- docker
- aws-cli
- IAM user with enough permissions to create/modify the necessary resources
- A GIT_TOKEN: A github personal access token with access to:
    - `mkt-web-lib`
    - `mkt-ng-dhh-iam`

#### Steps

During the deployment you will need to provide various variables required for building and deploying the frontend infra.
Refer to the `variables.tf` file in the terraform directory for these, and the official terraform documentation on
how to provide them.
Using this terraform files, frontend fargate related resources and alb listener rules will be provisioned and created.

1. Build up to date docker images:
```sh
export ECR_REGISTRY=<name of the registry on aws ecr>
export ECR_REPOSITORY_FRONTEND=<name of the frontend ecr repo>
docker build --build-arg GIT_TOKEN=$GIT_TOKEN --build-arg configuration=<environment> --file ./app/frontend/Dockerfile -t ${ECR_REGISTRY}/${ECR_REPOSITORY_FRONTEND}:<image_tag> ./app/frontend
```
2. Sign in to the environments ECR to be able to push docker images there. See AWS  ECR documentation for details.
3. Push updated images:
   Image tags are usually the git commit sha of the current commit.
```sh
docker push ${ECR_REGISTRY}/${ECR_REPOSITORY_FRONTEND}:<image_tag>
```
4. Configure terraform for the destination environment.
    - `AWS_PROFILE` environment variable must be set to the name of of an existing aws configuration with access to the account.
    - Alternatively, other means of configuration can be used, see the aws terraform provider documentation for details.
5. `terraform_remote_state` data source must be configured to retrieve the necessary output values from backend terraform configuration, using the latest state snapshot from the remote backend.
5. Deploy using terraform.

```
cd terraform/<environment>
terraform init
terraform plan -out /tmp/mmm-frontend.plan
<check if everything looks good>
terraform apply /tmp/mmm-frontend.plan
```

### Deploying to an empty environment from scratch

1. The environment needs to be bootstrapped using [this](https://github.com/deliveryhero/mkt-msos-root) with an account with admin access.
2. Go to the GCP console for the `mkt-mmm` project. An OAuth2 client id needs to be generated for the environment, authorizing the following JS origins:
   - https://<the domain of the environment>
3. The frontend infrastructure is on Fargate. To deploy to Fargate we need to have ECR repositories and images for the frontend fargate task specifications. They
are also controlled through terraform. We can create them by using the general terraform deployment flow as outlined in the previous section,
and by specifying the target param.
```sh
terraform apply -target aws_ecr_repository.mkt-msos-ecr-repository-frontend
```
4. Now you can build and push the images as outlined in the previous section.
5. Run the terraform deployment as outlined.
