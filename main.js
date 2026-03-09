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

async function setupViewer(token) {
  if (viewer) {
    viewer.destroy();
  }

  Cesium.Ion.defaultAccessToken = token;

  try {
    const terrain = await Cesium.createWorldTerrainAsync();

    viewer = new Cesium.Viewer("cesiumContainer", {
      terrain,
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
    });

    viewer.scene.globe.enableLighting = true;
    viewer.scene.fog.enabled = true;
    viewer.scene.screenSpaceCameraController.minimumZoomDistance = 2;

    const osmBuildingsTileset = await Cesium.createOsmBuildingsAsync();
    viewer.scene.primitives.add(osmBuildingsTileset);

    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(-73.9857, 40.7484, 3500),
      orientation: {
        heading: Cesium.Math.toRadians(35),
        pitch: Cesium.Math.toRadians(-40),
      },
      duration: 2,
    });

    enableFlyButtons(true);
    setStatus("Earth loaded. You can now zoom to street/building level.");
  } catch (error) {
    console.error(error);
    setStatus(
      "Could not load Cesium resources. Check token validity and internet access."
    );
  }
}

startBtn.addEventListener("click", async () => {
  const token = tokenEl.value.trim();
  if (!token) {
    setStatus("Please paste a Cesium ion token first.");
    return;
  }

  setStatus("Loading high-detail globe and 3D buildings...");
  enableFlyButtons(false);
  await setupViewer(token);
});

flyButtons.nyc.addEventListener("click", () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-74.0122, 40.7069, 2200),
    orientation: { heading: Cesium.Math.toRadians(15), pitch: Cesium.Math.toRadians(-35) },
  });
});

flyButtons.tokyo.addEventListener("click", () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(139.767, 35.6812, 2400),
    orientation: { heading: Cesium.Math.toRadians(45), pitch: Cesium.Math.toRadians(-38) },
  });
});

flyButtons.paris.addEventListener("click", () => {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(2.2945, 48.8584, 2200),
    orientation: { heading: Cesium.Math.toRadians(35), pitch: Cesium.Math.toRadians(-42) },
  });
});
