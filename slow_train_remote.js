/*
 *
 * This example allows you to connect Vernie and a Powered UP Remote Control to your laptop, and enables the control of Vernie with the Remote.
 *
 */

const PoweredUP = require("/usr/local/lib/node_modules/node-poweredup");

const poweredUP = new PoweredUP.PoweredUP();
poweredUP.scan(); // Start scanning

console.log("Looking for train and remote...");

const TRAIN_LED_COLOR = PoweredUP.Consts.Color.PURPLE;

let trainHub = null;
let trainMotor = null;
let remoteHub = null;
let remoteButtonLeft = null;
let remoteButtonRight = null;

let currentSpeed = 0;

poweredUP.on("discover", async (hub) => { // Wait to discover Vernie and Remote

    if (hub.type === PoweredUP.Consts.HubType.HUB) {
        console.log("hub found. connecting...");

        trainHub = hub;
        await trainHub.connect();
        console.log("connected. waiting for LED device...");
        const led = await trainHub.waitForDeviceByType(PoweredUP.Consts.DeviceType.HUB_LED);
        console.log("found. waiting for motor device...");
        trainMotor = await trainHub.waitForDeviceByType(PoweredUP.Consts.DeviceType.TRAIN_MOTOR);
        console.log("found. setting LED color...");
        led.setColor(TRAIN_LED_COLOR);
        console.log(`Connected to train (${trainHub.name})!`);
        if (trainHub && remoteHub) {
            console.log("You're now ready to go!");
        }

    } else if (hub.type === PoweredUP.Consts.HubType.REMOTE_CONTROL) {
        remoteHub = hub;
        await remoteHub.connect();
        const led = await remoteHub.waitForDeviceByType(PoweredUP.Consts.DeviceType.HUB_LED);
        remoteButtonLeft = await remoteHub.waitForDeviceAtPort("LEFT");
        remoteButtonRight = await remoteHub.waitForDeviceAtPort("RIGHT");
        led.setColor(TRAIN_LED_COLOR);

        remoteButtonLeft.on("remoteButton", ({ event }) => {
            if (trainMotor) {
                if (event === PoweredUP.Consts.ButtonState.UP) {
                    currentSpeed += 10;
                } else if (event === PoweredUP.Consts.ButtonState.DOWN) {
                    currentSpeed -= 10;
                } else if (event === PoweredUP.Consts.ButtonState.STOP) {
                    currentSpeed = 0;
                }
                trainMotor.setPower(currentSpeed);
            }
        });

        remoteButtonRight.on("remoteButton", ({ event }) => {
            if (trainMotor) {
                if (event === PoweredUP.Consts.ButtonState.UP) {
                    currentSpeed += 1;
                } else if (event === PoweredUP.Consts.ButtonState.DOWN) {
                    currentSpeed -= 1;
                } else if (event === PoweredUP.Consts.ButtonState.STOP) {
                    currentSpeed = 0;
                }
                trainMotor.setPower(currentSpeed);
            }
        });

        console.log(`Connected to remote (${remoteHub.name})!`);
        if (trainHub && remoteHub) {
            console.log("You're now ready to go!");
        }
    } else {
        console.log(`hub type of ${hub.type} found`);
    }
    
});
