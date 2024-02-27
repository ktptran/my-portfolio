import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface DeploymentStackProps extends cdk.StackProps {
	projectName: string;
	environment: string;
	accountId: string;
	region: string;
	email: string;
	owner: string;
	repo: string;
}

export class DeploymentStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: DeploymentStackProps) {
		super(scope, id, props);

		const { projectName, environment, accountId, region, email, owner, repo } =
			props;

		// SNS topic
		const deploymentTopic = new cdk.aws_sns.Topic(this, "DeploymentTopic", {
			displayName: "Deployment notification topic",
		});

		new cdk.aws_sns.Subscription(this, "DeploymentEmailSubscription", {
			topic: deploymentTopic,
			protocol: cdk.aws_sns.SubscriptionProtocol.EMAIL,
			endpoint: email,
		});

		// TODO: Add policies
		const lambdaRole = new cdk.aws_iam.Role(this, "lambdaRole", {
			assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
			managedPolicies: [
				cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
					"service-role/AWSLambdaBasicExecutionRole"
				),
			],
		});

		const uploadPortfolioHandler = new cdk.aws_lambda.Function(
			this,
			"getImageHandler",
			{
				code: cdk.aws_lambda.Code.fromAsset("../cicd/lambda"),
				handler: "upload_portfolio.handler",
				runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
				environment: {
					SNS_TOPIC_ARN: deploymentTopic.topicArn,
				},
				role: lambdaRole,
			}
		);

		// S3 Bucket for codebuild output
		const codeBuildOutputBucket = new cdk.aws_s3.Bucket(
			this,
			"codeBuildOutputBucket",
			{
				bucketName: `${environment}-${projectName}-${accountId}-${region}-cb`,
				publicReadAccess: false,
				autoDeleteObjects: true,
				removalPolicy: cdk.RemovalPolicy.DESTROY,
			}
		);

		// TODO: CodeBuid configuration with frontend
		const codeBuildProject = new cdk.aws_codebuild.Project(this, "Project", {
			buildSpec: cdk.aws_codebuild.BuildSpec.fromObject({
				version: "0.2",
				phases: {
					build: {
						commands: ['echo "Hello, CodeBuild!"'],
					},
				},
			}),
		});

		// CodePipeline configuration
		// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_codepipeline_actions-readme.html#github
		// Source
		const githubSourceOutput = new cdk.aws_codepipeline.Artifact(
			"GithubSourceOutputArtifact"
		);
		const secret = new cdk.aws_secretsmanager.Secret(this, "Secret", {
			secretObjectValue: {
				username: cdk.SecretValue.unsafePlainText("test"),
				database: cdk.SecretValue.unsafePlainText("foo"),
			},
		});

		// const deploymentPipeline = new cdk.aws_codepipeline.Pipeline(
		// 	this,
		// 	"DeploymentPipeline",
		// 	{
		// 		pipelineName: `${environment}-${projectName}-pipeline`,
		// 		crossAccountKeys: false, // disable CMK creation to reduce cost
		// 		stages: [
		// 			{
		// 				stageName: "PullGithub",
		// 				actions: [
		// 					new cdk.aws_codepipeline_actions.GitHubSourceAction({
		// 						actionName: "GitHub_Source",
		// 						owner,
		// 						repo,
		// 						// TODO: Ensure secret is configured correctly
		// 						oauthToken: cdk.SecretValue.secretsManager("my-github-token"),
		// 						output: githubSourceOutput,
		// 					}),
		// 				],
		// 			},
		// 		],
		// 	}
		// );

		// CloudFormation outputs
		// new cdk.CfnOutput(this, "DeploymentPipelineArn", {
		// 	value: deploymentPipeline.pipelineArn,
		// 	description: "Deployment Pipeline Arn",
		// });

		new cdk.CfnOutput(this, "CodeBuildOuptutBucketArn", {
			value: codeBuildOutputBucket.bucketArn,
			description: "CodeBuild Output Bucket Arn",
		});

		new cdk.CfnOutput(this, "DeploymentTopicArn", {
			value: deploymentTopic.topicArn,
			description: "Deployment SNS Topic Arn",
		});
	}
}
