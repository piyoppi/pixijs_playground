//
//  このプログラムはpixi.jsのチュートリアルを見ながら書いています
//  ref: https://github.com/kittykatattack/learningPixi
//

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
 PIXI.loader.add("kame", "img/kame.png")
//.add("chip", "img/chip.bmp")
 PIXI.loader.on("progress", loadProgressHandler)
.load(setup);




let tex = PIXI.Texture.from("img/chip.bmp");
PIXI.Texture.addToCache(tex, "chip");
//This `setup` function will run when the image has loaded
function setup() {
    var texture = PIXI.loader.resources["img/chara.png"].texture;
    var chara = new PIXI.Sprite();
    var kamechara = new PIXI.Sprite(PIXI.loader.resources.kame.texture);
    //スプライトの位置調整
    kamechara.x = 200;
    kamechara.y = 200;
    kamechara.width = 300;
    kamechara.height = 300;
    //回転はこんなかんじ
    //kamechara.anchor.x = 0.5;
    //kamechara.anchor.y = 0.5;
    //kamechara.rotation = 0.5;
    //このようにも設定できる
    chara.position.set(100, 100);
    chara.scale.x = 3;
    //stageに追加する
    stage.addChild(chara);
    stage.addChild(kamechara);
    //テクスチャを入れ替えてみる
    setTimeout( ()=>{ chara.texture = PIXI.loader.resources.kame.texture; console.log("hogehoge"); renderer.render(stage); }, 2001 );

    //------------------------------------------------------------------------
    //マップチップ描画テスト
    var texture2 = PIXI.utils.TextureCache["chip"];
    var texture3 = texture2.clone();

    for( var i=0; i<100; i++ ){
        let tex = texture2.clone();
        let rect = new PIXI.Rectangle(94, 32, 32, 32);
        tex.frame = rect;
        let chip = new PIXI.Sprite(tex);
        chip.position.set(i * 10, i * 10);
        stage.addChild(chip);
    }

    var rectangle = new PIXI.Rectangle(94, 32, 32, 32);
    var rectangle2 = new PIXI.Rectangle(0, 32, 32, 32);

    texture2.frame = rectangle;
    var chip = new PIXI.Sprite(texture2);
    texture3.frame = rectangle2;
    var chip2 = new PIXI.Sprite(texture3);
    chip.position.set(50, 50);
    chip2.position.set(100, 50);
    stage.addChild(chip);
    stage.addChild(chip2);


    //------------------------------------------------------------------------
    //タイリングスプライト
    var tilingSprite = new PIXI.extras.TilingSprite(
            texture, 
            300,
            300 
            );
    tilingSprite.y = 300;
    stage.addChild(tilingSprite);


    //------------------------------------------------------------------------
    //アニメーションテスト
    let animationTextures = [];
    for( let i=0; i<5; i++ ){
        let tex = PIXI.loader.resources.chip.texture.clone();
        tex.frame = new PIXI.Rectangle(32 + i * 10, 32, 32, 32);
        animationTextures.push(tex);
    }
    let animation = new PIXI.extras.AnimatedSprite(animationTextures);
    animation.x = 200; 
    animation.y = 0; 
    animation.animationSpeed = 0.01;        //値が小さいほどおそくなる
    animation.gotoAndPlay(0);               //指定フレームに移動して再生
    stage.addChild(animation);


    //------------------------------------------------------------------------
    //図形描画テスト

    //角丸四角形
    var roundBox = new PIXI.Graphics();
    roundBox.lineStyle(4, 0x99CCFF, 1);
    roundBox.beginFill(0xFF9933);
    roundBox.drawRoundedRect(0, 0, 84, 36, 10)
        roundBox.endFill();
    roundBox.x = 48;
    roundBox.y = 190;
    stage.addChild(roundBox);

    //線分
    var line = new PIXI.Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 0);
    line.lineTo(80, 50);
    line.x = 0;
    line.y = 32;
    stage.addChild(line);

    //円
    var ellipse = new PIXI.Graphics();
    ellipse.beginFill(0xFFFF00);
    ellipse.drawEllipse(0, 0, 50, 20);
    ellipse.endFill();
    ellipse.x = 180;
    ellipse.y = 130;
    stage.addChild(ellipse);

    var circle = new PIXI.Graphics();
    circle.lineStyle(4, 0x99CCFF, 1);
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 32);
    circle.endFill();
    circle.x = 64;
    circle.y = 130;
    stage.addChild(circle);

    var triangle = new PIXI.Graphics();
    triangle.beginFill(0x66FF33);
    //Use `drawPolygon` to define the triangle as
    //a path array of x/y positions
    triangle.drawPolygon([
            -32, 64,             //First point
            32, 64,              //Second point
            0, 0                 //Third point
    ]);
    //Fill shape's color
    triangle.endFill();
    //Position the triangle after you've drawn it.
    //The triangle's x/y position is anchored to its first point in the path
    triangle.x = 180;
    triangle.y = 22;

    stage.addChild(triangle);

    //描画する
    function render(){ renderer.render(stage); setTimeout(render, 100); }
    setTimeout( render, 100 );
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

