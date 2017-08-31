Grammar definition of **fun.js** langage:
```
s0 ::=
   "def" IDENT SExp
   Exp

Exp ::= 
   SExp+    	       	   

SExp ::= 
   IDENT+ "->" SExp 	         
   "(" Exp ")"
   NUMBER 
   STRING
   "native" STRING
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


