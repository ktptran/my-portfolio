# Welcome to my portfolio website

## Web Hosting (Frontend)
This website is hosted on Amazon Web Services and uses the following services to reach you through https://ktptran.com/ and https://www.ktptran.com:
1. Amazon Route 53 for DNS routing
2. Amazon CloudFront for content distribution and caching
3. AWS Certificate Manager for TLS/SSL security
4. Amazon S3 to host static websites

![Frontend Diagram](https://github.com/ktptran/my-portfolio/blob/master/pic/Frontend.png)

The documents used for the frontend include:
1. Content - home.html
2. Styling - home.css
3. Animations & Functions - script.js
4. Pictures - pic/*

## Automated Deployment (Backend)
On the backend of the system, we are using a number of AWS services to automate deployment whenever edits are made to github.
1. CodePipeline is notified of the changes in Github.
2. CodeBuild is notified by CodePipeline and zips the files together into an S3 bucket.
3. Lambda takes the S3 zip file and unzips it in the static hosted S3 bucket.
After this is processed, lambda uses SNS to notify me about the deployment success.

![Backend Diagram](https://github.com/ktptran/my-portfolio/blob/master/pic/Backend.png)

The documents used for backend include:
1. Build file - buildspec.yml
2. Lambda code - upload-portfolio-lambda.py

## Future Plans
In the future, I am looking to expand the website to satisfy the following functions:
1. Blog webpage for sharing about knowledge through React.js
2. System for requesting books through DynamoDB, Lambda, and API gateway
3. Login system through Cognito
