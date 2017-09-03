Grammar definition of **fun.js** langage:
```
s0 ::=
   definition*

definition ::=
   "def" IDENT SExp
   Exp

Exp ::= 
   SExp+    	       	   

SExp ::= 
   IDENT+ "->" SExp 	         
   "(" Exp ")"
   "(" ")"
   "$ Exp
   NUMBER 
   STRING
   "native" STRING NUMBER
```

Example:
```
def equal native "equal" 2
def mult native "mult" 2
def minus native "minus" 2

def fact a -> (cond (equal a 0)
                    (_ -> 1)
                    (_ -> mult a $ fact $ minus a 1) ())

fact 6
```

Steps:
* Parser -> AST
* AST -> AST De Bruinj 
* AST De Bruinj -> Javascript => Perf + Tail recursion
* AST De Bruinj -> ZINC => Perf + Tail recursion + GC Perspective

--- 

Implementation en Javascript / Compilation à la volée
Utilisation dans le cadre d'une application réelle ?

---


