resource "aws_lambda_function" "Meals_APIFunc" {
    filename = data.archive_file.Meals_APIZip.output_path
    source_code_hash = data.archive_file.Meals_APIZip.output_base64sha256
    function_name = "meals_api"
    role = aws_iam_role.iam_for_lambda.arn
    handler = "index.handler"
    runtime = "nodejs16.x"
}

data "archive_file" "Meals_APIZip"{
    type = "zip"
    source_dir = "${path.module}/Meals_API/"
    output_path = "${path.module}/PackedMeals_API.zip"
}

resource "aws_apigatewayv2_api" "meals_api_http_api" {
  name = "meals_api_http_api"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = local.http_api_cors.allow_origins
    allow_headers = local.http_api_cors.allow_headers
    allow_methods = local.http_api_cors.allow_methods
    max_age = local.http_api_cors.max_age
    allow_credentials = local.http_api_cors.allow_credentials
  }

  provisioner "local-exec" {
    command = "echo export const ${self.name}_Id = '${self.id}'; > ..\\HobbitMeals\\ui\\src\\assets\\keys\\${self.name}.js"
  }
}

output "meals_api_http_api_id" {
  value = aws_apigatewayv2_api.meals_api_http_api.id
}

resource "aws_lambda_permission" "meal_api_give_lambda_permission_default" {
  statement_id = "AllowAPIGatewayAccess_base"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.Meals_APIFunc.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.meals_api_http_api.execution_arn}/$default/$default"
}
resource "aws_lambda_permission" "meal_api_give_lambda_permission_items" {
  statement_id = "AllowAPIGatewayAccess_items"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.Meals_APIFunc.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.meals_api_http_api.execution_arn}/*/*/meals"
}
resource "aws_lambda_permission" "meal_api_give_lambda_permission_items_id" {
  statement_id = "AllowAPIGatewayAccess_item_id"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.Meals_APIFunc.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.meals_api_http_api.execution_arn}/*/*/meals/{id}"
}

resource "aws_apigatewayv2_stage" "meal_api_Stage_default" {
  api_id = aws_apigatewayv2_api.meals_api_http_api.id
  name = "$default"
  auto_deploy = true
}
resource "aws_apigatewayv2_stage" "meal_api_Stage_prod" {
  api_id = aws_apigatewayv2_api.meals_api_http_api.id
  name = "prod"
  auto_deploy = true
}

resource "aws_apigatewayv2_integration" "meal_api_me_api_integration" {
  api_id = aws_apigatewayv2_api.meals_api_http_api.id
  integration_uri = aws_lambda_function.Meals_APIFunc.invoke_arn
  integration_type = "AWS_PROXY"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "meal_api_RouteOne" {
  api_id = aws_apigatewayv2_api.meals_api_http_api.id
  route_key = "$default"  
  target = "integrations/${aws_apigatewayv2_integration.meal_api_me_api_integration.id}"
}

resource "aws_apigatewayv2_route" "meal_api_ItemsGet" {
  api_id = aws_apigatewayv2_api.meals_api_http_api.id
  route_key = "GET /meals"
  target = "integrations/${aws_apigatewayv2_integration.meal_api_me_api_integration.id}"
}

resource "aws_apigatewayv2_route" "meal_api_ItemsGetById" {
  api_id     = aws_apigatewayv2_api.meals_api_http_api.id
  route_key  = "GET /meals/{id}"
  target     = "integrations/${aws_apigatewayv2_integration.meal_api_me_api_integration.id}"
}

