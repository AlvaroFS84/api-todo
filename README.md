# API Todo

> ⚠️ **This repository is intended solely for learning and practice purposes.** It is not meant for production use and may contain incomplete features, experimental code, or non-optimized implementations.

---

## Overview

A RESTful API built with **Node.js**, **Express**, and **TypeScript**, following a **Clean Architecture** approach. The goal of this project is to practice backend development concepts such as:

- Clean Architecture & separation of concerns
- RESTful API design
- Repository pattern
- Unit and integration testing with **Vitest**
- SQLite as a lightweight local database

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express 5 | Web framework |
| TypeScript | Type safety |
| SQLite (better-sqlite3) | Local database |
| Vitest | Testing framework |
| Nodemon + ts-node | Development server |

---

## Project Structure

```
src/
├── application/       # Use cases (business logic)
├── domain/            # Entities and repository interfaces
└── infrastructure/    # Express routes, SQLite repository
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
npm install
```

### Run in development

```bash
npm run dev
```

The server will start at `http://localhost:3000`.

### Run tests

```bash
npm test
```

---

## Disclaimer

This project is a **practice exercise** and is not intended to be used in any production environment. Code quality, security, and performance have not been optimized beyond the scope of learning.
