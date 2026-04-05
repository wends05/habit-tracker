# Agent Guide

## Scope
- This repository is a monorepo with `backend/` for Encore Go services and `frontend/` for an Expo React Native app.
- Use this file as the repo-wide default for agentic work.
- Backend-specific guidance also exists in `backend/AGENTS.md` and `backend/.github/copilot-instructions.md`; keep new backend work aligned with them.
- No `.cursor/rules/` or `.cursorrules` files were found in this workspace.

## Layout
- `backend/` contains Encore services, auth, shared helpers, and generated `encore.gen.go` files.
- `frontend/` contains the Expo Router app, components, hooks, constants, assets, and Expo config.
- Keep generated files checked in only when the repo already tracks them.
- Do not move code between backend and frontend without a clear reason.
- Prefer small, local changes over broad refactors.

## Commands
### Backend
- `encore run` starts the backend locally.
- `encore check` runs compile-time validation.
- `encore test ./...` runs all backend tests.
- `encore test ./models/habits -run TestName -count=1` runs one test in one package.
- `encore test ./... -run '^TestName$' -count=1` runs one exact test across the repo.
- `encore test ./models/habits -run 'TestFoo|TestBar'` runs a regex subset of tests.
- Add `-v` when you need more output.
- Use Encore DB commands only when the task needs database access.
- If you add a backend test, keep it next to the package it covers.

### Frontend
- `npm run start` starts the Expo dev server.
- `npm run web` runs the web target.
- `npm run android` starts Android.
- `npm run ios` starts iOS.
- `npm run lint` runs the Expo ESLint check.
- `npm install` installs frontend dependencies.
- There is no dedicated frontend test script in `frontend/package.json` right now.

## Formatting
- Follow the formatter already implied by the codebase.
- Use 2-space indentation in TypeScript, TSX, JSON, and config files.
- Keep semicolons in TypeScript and TSX.
- Use single quotes in TypeScript and TSX unless the file already uses a different style.
- Keep trailing commas where the formatter emits them.
- Do not hand-format code into a style that fights the local conventions.

## Imports
- Group imports as standard library, third-party, then local project imports.
- Separate import groups with a blank line.
- Use the `@/` alias for frontend imports rooted at `frontend/`.
- Use full module paths for backend imports, such as `wends05/habit-tracker/backend/...`.
- Keep side-effect imports, like `react-native-reanimated`, near the top with the other external imports.
- Remove unused imports aggressively.

## Types
- The frontend TypeScript config is strict; preserve that expectation.
- Prefer `type` aliases for props, unions, and small data shapes.
- Use explicit types on exported functions, hooks, and component props when clarity helps.
- Avoid `any`; if it is unavoidable, keep it tightly scoped.
- Prefer literal union types for variants such as component `type` props.
- Keep data models small and serializable when they cross API boundaries.

## Naming
- Use PascalCase for React components, exported types, and exported structs.
- Use camelCase for functions, variables, and hook internals.
- Name hooks with a `use` prefix.
- Keep file names lowercase and hyphenated in the frontend, matching existing files like `themed-text.tsx` and `use-theme-color.ts`.
- Use Expo Router file conventions for routes, including `_layout.tsx`, `index.tsx`, and nested route folders.
- In Go, keep package names short, lowercase, and singular when possible.

## Error Handling
- Wrap internal errors with `%w` when adding context.
- Do not swallow errors; return them or handle them explicitly.
- In backend auth or API code, prefer structured Encore errors from `encore.dev/beta/errs` when the client should receive a specific code.
- Use `errs.Unauthenticated` for auth failures and `errs.InvalidArgument` for invalid user input when appropriate.
- Avoid leaking secrets, tokens, or raw connection strings in error messages.
- Keep error text concise and actionable.

## Backend Rules
- Keep Encore handlers on service methods when they need shared state.
- Use `//encore:service`, `//encore:api`, and `//encore:authhandler` only where they belong.
- Keep `context.Context` as the first parameter in backend handlers and helpers that do I/O.
- Prefer helper functions in `backend/shared/` for reusable logic.
- Validate IDs and other client input before hitting the database.
- Use `primitive.ObjectIDFromHex` or the shared helper pattern already present in `backend/shared/utils.go`.
- Keep Mongo and service initialization inside `initService()` or clearly named setup helpers.
- Return pointers for successful API payloads when the existing endpoint style does that.
- Use `time.Now()` consistently for timestamps unless a test or clock abstraction is needed.
- Keep database access and auth parsing inside backend packages rather than in route handlers.

## Frontend Rules
- Treat `frontend/app/` as the Expo Router source of truth.
- Prefer the shared themed primitives like `ThemedText` and `ThemedView` when they fit.
- Keep visual styling in `StyleSheet.create` unless a small inline style is clearer.
- Use the existing theme helpers and hooks before introducing new theme state.
- Preserve `typedRoutes` and `reactCompiler` assumptions from `frontend/app.json`.
- Keep React Native code compatible with Expo and the installed React Native version.
- Use the repo's component and hook patterns before inventing new abstractions.

## React And Expo
- Prefer small functional components.
- Keep route files thin and move reusable logic into `components/`, `hooks/`, or `constants/`.
- Use explicit props types on shared components.
- Prefer composition over prop explosion.
- Keep platform-specific variants in `.ios.tsx`, `.web.tsx`, or similar sibling files when needed.
- Preserve existing accessibility and navigation behavior when editing screens.

## Go And Encore
- Follow the service-per-package structure already used under `backend/models/`.
- Keep API request and response structs close to the handlers they support.
- Keep database and auth helpers focused and testable.
- Use the existing Mongo and JWT patterns unless there is a concrete reason to change them.
- Keep helper names descriptive, but not overly abstract.
- Favor clear control flow over cleverness.

## Testing Expectations
- Prefer running the smallest useful test scope before broader suites.
- For backend work, run the exact package or test you touched first.
- For frontend work, run `npm run lint` after changes that affect TS, TSX, or config.
- Add tests for bug fixes and behavior changes when the codebase has a natural place for them.
- Keep test names descriptive and stable.
- Use `-count=1` when you need to avoid cached Go test results.

## Agent Behavior
- Inspect nearby code before making assumptions.
- Match the local patterns rather than importing a new style.
- Keep diffs minimal unless the user asked for a broader cleanup.
- Do not edit generated, lock, or secret files unless the task clearly requires it.
- Never invent commands or scripts that are not supported by the repo unless you state they are external suggestions.
- When in doubt, prefer the simplest change that fully solves the problem.

## Source Rules Already In Repo
- `backend/AGENTS.md` and `backend/.github/copilot-instructions.md` both emphasize Encore-specific service, API, auth, database, and error-handling conventions.
- `backend/AGENTS.md` also states the backend should use modern Go practices and a service-oriented Encore structure.
- `frontend/package.json`, `frontend/tsconfig.json`, and `frontend/app.json` establish the Expo Router, strict TypeScript, and `@/*` alias conventions used here.
- If you update backend-specific guidance, keep the root guide and the backend copy aligned.
