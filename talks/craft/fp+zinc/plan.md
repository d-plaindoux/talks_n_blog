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
def add native "add" 2
def ONE 1 
def increment (add ONE)

increment 41
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


