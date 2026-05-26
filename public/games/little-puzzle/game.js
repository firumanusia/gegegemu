/*
    Little Puzzle Game
    - A simple match 3 style puzzle game
    - Uses a high resolution texture
    - Tracks high score in local storage
    - Control with mouse or touch
*/

'use strict';

// import LittleJS module
import * as LJS from './littlejs.esm.js';
const {vec2, rgb, hsl, tile} = LJS;

///////////////////////////////////////////////////////////////////////////////
// do not use pixelated rendering
LJS.setCanvasPixelated(false);
LJS.setTilesPixelated(false);

const fallTime = .2;
const cameraOffset = vec2(0,-.5);
const backgroundColor = rgb(0.04, 0.06, 0.14);
const minMatchCount = 3;
const highScoreKey = 'puzzleBestScore';

// sound effects
const sound_goodMove = new LJS.Sound([.4,.2,250,.04,,.04,,,1,,,,,3]);
const sound_badMove  = new LJS.Sound([,,700,,,.07,,,,3.7,,,,3,,,.1]);
const sound_fall     = new LJS.Sound([.2,,1900,,,.01,,1.4,,91,,,,,,,,,,.7]);

let level, levelSize, levelFall, fallTimer, dragStartPos, dragOffset, comboCount, score, bestScore;

///////////////////////////////////////////////////////////////////////////////
// tiles
const tileColors =
[
    rgb(1.00, 0.42, 0.21),   // coral / accent orange
    rgb(1.00, 0.71, 0.15),   // amber / accent yellow
    rgb(0.42, 0.84, 0.46),   // mint green
    rgb(0.36, 0.62, 1.00),   // sky blue
    rgb(0.71, 0.46, 1.00),   // soft purple
    rgb(1.00, 0.49, 0.78),   // pink rose
    rgb(0.40, 0.93, 0.92),   // cyan
];
const tileTypeCount = tileColors.length;

const getTile = (pos)=> level[pos.x + pos.y * levelSize.x];
const setTile = (pos, data)=> level[pos.x + pos.y * levelSize.x] = data;

///////////////////////////////////////////////////////////////////////////////
function gameReset()
{
    // reset game objects
    LJS.engineObjectsDestroy();

    // randomize level
    level = [];
    const pos = vec2();
    for (pos.x = levelSize.x; pos.x--;)
    for (pos.y = levelSize.y; pos.y--;)
        setTile(pos, LJS.randInt(tileTypeCount));

    comboCount = score = 0;
    fallTimer = new LJS.Timer;
}

