# Contributing to EVE Chronicle RPG

Thank you for your interest in contributing to EVE Chronicle RPG! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior vs actual behavior
- Browser and version information
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature has already been suggested
- Provide a clear description of the feature
- Explain why this feature would be useful
- Consider how it fits with EVE Online lore

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test thoroughly** - the game should work in major browsers
5. **Commit with clear messages**
6. **Push to your fork**
7. **Create a Pull Request**

### Code Style

- Use consistent indentation (4 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions focused and modular
- Use meaningful variable names

### Adding New Chronicles

When adding new chronicles:
1. Add the chronicle data in `js/lore/Chronicles.js`
2. Include proper EVE lore references
3. Create multi-act story structure
4. Define clear objectives
5. Set appropriate rewards
6. Include character dialogue trees

### Adding New Factions or Items

- Factions go in `js/lore/Factions.js`
- Items, weapons, and modules go in `js/core/AssetManager.js`
- Maintain balance and stay true to EVE lore

## Development Setup

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required!

For testing, you can run a local server:
```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Testing

Before submitting a PR:
- Test in Chrome, Firefox, and Safari
- Verify movement controls work
- Check dialogue interactions
- Test combat system
- Verify HUD updates correctly
- Check for console errors

## EVE Lore Guidelines

When contributing content:
- Stay true to EVE Online lore
- Reference official chronicles when possible
- Respect the four empires' characteristics
- Maintain the sci-fi atmosphere
- Avoid breaking established canon

## Questions?

Feel free to open an issue for questions or clarifications.

## License

By contributing, you agree that your contributions will follow the same license as the project.

---

**Fly safe, capsuleer. o7**
