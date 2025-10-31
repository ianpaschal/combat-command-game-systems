# Common

This folder contains shared data types, enums, and utilities that are used across all game systems and tournament management features.

## Shared Components

### Data Types
- **Currency Codes** - International currency codes (EUR, USD, GBP, etc.) for tournament entry fees and prizes
- **Game Systems** - Registry of all supported game systems (Flames of War, Team Yankee, etc.)
- **Tournament Pairing Methods** - Methods for pairing players in tournaments (adjacent, random)
- **Tournament Round Phases** - Phases of tournament rounds (pairing, set-up, playing, completed)

### Utilities
- **getGameSystem** - Retrieves game system configuration and schemas
- **validateGameSystemConfig** - Validates game system configuration data using Zod schemas
- **validateMatchResultDetails** - Validates match result details using Zod schemas
