# Playwright automation practice suite

This repository is a learning and experimentation project for browser and API testing with Playwright. It uses the Rahul Shetty Academy demo applications for repeatable practice flows and keeps the original tutorial exercises alongside the more structured Page Object Model examples.

## What it demonstrates

- Page Object Model classes for login, dashboard, cart, and checkout flows.
- UI login, API login, local-storage token injection, and saved `storageState` sessions.
- Data-driven product flows and reusable utilities.
- Multiple browser contexts for parallel user-role scenarios.
- Playwright screenshots on failure and traces on the first retry.

This is a practice repository, not a production test framework or client project. The public demo application is the system under test.

## Repository layout

```text
e2eWithPOM/       Structured Page Object Model examples and authentication patterns
tests/RahulShetty/ Course exercises covering UI, API, assertions, and locators
tests-examples/   Playwright's TodoMVC example suite
jsLearning/       JavaScript language practice notes and examples
utils/            Shared API and helper experiments
```

The longer POM/template notes remain in [`e2eWithPOM/README.md`](e2eWithPOM/README.md).

## Setup

```bash
npm ci
npx playwright install
```

The demo credentials and saved session state are local-only fixtures. Keep them out of future commits and provide equivalent local files when setting up a fresh clone.

## Running the configured POM suite

```bash
npm test              # headless run
npm run test:headed   # headed run
npm run test:ui       # Playwright UI mode
```

The active Playwright configuration discovers tests under `e2eWithPOM/tests`. The tutorial suites can be run explicitly by passing a path to `npx playwright test`.

## Current scope

The focus is learning test architecture and Playwright capabilities: selectors, page objects, API-assisted authentication, browser contexts, session reuse, and end-to-end purchase flows. Some examples intentionally remain small or exploratory because this repository preserves the learning history.
