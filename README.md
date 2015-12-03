# kubernetes-scripts

a set of kubernetes scripts I have in some of my projects for doing rolling updates and whatnot

Assumes that you update the version in your package.json each time you deploy.


needs to be called with the following env variables

- GCLOUD_PROJECT_ID: google project id
- CLUSTER_NAME: container engine cluster
- ZONE: compute zone

also has 2 optional ones

- BUILD: if set to true then the container is built, usually this should be set,
  only don't set it if you are building it once and deploying a couple places
- CREATE: if set to true then the initial replication controller and service is created.
