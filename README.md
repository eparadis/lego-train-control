# LEGO train automation!
RPi3 in a LEGO case...
LEGO trains with bluetooth...

Only one thing I can do, really.

# Tools
There is a Python library called `bricknil` that is broken and kind of abandoned. So save yourself some time and look elsewhere.

There nodejs library `node-poweredup` seems to work fine and be in development. That is what I'm using here.

# Ideas

- webpage to control the train
- use the RPi Camera to stream video
- connect sensors to the RPi and make the train run itself
  - read barcodes off the track
  - play sounds when certain colored bricks next to the track are encountered
  - use a distance sensor to find cars
  - add an odometer or tachometer to the train so it can determine if it's stuck
  - add an IMU to detect if the train is at an unstable speed
- build a second engine and have them coordinated by the RPi
- connect micro servos to the RPi to animate things on the train cars
- add lights or a display to the RPi
- make a "charging station"
- adapt the LEGO train motor to use USB power bricks like the RPi so they'll have longer runtimes

