# GitHub Pages Setup Instructions

This guide will help you enable GitHub Pages for the EVE Chronicle RPG repository.

## Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the game to GitHub Pages when changes are pushed to the `main` branch.

## Step-by-Step Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar under "Code and automation")
4. Under "Source", select **GitHub Actions**
5. The page will confirm that your site is ready to be deployed

### 2. Trigger the Deployment

The workflow will automatically run when:
- Changes are pushed to the `main` branch
- You manually trigger it from the Actions tab

To manually trigger:
1. Go to the **Actions** tab in your repository
2. Click on "Build and Deploy to GitHub Pages" workflow
3. Click **Run workflow** → **Run workflow**

### 3. Wait for Deployment

The deployment process takes 2-5 minutes:
1. The workflow builds the Pygame application with Pygbag
2. Converts it to WebAssembly for browser compatibility
3. Deploys to GitHub Pages

You can monitor progress in the **Actions** tab.

### 4. Access Your Game

Once deployed, your game will be available at:
```
https://[YOUR-USERNAME].github.io/EVE_ChronicleRPG/
```

For this repository:
```
https://AreteDriver.github.io/EVE_ChronicleRPG/
```

## Troubleshooting

### Workflow Fails

If the GitHub Actions workflow fails:

1. **Check the workflow permissions**:
   - Go to Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **Check Pages permissions**:
   - Go to Settings → Pages
   - Ensure "GitHub Actions" is selected as the source

3. **Review the error logs**:
   - Go to Actions tab
   - Click on the failed workflow run
   - Expand the failed step to see error details

### Common Issues

**Issue**: Pages deployment permission denied
**Solution**: 
- Settings → Environments → github-pages
- Check deployment branches and ensure your branch is allowed

**Issue**: Pygbag build fails
**Solution**: 
- Check that `main.py` uses `asyncio` for the main loop
- Ensure all imports are compatible with WebAssembly
- Review Pygbag documentation for compatibility requirements

**Issue**: Game doesn't load in browser
**Solution**:
- Clear browser cache and reload
- Check browser console for errors (F12)
- Ensure browser supports WebAssembly
- Try a different modern browser

## Local Testing

Before deploying, test the game locally:

```bash
# Install dependencies
pip install pygame pygbag

# Test the game locally
python main.py

# Test Pygbag build (optional)
pygbag main.py
# Then open http://localhost:8000 in your browser
```

## Updating the Deployment

Any changes pushed to `main` will automatically trigger a new deployment:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

The workflow will rebuild and redeploy within minutes.

## Advanced Configuration

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `docs/` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `[username].github.io`

3. In Settings → Pages, enter your custom domain

### Workflow Customization

Edit `.github/workflows/deploy.yml` to:
- Change Python version
- Add additional build steps
- Modify deployment conditions
- Add testing before deployment

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Pygbag Documentation](https://pygame-web.github.io/)
- [Pygame Documentation](https://www.pygame.org/docs/)

## Support

If you encounter issues:
1. Check the [Actions tab](https://github.com/AreteDriver/EVE_ChronicleRPG/actions) for deployment logs
2. Review this SETUP.md file
3. Check the main [README.md](README.md) for project documentation
4. Open an issue on GitHub with details about the problem
