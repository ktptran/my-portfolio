import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface FrontendStackProps extends cdk.StackProps {
	projectName: string;
	environment: string;
	accountId: string;
	region: string;
	domainName: string;
}

export class FrontendStack extends cdk.Stack {
	public siteBucket: cdk.aws_s3.Bucket;

	constructor(scope: Construct, id: string, props: FrontendStackProps) {
		super(scope, id, props);

		const { projectName, environment, accountId, region, domainName } = props;
		const siteDomain = "www." + domainName;

		const zone = cdk.aws_route53.HostedZone.fromLookup(this, "Zone", {
			domainName,
		});

		const cert = new cdk.aws_certificatemanager.Certificate(this, "Cert", {
			certificateName: `${environment}-${projectName}-cert`,
			domainName,
			subjectAlternativeNames: [siteDomain],
			validation:
				cdk.aws_certificatemanager.CertificateValidation.fromDns(zone),
		});
		cert.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

		this.siteBucket = new cdk.aws_s3.Bucket(this, "SiteBucket", {
			bucketName: `${environment}-${projectName}-${accountId}-${region}-site`,
			publicReadAccess: false,
			autoDeleteObjects: true,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			websiteIndexDocument: "index.html",
			websiteErrorDocument: "index.html",
		});

		const cloudfrontOAI = new cdk.aws_cloudfront.OriginAccessIdentity(
			this,
			"CloudFrontOAI",
			{
				comment: "Cloudfront OAI",
			}
		);

		this.siteBucket.addToResourcePolicy(
			new cdk.aws_iam.PolicyStatement({
				sid: "s3BucketPublicRead",
				effect: cdk.aws_iam.Effect.ALLOW,
				actions: ["s3:GetObject"],
				resources: [`${this.siteBucket.bucketArn}/*`],
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
				viewerCertificate:
					cdk.aws_cloudfront.ViewerCertificate.fromAcmCertificate(cert, {
						aliases: [siteDomain, domainName],
					}),
				defaultRootObject: "index.html",
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: this.siteBucket,
							originAccessIdentity: cloudfrontOAI,
						},
						behaviors: [
							{
								isDefaultBehavior: true,
								compress: true,
								allowedMethods:
									cdk.aws_cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
								viewerProtocolPolicy:
									cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
							},
						],
					},
				],
			}
		);

		// Creating Route 53 alias records
		new cdk.CfnOutput(this, "CertCertificate", {
			value: cert.certificateArn,
			description: "Certificate ARN",
		});

		new cdk.aws_route53.ARecord(this, "WWWSiteAliasRecord", {
			zone,
			recordName: siteDomain,
			target: cdk.aws_route53.RecordTarget.fromAlias(
				new cdk.aws_route53_targets.CloudFrontTarget(siteDistribution)
			),
		});

		new cdk.aws_route53.ARecord(this, "SiteAliasRecord", {
			zone,
			recordName: domainName,
			target: cdk.aws_route53.RecordTarget.fromAlias(
				new cdk.aws_route53_targets.CloudFrontTarget(siteDistribution)
			),
		});

		// CloudFormation Outputs
		new cdk.CfnOutput(this, "Certificate", {
			value: cert.certificateArn,
			description: "Certificate ARN",
		});

		new cdk.CfnOutput(this, "SiteBucketName", {
			value: this.siteBucket.bucketName,
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
