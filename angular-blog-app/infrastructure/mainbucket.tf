provider "aws" {
  region  = var.region
}

resource "aws_s3_bucket" "b1" {
    bucket = var.buckname
    force_destroy = true
    acl = "public-read"
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  policy = "${data.template_file.policy.rendered}"

}

data "template_file" "policy" {
  template = "${file("${path.module}/policy.json")}"
  vars = {
    buckname = var.buckname
  }
}

output "End_Point" {
  value="${aws_s3_bucket.b1.website_endpoint}"
}