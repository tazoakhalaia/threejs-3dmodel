import { GameScene } from "./game.class";
class GameComponent {
    gameScene = new GameScene();
    init() {
        this.gameScene.init();
    }
}
const gameComponent = new GameComponent();
gameComponent.init();
