import * as BABYLON from '@babylonjs/core';
import QrScanner from 'qr-scanner';


const canvas = document.getElementById('render-canvas');
const engine = new BABYLON.Engine(canvas, true, {alpha: true});
const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('cam-qr-result');
const scanner = new QrScanner(
  video, result => setResult (camQrResult, result), {
    highlightScanRegion: false,
    highlightCodeOutline: false,
  }
);

function setResult(element, result) {
  console.log('QR Code Result:', result);
  
};
scanner.start();

const createScene = () => {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  scene.createDefaultCameraOrLight(true, false, true);
  const box = new BABYLON.MeshBuilder.CreateBox()

  return scene;
}

const scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});

