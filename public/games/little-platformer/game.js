/*
    Little JS Platforming Game
    - A basic platforming starter project
    - Platforming physics and controls
    - Includes destructible terrain
    - Control with keyboard, mouse, touch, or gamepad
*/

'use strict';

// import LittleJS module
import * as LJS from './littlejs.esm.js';
import * as GameObjects from './gameObjects.js';
import * as GameEffects from './gameEffects.js';
import * as GamePlayer from './gamePlayer.js';
import * as GameLevel from './gameLevel.js';
const {vec2} = LJS;

// globals
export let gameLevelData, spriteAtlas, player, score, deaths;
export function addToScore(delta=1) { score += delta; }
export function addToDeaths() { ++deaths; }

// enable touch gamepad on touch devices
LJS.setTouchGamepadEnable(true);

// limit canvas aspect ratios to support most modern HD devices
LJS.setCanvasMinAspect(.4);
LJS.setCanvasMaxAspect(2.5);

// limit size to to 4k HD
LJS.setCanvasMaxSize(vec2(3840, 2160));

///////////////////////////////////////////////////////////////////////////////
function loadLevel()
{
    // setup level
    GameLevel.buildLevel();
    
    // spawn player
    player = new GamePlayer.Player(GameLevel.playerStartPos);
    LJS.setCameraPos(GameLevel.getCameraTarget());

    // init game
    score = deaths = 0;
}

///////////////////////////////////////////////////////////////////////////////
async function gameInit()
{
    // load the game level data
    gameLevelData = await LJS.fetchJSON('gameLevelData.json');

    // engine settings
    LJS.setGravity(vec2(0,-.01));
    LJS.setObjectDefaultDamping(.99);
    LJS.setObjectDefaultAngleDamping(.99);
    LJS.setCameraScale(4*16);

    // create a table of all sprites
    const gameTile = (i, size=16)=> LJS.tile(i, size, 0, 1);
    spriteAtlas =
    {
        // large tiles
        circle:  gameTile(0),
        crate:   gameTile(1),
        player:  gameTile(2),
        enemy:   gameTile(4),
        coin:    gameTile(5),

        // small tiles
        gun:     gameTile(vec2(0,2),8),
        grenade: gameTile(vec2(1,2),8),
    };

    loadLevel();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    // respawn player
    if (player.deadTimer > 1)
    {
        player = new GamePlayer.Player(GameLevel.playerStartPos);
        player.velocity = vec2(0,.1);
        GameEffects.sound_jump.play();
    }
    
    // mouse wheel = zoom
    LJS.setCameraScale(LJS.clamp(LJS.cameraScale*(1-LJS.mouseWheel/10), 1, 1e3));
    
    // T = drop test crate
    if (LJS.keyWasPressed('KeyT'))
        new GameObjects.Crate(LJS.mousePos);
    
    // E = drop enemy
    if (LJS.keyWasPressed('KeyE'))
        new GameObjects.Enemy(LJS.mousePos);

    // X = make explosion
    if (LJS.keyWasPressed('KeyX'))
        GameEffects.explosion(LJS.mousePos);

    // M = move player to mouse
    if (LJS.keyWasPressed('KeyM'))
        player.pos = LJS.mousePos;

    // R = restart level
    if (LJS.keyWasPressed('KeyR'))
        loadLevel();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{
    // update camera
    LJS.setCameraPos(LJS.cameraPos.lerp(GameLevel.getCameraTarget(), LJS.clamp(player.getAliveTime()/2)));
}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    const ctx = LJS.mainContext;
    const cw  = LJS.mainCanvas.width;
    const ch  = LJS.mainCanvas.height;
    // scale UI relative to 720p so the HUD looks right at any resolution
    const s   = Math.max(ch / 720, 0.6);

    drawHudPill(ctx, 24*s, 24*s, 240*s, 68*s, '#ff6b35', '★', 'SCORE',  score,  s);
    drawHudPill(ctx, cw - (240+24)*s, 24*s, 240*s, 68*s, '#a855f7', '✕', 'DEATHS', deaths, s);

    // controls hint at the bottom (auto-fades over time)
    const hintAlpha = LJS.clamp(1 - (player ? player.getAliveTime()/8 : 0), 0, 1);
    if (hintAlpha > 0.01) drawControlsHint(ctx, cw, ch, s, hintAlpha);
}

