# PROCEDURE TO DEPLOY APPLICATION

# Frondend Installation
1.	Use command: ng build  - -prod to compile code for # Production Build
2.	A new folder named dist will be created
3.	Zip the dist folder
4.	Install nginx with the below commands
#!/bin/bash
sudo apt-get update
# install nginx
sudo apt update
sudo apt install -y nginx
sudo ufw allow 'Nginx HTTP'
# Install AWS-CLI with the below commands
# install AWS-CLI
sudo apt install -y unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
# Upload the latest dist.zip folder on AWS S3 Bucket
# Bucket created on AWS will be “mkt-msos-data-prod”
# Move the dist.zip folder uploaded on the S3 Bucket on Nginx server set up on AWS
# Use the following command to transfer UI folder from bucket to Nginx server:
 mkdir mkt-msos-ui
aws s3 cp s3:// mkt-msos-data-prod /dist.zip mkt-msos-ui
sudo cp mkt-msos-ui/prod-UI.zip /var/www/html
# Unzip the dist folder using command “sudo unzip /var/www/html/dist.zip”
# Once the folder is unzipped it will show all the html , css and js files.
# The website will be working now and it will fetch the index.html to execute the UI.
# Database Installation
# Install PostgreSQL DB Client
sudo apt install -y postgresql-client-common
sudo apt install -y postgresql-client
Backend Installation
# Install Python3 and dependencies
sudo apt update
sudo apt install -y software-properties-common
sudo apt install -y python3
sudo apt install -y python3-pip
sudo pip3 install gekko
sudo pip3 install pandas
sudo pip3 install matplotlib
sudo pip3 install Flask
sudo pip3 install -U flask-cors
# Install remaining python dependencies 
asn1crypto==0.24.0
attrs==17.4.0
Automat==0.6.0
blinker==1.4
certifi==2020.6.20
chardet==3.0.4
click==7.1.2
cloud-init==20.2
colorama==0.3.7
command-not-found==0.3
configobj==5.0.6
constantly==15.1.0
cryptography==2.1.4
cycler==0.10.0
distro-info===0.18ubuntu0.18.04.1
ec2-hibinit-agent==1.0.0
Flask==1.1.2
Flask-Cors==3.0.9
gekko==0.2.8
gunicorn==19.7.1
hibagent==1.0.1
httplib2==0.9.2
hyperlink==17.3.1
idna==2.6
incremental==16.10.1
itsdangerous==1.1.0
Jinja2==2.11.2
jsonpatch==1.16
jsonpointer==1.10
jsonschema==2.6.0
keyring==10.6.0
keyrings.alt==3.0
kiwisolver==1.2.0
language-selector==0.1
MarkupSafe==1.1.1
matplotlib==3.3.1
netifaces==0.10.4
numpy==1.19.1
oauthlib==2.0.6
PAM==0.4.2
pandas==1.1.1
Pillow==7.2.0
pyasn1==0.4.2
pyasn1-modules==0.2.1
pycrypto==2.6.1
pygobject==3.26.1
PyJWT==1.5.3
pyOpenSSL==17.5.0
pyparsing==2.4.7
pyserial==3.4
python-apt==1.6.5+ubuntu0.3
python-dateutil==2.8.1
python-debian==0.1.32
pytz==2020.1
pyxdg==0.25
PyYAML==3.12
requests==2.18.4
requests-unixsocket==0.1.5
SecretStorage==2.3.1
service-identity==16.0.0
six==1.15.0
ssh-import-id==5.7
systemd-python==234
Twisted==17.9.0
ufw==0.36
unattended-upgrades==0.1
urllib3==1.22
Werkzeug==1.0.1
xlrd==1.2.0
zope.interface==4.3.2
# Use the following command to transfer backend folder from bucket to flaskapp directory:
sudo mkdir /home/backend
sudo mkdir /home/backend/flaskapp 
sudo aws s3 cp s3:// mkt-msos-data-prod /backend.zip /home/backend/flaskapp
# Unzip the ‘backend’ folder using command “sudo unzip /home/backend/flaskapp/backend.zip”
# Open the ports for the backend Api’s
# Run the backend python programs for Business Summary, Scenario planner and optimization from below directory
/home/backend/flaskapp/backend


