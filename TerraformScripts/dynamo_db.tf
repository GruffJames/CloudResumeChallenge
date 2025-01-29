
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