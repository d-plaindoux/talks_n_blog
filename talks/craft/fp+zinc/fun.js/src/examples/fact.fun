def cond c t f -> native "cond" 3 c t f ()
def equal native "equal" 2
def mult native "mult" 2
def minus native "minus" 2

def fact a ->
    cond (equal a 0)
         (_ -> 1)
         (_ -> mult a $ fact $ minus a 1)
