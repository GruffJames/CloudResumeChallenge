
locals {
  CNAME_gruff_james_dev = "gruff-james.dev"
  URL_gruff_james_dev = "https://${local.CNAME_gruff_james_dev}"
}

resource "aws_route53_zone" "main" {
  name = local.CNAME_gruff_james_dev
}

resource "aws_route53_record" "dev-a" {
  zone_id = aws_route53_zone.main.zone_id
  name    = local.CNAME_gruff_james_dev
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_acm_certificate" "cert" {
  provider = aws.us_east_1
  domain_name = local.CNAME_gruff_james_dev
  validation_method = "DNS"

  subject_alternative_names = [
    "${local.CNAME_gruff_james_dev}", 
    "*.${local.CNAME_gruff_james_dev}"
  ] 

  tags = {
    Environment = "prod"
  }

  lifecycle {
    create_before_destroy = true
  }
  
}