@echo off
echo "Configure AWS"
aws configure
echo "Enter required details for your project"
set /p region="Enter Region..: "
set /p buckname="Enter bucket name..: "
echo "Initializing"
terraform init
echo "Setting it up it will take few minutes...."
terraform apply -var region=%region% -var buckname="%buckname%" -auto-approve
cd ..
cd frontend
npm run build
aws s3 sync ./frontend/dist s3://%buckname%
cd ..
cd infrastructure
echo "Processing and fixing....."
terraform apply -var region=%region% -var buckname="%buckname%" -auto-approve
echo "Everything is ready...."
::To destroy everything
rem terraform destroy -auto-approve