'use strict';
var version = process.argv[2];
var appName = process.argv[3];
var pod = {
  metadata: {
    name: `${appName}-controller-${version}`,
    labels: {
      name: `${appName}-pod`
    }
  },
  kind: "ReplicationController",
  apiVersion: "v1",
  spec: {
    replicas: 4, // <---- you probably want to update this
    selector: {
      name: appName
      version: version
    },
    template: {
      metadata:{
        labels: {
          name: appName,
          version: version
        }
      },
      spec: {
        containers: [{
          name: appName,
          image: `gcr.io/${process.env.GCLOUD_PROJECT_ID}/${appName}:${version}`,
          // readinessProbe: {
          //   httpGet: {
          //     path: "/ping",
          //     port: 8080
          //   }
          // },
          // livenessProbe: {
          //   httpGet: {
          //     path: "/ping",
          //     port: 8080
          //   },
          //   initialDelaySeconds: 60
          // },
          env: []
        }]
      }
    }
  }
}
var envs = [
  'DEBUG', 'NODE_ENV'
];
envs.forEach(function (envar) {
  if (process.env[envar]) {
    pod.spec.template.spec.containers[0].env.push({
      name: envar,
      value: process.env[envar]
    });
  }
});
process.stdout.write(JSON.stringify(pod, false, 2));
