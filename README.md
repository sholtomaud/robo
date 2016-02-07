# robo [![Build Status](https://travis-ci.org/shotlom/robo.svg?branch=master)](https://travis-ci.org/shotlom/robo)

Robo repo example

## Mission
Create an application that can read in simple commands from command line, similar to logo, but robo.

## Install Procedure

You need Node.js & npm. Robo is built and tested on node v0.12.7, so `nvm use 0.12.7` 

1. Clone the repo with `git clone https://github.com/shotlom/robo.git`
2. Install dependencies `npm i`
3. Run with `node index.js`
4. Play & test using commands documented below

**Testing**

Run `npm test`, to run tape tests.

**Debugging**

Run `npm run debug`, to run in debugging mode.

## Requirements
- [x] The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE 
command. 
- [x] The application should discard all commands in the sequence until a valid PLACE command has been executed.
- [x] A robot that is not on the table can choose the ignore any command other than PLACE
- [x] The robot must respond to MOVE, LEFT, RIGHT and REPORT commands.
- [x] Input can be from a file, or from standard input, as the developer chooses - STDIN.
- [x] Provide tests
- [x] Provide test data to exercise the application.
- [x] Provide source files & test source files

## Constraints
* The toy robot must not fall off the table during movement. 
* This also includes the initial placement of the toy robot. 
* Any move that would cause the robot to fall must be ignored.

### POSITION

The origin (0,0) can be considered to be the SOUTH WEST most corner

### COMMANDS
- [x] PLACE X,Y,F
- [x] MOVE
- [x] LEFT
- [x] RIGHT
- [x] REPORT

#### PLACE 
Will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. 

#### MOVE 
Will move the toy robot one unit forward in the direction it is currently facing.

#### LEFT and RIGHT 
Will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

#### REPORT 
Will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

