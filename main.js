const statusEl = document.getElementById("status");
const tokenEl = document.getElementById("token");
const startBtn = document.getElementById("start");
const flyButtons = {
  nyc: document.getElementById("nyc"),
  tokyo: document.getElementById("tokyo"),
  paris: document.getElementById("paris"),
};

let viewer;

function setStatus(message) {
  statusEl.textContent = message;
}

function enableFlyButtons(enabled) {
  Object.values(flyButtons).forEach((btn) => {
    btn.disabled = !enabled;
  });
}

function createViewer(options = {}) {
  return new Cesium.Viewer("cesiumContainer", {
    animation: false,
    timeline: false,
    geocoder: true,
    sceneModePicker: false,
    baseLayerPicker: false,
    homeButton: true,
    selectionIndicator: false,
    infoBox: false,
    navigationHelpButton: true,
    shouldAnimate: true,
    ...options,
  });
}

async function setupViewer(token) {
  if (viewer) {
    viewer.destroy();
  }

  try {
    if (token) {
      Cesium.Ion.defaultAccessToken = token;
      const terrain = await Cesium.createWorldTerrainAsync();
      viewer = createViewer({ terrain });

      const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
      viewer.scene.primitives.add(osmBuildingsTileset);
      setStatus("Enhanced mode: terrain + 3D buildings loaded. Zoom deep into cities.");
    } else {
      const imageryProvider = new Cesium.OpenStreetMapImageryProvider({
        url: "https://tile.openstreetmap.org/",
      });
      viewer = createViewer({
        baseLayer: new Cesium.ImageryLayer(imageryProvider),
      });
      setStatus(
        "Basic mode loaded (no token). Add a Cesium token and relaunch for terrain + 3D buildings."
      );
    }

    viewer.scene.globe.enableLighting = true;
    viewer.scene.fog.enabled = true;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 2;

    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-73.9857, 40.7484, 3500),
      orientation: {
        heading: Cesium.Math.toRadians(35),
        pitch: Cesium.Math.toRadians(-40),
      },
      duration: 2,
    });

    enableFlyButtons(true);
  } catch (error) {
    console.error(error);
    setStatus(
      "Could not load Cesium resources. Check internet access and token validity for enhanced mode."
    );
  }
}

startBtn.addEventListener("click", async () => {
  const token = tokenEl.value.trim();

  setStatus(
    token
      ? "Loading enhanced globe and 3D buildings..."
      : "Loading basic globe (no token)..."
  );
  enableFlyButtons(false);
  await setupViewer(token);
});

flyButtons.nyc.addEventListener("click", () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-74.0122, 40.7069, 2200),
    orientation: {
      heading: Cesium.Math.toRadians(15),
      pitch: Cesium.Math.toRadians(-35),
    },
  });
});

flyButtons.tokyo.addEventListener("click", () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.767, 35.6812, 2400),
    orientation: {
      heading: Cesium.Math.toRadians(45),
      pitch: Cesium.Math.toRadians(-38),
    },
  });
});

flyButtons.paris.addEventListener("click", () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(2.2945, 48.8584, 2200),
    orientation: {
      heading: Cesium.Math.toRadians(35),
      pitch: Cesium.Math.toRadians(-42),
    },
  });
});
