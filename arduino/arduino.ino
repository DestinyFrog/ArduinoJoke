const int led_red = 5;
const int led_yellow = 6;
const int led_green = 7;
const int buzzer = 10;
const int light_sensor = A0;

unsigned short int last;
unsigned short int light = 0;
unsigned short int max = 1024;
int data = 0;
const int max_delay = 250;

void setup() {
    Serial.begin( 9600 );

    pinMode( led_green, OUTPUT );
    pinMode( led_yellow, OUTPUT );
    pinMode( led_red, OUTPUT );
    pinMode( buzzer, OUTPUT );
}

void loop() {
    data = analogRead( light_sensor ); 
    if ( data > max ) { max = data; }
    light = int( float( data ) * 255 / max );

    Serial.write( light );

    digitalWrite( last, LOW );

    last =  light < 256/6   ? led_red :
            light < 256/4 ? led_yellow :
            led_green;

    digitalWrite( last, HIGH );

    tone( buzzer, 800000,40 );
    delay( light * 2 + 30 );
    noTone( buzzer );
}
