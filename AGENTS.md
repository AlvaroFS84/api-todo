# AGENTS.md - Developer Guidelines for api-todo

## Project Overview

This is a TypeScript Express API with SQLite database implementing a Todo application using Clean Architecture patterns (Domain, Application, Infrastructure layers).

## Commands

### Build & Run
```bash
npm run build    # Compile TypeScript to dist/
npm run start    # Run compiled app from dist/main.js
npm run dev      # Run in development with nodemon (watch mode)
```

### Testing
```bash
npm test         # Run tests in watch mode (vitest)
npm run test:run # Run tests once (CI mode)
npm run test:coverage # Run tests with coverage report
```

#### Running a Single Test
```bash
# Run a specific test file
npx vitest run test/application/useCases/CreateTodoUseCase.test.ts

# Run tests matching a pattern
npx vitest run --grep "CreateTodoUseCase"

# Run a specific test by name
npx vitest run -t "should create a todo successfully"
```

## Code Style Guidelines

### TypeScript Configuration
- Target: ES2020, CommonJS modules
- Strict mode enabled (no implicit any, strict null checks, etc.)
- Always use explicit types; avoid `any` unless absolutely necessary

### Project Structure
```
src/
├── main.ts                    # Application entry point
├── domain/
│   ├── entities/              # Domain models (Todo.ts)
│   └── repositories/          # Repository interfaces
├── application/
│   ├── dtos/                  # Data Transfer Objects
│   └── useCases/              # Business logic use cases
└── infrastructure/
    ├── database/              # Database initialization
    ├── repositories/          # Repository implementations
    └── routes/                # Express routes
test/
└── (mirrors src structure)
```

### Naming Conventions
- **Files**: camelCase (e.g., `createTodoUseCase.ts`)
- **Classes**: PascalCase (e.g., `CreateTodoUseCase`)
- **Interfaces**: PascalCase with `DTO`, `Props`, `Repository` suffixes
- **Functions/variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE

### Imports
- Use relative imports with `../../` pattern (not path aliases)
- Order imports: external libs → internal modules
- Example:
```typescript
import express from 'express';
import { GetAllTodosUseCase } from '../../application/useCases';
import { SqliteTodoRepository } from '../repositories/SqliteTodoRepository';
```

### Classes & Types
- Use `class` for use cases and repositories
- Use `interface` for DTOs, entities, and repository contracts
- Use `export interface` for shared types
- Constructor injection for dependencies:
```typescript
export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}
}
```

### DTOs
- Create separate DTOs for input (CreateTodoDTO, UpdateTodoDTO) and output (TodoResponseDTO)
- Use optional properties for partial updates
- Response DTOs should serialize dates to strings (ISO format)

### Error Handling
- Throw `Error` with descriptive messages in use cases
- Routes catch errors and return appropriate HTTP status codes:
  - 400 for validation errors
  - 404 for not found
  - 500 for internal server errors
- Always check `error instanceof Error` before accessing message

### Database
- Use `better-sqlite3` for synchronous SQLite operations
- Repository pattern with interface in domain, implementation in infrastructure
- Use parameterized queries to prevent SQL injection
- Initialize database in `src/infrastructure/database/index.ts`

### Testing
- Use Vitest with `describe`, `it`, `expect` syntax
- Use `vi.fn()` for mocks, `vi.mocked()` for type-safe mocks
- Create mock repositories for use case tests
- Use `beforeEach` to reset mocks
- Test file location: `test/` mirroring `src/` structure

### Express Routes
- Use async/await for route handlers
- Return proper HTTP status codes:
  - 200 for successful GET/PUT
  - 201 for POST
  - 204 for DELETE
  - 400 for bad request
  - 404 for not found
  - 500 for errors
- Parse route params safely: `Array.isArray(req.params.id) ? req.params.id[0] : req.params.id`

### General Rules
- No comments unless explaining complex business logic
- Keep functions small and focused (single responsibility)
- Use async/await, never callbacks
- Validate input in use cases, not in routes
- Use `const` by default, `let` only when reassignment is needed
- Prefer early returns to reduce nesting

## Dependencies
- express: ^5.2.1
- better-sqlite3: ^12.8.0
- vitest: ^4.1.0 (dev)
- typescript: ^5.9.3
- supertest: ^7.2.2 (dev)
