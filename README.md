# Aura UI

Aura UI is an experimental CSS framework concept. The repository currently compares two tactile directions:

- `versions/fold-ui/` - Tactile Mono, restrained physical controls
- `versions/tactile-depth/` - Tactile Depth, more spatial and physical controls

Both versions use only static HTML and CSS, follow the operating system color scheme with `prefers-color-scheme`, and focus on native controls with tactile feedback.

## Local preview

```sh
python3 -m http.server 4173
```

Then open:

- `http://127.0.0.1:4173/versions/fold-ui/`
- `http://127.0.0.1:4173/versions/tactile-depth/`
