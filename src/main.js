//
//  このプログラムはpixi.jsのチュートリアルを見ながら書いています
//  ref: https://github.com/kittykatattack/learningPixi
//
//import PIXI from 'pixi.js';
import * as pixi from 'pixi.js';

//Create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: false, resolution: 1});

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

renderer.backgroundColor = 0x061639;
//viewでCanvasがとれる
renderer.view.style.border = "1px dashed black";

//リサイズするときにはautoResize = true;
renderer.autoResize = true;
renderer.resize(512, 512);

//Use Pixi's built-in `loader` object to load an image
//add関数の詳細は：https://github.com/kittykatattack/learningPixi#more-about-pixis-loader
PIXI.loader
.add("img/chara.png")
.add("kame", "img/kame.png")
.on("progress", loadProgressHandler)
.load(setup);

//This `setup` function will run when the image has loaded
function setup() {
    var texture = PIXI.loader.resources["img/chara.png"].texture;
    var chara = new PIXI.Sprite(texture);
    var kamechara = new PIXI.Sprite(PIXI.loader.resources.kame.texture);
    stage.addChild(chara);
    stage.addChild(kamechara);
    renderer.render(stage);
    setTimeout( ()=>{ chara.texture = PIXI.loader.resources.kame.texture; console.log("hogehoge"); renderer.render(stage); }, 2001 );
}


//ローディング情報を取れるみたい
function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url); 

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  console.log("loading: " + resource.name);
}

