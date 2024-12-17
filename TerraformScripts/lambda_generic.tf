
resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "iam_policy_for_resume_project" {

  name = "aws_iam_policy_for_terraform_resume_project_policy"
  path = "/"
  description = "AWS IAM Policy for managing the resume project role"
    policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ],
          "Resource" : "arn:aws:logs:*:*:*",
          "Effect" : "Allow"
        },
        {
          "Action" : [
            "dynamodb:UpdateItem",
            "dynamodb:GetItem",
            "dynamodb:DeleteItem",
            "dynamodb:PutItem",
            "dynamodb:Scan"
          ],
          "Resource" : "arn:aws:dynamodb:*:*:table/${aws_dynamodb_table.ContactUsRequest.name}",
          "Effect" : "Allow"
        },
        {
          "Action" : [
            "dynamodb:UpdateItem",
            "dynamodb:GetItem",
            "dynamodb:DeleteItem",
            "dynamodb:PutItem",
            "dynamodb:Scan"
          ],
          "Resource" : "arn:aws:dynamodb:*:*:table/${aws_dynamodb_table.auto_increment_key.name}",
          "Effect" : "Allow"
        },
      ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
    role = aws_iam_role.iam_for_lambda.name
    policy_arn = aws_iam_policy.iam_policy_for_resume_project.arn
}

locals {
  http_api_cors = {
    allow_origins = [ "http://${aws_s3_bucket_website_configuration.website_config.website_endpoint}","https://${aws_cloudfront_distribution.s3_distribution.domain_name}", local.Custom_Domain_gruff-james-dev]
    allow_headers = [ "*" ]
    allow_methods = [ "*" ]
    max_age = 96400
    allow_credentials = true
  }
}
