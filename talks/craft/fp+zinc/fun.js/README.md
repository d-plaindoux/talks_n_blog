# fun.js

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

## Grammar

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

## Example

```
def cond native "equal" 3
def equal native "equal" 2
def mult native "mult" 2
def minus native "minus" 2

def fact a -> (cond (equal a 0)
                    (_ -> 1)
                    (_ -> mult a $ fact $ minus a 1) ())

fact 6
```

## License

Copyright (C)2017 D. Plaindoux.

This program is  free software; you can redistribute  it and/or modify
it  under the  terms  of  the GNU  Lesser  General  Public License  as
published by  the Free Software  Foundation; either version 2,  or (at
your option) any later version.

This program  is distributed in the  hope that it will  be useful, but
WITHOUT   ANY  WARRANTY;   without  even   the  implied   warranty  of
MERCHANTABILITY  or FITNESS  FOR  A PARTICULAR  PURPOSE.  See the  GNU
Lesser General Public License for more details.

You  should have  received a  copy of  the GNU  Lesser General  Public
License along with  this program; see the file COPYING.  If not, write
to the  Free Software Foundation,  675 Mass Ave, Cambridge,  MA 02139,
USA.
