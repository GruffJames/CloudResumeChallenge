
# resource "aws_lambda_function" "ViewCounterFunc" {
#     filename = data.archive_file.zip.output_path
#     source_code_hash = data.archive_file.zip.output_base64sha256
#     function_name = "view_counter_api"
#     role = aws_iam_role.iam_for_lambda.arn
#     handler = "func.lambda_handler"
#     runtime = "python3.12"
# }

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
          "Resource" : "arn:aws:dynamodb:*:*:table/ContactUsRequest",
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
          "Resource" : "arn:aws:dynamodb:*:*:table/AutoIncrementKey",
          "Effect" : "Allow"
        },
      ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
    role = aws_iam_role.iam_for_lambda.name
    policy_arn = aws_iam_policy.iam_policy_for_resume_project.arn
}

