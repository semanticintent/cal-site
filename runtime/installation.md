# Installation

Get the CAL Runtime up and running in your project.

## Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **TypeScript** 5.x (if using TypeScript)

## Package Installation

### NPM

```bash
npm install @stratiqx/cal-runtime
```

### Yarn

```bash
yarn add @stratiqx/cal-runtime
```

### PNPM

```bash
pnpm add @stratiqx/cal-runtime
```

## Global CLI Installation

To use the `cal` command globally:

```bash
npm install -g @stratiqx/cal-runtime
```

Verify installation:

```bash
cal --version
# CAL (Cormorant Agentic Language) v0.1.0
```

## Project Setup

### Initialize a New CAL Project

```bash
# Create project directory
mkdir my-cal-project
cd my-cal-project

# Initialize npm project
npm init -y

# Install CAL runtime
npm install @stratiqx/cal-runtime

# Create project structure
mkdir data scripts output
```

### TypeScript Setup

If you're using TypeScript, create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Verify Installation

Create a test script `test.ts`:

```typescript
import { compile } from '@stratiqx/cal-runtime';

const result = compile('FORAGE entities SURFACE results');

if (result.success) {
  console.log('✅ CAL Runtime installed successfully!');
  console.log('Action plan:', result.actionPlan);
} else {
  console.error('❌ Installation verification failed');
}
```

Run it:

```bash
npx tsx test.ts
# or with ts-node:
npx ts-node test.ts
```

## Development Dependencies

For development, you may want these additional packages:

```bash
npm install -D \
  typescript \
  @types/node \
  tsx \
  vitest \
  prettier \
  eslint
```

## IDE Setup

### VS Code

Install recommended extensions:

1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **TypeScript** - Language support (built-in)

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### IntelliJ IDEA / WebStorm

1. Enable TypeScript language service
2. Configure Node.js interpreter
3. Enable ESLint and Prettier plugins

## Package Structure

After installation, your `node_modules/@stratiqx/cal-runtime` will contain:

```
cal-runtime/
├── dist/              # Compiled JavaScript
│   ├── types/         # Type definitions
│   ├── parser/        # Parser module
│   ├── analyzer/      # Formula analyzer
│   ├── executor/      # Execution engine
│   ├── adapters/      # Data & alert adapters
│   ├── validator/     # Validation utilities
│   ├── config/        # Configuration system
│   └── cli/           # CLI tool
├── bin/
│   └── cal.js         # CLI entry point
├── examples/          # Example scripts
└── package.json
```

## Common Issues

### Module Not Found

If you get module resolution errors:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure you're using compatible TypeScript version:

```bash
npm install -D typescript@^5.3
```

### Permission Errors (Global Install)

On macOS/Linux, you may need sudo:

```bash
sudo npm install -g @stratiqx/cal-runtime
```

Or configure npm to use a different directory:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

## Environment Setup

### Shell Completion (Optional)

For bash:

```bash
# Add to ~/.bashrc or ~/.bash_profile
eval "$(cal --completion bash)"
```

For zsh:

```bash
# Add to ~/.zshrc
eval "$(cal --completion zsh)"
```

## Docker Setup

For containerized environments:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install CAL runtime
RUN npm install -g @stratiqx/cal-runtime

# Copy your CAL scripts
COPY scripts/ ./scripts/
COPY data/ ./data/

# Run CAL script
CMD ["cal", "run", "scripts/analysis.cal", "--data", "data/entities.json"]
```

## Next Steps

Now that you have the runtime installed:

1. **[Getting Started](/runtime/getting-started)** - Create your first CAL script
2. **[Configuration](/runtime/configuration)** - Set up project configuration
3. **[CLI Reference](/runtime/cli-reference)** - Learn CLI commands
4. **[Examples](/runtime/examples)** - Explore example scripts

## Updating

To update to the latest version:

```bash
npm update @stratiqx/cal-runtime
```

Or install specific version:

```bash
npm install @stratiqx/cal-runtime@0.2.0
```

## Uninstall

To remove the runtime:

```bash
# Local
npm uninstall @stratiqx/cal-runtime

# Global
npm uninstall -g @stratiqx/cal-runtime
```
