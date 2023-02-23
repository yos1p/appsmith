#!/bin/bash
# Configure the AWS & kubectl environment

mkdir ~/.aws; touch ~/.aws/config

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY

export AWS_REGION=ap-south-1
export AWS_DEFAULT_OUTPUT=json

export region=ap-south-1
export cluster_name=uat-cluster

echo "Region: $region"
echo "Cluster name: $cluster_name"
echo "Pull Request Number: $PULL_REQUEST_NUMBER"

sts_output=$(aws sts assume-role --role-arn "$AWS_ROLE_ARN" --role-session-name dp-session-script)

export AWS_ACCESS_KEY_ID="$(echo "$sts_output" | jq -r '.Credentials.AccessKeyId')"
export AWS_SECRET_ACCESS_KEY="$(echo "$sts_output" | jq -r '.Credentials.SecretAccessKey')"
export AWS_SESSION_TOKEN="$(echo "$sts_output" | jq -r '.Credentials.SessionToken')"

aws eks update-kubeconfig --name "$cluster_name" --role-arn "$AWS_ROLE_ARN"

### Get list of helm charts
deployed_charts="$(helm ls -A | awk '/ce/ {print $2}')"

for i in $deployed_charts
  do 
    pr=$(echo $i | cut -c 3-);
    pr_status_output=$(gh pr view $pr --json state)
    pr_state=$(echo $pr_status_output | jq -r 'values[]');
    echo $pr_state
    if [[ $pr_state == "MERGED" ]]
    then
      echo "helm uninstall $i -n $i"
    fi
  done