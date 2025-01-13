
resource "aws_dynamodb_table" "auto_increment_key" {
  name           = "AutoIncrementKey"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "IncrementTableName"

  attribute {
    name = "IncrementTableName"
    type = "S"
  }
}

resource "aws_dynamodb_table" "ContactUsRequest" {
  name = "ContactUsRequest"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key = "cus_Id"

  attribute {
    name = "cus_Id"
    type = "N"
  }
}

resource "aws_dynamodb_table" "Users" {
  name = "Users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key = "username"

  attribute {
    name = "username"
    type = "S"
  }
}

resource "aws_dynamodb_table_item" "auto_increment_key_initial_value" {
  table_name = aws_dynamodb_table.auto_increment_key.name
  hash_key   = aws_dynamodb_table.auto_increment_key.hash_key

  item = <<ITEM
{
  "IncrementTableName": {"S": "${aws_dynamodb_table.ContactUsRequest.name}"},
  "AutoIncrementNum": {"N": "1"}
}
ITEM
}

resource "aws_dynamodb_table_item" "view_counter_initial_value" {
  table_name = aws_dynamodb_table.auto_increment_key.name
  hash_key   = aws_dynamodb_table.auto_increment_key.hash_key

  item = <<ITEM
{
  "IncrementTableName": {"S": "ViewCounter"},
  "AutoIncrementNum": {"N": "1"}
}
ITEM
}