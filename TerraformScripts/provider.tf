
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

# Default provider for all resources
provider "aws" {
  region = "eu-west-2"
}

# Provider for ACM certificates, that must be in us-east-1
provider "aws" {
  region = "us-east-1"
  alias  = "us_east_1"  
}