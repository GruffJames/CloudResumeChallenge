
resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement: [
      {
        Effect = "Allow",
        Principal: {
          Service: "lambda.amazonaws.com"
        },
        Action: "sts:AssumeRole"
      }
    ]
  })
}


resource "aws_iam_policy" "iam_policy_for_resume_project" {
  name = "aws_iam_policy_for_terraform_resume_project_policy"
  path = "/"
  description = "IAM policy for logging and DynamoDB access"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action: [
          "logs:CreateLogGroup",   // Create log groups
          "logs:CreateLogStream", // Create log streams
          "logs:PutLogEvents"     // Write log events
        ],
        Resource: "*"
      },
      {
        Effect = "Allow",
        Action: [
          "dynamodb:UpdateItem",
          "dynamodb:GetItem",
          "dynamodb:DeleteItem",
          "dynamodb:PutItem",
          "dynamodb:Scan"
        ],
        Resource: [
          "arn:aws:dynamodb:*:*:table/${aws_dynamodb_table.ContactUsRequest.name}",
          "arn:aws:dynamodb:*:*:table/${aws_dynamodb_table.auto_increment_key.name}",
          "arn:aws:dynamodb:*:*:table/${aws_dynamodb_table.Users.name}"
        ]
      }
    ]
  })
}


resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
    role = aws_iam_role.iam_for_lambda.name
    policy_arn = aws_iam_policy.iam_policy_for_resume_project.arn
}

locals {
  http_api_cors = {
    allow_origins = [
      "http://${aws_s3_bucket_website_configuration.website_config.website_endpoint}",
      "https://${aws_cloudfront_distribution.s3_distribution.domain_name}", 
      # "http://localhost:3000", # Uncomment this line if you want to test locally
      local.URL_gruff_james_dev
    ]
    allow_headers = [ "*" ]
    allow_methods = [ "*" ]
    max_age = 96400
    allow_credentials = true
  }
  stage_default_route_settings = {
    throttling_rate_limit = 1  # Requests per second
    throttling_burst_limit = 1 # Maximum burst capacity
  }
}
