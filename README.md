# Elevate AI Solutions — Fire Data Modernization Landing Page

React/Vite landing page for the Elevate AI Solutions public safety fire campaign.

Planned domain:

```text
https://fire.elevate-aisolutions.com
```

## What this page does

- Presents the Fire Data Modernization / NERIS Readiness offer
- Uses Elevate AI Solutions branding and public safety dashboard visuals
- Captures fire department lead information
- Supports a future AWS backend endpoint using `VITE_LEAD_ENDPOINT`

## Local setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The build output will be in `dist/`.

## Amplify Hosting setup

1. Push this project to GitHub.
2. In AWS Amplify, choose **Host web app**.
3. Connect the GitHub repository.
4. Use these build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

5. After deployment, add the custom subdomain:

```text
fire.elevate-aisolutions.com
```

6. Add the CNAME / verification records Amplify provides into Bluehost DNS.

## Lead form backend

For testing, if `VITE_LEAD_ENDPOINT` is empty, the form saves test submissions to browser `localStorage`.

For production, create an AWS endpoint such as:

```text
API Gateway → Lambda → DynamoDB + SES email alert
```

Then set the Amplify environment variable:

```text
VITE_LEAD_ENDPOINT=https://your-api-url
```

## Suggested DynamoDB fields

- leadId
- campaign
- source
- firstName
- lastName
- title
- agency
- city
- state
- email
- phone
- system
- interest
- challenge
- submittedAt
