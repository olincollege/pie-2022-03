---
title: Context
permalink: /context/
---

# Why Barbot?

Imagine coming home after a long day of work to your very own personal mixologist. He makes you your favorite mixed drink - with perfect propoprtions tailored to your liking. Now, this fantasy can be reality for everyone... not just the wealthy elite. Introducing BarBot: your personal robo-mixologist.

![Barbot Demo Day Image](/pie-2022-03/barbot/images/Barbot_Final.jpg)
_Demo Day Barbot_

## What is BarBot?
BarBot is a state of the art robotic bartender. It can store up to four of your favorite ingredients that can be used to create the perfect drink, everytime! Users can select a drink using the front dial, then confirm selection to begin dispensing the drink.

## For Who is BarBot?
BarBot is the perfect gift for a cocktail enthusiast, and can even be useful in a bar setting as special employee.

## How Barbot Works
BarBot uses state-of-the-art (homemade) peristaltic pumps controlled by our most powerful microcontroller yet (MEGA2560) to mix and dispense ingredients. BarBot also features a chilled ingredient holding chamber to ensure that every drink is chilled to perfection.

While in the user mode, use the potentiometer dial to scroll through different drink options. Once you have located your drink, press the select button (left of the dial), to lock in your choice. Then press the confirm button (right of the dial) to begin dispensign the drink. If one were to go into maintainance mode, simply press the reset button. Note, if at any point of the proces you need to abort an operation, you can always hit reset to take Barbot back into the idle state of the respective modes. The reset button is also the way to move from user mode to maintainance mode.

You will notice the traffic light LEDs to the left of the UI and the blue and white LEDs to the right. The left LEDS are meant to represent the state during the user mode. When in the `idle` state, the red LED will turn on indicating that it is ready to serve. During the `selecting` state, all of the left LEDS will blink at an interval of half a second to indicate the time and to indicate that it requires further input. During the `dispensing` state, the yellow LED will turn on and remain on during the duration of the drink being dispensed. When the Barbot has finished dispensing, it will enter the `done` state, and turn on the green LED. Then the cycle starts over again with the `idle` state. Note that the blue LED remains on. This is because the blue LED tells the user that Barbot is in the `user` mode. The white LED tells the user that it is in the `maintainance` mode. In `maintainance` mode's `idle` state, the red LED will simply blink prompting the user to select which function to enable (set up or clean).