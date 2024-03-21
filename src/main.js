import { GameScene } from "./game.class";
class GameComponent {
    gameScene = new GameScene();
    init() {
        this.gameScene.init();
        fetch("./src/main.ts")
            .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.blob();
        })
            .then((blob) => {
            console.log("MIME type:", blob.type);
        })
            .catch((error) => {
            console.error("Error fetching file:", error);
        });
    }
}
const gameComponent = new GameComponent();
gameComponent.init();
