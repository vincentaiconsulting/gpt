# Realistic 3D Earth Explorer

This app provides a realistic, interactive 3D Earth viewer with deep zoom and 3D buildings using CesiumJS.

## Features

- Global interactive 3D globe
- Photorealistic terrain and imagery (Cesium World Terrain)
- 3D buildings (OpenStreetMap Buildings)
- Deep zoom down to building-level detail
- Quick fly-to buttons for major cities

## Run locally

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Cesium token

You need a free Cesium ion token:

1. Sign up at <https://ion.cesium.com/>.
2. Create an access token.
3. Paste it in the app input and click **Launch Earth**.
