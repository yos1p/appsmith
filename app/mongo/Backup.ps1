# Get current date
$CurrentDate = Get-Date -Format "yyyyMMdd"

Remove-Item -Path "C:\Convo.ui\container-volumes\mongo\backup\dump" -Recurse
Remove-Item -Path "C:\HRMS.ui\container-volumes\mongo\backup\dump" -Recurse

cd "C:\Convo.ui"
# Execute the docker command from cmd.exe
docker compose exec -it mongo mongodump --host=localhost --port=27017 --authenticationDatabase="admin" -u="root" -p="MySecretPassword1234" --db="appsmith" --out="/bitnami/mongodb/backup/dump"

# Create a new folder with the current date
New-Item -Path "C:\Convo.ui\backups\$CurrentDate" -ItemType Directory

# Copy the dump folder to the new folder
Copy-Item -Path "C:\Convo.ui\container-volumes\mongo\backup\dump" -Destination "C:\Convo.ui\backups\$CurrentDate" -Recurse

# Copy dump to C:\HRMS.ui\container-volumes\mongo\backup
Copy-Item -Path "C:\Convo.ui\container-volumes\mongo\backup\dump" -Destination "C:\HRMS.ui\container-volumes\mongo\backup\dump" -Recurse

cd "C:\HRMS.ui"
docker compose exec -it mongo mongorestore  --host=localhost --port=27017 --authenticationDatabase="admin" -u="root" -p="MySecretPassword1234" --nsInclude="appsmith.*" --drop /bitnami/mongodb/backup/dump 