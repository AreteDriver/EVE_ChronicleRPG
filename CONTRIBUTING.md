# Contributing to EVE Chronicle RPG

Thank you for your interest in contributing to EVE Chronicle RPG! This document provides guidelines for contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/EVE_ChronicleRPG.git
   cd EVE_ChronicleRPG
   ```
3. **Set up the development environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

## How to Contribute

### Reporting Bugs
- Check if the issue has already been reported
- Use the issue tracker to report bugs
- Include detailed information:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - System information (OS, Python version)

### Suggesting Enhancements
- Use the issue tracker to suggest new features
- Clearly describe the feature and its benefits
- Provide examples of how it would work

### Code Contributions
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following the development guidelines
3. Test your changes thoroughly
4. Commit your changes with clear, descriptive messages
5. Push to your fork and submit a pull request

## Development Guidelines

### Code Style
- Follow PEP 8 style guidelines for Python code
- Use type hints where appropriate
- Write clear, self-documenting code
- Add comments for complex logic

### Project Structure
- `core/` - Core game engine components (state management, etc.)
- `systems/` - Game systems (quests, dialogue, combat, etc.)
- `world/` - World-related components (maps, NPCs, etc.)
- `assets/` - Game assets (images, sounds, data files)

### Type Hints
This project uses type hints for better code quality:
```python
from typing import Optional, List, Dict

def example_function(param: str) -> Optional[int]:
    pass
```

### Documentation
- Add docstrings to classes and functions
- Update README.md if adding new features
- Include inline comments for complex logic

## Pull Request Process

1. **Update documentation** - Ensure README.md and other docs reflect your changes
2. **Self-review** - Review your own code before submitting
3. **Clear description** - Provide a clear description of the changes
4. **Link issues** - Reference any related issues
5. **Wait for review** - A maintainer will review your PR
6. **Address feedback** - Make requested changes if needed
7. **Merge** - Once approved, your PR will be merged

## Testing

Before submitting a pull request:
- Test your changes thoroughly
- Ensure the game runs without errors
- Check that existing features still work

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Reach out to the maintainers

Thank you for contributing to EVE Chronicle RPG!