function drawHudPill(ctx, x, y, w, h, accent, icon, label, value, s)
{
    ctx.save();
    // drop shadow
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 14 * s;
    ctx.shadowOffsetY = 4 * s;

    // pill body — dark glass
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, 'rgba(28, 36, 70, 0.92)');
    grad.addColorStop(1, 'rgba(11, 18, 36, 0.92)');
    ctx.fillStyle = grad;
    roundRect(ctx, x, y, w, h, h * 0.5);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    // inner highlight
    ctx.lineWidth = 1.5 * s;
    ctx.strokeStyle = 'rgba(255,255,255,0.10)';
    roundRect(ctx, x + 0.5*s, y + 0.5*s, w - s, h - s, (h - s) * 0.5);
    ctx.stroke();

    // icon disc with accent color
    const iconR = h * 0.32;
    const iconX = x + h * 0.5;
    const iconY = y + h * 0.5;
    const ig = ctx.createLinearGradient(iconX, iconY - iconR, iconX, iconY + iconR);
    ig.addColorStop(0, lighten(accent, 0.20));
    ig.addColorStop(1, accent);
    ctx.fillStyle = ig;
    ctx.beginPath();
    ctx.arc(iconX, iconY, iconR, 0, Math.PI * 2);
    ctx.fill();
    // icon glyph
    ctx.fillStyle = '#fff';
    ctx.font = 'bold ' + (iconR * 1.3) + 'px system-ui, "Segoe UI Symbol", Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, iconX, iconY + 1);

    // label
    ctx.fillStyle = 'rgba(147, 160, 198, 0.95)';
    ctx.font = '700 ' + (12 * s) + 'px system-ui, Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(label, x + h * 0.95, y + h * 0.22);

    // value
    ctx.fillStyle = '#fff';
    ctx.font = '800 ' + (28 * s) + 'px system-ui, Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(value), x + h * 0.95, y + h * 0.65);

    ctx.restore();
}

function drawControlsHint(ctx, cw, ch, s, alpha)
{
    ctx.save();
    ctx.globalAlpha = alpha;
    const hints = ['← →  MOVE', '↑  JUMP', 'Z  SHOOT', 'X  GRENADE'];
    const gap   = 22 * s;
    ctx.font = '600 ' + (13 * s) + 'px system-ui, Arial';
    const widths = hints.map(t => ctx.measureText(t).width);
    const total  = widths.reduce((a,b) => a+b, 0) + gap * (hints.length - 1);
    let x = (cw - total) / 2;
    const y = ch - 38 * s;
    // background pill
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 14 * s;
    ctx.fillStyle = 'rgba(11, 18, 36, 0.75)';
    roundRect(ctx, x - 18*s, y - 14*s, total + 36*s, 28*s, 14*s);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.textBaseline = 'middle';
    hints.forEach((t, i) => {
        const parts = t.split('  ');
        // key part — brand colored
        ctx.fillStyle = '#ffb627';
        ctx.fillText(parts[0], x, y);
        const kw = ctx.measureText(parts[0]).width + 6*s;
        // label part
        ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
        ctx.fillText(parts[1], x + kw, y);
        x += widths[i] + gap;
    });
    ctx.restore();
}

function roundRect(ctx, x, y, w, h, r)
{
    r = Math.min(r, w/2, h/2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
}

function lighten(hex, amt)
{
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const mix = (v) => Math.min(255, Math.round(v + (255 - v) * amt));
    return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LJS.engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png', 'tilesLevel.png']);