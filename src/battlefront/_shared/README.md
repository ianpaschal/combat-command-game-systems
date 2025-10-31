# Common (Battlefront System)

This folder contains shared data, utilities and types for all game systems which use the "Battlefront System".

## Shared Components

### Data Types
- **Battle Plans** - Common battle plan definitions (attack, maneuver, defend) and metadata
- **Match Outcome Types** - Standardized match result outcome types (attack repelled, etc.)
- **Mission Names** - Shared mission names (e.g. "Breakthrough", "Hold the Pocket", etc.)
- **Ranking Factors** - Common ranking and scoring factors

### Utilities
- **Factory Functions** - Individual factory functions that generate game-specific utility functions
  - `createGetForceDiagramData` - Factory for retrieving force diagram data
  - `createGetMission` - Factory for retrieving mission data
  - `createGetMissionOptions` - Factory for retrieving mission options
  - `createGetMissionMatrixOptions` - Factory for retrieving mission matrix options
  - `createGetMissionOutcomeOptions` - Factory for retrieving mission outcome options
  - `createGetMissionPack` - Factory for retrieving mission pack metadata
  - `isValidMissionPackVersion` - Validates mission pack versions
  - Eliminates code duplication between game systems
  - Provides consistent API across all Battlefront System games

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

Each game system (`flamesOfWarV4`, `teamYankeeV2`) imports the shared factory functions and data from this module, then uses the individual factory functions (e.g., `createGetMission`, `createGetMissionOptions`) to generate game-specific utility functions that work with their own data structures.
This approach eliminates code duplication while maintaining type safety and game-specific functionality.
