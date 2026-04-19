# Contributing to STORE IT!

We love your input! We want to make contributing to STORE IT! as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Getting Started

1. **Fork the repo** and clone it locally
2. **Create a new branch** for your feature/fix: `git checkout -b feature/your-feature-name`
3. **Install dependencies**: 
   - Frontend: `npm install`
   - Backend: `pip install -r requirements.txt`
4. **Set up environment**: Copy `.env.example` to `.env` and add your Gemini API key
5. **Make your changes** and test thoroughly
6. **Commit with clear messages**: `git commit -m 'Add feature: description'`
7. **Push to your fork**: `git push origin feature/your-feature-name`
8. **Create a Pull Request** with a clear description

### Development Workflow

#### Frontend Development
```bash
# Start dev server on http://localhost:5173
npm run dev
```

#### Backend Development
```bash
# Activate Python environment
source venv/bin/activate

# Start backend server on http://localhost:8000
python -m brain_engine.gateway
```

#### Building for Production
```bash
# Frontend build
npm run build

# Backend is production-ready with FastAPI
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Ensure your code follows the project's style guide
3. Include comments for complex logic
4. Add test coverage if applicable
5. Update documentation for new features
6. Link any related issues in the PR description

## Code Style Guidelines

### JavaScript/React
- Use functional components and hooks
- Follow ESLint configuration
- Use descriptive variable names
- Add JSDoc comments for complex functions

### Python
- Follow PEP 8 style guide
- Use type hints where possible
- Add docstrings to functions and classes
- Run `python -m black` for code formatting

### General
- Keep functions small and focused
- Write meaningful commit messages
- Add comments for non-obvious code
- Remove console.logs before submitting

## Reporting Bugs

When reporting a bug, please include:

1. **Title**: Clear, descriptive bug title
2. **Description**: What you expected vs. what happened
3. **Steps to Reproduce**: Detailed reproduction steps
4. **Environment**: OS, browser, Node/Python versions
5. **Screenshots/Logs**: Error messages and stack traces
6. **Possible Solution**: If you have ideas (optional)

## Feature Requests

When suggesting a feature:

1. **Use a clear title** describing the feature
2. **Provide context** for why this feature is needed
3. **Describe the solution** you'd like to see
4. **Include examples** of how it would be used
5. **Mention any alternatives** you've considered

## Commit Message Guidelines

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, semicolons, etc.)
- **refactor**: Code refactoring without feature changes
- **perf**: Performance improvements
- **test**: Test additions or updates
- **chore**: Build process, dependencies, etc.

### Examples
```
feat(vault): Add Vault Chat functionality
fix(security): Prevent XSS vulnerability in file upload
docs(readme): Update installation instructions
```

## Questions?

Don't hesitate to open a discussion or issue. We're here to help!

---

**Happy Contributing!** 🚀
