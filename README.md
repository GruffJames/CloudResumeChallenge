# CloudResumeChallenge
https://cloudresumechallenge.dev/docs/the-challenge/aws/

To install locally with a connection to AWS:

#### Prerequisites:
* Terraform and AWS CLI is already setup locally 

#### Steps:

1)  Generate the AWS API ids e.g. ContactRequest_API.js
    1)  cd TerraformScripts
    2)  terraform init
    3)  terraform apply
2)  Set up the node server:
    1)  cd ui
    2)  npm install
    3)  npm start