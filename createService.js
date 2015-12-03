var appName = process.argv[2];
process.stdout.write(JSON.stringify({
  kind: "Service",
  apiVersion: "v1",
  metadata: {
    name: `${appName}`,
    labels: {
      name: `${appName}-service`
    }
  },
  spec: {
    ports: [{
      name: "http",
      port: 80,
      targetPort: 8080
    }
    // if you are doing https add that here
  ],
    selector: {
      name: appName
    },
    type: "LoadBalancer"
  }
}, false, 2));
