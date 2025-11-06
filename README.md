# Grenade – Quick Vote - Backend

**Grenade** is a simple collaborative application that allows team members to propose ideas and vote for their favorites.
The backend is built with **Node.js/TypeScript** using a **serverless architecture** (AWS Lambda, DynamoDB, API Gateway) and exposes a **GraphQL API**.

---

## Features

* **Propose an idea** – Create a new idea with text; votes start at 0 by default.
* **List all ideas** – Retrieve existing ideas.
* **Vote for an idea** – Increment the vote count for a specific idea.

---

## Tech Stack

* **Backend**: Node.js, TypeScript
* **API**: GraphQL (Apollo Server / GraphQL Yoga)
* **Database**: DynamoDB (AWS)
* **Deployment**: AWS Lambda + API Gateway
* **CI/CD**: GitHub Actions
* **Unit Testing (TDD)**: Vitest

---

## Project Structure

```
backend/
 ├─ src/
 │   ├─ models/Idea.ts             # Idea model
 │   ├─ resolvers/ideaResolver.ts  # Business logic (CRUD for ideas)
 │   └─ index.ts                   # Main entry point (GraphQL server)
 ├─ tests/
 │   └─ idea.test.ts               # Unit tests
 ├─ .github/workflows/ci.yml       # GitHub Actions CI pipeline
 ├─ package.json
 └─ tsconfig.json
```

---

## Tests (TDD)

Tests are written with **Vitest** and run automatically via **GitHub Actions**.

Run tests locally:

```bash
npm install
npm test
```

Example test cases:

* `createIdea()` → ensures an idea has an `id`, `text`, and `votes = 0`.
* `getIdeas()` → returns a correctly typed list of ideas.
* `voteIdea()` → increments the vote counter.

---

## CI/CD

Each **push to `main`** triggers a GitHub Actions pipeline:

1. Install dependencies
2. Run unit tests
3. Automatically deploy to AWS Lambda

---

## Roadmap

* [x] TDD with Vitest
* [x] CI setup with GitHub Actions (tests)
* [x] Deployment to AWS Lambda + API Gateway
* [x] Monitoring with CloudWatch
* [x] Connection to real DynamoDB instance

---

## License

This project was created as part of a fullstack and cloud learning journey.
Free to use and adapt.
