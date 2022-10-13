import Phaser from 'phaser'
import SampleGameScene from '@/game/scenes/sample/SampleGameScene'
import Sample2GameScene from '@/game/scenes/sample2/Sample2GameScene'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: [SampleGameScene, Sample2GameScene]
  })
}

export default launch
export { launch }
