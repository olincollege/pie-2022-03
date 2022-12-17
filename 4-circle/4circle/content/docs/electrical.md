+++
title = "Electrical Design"
description = "How was our system electrical designed and controlled?"
date = 2022-12-16T01:00:56-05:00
toc = true
+++
## Breakdown
Our electrical system consisted of: 
* A4988 Stepper motor driver
* Stepper motor
* 360 degree rotating servo
* 12V AC/DC converter 
* Raspberry Pi
* Arduino Uno
* 50 micro Farad Capacitor

## Multiple Processing Units
We chose to work with both an arduino and a raspberry pi to allow us to have two different opperation systems. Since our main algorithm was written on Go we figured that it would be best to run it on an a raspberry pi. To prevent slowing down our raspberry pi by making it process data/commands for both our stepper motor and servo we chose decided it would be best to have an arduino handle these commands. 

## Powering the systems
For our processing units the main power we used came from the raspberry pi AC/DC voltage convertor. This powered the raspberry pi at 5 volts which then powered the arduino with 5 volts through the usb connection in between the two. Once the arduino was powered it was able to power both the servo and the stepper motor driver. Both our servos and our stepper motor driver only required 5 volts which was well in the range which the arduino could supply. For our stepper motor since it required 12 volts we have to use an AC/DC voltage converter, to power the motor from a wall socket. In order to prevent any major voltage spikes that occur when the stepper motor runs, which can burnout the stepper motor driver, we added a 50 micro farad capacitor.

## Electrical Diagram

![Electrical Diagram](/images/4circle_eschematic.png)

## The Math and Code Behind the System
As with many things in order to contructed our system we had to heavily rely on math.

### The Stepper Motor
Stepper motors are called stepper motors because they are designed to move in discrete steps that allows for postion control and speed control. In order to know how many steps we had to move from column to column we had to find the distance the stepper motor moved our dispensing tower each step. In order to do this we gave the stepper motor a random amount of steps to sweep through and then we measured the distance it traveled. Since we knew the distance we just had to divide this distance by the random stepper number to find the inches per step. Once knowing this we measured the distance between the center of each column. Now we could divide the: (inches per column)/(inches per step) to find the steps per column. 
We indexed our columns at 1 to represent the column 1 as the most left and column 7 as the most right.

![Numbered Columns](/images/numbered_col.png)

To move to any column, in our arduino code we would take in the column number that the algorithm would tell us and subtract that from our current column number to get the difference. If the difference was positive that would mean that given column is farther right on the board and we would have to move CW. If the difference was negative, would know that the column was further to the left so we would have to rotate the stepper motor counter clockwise. By multipying the difference with the steps per column, our stepper motor would be able to move to any column given by the algorithm.

### The Servo Motor
Since we chose to used a continous 360 servo motor to dispence the connect four chips it does not follow the commands the same way as a regular 180 servo motor would. Since a 360 servo motor is continouos it does not read for position commands but rather speed and direction commands. A regular servo motor would read the command: ==myservo.write(45)== as a command to move to angle 45 but a continous servo would read this as a command to rotate in the counterclockwise direction at half max spead.
A servo motor understand that for inputs from 0-89 it should move counterclockwise with a speed gradient where 0 would be the fastest it can turn and 89 would be the slowest that it can turn. For inputs from 91-180, the servo motor would understance that it should move clockwise with a speed gradient where 91 represents the slowest it can rotate and 180 represents the fastest it can rotate. The with the input of 90 the continous servo knows to stop rotating. Since we wrote this code in arduino, the way which the servo motor would understand how long to rotate in a certain direction it would take the command: ==delay(1000)==. The number inside the paranthesis would indicate the amount of microseconds the servo motor should do the action for.
