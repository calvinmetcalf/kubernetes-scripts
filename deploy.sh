#!/bin/bash

set -e

VERSION=$(node --eval "console.log(require('./package.json').version);")
APP_NAME=$(node --eval "console.log(require('./package.json').name);")
ME=`whoami`

gcloud config set project $GCLOUD_PROJECT_ID

gcloud config set container/cluster $CLUSTER_NAME

gcloud config set compute/zone $ZONE

gcloud container clusters get-credentials $CLUSTER_NAME


if [ "$BUILD" = "true" ]; then
  node xVersion.js
  docker build -t $ME/$APP_NAME:$VERSION .
  rm package2.json
fi

docker tag -f $ME/$APP_NAME:$VERSION gcr.io/$GCLOUD_PROJECT_ID/$APP_NAME:$VERSION

gcloud docker push gcr.io/$GCLOUD_PROJECT_ID/$APP_NAME:$VERSION

if [ "$CREATE" = "true" ]; then
  node createPod.js $VERSION $APP_NAME | kubectl create -f -
  node createService.js $APP_NAME | kubectl create -f -
else
  PREV_VERSION=$(kubectl get rc | grep $APP_NAME-controller | awk '{ print $1; }')
  node createPod.js $VERSION $APP_NAME > config.json
  kubectl rolling-update $PREV_VERSION -f config.json
  rm config.json
fi
