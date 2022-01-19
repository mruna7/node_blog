@echo off
echo "Configure AWS"
aws configure
echo "Enter required details for your project"
set /p region="Enter Region..: "
set /p logbuckname="Enter log bucket name..: "
set /p buckname="Enter bucket name..: "
echo "Initializing"
terraform init
echo "Setting it up it will take few minutes...."
terraform apply -var region=%region% -var logbuckname="%logbuckname%" -var buckname="%buckname%" -auto-approve
aws s3 sync ./frontend/build s3://%buckname%
echo "Processing and fixing....."
terraform apply -var region=%region% -var logbuckname="%logbuckname%" -var buckname="%buckname%" -auto-approve
echo "Everything is ready...."
::To destroy everything
rem terraform destroy -auto-approve