+++
title = "Mechanical Design"
description = "How was our mechanical Connect 4 player constructed?"
date = 2022-12-16T01:00:51-05:00
weight = 20
draft = false
bref = ""
toc = true
+++

![Trimetric View](/pie-2022-03/4-circle/public/images/trimetricView.png)

For our mechanical system, we created a chip dispensing mechanism that was mounted on a lead screw attached to a stepper motor so that it could move to the correct column and dispense a chip into it. Almost all parts were 3D printed using PLA with the exception of the mount and box around the lead screw, which was laser cut on 1/4" MDF.

![Side View](/pie-2022-03/4-circle/public/images/sideView.png)

## Chip Dispensing:
To hold the chips prior to their dispensing, we 3-D printed a PLA tube that was mounted above the chute. The connect 4 chips were stacked on top of each other and the tube was mounted close enough to the baseboard such that only 1 chip was out of the tube at a time and thus only one chip could be dispensed into the chute at a time.

![Trimetric View of Chute](/pie-2022-03/4-circle/public/images/chuteTrimetric.png)

When the chips came out of the tube they were not aligned correctly as they were horizontal instead of vertical, and thus we needed to realign them such that they could go into the game board. Our solution to that was creating a chute that would realign the chip and dispense it into the game board. There were a couple of things that were took into consideration while creating the chute. 

![Side View of Chute](/pie-2022-03/4-circle/public/images/chuteSlide.png)

The first thing we considered was chute length. If the horizontal portion of the chute was too long, the chip would get stuck right before the chute became vertical. The second thing we considered was servo arm length. Since our servo arm was longer than the distance between the chip and the chute, we needed to add slits within the chute sides so that the servo arm would not get stuck. 

Our baseboard was used to mount the servo and hold the chip that was about to be dispensed into the game board. Additionally, we used our baseboard as the mounting point from our chip dispenser to the lead screw.

## Mounting: 
To mount our dispenser onto the lead screw we cut two pieces of 1/4" MDF wood. The first piece of wood connected to the chip dispenser and was long enough such that the chip dispenser was hovering above the game board. The second piece of wood was used as a bridge between the first piece of wood and the lead screw, where it was glued onto the wood and screwed into the lead screw mount. 
