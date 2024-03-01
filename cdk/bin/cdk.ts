#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { DeploymentStack } from "../lib/DeploymentStack";
import { FrontendStack } from "../lib/FrontendStack";

const envVariables = {
	environment: process.env["ENV"] ?? "",
	projectName: process.env["PROJECT_NAME"] ?? "",
	// Certificate manager only available for us-east-1 through CDK
	region: "us-east-1",
	accountId: process.env["AWS_ACCOUNT_ID"] ?? "",
	domainName: process.env["DOMAIN_NAME"] ?? "",
};

const app = new cdk.App();

const frontendStack = new FrontendStack(app, "FrontendStack", {
	...envVariables,
	env: {
		region: envVariables.region,
		account: envVariables.accountId,
	},
});

new DeploymentStack(app, "DeploymentStack", {
	...envVariables,
	siteBucket: frontendStack.siteBucket,
	email: process.env["EMAIL"] ?? "",
	owner: process.env["GITHUB_OWNER"] ?? "",
	repo: process.env["GITHUB_REPO"] ?? "",
	token: process.env["GITHUB_TOKEN"] ?? "",
	env: {
		region: envVariables.region,
		account: envVariables.accountId,
	},
});
