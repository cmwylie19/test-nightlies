# Release me

Build Docker image

```bash
docker build -t test-nightlies:v0.0.0 .
```

Run Docker Container

```bash
docker run -p 9999:9999 test-nightlies:v0.0.0 node main.js serve -p 9999
```
