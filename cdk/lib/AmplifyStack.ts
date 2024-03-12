import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as fs from "fs";

export interface AmplifyStackProps extends cdk.StackProps {
	projectName: string;
	environment: string;
	accountId: string;
	region: string;
	domainName: string;
	repo: string;
	token: string;
	password: string;
	username: string;
}

export class AmplifyStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: AmplifyStackProps) {
		super(scope, id, props);

		const {
			projectName,
			environment,
			accountId,
			region,
			domainName,
			repo,
			token,
			password,
			username,
		} = props;

		const amplifyRole = new cdk.aws_iam.Role(this, "AmplifyRole", {
			assumedBy: new cdk.aws_iam.ServicePrincipal("amplify.amazonaws.com"),
		});

		amplifyRole.addManagedPolicy(
			cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
				"AdministratorAccess-Amplify"
			)
		);

		const amplifyApp = new cdk.aws_amplify.CfnApp(this, "AmplifyApp", {
			name: projectName,
			accessToken: token,
			platform: "WEB_COMPUTE",
			enableBranchAutoDeletion: true,
			repository: repo,
			iamServiceRole: amplifyRole.roleArn,
			environmentVariables: [
				{
					name: "PROJECT_NAME",
					value: projectName,
				},
				{
					name: "ENV",
					value: environment,
				},
				{
					name: "AMPLIFY_MONOREPO_APP_ROOT",
					value: "frontend",
				},
				{
					name: "AMPLIFY_DIFF_DEPLOY",
					value: "false",
				},
			],
			buildSpec: fs.readFileSync("../cicd/amplify.yml", "utf8"),
		});

		const appId = amplifyApp.attrAppId;

		new cdk.aws_amplify.CfnBranch(this, "MasterBranch", {
			appId,
			branchName: "master",
			framework: "Next.js - SSR",
			description: `Master branch of ${projectName}`,
		});

		new cdk.aws_amplify.CfnBranch(this, "DevBranch", {
			appId,
			branchName: "dev",
			framework: "Next.js - SSR",
			basicAuthConfig: {
				password,
				username,
				enableBasicAuth: true,
			},
			description: `Dev branch of ${projectName}`,
		});

		new cdk.aws_amplify.CfnDomain(this, "Domain", {
			appId,
			domainName,
			subDomainSettings: [
				{
					branchName: "master",
					prefix: "",
				},
				{
					branchName: "dev",
					prefix: "dev",
				},
				{
					branchName: "master",
					prefix: "www",
				},
			],
		});

		// CloudFormation Outputs
		new cdk.CfnOutput(this, "AmplifyAppARN", {
			value: amplifyApp.attrArn,
			description: "Amplify App ARN",
		});

		new cdk.CfnOutput(this, "AmplifyAppId", {
			value: appId,
			description: "Web storage bucket name",
		});
	}
}
