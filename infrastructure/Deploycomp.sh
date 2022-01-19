#!/bin/sh
echo "Configure AWS"
aws configure
echo "Enter region..:"
read region
echo ="Enter log bucket name..: "
read logbuckname
echo ="Enter bucket name..: "
read buckname
echo "Initializing"
terraform init
echo "Setting it up it will take few minutes...."
terraform apply -var region=$region -var logbuckname=$logbuckname -var buckname=$buckname -auto-approve
aws s3 sync react-frontend/build s3://$buckname
echo "Processing....."
terraform apply -var region=$region -var logbuckname=$logbuckname -var buckname=$buckname -auto-approve
echo "Everything is ready...."
#To destroy everything
#terraform destroy -auto-approve