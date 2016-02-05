# robo

Robo repo for lookaheads

## Mission
Create an application that can read in commands from cli

### POSITION

The origin (0,0) can be considered to be the SOUTH WEST most corner

## Requirements
- [*] The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE 
command. 
- [*] The application should discard all commands in the sequence until a valid PLACE command has been executed.
- [ ] A robot that is not on the table can choose the ignore any command other than PLACE
- [ ] The robot must respond to MOVE, LEFT, RIGHT and REPORT commands.
- [ ] Input can be from a file, or from standard input, as the developer chooses.
- [ ] Provide test data to exercise the application.
- [ ] Provide source files & test source files

## Constraints
* The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot. 
* Any move that would cause the robot to fall must be ignored.

### COMMANDS
- [*] PLACE X,Y,F
- [ ] MOVE
- [ ] LEFT
- [ ] RIGHT
- [*] REPORT

#### PLACE 
Will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. 

#### MOVE 
Will move the toy robot one unit forward in the direction it is currently facing.

#### LEFT and RIGHT 
Will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

#### REPORT 
Will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.