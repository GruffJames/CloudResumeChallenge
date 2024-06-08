
terraform {
  required_providers {
    aws = {
        version = ">4.9.0"
        source = "hashicorp/aws"
    }
  }
}


provider "aws" {
    profile = "default"
    # access_key = ""
    # secret_key = ""
    region = "eu-west-2"
}