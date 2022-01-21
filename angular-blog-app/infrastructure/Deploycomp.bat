@echo off
echo "Enter required details for your project"
set /p region="Enter Region..: "
set /p buckname="Enter bucket name..: "
echo "Initializing"
terraform init
echo "Setting it up it will take few minutes...."
terraform apply -var region=%region% -var buckname="%buckname%" -auto-approve
@REM cd ..
@REM cd frontend
@REM npm run build
aws s3 sync ../frontend/dist/frontend s3://%buckname%
@REM cd ..
@REM cd infrastructure
echo "Processing and fixing....."
terraform apply -var region=%region% -var buckname="%buckname%" -auto-approve
echo "Everything is ready...."
::To destroy everything
rem terraform destroy -auto-approve