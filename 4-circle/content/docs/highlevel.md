+++
title = "High Level Overview"
description = "High level overview and system diagram of our project"
date = 2022-12-16T00:39:49-05:00
weight = 30
+++

![Schematic Diagram](/pie-2022-03/4-circle/public/images/4circle_eschematic.png)

For our PIE final project, we created a robot that can play Connect 4 against a human player. To compute the moves, the computer player used a NegaMax algorithm to find the column to play in that provided the best possible score, then sent that column to the arduino which activated the lead screw and moved our chip dispenser to the correct column and dispensed a chip. We wrote the NegaMax algorithm in Go, used Python to communicate between Go and Arduino, and used the Arduino IDE to control the arduino. Learn more about this project by reading the docs!
