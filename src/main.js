import * as BABYLON from '@babylonjs/core';
import QrScanner from 'qr-scanner';
import "@babylonjs/loaders/glTF";
import {Map} from 'maplibre-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


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

const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [0, 0],
  zoom: 2,
  pitch: 0,
  bearing: 0,
});


const assetData = {
  entidade: {
    id: 1,
    nome: 'Teste',
    descricao: 'Teste de entidade'
  }

};

async function setResult(element, result) { //resultado do scan
  console.log('QR Code Result:', result);
  camQrResult.textContent = result.data;
  if(result.data == assetData.entidade.id) {
    dataDiv.innerHTML = `
      <h3>Entity Data</h3>
      <p>ID: ${assetData.entidade.id}</p>
      <p>Name: ${assetData.entidade.nome}</p>
      <p>Description: ${assetData.entidade.descricao}</p>
    `;
    const scene = await createScene();

    engine.runRenderLoop(() => {
    scene.render();
    
    //limitar scans por segundo
});
  }
};

startButton.addEventListener('click', () => { //start QR Scanner
  console.log('Starting QR Scanner...');
  scanner.start().catch((error) => {
    console.error('Error starting QR Scanner:', error);
  });
});

const createScene = async () => {             //criar a cena de renderização
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
  scene.createDefaultCameraOrLight(true, false, true);
  try {
    BABYLON.SceneLoader.ImportMesh(           //deprecado, mas funciona
      "",         
      "./models/",
      "model.gltf",
      scene      
    );
    console.log("Model loaded successfully!");
  } catch (e) {
    console.error("Failed to load model.", e);
  }

  return scene;
}



