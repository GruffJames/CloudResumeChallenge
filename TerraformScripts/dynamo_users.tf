resource "aws_dynamodb_table" "Users" {
  name = "Users"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key = "usr_Id"

  attribute {
    name = "usr_Id"
    type = "N"
  }
}

resource "aws_dynamodb_table_item" "User_key_initial_value" {
  table_name = aws_dynamodb_table.auto_increment_key.name
  hash_key   = aws_dynamodb_table.auto_increment_key.hash_key

  item = <<ITEM
{
  "IncrementTableName": {"S": "${aws_dynamodb_table.Users.name}"},
  "AutoIncrementNum": {"N": "1"}
}
ITEM
}