namespace SpriteKind {
    export const rock = SpriteKind.create()
    export const phenom = SpriteKind.create()
}
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
function Phaser () {
    zap = sprites.createProjectileFromSprite(assets.image`Phaser`, enterprise, 0, -200)
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
forever(function () {
    pause(randint(500, 2000))
    nurock = sprites.create(rocks[randint(0, 4)], SpriteKind.rock)
    nurock.setFlag(SpriteFlag.DestroyOnWall, true)
    nurock.setPosition(randint(0, 160), 0)
    nurock.setVelocity(randint(-50, 50), randint(20, 200))
})
forever(function () {
    pause(randint(500, 5000))
    nebula = sprites.create(assets.image`neb`, SpriteKind.phenom)
    animation.runImageAnimation(
    nebula,
    assets.animation`myAnim`,
    200,
    true
    )
    nebula.setPosition(9, randint(0, 10))
    nebula.setVelocity(randint(-50, 50), 0)
    nebula.setFlag(SpriteFlag.DestroyOnWall, true)
})
