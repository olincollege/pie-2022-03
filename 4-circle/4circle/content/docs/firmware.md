+++
title = "Firmware Design"
description = "Firmware in our project"
date = 2022-12-16T00:39:49-05:00
weight = 20
draft = false
bref = ""
toc = true
+++

To integrate our software and electrical components we used a simple Python script that could write to the serial port the arduino was connected to. To do this, we first needed to integrate Go and Python, such that our compiled Go program could call our Python program to write to serial. 

Our first attempt at integration was trying to import C into Go, using the "C" package, and then using C's Python/C API to run our Python code. We originally tried this because Isa already had a lot of experience integrating C and Python, and thus had already written all the functions we'd have needed, meaning that the only thing we'd have to figure out is integrating C into Go. However, we ran into too many issues trying to initialize the C environment into Go that we decided the best route was to try and do direct Python/Go integration.

While there are prebuilt Python/Go bindings, we decided that they were probably too complex for our purposes, since all we needed to do was run a Python function that printed to the serial port. Our solution was to import the "os/exec" package into our main Go program, so that we could open up a command window from our Go program and simply run these two lines of code:

    import toPy
    toPy.to_serial(col)

Where toPy is our Python file where our function is stored, to_serial is our function that prints to the serial port, and col is the column number that gives the computer player the best score.

