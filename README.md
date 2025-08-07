# Combat Command: Game Systems

This package includes game system configurations, mission data, faction information, and utility functions for various game systems on **[Combat Command](https://www.combatcommand.net)**.

## Supported Game Systems

| Game System | Status |
|-------------|--------|
| **Flames of War, 4th Ed.** | ✅ Complete |
| **Team Yankee, 2nd Ed.** | ⚠️ Usable, but missing Units |
| **Fate of a Nation** | 🚧 Planned |
| **'Nam** | 🚧 Planned |
| **Checkpoint Charlie** | 🚧 Planned |
| **Great War** | 🚧 Planned |

## Features

- **Type-Safe Data**: Fully typed with TypeScript for ideal DX.
- **Validation**: Built-in data validation using Zod schemas.
- **Modular Architecture**: Clean separation between game systems and shared utilities.
- **Tree-Shakable**: Optimized for modern bundlers with ESM support.

## Installation

This package is published to GitHub Packages.
To install:

1. **Generate a GitHub Personal Access Token**:
    - Go to [GitHub Tokens](https://github.com/settings/tokens).
    - Generate a token with `read:packages` scope.
    - If the repository is private, also include `repo` scope.

2. **Configure npm authentication**:
    ```bash
    npm login --registry=https://npm.pkg.github.com
    ```

3. **Install the package**:
    ```bash
    npm install @ianpaschal/combat-command-game-systems
    ```

### For Vercel Deployment

1. **Set environment variable** in Vercel project settings:
    - Key: `NPM_TOKEN`
    - Value: `your GitHub PAT`
    - Environment: Production, Preview, and Development

2. **Create `.npmrc` file** in your project root:
    ```
    @ianpaschal:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=${NPM_TOKEN}
    ```

## Usage

### Example: Working with Flames of War Data

```typescript
import {
  Faction,
  getFactionDisplayName,
  getFactionOptions,
} from '@ianpaschal/combat-command-game-systems/flamesOfWarV4';

// Get all faction options
const factionOptions = getFactionOptions();
console.log(factionOptions); // Array of select items ({value: Faction; displayName: string;})

// Get a specific faction's display name
const displayName = getFactionDisplayName(Faction.GreatBritain);
console.log(displayName); // "Great Britain"
```

### Example: Working with Common Data

```typescript
import {
  getTournamentPairingMethodOptions,
} from '@ianpaschal/combat-command-game-systems/common';

// Get tournament pairing method options
const pairingMethodOptions = getTournamentPairingMethodOptions();
console.log(pairingMethodOptions);
```

## Architecture

### Project Structure

Game systems are stored according to the following format: `./src/{publisher}/{gameSystem}`.

This folder should be structured similarly to a game system folder.

```
/
├── _internal/    # Internal utilities (createGameSystemUtils)
├── data/         # Shared data types (battle plans, missions, etc.)
├── helpers/      # Utility functions (calculateMatchResultScore(), etc.)
└── schema/       # Zod validation schemas
    ├── gameSystemConfig.ts    # MUST BE PRESENT!
    └── matchResultDetails.ts  # MUST BE PRESENT!
```

Within each publisher folder, there can also be a `_shared` folder which is structured the same as a game system folder, but contains assets (enums, utility functions, etc.) which are used by multiple game systems from that publisher.

## Contributing

Would you like to add a game system?
Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed guidelines.

## License

This project is licensed under UNLICENSED. See `package.json` for details.
