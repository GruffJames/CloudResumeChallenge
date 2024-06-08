
resource "aws_s3_bucket" "s3_bkt" {
  
  bucket = "gruffjm-cloud-res-bkt"
  tags = {
    name = "me bucket"
    Environment = "dev"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_open_bckt" {
  bucket = aws_s3_bucket.s3_bkt.id

  block_public_acls = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "s3_bkt_policy" {
  bucket = aws_s3_bucket.s3_bkt.id
  policy = jsonencode(
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid": "PublicReadGetObject",
              "Effect": "Allow",
              "Principal": "*",
              "Action": "s3:GetObject",
              "Resource": "arn:aws:s3:::gruffjm-cloud-res-bkt/*"
          }
      ]
    }
  )
}

resource "aws_s3_bucket_cors_configuration" "s3_cors_config" {
  bucket = aws_s3_bucket.s3_bkt.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers = []
  }
}

resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.s3_bkt.id
  index_document {
    suffix = "index.html"
  }
}