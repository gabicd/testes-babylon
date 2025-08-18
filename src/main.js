import * as BABYLON from '@babylonjs/core';
import QrScanner from 'qr-scanner';


const dataDiv = document.getElementById('entity-data');
const canvas = document.getElementById('render-canvas');
const startButton = document.getElementById('start-button');
const engine = new BABYLON.Engine(canvas, true, {alpha: true});
const video = document.getElementById('qr-video');
const camQrResult = document.getElementById('cam-qr-result');
const scanner = new QrScanner(
  video, result => setResult (camQrResult, result), {
    highlightScanRegion: false,
    highlightCodeOutline: false,
  }
);

const loadData = async () => {
  try {
    const response = await fetch('asset.json');
    assetData = await response.json();
  }
  catch (error) {
    console.error('Error loading asset data:', error); 
  } 
}

loadData();

function setResult(element, result) {
  console.log('QR Code Result:', result);
  camQrResult.textContent = result.data;
  if(result.data == assetData.entidade.id) {
    dataDiv.innerHTML = `
      <h3>Entity Data</h3>
      <p>ID: ${assetData.entidade.id}</p>
      <p>Name: ${assetData.entidade.nome}</p>
      <p>Description: ${assetData.entidade.descricao}</p>
    `;
    const scene = createScene();

    engine.runRenderLoop(() => {
    scene.render();
});
  }
};

startButton.addEventListener('click', () => {
  console.log('Starting QR Scanner...');
  scanner.start().catch((error) => {
    console.error('Error starting QR Scanner:', error);
  });
});

const createScene = () => {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  scene.createDefaultCameraOrLight(true, false, true);
  const box = new BABYLON.MeshBuilder.CreateBox()

  return scene;
}



