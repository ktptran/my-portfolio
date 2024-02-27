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
	siteBucket: cdk.aws_s3.Bucket;
	token: string;
}

export class DeploymentStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: DeploymentStackProps) {
		super(scope, id, props);

		const {
			projectName,
			environment,
			accountId,
			region,
			email,
			owner,
			repo,
			siteBucket,
			token,
		} = props;

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
		// const lambdaRole = new cdk.aws_iam.Role(this, "lambdaRole", {
		// 	assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
		// 	managedPolicies: [
		// 		cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
		// 			"service-role/AWSLambdaBasicExecutionRole"
		// 		),
		// 	],
		// });

		// const uploadPortfolioHandler = new cdk.aws_lambda.Function(
		// 	this,
		// 	"getImageHandler",
		// 	{
		// 		code: cdk.aws_lambda.Code.fromAsset("../cicd/lambda"),
		// 		handler: "upload_portfolio.handler",
		// 		runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
		// 		environment: {
		// 			SNS_TOPIC_ARN: deploymentTopic.topicArn,
		// 		},
		// 		role: lambdaRole,
		// 	}
		// );

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

		// Secret for secretsmanager
		// https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_codepipeline_actions-readme.html#github
		// TODO: Generate github token
		new cdk.aws_secretsmanager.Secret(this, "Secret", {
			secretName: "token",
			description: "Token to read from github repository",
			secretObjectValue: {
				myGithubToken: new cdk.SecretValue(token),
			},
			removalPolicy: cdk.RemovalPolicy.DESTROY,
		});

		// New pipeline artifacts
		const sourceArtifact = new cdk.aws_codepipeline.Artifact("SourceArtifact");
		const buildArtifact = new cdk.aws_codepipeline.Artifact("BuildArtifact");

		const sourceStage = {
			stageName: "Source",
			actions: [
				new cdk.aws_codepipeline_actions.GitHubSourceAction({
					actionName: "GithubSource",
					owner,
					repo,
					oauthToken: cdk.SecretValue.secretsManager("token", {
						jsonField: "myGithubToken",
					}),
					output: sourceArtifact,
				}),
			],
		};

		const buildStage = {
			stageName: "Build",
			actions: [
				new cdk.aws_codepipeline_actions.CodeBuildAction({
					actionName: "CodebuildPush",
					input: new cdk.aws_codepipeline.Artifact("SourceArtifact"),
					project: codeBuildProject,
					outputs: [buildArtifact],
				}),
			],
		};

		const deployStage = {
			stageName: "Deploy",
			actions: [
				new cdk.aws_codepipeline_actions.S3DeployAction({
					actionName: "DeployAction",
					bucket: siteBucket,
					input: buildArtifact,
				}),
			],
		};

		const deploymentPipeline = new cdk.aws_codepipeline.Pipeline(
			this,
			"DeploymentPipeline",
			{
				pipelineName: `${environment}-${projectName}-pipeline`,
				pipelineType: cdk.aws_codepipeline.PipelineType.V2,
				crossAccountKeys: false,
				stages: [sourceStage, buildStage, deployStage],
			}
		);

		// CloudFormation outputs
		new cdk.CfnOutput(this, "DeploymentPipelineArn", {
			value: deploymentPipeline.pipelineArn,
			description: "Deployment Pipeline Arn",
		});

		new cdk.CfnOutput(this, "DeploymentTopicArn", {
			value: deploymentTopic.topicArn,
			description: "Deployment SNS Topic Arn",
		});
	}
}
