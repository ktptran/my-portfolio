import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as fs from "fs";

export interface AmplifyStackProps extends cdk.StackProps {
	projectName: string;
	environment: string;
	accountId: string;
	region: string;
	domainName: string;
	email: string;
	owner: string;
	repo: string;
	token: string;
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
			email,
			owner,
			repo,
			token,
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
			platform: "WEB_DYNAMIC",
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
			],
			buildSpec: fs.readFileSync("../cicd/amplify.yml", "utf8"),
		});

		const appId = amplifyApp.attrAppId;

		new cdk.aws_amplify.CfnBranch(this, "MasterBranch", {
			appId,
			branchName: "master",
			description: `Master branch of ${projectName}`,
		});

		new cdk.aws_amplify.CfnBranch(this, "DevBranch", {
			appId,
			branchName: "dev",
			description: `Dev branch of ${projectName}`,
		});

		// Uncomment out for production build
		// new cdk.aws_amplify.CfnDomain(this, "Domain", {
		// 	appId,
		// 	domainName,
		// 	subDomainSettings: [
		// 		{
		// 			branchName: "master",
		// 			prefix: "",
		// 		},
		// 		{
		// 			branchName: "dev",
		// 			prefix: "dev",
		// 		},
		// 	],
		// });

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
