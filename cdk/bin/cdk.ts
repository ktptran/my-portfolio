#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { AmplifyStack } from "../lib/AmplifyStack";

const envVariables = {
	environment: process.env["ENV"] ?? "",
	projectName: process.env["PROJECT_NAME"] ?? "",
	accountId: process.env["AWS_ACCOUNT_ID"] ?? "",
	domainName: process.env["DOMAIN_NAME"] ?? "",
	region: process.env["AWS_REGION"] ?? "",
	repo: process.env["GITHUB_REPO"] ?? "",
	token: process.env["GITHUB_TOKEN"] ?? "",
};

const app = new cdk.App();

new AmplifyStack(app, "AmplifyStack", {
	...envVariables,
});
