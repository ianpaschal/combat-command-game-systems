# Common (Battlefront System)

This folder contains shared data, utilities and types for all game systems which use the "Battlefront System".

## Shared Components

### Data Types
- **Battle Plans** - Common battle plan definitions (attack, maneuver, defend) and metadata
- **Match Outcome Types** - Standardized match result outcome types (attack repelled, etc.)
- **Mission Names** - Shared mission names (e.g. "Breakthrough", "Hold the Pocket", etc.)
- **Ranking Factors** - Common ranking and scoring factors

### Utilities
- **createGameSystemUtils** - Factory function that generates game-specific utility functions
  - Eliminates code duplication between game systems
  - Provides consistent API across all Battlefront System games
  - Generates utilities like `getForceDiagramData`, `getMission`, `getMissionOptions`, etc.

## Game Systems

| Game | Status |
|------|--------|
| **Flames of War, 4th Edition** | ✅ Implemented |
| **Team Yankee, 2nd Edition** | ✅ Implemented |
| **Fate of Nation** | ❌ Not Implemented |
| **'Nam** | ❌ Not Implemented |
| **Checkpoint Charlie** | ❌ Not Implemented |
| **Great War** | ❌ Not Implemented |

## Architecture

Each game system (`flamesOfWarV4`, `teamYankeeV2`) imports the shared utilities and data from this module, then uses the `createGameSystemUtils` factory to generate game-specific utility functions that work with their own data structures.
This approach eliminates code duplication while maintaining type safety and game-specific functionality.
