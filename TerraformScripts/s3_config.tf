
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
              "Resource": "arn:aws:s3:::${aws_s3_bucket.s3_bkt.id}/*"
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

locals {
  files = fileset("..//WebPages//build", "**/*")
}

resource "aws_s3_object" "s3_object" {
  bucket = aws_s3_bucket.s3_bkt.id
  for_each = { for file in local.files : file => file }

  key = each.key
  source = "..//WebPages//build/${each.value}"

  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  etag = filemd5("..//WebPages//build/${each.value}")

  # This must be investigated to see if any file types are being left out
  content_type = lookup({
    ".html" = "text/html",
    ".css"  = "text/css",
    ".js"   = "application/javascript",
    ".png"  = "image/png",
    ".jpg"  = "image/jpeg"
  }, regex("\\.[^.]+$", each.value), "binary/octet-stream")
}
