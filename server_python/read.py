from serial import Serial, SerialException
from termcolor import colored
from os import system
import keyboard

# IMPORTANT informations about <arduino serial port>
port = "COM4"
baudrate = 9600

# Connect to <arduino serial port>
try:
    my_port = Serial( port, baudrate )
    system( "cls" )
    print( colored( f"Connected successfully to port <{port}>", "green" ) )
except SerialException :
    print( colored( f"Error 404: port <{port}> not found", "red" ) )
    exit( 1 )

data_arr = []
for _ in range( 6 ):
    data_arr.append( 0 )

while ( keyboard.is_pressed( "space" ) == False ) :
    data = int.from_bytes( my_port.read() , "big")

    data_arr.pop( 0 )              
    data_arr.append( data )

    system( "cls" )
    print( colored( f"!! Hold [space] to stop reading Serial port <{port}> !!", "red" ) )

    for val in data_arr :
        d = colored( "#"*int(val/2), ( "green" if ( val > 40  ) else "red" ) )
        print( "<"+ d +">", colored( val, "green" ) ,"<"+ d +">" ) 

my_port.close()
print( colored( f"Disconnected successfully of port <{port}>", "green" ) )
