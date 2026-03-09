# Realistic 3D Earth Explorer

This app provides a realistic, interactive 3D Earth viewer with deep zoom using CesiumJS.

## Features

- Global interactive 3D globe
- Works immediately without a token (basic mode with OSM imagery)
- Enhanced mode with Cesium token: high-detail terrain + 3D buildings
- Deep zoom down to building-level detail (enhanced mode)
- Quick fly-to buttons for major cities

## Run locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Cesium token (optional but recommended)

You can click **Launch Earth** without a token for basic mode.

For best realism, use a free Cesium ion token:

1. Sign up at <https://ion.cesium.com/>.
2. Create an access token.
3. Paste it in the app input and click **Launch Earth** to enable terrain + 3D buildings.