///////////////////////////////////////////////////////////////////////////////
function gameInit()
{
    // setup canvas
    LJS.setCanvasFixedSize(vec2(1920, 1080)); // 1080p
    LJS.setCanvasClearColor(backgroundColor);
    // load high score
    bestScore = localStorage[highScoreKey] || 0;

    // setup game
    levelSize = vec2(12,6);
    LJS.setCameraPos(levelSize.scale(.5).add(cameraOffset));
    LJS.setCameraScale(900/levelSize.y);
    LJS.setGravity(vec2(0,-.004));

    // start a new game
    gameReset();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate()
{
    if (fallTimer.isSet())
    {
        // update falling tiles
        if (fallTimer.elapsed())
        {
            // add more blocks in the top
            for (let x = 0; x < levelSize.x; ++x)
                setTile(vec2(x,levelSize.y), LJS.randInt(tileTypeCount));
        }
        
        // allow blocks to fall
        if (!fallTimer.active())
        {
            // check if there is more to fall
            levelFall = [];
            let keepFalling = 0;
            const pos = vec2();
            for (pos.x = levelSize.x; pos.x--;)
            for (pos.y = 0; pos.y<levelSize.y; pos.y++)
            {
                const data = getTile(pos);
                const abovePos = pos.add(vec2(0,1));
                const aboveData = getTile(abovePos);
                if (data == -1 && aboveData >= 0)
                {
                    setTile(pos, aboveData);
                    setTile(abovePos, -1);
                    levelFall[pos.x+pos.y*levelSize.x] = keepFalling = 1;
                }
            }

            if (keepFalling)
            {
                const p = LJS.percent(comboCount, 9, 0);
                fallTimer.set(fallTime*p);
                sound_fall.play();
            }
            else
                fallTimer.unset();
        }
    }
    else
    {
        // try to clear matches
        clearMatches();
        if (!fallTimer.isSet())
        {
            // mouse/touch control
            const mouseTilePos = LJS.mousePos.floor();
            if (!LJS.mousePos.arrayCheck(levelSize))
            {
                // cancel drag if mouse is not in the level bounds
                dragStartPos = 0;
            }
            else if (LJS.mouseWasPressed(0) && !dragStartPos)
            {
                // start drag
                dragStartPos = mouseTilePos.copy();
                dragOffset = vec2();
            }
            else if (LJS.mouseIsDown(0) && dragStartPos)
            {
                // continuous drag offset for animation — clamp to ±1 tile along major axis
                const raw = LJS.mousePos.subtract(dragStartPos.add(vec2(.5)));
                if (LJS.abs(raw.x) > LJS.abs(raw.y))
                    dragOffset = vec2(LJS.clamp(raw.x, -1, 1), 0);
                else
                    dragOffset = vec2(0, LJS.clamp(raw.y, -1, 1));
                // if dragging to a neighbor tile
                const dx = LJS.abs(dragStartPos.x - mouseTilePos.x);
                const dy = LJS.abs(dragStartPos.y - mouseTilePos.y);
                if (dx == 1 && dy == 0 || dx == 0 && dy == 1)
                {
                    const startTile = getTile(dragStartPos);
                    const endTile =   getTile(mouseTilePos);
                    if (startTile >= 0 && endTile >= 0)
                    {
                        // swap tiles
                        setTile(mouseTilePos, startTile);
                        setTile(dragStartPos, endTile);

                        // try to clear matches
                        clearMatches();

                        // undo if no matches
                        if (!fallTimer.isSet())
                        {
                            sound_badMove.play();
                            setTile(mouseTilePos, endTile);
                            setTile(dragStartPos, startTile);
                        }
                        else
                            sound_goodMove.play();
                        dragStartPos = 0;
                    }
                }
            }
            else
            {
                dragStartPos = 0;
                dragOffset = vec2();
            }
        }
    }

    if (score > bestScore)
    {
        // update high score
        bestScore = score;
        localStorage[highScoreKey] = bestScore;
    }

    if (LJS.keyWasPressed('KeyR'))
        gameReset();
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost()
{

}

///////////////////////////////////////////////////////////////////////////////
function gameRender()
{
    // empty cell grid — subtle wells behind every tile (no outer frame, lets the
    // play area sit cleanly on the page gradient background)
    const cellWell = rgb(0.08, 0.10, 0.20);
    for (let y = 0; y < levelSize.y; y++)
    for (let x = 0; x < levelSize.x; x++)
    {
        LJS.drawRect(vec2(x + .5, y + .5), vec2(.94), cellWell);
    }

    // draw the tiles
    const pos = vec2();
    for (pos.x = levelSize.x; pos.x--;)
    for (pos.y = levelSize.y; pos.y--;)
    {
        const data = getTile(pos);
        if (data == -1)
            continue;

        const drawPos = pos.add(vec2(.5));
        const isDragSource = dragStartPos && pos.x == dragStartPos.x && pos.y == dragStartPos.y;

        // animated drag highlight — pulsing aura under the picked-up gem
        if (isDragSource)
        {
            const pulse = 1 + Math.sin(LJS.time * 9) * 0.05;
            // outer halo (soft)
            LJS.drawRect(drawPos, vec2(1.05 * pulse), rgb(1, 0.71, 0.15, 0.22));
            // tighter inner ring
            LJS.drawRect(drawPos, vec2(.98 * pulse), rgb(1, 0.42, 0.21, 0.30));
        }

        // apply swipe animation offset
        let isDragTarget = false;
        if (dragStartPos && dragOffset)
        {
            const tx = dragStartPos.x + Math.sign(dragOffset.x);
            const ty = dragStartPos.y + Math.sign(dragOffset.y);
            isDragTarget = (dragOffset.x !== 0 || dragOffset.y !== 0)
                && pos.x == tx && pos.y == ty;
            if (isDragSource)
                drawPos.x += dragOffset.x, drawPos.y += dragOffset.y;
            else if (isDragTarget)
                drawPos.x -= dragOffset.x, drawPos.y -= dragOffset.y;
        }

        // make pieces fall gradually
        if (fallTimer.active() && levelFall[pos.x + pos.y*levelSize.x])
            drawPos.y += 1-fallTimer.getPercent();

        // === GEM RENDER (5 layers) ===
        const color  = tileColors[data];
        const dark   = color.scale(0.40, 1);   // outer rim / drop shadow
        const darker = color.scale(0.22, 1);   // deepest shadow
        const light  = color.scale(1.30, 1);   // glossy highlight
        const sparkle = color.scale(1.60, 1);  // bright corner

        // 1. drop shadow (offset down)
        LJS.drawRect(drawPos.add(vec2(0, -.05)), vec2(.84), darker);
        // 2. outer rim
        LJS.drawRect(drawPos, vec2(.84), dark);
        // 3. main body (slight upward offset for top-lit feel)
        LJS.drawRect(drawPos.add(vec2(0, .015)), vec2(.78), color);
        // 4. glossy top sliver
        LJS.drawRect(drawPos.add(vec2(0, .24)), vec2(.66, .10), light);
        // 5. sparkle dot (upper-left corner)
        LJS.drawRect(drawPos.add(vec2(-.21, .20)), vec2(.10, .08), sparkle);

        // icon, scaled smaller so the gem facets read first
        LJS.drawTile(drawPos.add(vec2(0, -.04)), vec2(.42), tile(data, 64), color.scale(.25, 1));
    }

    // cover incoming tiles above the play field
    LJS.drawRect(LJS.cameraPos.subtract(cameraOffset).add(vec2(0, levelSize.y)), levelSize, backgroundColor);
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost()
{
    // Single centered HUD ribbon under the board.
    // ┌─────────────────────────────────┐
    // │  ⭐ SCORE  1240  •  🏆 BEST 9999 │
    // └─────────────────────────────────┘

    const hudY = -3.25;
    const center = LJS.cameraPos.add(vec2(0, hudY));

    // outer pill (single, wide) with soft glow shadow
    LJS.drawRect(center.add(vec2(.05, -.08)), vec2(5.40, .82), rgb(0, 0, 0, .35));
    LJS.drawRect(center, vec2(5.30, .76), rgb(0.07, 0.10, 0.22, 0.95));

    // SCORE section (left half)
    const scoreX = -1.30;
    // label
    LJS.drawText('SCORE', center.add(vec2(scoreX - .68, .14)), .22, rgb(0.62, 0.68, 0.85));
    // value — drawn twice: glow underlay then crisp top
    LJS.drawText(String(score),
        center.add(vec2(scoreX + .55, -.06)), .58,
        rgb(1.0, 0.42, 0.21, .55), 0, undefined, undefined, undefined);  // glow
    LJS.drawText(String(score),
        center.add(vec2(scoreX + .55, -.08)), .54,
        rgb(1.0, 0.78, 0.30), .07, rgb(0, 0, 0, .85));                   // top

    // soft divider dot in the middle
    LJS.drawRect(center.add(vec2(0, -.02)), vec2(.10, .10), rgb(0.55, 0.62, 0.85, .6));

    // BEST section (right half)
    const bestX = 1.30;
    LJS.drawText('BEST', center.add(vec2(bestX - .55, .14)), .22, rgb(0.62, 0.68, 0.85));
    LJS.drawText(String(bestScore),
        center.add(vec2(bestX + .55, -.06)), .58,
        rgb(0.71, 0.46, 1.0, .55), 0);
    LJS.drawText(String(bestScore),
        center.add(vec2(bestX + .55, -.08)), .54,
        rgb(0.93, 0.95, 0.98), .07, rgb(0, 0, 0, .85));
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
LJS.engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['tiles.png']);

///////////////////////////////////////////////////////////////////////////////
// find and remove all runs of 3 or higher
function clearMatches()
{
    // horizontal match check
    const removeTiles = [], pos = vec2();
    for (pos.y = levelSize.y; pos.y--;)
    {
        let runCount, runData;
        for (pos.x = levelSize.x; pos.x--;)
        {
            const data = getTile(pos);
            if (data >= 0 && data == runData)
            {
                for (let i=++runCount; runCount >= minMatchCount && i--;)
                    removeTiles[pos.x + i + pos.y * levelSize.x] = 1;
            }
            else
            {
                runData = data;
                runCount = 1;
            }
        }
    }

    // vertical match check
    for (pos.x = levelSize.x; pos.x--;)
    {
        let runCount, runData;
        for (pos.y = levelSize.y; pos.y--;)
        {
            const data = getTile(pos);
            if (data >= 0 && data == runData)
            {
                for (let i=++runCount; runCount >= minMatchCount && i--;)
                    removeTiles[pos.x + (pos.y + i) * levelSize.x] = 1;
            }
            else
            {
                runData = data;
                runCount = 1;
            }
        }
    }

    // remove tiles all at once like this to handle shapes like L or T
    let removedCount = 0;
    for (pos.x = levelSize.x; pos.x--;)
    for (pos.y = levelSize.y; pos.y--;)
    {
        if (removeTiles[pos.x + pos.y * levelSize.x])
        {
            // remove tile
            ++removedCount;
            const data = getTile(pos);
            setTile(pos, -1);

            // spawn particles
            const color1 = tileColors[data];
            const color2 = color1.lerp(hsl(), .5);
            new LJS.ParticleEmitter(
                pos.add(vec2(.5)), 0, // pos, angle
                .5, .1, 200, 3.14,    // emitSize, emitTime, rate, cone
                0,                    // tileInfo
                color1, color2,                      // colorStartA, colorStartB
                color1.scale(1,0), color2.scale(1,0),// colorEndA, colorEndB
                .5, .3, .2, .05, .05, // particleTime, sizeStart, sizeEnd, speed, angleSpeed
                .99, 1, 1, 3.14, .05, // damp, angleDamp, gravityScale, particleCone, fadeRate
                .5, 0, 1              // randomness, collide, additive, colorLinear, renderOrder
            );
        }
    }

    if (removedCount)
    {
        score += ++comboCount*removedCount;
        fallTimer.set();
        levelFall = [];
    }
    else
        comboCount = 0;
}