namespace SpriteKind {
    export const rock = SpriteKind.create()
    export const phenom = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    droid += 1
    if (droid == 1) {
        enterprise.sayText("..M5 Activated", 500, true)
    } else {
        enterprise.sayText("..M5 De-Activated", 500, true)
        droid = 0
    }
})
sprites.onOverlap(SpriteKind.rock, SpriteKind.rock, function (sprite, otherSprite) {
    music.knock.play()
    sprite.destroy(effects.fire, 500)
    otherSprite.destroy(effects.fire, 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Phaser()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.rock, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    music.knock.play()
    info.changeScoreBy(randint(3, 17))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.rock, function (sprite, otherSprite) {
    sprite.setImage(assets.image`EnterpriseShipShields`)
    music.knock.play()
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.fire, 500)
    info.changeLifeBy(-1)
    pause(100)
    sprite.setImage(assets.image`EnterpriseShip`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.phenom, function (sprite, otherSprite) {
    sprite.setImage(assets.image`EnterpriseShipShields`)
    music.knock.play()
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.fire, 500)
    info.changeLifeBy(-1)
    pause(100)
    sprite.setImage(assets.image`EnterpriseShip`)
})
function Phaser () {
    zap = sprites.createProjectileFromSprite(assets.image`Phaser`, enterprise, 0, -200)
    music.pewPew.play()
    zap.setFlag(SpriteFlag.DestroyOnWall, true)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.phenom, function (sprite, otherSprite) {
    otherSprite.destroy(effects.rings, 500)
    music.knock.play()
    info.changeScoreBy(randint(3, 17))
})
let nebula: Sprite = null
let nurock: Sprite = null
let zap: Sprite = null
let enterprise: Sprite = null
let droid = 0
game.splash("Clear the space lanes!", "The Enterprise needs to clear the obstacles. Press \"B\" for M5.")
droid = 0
scene.setBackgroundColor(15)
effects.starField.startScreenEffect()
enterprise = sprites.create(assets.image`EnterpriseShip`, SpriteKind.Player)
enterprise.setPosition(81, 100)
controller.moveSprite(enterprise, 100, 100)
enterprise.setStayInScreen(true)
info.setLife(10)
let rocks = [
assets.image`Asteroid`,
assets.image`Asteroid0`,
assets.image`Asteroid1`,
assets.image`Asteroid2`,
assets.image`Asteroid3`
]
let nebs = [assets.animation`NebAnim1`, assets.animation`NebAnim2`]
forever(function () {
    pause(randint(500, 2000))
    nurock = sprites.create(rocks[randint(0, 4)], SpriteKind.rock)
    nurock.setPosition(randint(0, 160), 0)
    nurock.setFlag(SpriteFlag.DestroyOnWall, true)
    nurock.setFlag(SpriteFlag.AutoDestroy, true)
    nurock.setVelocity(randint(-50, 50), randint(20, 200))
    if (1 == droid) {
        enterprise.x = nurock.x
        Phaser()
    }
})
forever(function () {
    pause(randint(500, 5000))
    nebula = sprites.create(assets.image`neb`, SpriteKind.phenom)
    animation.runImageAnimation(
    nebula,
    nebs[randint(0, 1)],
    200,
    true
    )
    nebula.setFlag(SpriteFlag.DestroyOnWall, true)
    nebula.setFlag(SpriteFlag.AutoDestroy, true)
    if (4 < randint(0, 10)) {
        nebula.setPosition(9, randint(10, 30))
        nebula.setVelocity(randint(5, 50), 0)
    } else {
        nebula.setPosition(151, randint(10, 30))
        nebula.setVelocity(randint(-50, 5), 0)
    }
})
