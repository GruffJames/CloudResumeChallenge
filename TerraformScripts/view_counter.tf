
locals {
  view_counter = "ViewCounter"
}

resource "aws_lambda_function" "ViewCounter_Func" {
    filename = data.archive_file.ViewCounterZip.output_path
    source_code_hash = data.archive_file.ViewCounterZip.output_base64sha256
    function_name = "${local.view_counter}_Func"
    role = aws_iam_role.iam_for_lambda.arn
    handler = "index.handler"
    runtime = "nodejs16.x"
}

data "archive_file" "ViewCounterZip"{
    type = "zip"
    source_dir = "../api/${local.view_counter}/"
    output_path = "../tmp/packed_${local.view_counter}.zip"
}

resource "aws_apigatewayv2_api" "ViewCounter_API" {
  name = "${local.view_counter}_API"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = local.http_api_cors.allow_origins
    allow_headers = local.http_api_cors.allow_headers
    allow_methods = local.http_api_cors.allow_methods
    max_age = local.http_api_cors.max_age
    allow_credentials = local.http_api_cors.allow_credentials
  }

  # Only runs locally
  provisioner "local-exec" {
    command = "echo export const ${self.name}_Id = '${self.id}'; > ..\\ui\\src\\APIEndPoints\\API_IDs\\${self.name}.js"
  }
}

output "ViewCounter_API_id" {
  value = aws_apigatewayv2_api.ViewCounter_API.id
}

resource "aws_lambda_permission" "vc_give_lambda_permission_default" {
  statement_id = "AllowAPIGatewayAccess_base"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ViewCounter_Func.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.ViewCounter_API.execution_arn}/$default/$default"
}
resource "aws_lambda_permission" "vc_give_lambda_permission_items" {
  statement_id = "AllowAPIGatewayAccess_items"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ViewCounter_Func.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.ViewCounter_API.execution_arn}/*/*/items"
}
resource "aws_lambda_permission" "vc_give_lambda_permission_items_id" {
  statement_id = "AllowAPIGatewayAccess_item_id"
  action = "lambda:InvokeFunction"
  function_name = aws_lambda_function.ViewCounter_Func.function_name
  principal = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.ViewCounter_API.execution_arn}/*/*/items/{id}"
}

resource "aws_apigatewayv2_stage" "vc_Stage_default" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  name = "$default"
  auto_deploy = true
  default_route_settings {
    throttling_rate_limit = local.stage_default_route_settings.throttling_rate_limit
    throttling_burst_limit = local.stage_default_route_settings.throttling_burst_limit
  }
}
resource "aws_apigatewayv2_stage" "vc_Stage_prod" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  name = "prod"
  auto_deploy = true
  default_route_settings {
    throttling_rate_limit = local.stage_default_route_settings.throttling_rate_limit
    throttling_burst_limit = local.stage_default_route_settings.throttling_burst_limit
  }
}

resource "aws_apigatewayv2_integration" "vc_me_api_integration" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  integration_uri = aws_lambda_function.ViewCounter_Func.invoke_arn
  integration_type = "AWS_PROXY"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "vc_RouteOne" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "$default"  
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}

resource "aws_apigatewayv2_route" "vc_ItemsGet" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "GET /items"
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}
resource "aws_apigatewayv2_route" "vc_ItemsOptions" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "OPTIONS /items"
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}
resource "aws_apigatewayv2_route" "vc_PutItems" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "PUT /items"
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}
resource "aws_apigatewayv2_route" "vc_ItemsIdOptions" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "OPTIONS /items/{id}"
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}
resource "aws_apigatewayv2_route" "vc_ItemsIdDelete" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "DELETE /items/{id}"
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}
resource "aws_apigatewayv2_route" "vc_ItemsIdGet" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "GET /items/{id}"
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}
resource "aws_apigatewayv2_route" "vc_ItemsPost" {
  api_id = aws_apigatewayv2_api.ViewCounter_API.id
  route_key = "POST /items"
  target = "integrations/${aws_apigatewayv2_integration.vc_me_api_integration.id}"
}

