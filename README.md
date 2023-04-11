# Pra que serve esse projeto ?

Eu amo Arduino.  
E por muito tempo eu só fiquei brincando com ele.  
E por mais que seja divertido ficava procurando uma maneira de conectar as informações que eu recebia dos sensores no Arduino ao computador.

Depois de muito tempo descobri a porta Serial e suas funcionalidades, e descobri que posso usar linguagens que eu já uso como **Javascript**, **Typescript** e **Python** ( Talvez, em alguma realidade *Go* e *Ruby* ).

Este Projeto tem essa finalidade, testar diversas linguagens de Programação, e como eu posso conecta-lás com um Arduino, não tem nada muito especial aqui, apenas testes de um adolescente com Arduino.

# Linguagens de Programação

## Python
![python logo](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/640px-Python_logo_and_wordmark.svg.png "python logo")
Através da biblioteca *'serial'* é possível ler a entrada da porta serial.  
- importar a biblioteca:
```python
import serial
```
- Se conectar a porta do arduino:
```python
# Informações necessárias para se conectar ao arduino
port = "COM4"
baudrate = 9600

# Conectando a porta serial do Arduino
try :
    my_port = Serial( port, baudrate )
    # foi criaco uma variável chamada 'my_port'
    # onde estão as funções necessárias para trabalhar com o Arduino
except SerialException :
    print( "Erro ao conectar a porta " )
    exit( 1 )
    # O programa vai fechar caso ocorra algum erro ao conectar no Arduino
```
- Ler informação da porta serial do Arduino :
```python
# Recebe a informação crua do Arduino em 'bytes'
info = my_port.read()

# Converte essa informação para um valor inteiro
data = int.from_bytes( info , "big")
```
- Fechar conexão com a porta serial do arduino:
```python
# Comando que fecha a conexão entre o Arduino e o programa
my_port.close()
```