import * as pixi from 'pixi.js';

//Create the renderer
var renderer = PIXI.autoDetectRenderer(256, 256, {antialias: false, transparent: false, resolution: 1});

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

PIXI.loader.add("img/chara.png")

let tex = PIXI.Texture.from("img/chip.bmp");
PIXI.Texture.addToCache(tex, "chip");
//This `setup` function will run when the image has loaded
function setup() {
    var texture = PIXI.loader.resources["img/chara.png"].texture;
    var chara = new PIXI.Sprite();
    var kamechara = new PIXI.Sprite(PIXI.loader.resources.kame.texture);
    //------------------------------------------------------------------------
    //タイリングスプライト
    var tilingSprite = new PIXI.extras.TilingSprite(
            texture, 
            300,
            300 
            );
    tilingSprite.y = 300;
    stage.addChild(tilingSprite);

    renderer.render(stage);
}

