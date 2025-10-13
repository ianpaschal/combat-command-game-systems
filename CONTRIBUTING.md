# Contributing to Combat Command Static Data

Thank you for your interest in contributing to the Combat Command Static Data package!
This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Adding New Game Systems](#adding-new-game-systems)
- [Adding New Data Types](#adding-new-data-types)
- [Testing](#testing)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

This project follows a code of conduct that ensures a welcoming environment for all contributors.
Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 8 or higher)
- Git

### Fork and Clone

1. Fork the repository on GitHub.
2. Clone your fork locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/combat-command-game-systems.git
    cd combat-command-game-systems
    ```
3. Add the upstream repository:
    ```bash
    git remote add upstream https://github.com/ianpaschal/combat-command-game-systems.git
    ```

## Development Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Build the project:
    ```bash
    npm run build
    ```

3. Run tests to ensure everything works:
    ```bash
    npm test
    ```

4. Run linting:
    ```bash
    npm run lint
    ```

## Project Structure

```
src/
├── battlefront/          # Battlefront System game data
│   ├── _shared/          # Shared utilities and data
│   │   ├── _internal/    # Internal utilities (not exported)
│   │   ├── data/         # Shared data types
│   │   ├── helpers/      # Utility functions
│   │   └── schema/       # Zod schemas for validation
│   ├── flamesOfWarV4/    # Flames of War 4th Edition
│   └── teamYankeeV2/     # Team Yankee 2nd Edition
└── common/               # Cross-system shared data
```

### Key Principles

- **Type Safety**: All data is strongly typed with TypeScript
- **Validation**: Data is validated using Zod schemas
- **Consistency**: Shared utilities eliminate code duplication
- **Modularity**: Each game system is self-contained but shares common patterns

## Adding New Game Systems

To add a new game system (e.g., "Fate of Nations"):

1. **Create the game system directory**:
    ```bash
    mkdir src/battlefront/fateOfNations
    ```

2. **Add required files**:
    - `index.ts` - Main exports
    - `schema/gameSystemConfig.ts` - Game system configuration
    - `schema/matchResultDetails.ts` - Match result schema
    - `data/` directory with game-specific data files

3. **Follow the established pattern**:
    ```typescript
    // src/battlefront/fateOfNations/index.ts
    import { createGameSystemUtils } from '../_shared/_internal/createGameSystemUtils';
    import { gameSystemConfig } from './schema/gameSystemConfig';
    import * as data from './data';

    export const FateOfNations = createGameSystemUtils(gameSystemConfig, data);
    export * from './schema';
    export * from './data';
    ```

4. **Update the main index**:
    ```typescript
    // src/index.ts
    export * as FateOfNations from './battlefront/fateOfNations';
    ```

5. **Add to package.json exports**:
    ```json
    {
      "exports": {
        "./fateOfNations": "./dist/battlefront/fateOfNations/index.js"
      }
    }
    ```

## Adding New Data Types

### For Battlefront System Games

1. **Create the data file** in `src/battlefront/_shared/data/`:
    ```typescript
    // src/battlefront/_shared/data/newDataType.ts
    export const newDataType = [
      { id: 'example', name: 'Example' },
      // ... more data
    ] as const;
    ```

2. **Add TypeScript types** in `src/battlefront/_shared/types.ts`:
    ```typescript
    export type NewDataType = typeof newDataType[number];
    ```

3. **Create Zod schema** in `src/battlefront/_shared/schema/`:
    ```typescript
    import { z } from 'zod';
   
    export const newDataTypeSchema = z.object({
      id: z.string(),
      name: z.string(),
    });
    ```

### For Common Data

1. **Create the data file** in `src/common/`:
    ```typescript
    // src/common/newCommonData.ts
    export const newCommonData = [
      { id: 'example', name: 'Example' },
    ] as const;
    ```

2. **Add to common types** in `src/common/types.ts`

3. **Export from common index** in `src/common/index.ts`

## Testing

### Writing Tests

- Tests should be placed alongside the code they test with `.test.ts` extension
- Use Vitest for testing framework
- Test both happy path and edge cases
- Aim for high test coverage

Example test structure:
```typescript
import { describe, it, expect } from 'vitest';
import { functionToTest } from './moduleToTest';

describe('functionToTest', () => {
  it('should handle normal case', () => {
    const result = functionToTest('input');
    expect(result).toBe('expected');
  });

  it('should handle edge case', () => {
    const result = functionToTest('');
    expect(result).toBe('expected');
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## Code Style

### TypeScript

- Use strict TypeScript configuration.
- Prefer `const` assertions for data arrays.
- Use proper type definitions and avoid `any`.
- Follow the existing naming conventions.

### ESLint

The project uses ESLint with the following plugins:
- `@typescript-eslint` - TypeScript-specific rules
- `@stylistic` - Code formatting rules
- `eslint-plugin-import` - Import/export rules
- `eslint-plugin-simple-import-sort` - Import sorting

Run linting:
```bash
npm run lint
```

### File Organization

- Group related functionality together
- Use barrel exports (`index.ts`) for clean imports
- Keep data files separate from logic files
- Use descriptive file and function names

## Pull Request Process

1. **Create a feature branch**:
    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make your changes**:
    - Write code following the established patterns
    - Add tests for new functionality
    - Update documentation as needed

3. **Test your changes**:
    ```bash
    npm run lint
    npm test
    npm run build
    ```

4. **Commit your changes**:
    ```bash
    git add .
    git commit -m "feat: add new game system support"
    ```

5. **Push to your fork**:
    ```bash
    git push origin feature/your-feature-name
    ```

6. **Create a Pull Request**:
    - Use a clear, descriptive title
    - Provide a detailed description of changes
    - Reference any related issues
    - Ensure all CI checks pass

## Getting Help

- Check existing issues and pull requests
- Create a new issue for bugs or feature requests
- Ask questions in issue discussions

Thank you for contributing to Combat Command Static Data!

---

## Publishing (Maintainers Only)

Releases are handled by the maintainer.

### Set-Up

Create `.npmrc`:
```
@ianpaschal:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken={YOUR_GITHUB_PAT}
```

### Release Workflow

1. Ensure all changes are committed before publishing.
2. `npm login --registry=https://npm.pkg.github.com`
3. `npm run build`
4. `npm version [patch|minor|major] && git push && git push --tags`
5. `npm publish`

### Version Guidelines

- **Patch** (x.x.X): Bug fixes, small improvements
- **Minor** (x.X.x): New features, new data types
- **Major** (X.x.x): Breaking changes, new game systems