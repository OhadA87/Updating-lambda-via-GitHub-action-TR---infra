terraform {
  backend "s3" {
    bucket = "demotfstatebucket"
    key    = "tfstate/terraform.tfstate"
    region = "eu-west-1"
  }
}
