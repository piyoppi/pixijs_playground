import * as pixi from 'pixi.js';
import pixiLayers from 'pixi-layers';
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

//Create the renderer
//var renderer = PIXI.autoDetectRenderer(1024, 1024, {antialias: false, transparent: false, resolution: 1});
       var renderer = pixi.autoDetectRenderer(
                {
                    width: 1024,
                    height: 1024,
                    antialias: false,
                    transparent: true,
                    resolution: 1,
                    roundPixels: false,
                    antialias: false,
                }
                );

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();
var tilingContainer = new PIXI.Container();
stage.x = 0;
stage.y = 0;

PIXI.loader.add("img/chip.png")
.add("img/chip2.png")
.load(setup);

//layer
let displayGroups = [];
for( let i=0; i<2; i++ ) {
    displayGroups.push(new pixi.display.Layer());
    displayGroups[i].zIndex = i;
    stage.addChild(displayGroups[i]);
    displayGroups[i].group.enableSort = false;
}

//This `setup` function will run when the image has loaded
function setup() {
    var texture = PIXI.loader.resources["img/chip.png"].texture;
    var texture2 = PIXI.loader.resources["img/chip2.png"].texture;
    var chara = new PIXI.Sprite();
    //------------------------------------------------------------------------
    //タイリングスプライト
    var tilingSprite = new PIXI.extras.TilingSprite(
            texture, 
            300,
            300 
            );
    texture.frame = new PIXI.Rectangle(64, 96, 32, 32);
    tilingSprite.tilePosition.y = 0
    tilingSprite.y = 1;
    tilingSprite.x = 2;
    stage.addChild(tilingSprite);

    var tilingSprite2 = new PIXI.extras.TilingSprite(
            texture2, 
            300,
            300 
            );
    texture2.frame = new PIXI.Rectangle(0, 0, 32, 32);
    tilingSprite2.tilePosition.y = 1
    tilingSprite2.y = 125;
    tilingSprite2.x = 100;
    stage.addChild(tilingSprite2);

    //------------------------------------------------------------------------
    //タイリングスプライトもどき
    let tilingTexture = texture.clone();
    tilingTexture.frame = new PIXI.Rectangle(64, 96, 32, 32);
    for( let y = 0; y < 100; y++ ) {
        for( let x = 0; x < 100; x++ ) {
            var chip = new PIXI.Sprite();
            chip.texture = tilingTexture;
            chip.position.set(x * 32, y * 32);
            tilingContainer.addChild(chip);
        }
    }
    tilingContainer.parentLayer = displayGroups[0];
    tilingContainer.zIndex = 1;
    //tilingContainer.width = 123;
    //tilingContainer.height = 234;
    stage.addChild(tilingContainer);

}

let rad = 0.0;
window.onload = function() {
    function freq() {
        tilingContainer.position.set( 300 * Math.cos(rad), 100 * Math.sin(rad) );
        rad += 0.05;
        renderer.render(stage);
        window.requestAnimationFrame( freq );
    }
    window.requestAnimationFrame( freq );
}
