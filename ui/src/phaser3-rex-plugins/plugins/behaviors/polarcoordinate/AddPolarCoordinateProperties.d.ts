export default AddPolarCoordinateProperties;

declare namespace AddPolarCoordinateProperties {
    interface PolarCoordinateGameObject extends Phaser.GameObjects.GameObject {
        polarOX: number;
        polarOY: number;
        polarRotation: number;
        polarAngle: number;
        polarRadius: number;
    }
}

declare function AddPolarCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    ox?: number, oy?: number,
    rotation?: number,
    radius?: number
): AddPolarCoordinateProperties.PolarCoordinateGameObject;