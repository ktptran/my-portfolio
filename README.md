# Portfolio Website

## Introduction

Want to get to know who Kevin Tran is or launch your own portfolio website in an automated fashion?

This project provides a CI/CD pipeline for deploying a static website using Amazon Web Services.

### Objectives & Key Results

1. Provide a platform to convey a static website.
2. Automated deployment upon pushing to the master branch.

### Key Performance Indicators

1. Deploy the updated version of the website within minutes automatically.

## Launch Configurations

### Pre-requisites

- python == 3.11
- aws-cli
- aws-cdk >= 2.128.0
- git
- jq >= 1.7.1

Run the following command:

```bash
aws configure
```

### Deployment

1. Create a [GitHub Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line), with scopes repo and admin:repo_hook.

2. Register an API key and verify your domain through [resend](https://resend.com/docs/send-with-nextjs) for email setup.

3. Register a [Route 53](https://aws.amazon.com/route53/) domain.

4. Generate the `secret_env.sh` using the following commands:

```bash
GITHUB_REPO="my-portfolio"
GITHUB_TOKEN="example"
DOMAIN_NAME="example.xyz"
RESEND_KEY="example"
./scripts/generate_secret_env.sh $GITHUB_REPO $GITHUB_TOKEN $DOMAIN_NAME $RESEND_KEY
```

5. Run the following command to build and deploy the portfolio application:

```bash
./scripts/deploy.sh
```

### Teardown

Run the following command to teardown the portfolio application:

```bash
./scripts/teardown.sh
```

## Architecture Overview

Upon pushing to the Github master branch, the AWS CodePipeline pulls the latest changes. These changes are processed through AWS CodeBuild and deployed to Amazon S3 which is delivered through Amazon CloudFront. The Amazon CloudFront is built in with a domain name configured through Route 53 with an associated SSL/TLS certificate through AWS Certificate Manager. If the pipeline fails at any point, the developer is notified of the errors through Amazon SNS.

![Architecture Diagram](docs/assets/architecture-diagram.png)

### Code Layout

| Path         | Description                                                    |
| :----------- | :------------------------------------------------------------- |
| cdk/         | AWS CDK source code                                            |
| cicd/        | CodeBuild buildspec code                                       |
| docs/assets/ | supporting assets for documentation.                           |
| frontend/    | source code for React frontend                                 |
| scripts/     | shell scripts to build, deploy, and interact with the project. |

## Future State

1. Refactor website to NextJS and update with projects.
2. Add in ktptran.xyz domain name to hosted zone and deployment.

### Design Decisions

This portfolio is a static website which is best suited for sever-side rendering. Between ReactJS and NextJS, NextJS offers server-side rendering. NextJS is a framework used to build UI and pages for the web app within the React Library.
