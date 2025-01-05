
terraform {
  required_providers {
    aws = {
        version = ">4.9.0"
        source = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket = "cloud-res-tf-state"
    key  = "CloudResumeChallenge/terraform.tfstate"
    region = "eu-west-2"
  }
}


provider "aws" {
    # profile = "default" #disable when using github actions
    # access_key = ""
    # secret_key = ""
    region = "eu-west-2"
}