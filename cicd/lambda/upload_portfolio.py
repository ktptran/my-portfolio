import io
import mimetypes
import os
import zipfile

import boto3
from botocore.client import Config

SNS_TOPIC_ARN = os.environ['SNS_TOPIC_ARN']

sns = boto3.resource('sns')
topic = sns.Topic(SNS_TOPIC_ARN)

def lambda_handler(event, context):
    location = {
        "bucketName": 'portfoliobuild.ktptran.com',
        "objectKey": 'portfoliobuild.zip'
    }
    try:
        print(event)
        job = event["CodePipeline.job"]
        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "BuildArtifact":
                    location = artifact["location"]["s3Location"]
                    print('Changed base directory')

        s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))

        print(location["bucketName"], location["objectKey"])
        portfolio_bucket = s3.Bucket('ktptran.com')
        build_bucket = s3.Bucket(location["bucketName"])

        portfolio_zip = io.BytesIO()
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm,
                    ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
        print("Job done!")
        topic.publish(Subject="Portfolio Deployed", Message="Portfolio deployed successfully!")
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])
    except:
        topic.publish(Subject="Portfolio Deploy Failed", Message="The portfolio was not deployed successfully!")
        raise
