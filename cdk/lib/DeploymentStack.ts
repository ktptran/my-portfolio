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

		const codeBuildProject = new cdk.aws_codebuild.PipelineProject(
			this,
			"Project",
			{
				buildSpec: cdk.aws_codebuild.BuildSpec.fromSourceFilename(
					"./cicd/buildspec.yml"
				),
			}
		);

		// Github secret for access to repository
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

		const artifactBucket = new cdk.aws_s3.Bucket(this, "ArtifactBucket", {
			autoDeleteObjects: true,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			bucketName: `${environment}-${projectName}-${accountId}-${region}-artifact`,
		});

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
				artifactBucket,
				stages: [sourceStage, buildStage, deployStage],
			}
		);

		// Notifies email when deployment fails
		const deploymentTopic = new cdk.aws_sns.Topic(this, "DeploymentTopic", {
			displayName: "Deployment notification topic",
		});

		new cdk.aws_sns.Subscription(this, "DeploymentEmailSubscription", {
			topic: deploymentTopic,
			protocol: cdk.aws_sns.SubscriptionProtocol.EMAIL,
			endpoint: email,
		});

		deploymentTopic.addToResourcePolicy(
			new cdk.aws_iam.PolicyStatement({
				sid: "AWSCodeStarNotifications_publish",
				effect: cdk.aws_iam.Effect.ALLOW,
				principals: [
					new cdk.aws_iam.ServicePrincipal(
						"codestar-notifications.amazonaws.com"
					),
				],
				actions: ["SNS:Publish"],
				resources: ["*"],
			})
		);

		new cdk.aws_codestarnotifications.NotificationRule(
			this,
			"CodePipelineNotifications",
			{
				detailType: cdk.aws_codestarnotifications.DetailType.BASIC,
				events: [
					"codepipeline-pipeline-pipeline-execution-failed",
					"codepipeline-pipeline-action-execution-failed",
					"codepipeline-pipeline-stage-execution-failed",
				],
				source: deploymentPipeline,
				targets: [deploymentTopic],
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
