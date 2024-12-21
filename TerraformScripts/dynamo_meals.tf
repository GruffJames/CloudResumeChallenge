resource "aws_dynamodb_table" "Meals" {
  name = "Meals"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key = "meal_Id"

  attribute {
    name = "meal_Id"
    type = "N"
  }
}

resource "aws_dynamodb_table_item" "auto_increment_key_initial_value" {
  table_name = aws_dynamodb_table.auto_increment_key.name
  hash_key   = aws_dynamodb_table.auto_increment_key.hash_key

  item = <<ITEM
{
  "IncrementTableName": {"S": "${aws_dynamodb_table.Meals.name}"},
  "AutoIncrementNum": {"N": "1"}
}
ITEM
}