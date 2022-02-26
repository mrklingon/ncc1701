namespace SpriteKind {
    export const rock = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.rock, SpriteKind.rock, function (sprite, otherSprite) {
    music.knock.play()
    sprite.destroy(effects.fire, 500)
    otherSprite.destroy(effects.fire, 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Phaser()
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
    nurock.setVelocity(randint(-50, 50), randint(20, 100))
})
