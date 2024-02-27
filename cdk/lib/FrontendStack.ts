import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface FrontendStackProps extends cdk.StackProps {
	projectName: string;
	environment: string;
	accountId: string;
	region: string;
}

export class FrontendStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: FrontendStackProps) {
		super(scope, id, props);

		const { projectName, environment, accountId, region } = props;

		// The code that defines your stack goes here

		// example resource
		const siteBucket = new cdk.aws_s3.Bucket(this, "SiteBucket", {
			bucketName: `${environment}-${projectName}-${accountId}-${region}-site`,
			websiteIndexDocument: "index.html",
			websiteErrorDocument: "index.html",
			publicReadAccess: false,
			autoDeleteObjects: true,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
		});

		const cloudfrontOAI = new cdk.aws_cloudfront.OriginAccessIdentity(
			this,
			"CloudFrontOAI",
			{
				comment: "Cloudfront OAI",
			}
		);

		siteBucket.addToResourcePolicy(
			new cdk.aws_iam.PolicyStatement({
				sid: "s3BucketPublicRead",
				effect: cdk.aws_iam.Effect.ALLOW,
				actions: ["s3:GetObject"],
				resources: [`${siteBucket.bucketArn}/*`],
				principals: [
					new cdk.aws_iam.CanonicalUserPrincipal(
						cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
					),
				],
			})
		);

		const siteDistribution = new cdk.aws_cloudfront.CloudFrontWebDistribution(
			this,
			"SiteDistribution",
			{
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: siteBucket,
							originAccessIdentity: cloudfrontOAI,
						},
						behaviors: [
							{
								isDefaultBehavior: true,
								compress: true,
								allowedMethods:
									cdk.aws_cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
							},
						],
					},
				],
			}
		);

		// CloudFormation Outputs
		new cdk.CfnOutput(this, "SiteBucketName", {
			value: siteBucket.bucketName,
			description: "Web storage bucket name",
		});

		new cdk.CfnOutput(this, "CloudFrontDistributionDomainName", {
			value: siteDistribution.distributionDomainName,
			description: "CloudFront distribution domain name.",
		});

		new cdk.CfnOutput(this, "CloudFrontDistributionId", {
			value: siteDistribution.distributionId,
			description: "CloudFront distribution id.",
		});
	}
}
