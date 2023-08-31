/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
// Vairable
":"                   return ":"
","                   return ","
// Rule
"=>"                  return '=>'
"or"                  return 'OR'
"OR"                  return 'OR'
"and"                 return 'AND'
"AND"                 return 'AND'
"very"                return 'VERY'
"VERY"                return 'VERY'
"fairly"              return 'FAIRLY'
"FAIRLY"              return 'FAIRLY'
"("                   return '('
")"                   return ')'
// Vairable
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
// Common
[0-9a-zA-Z_.]+[+-]*   return 'NAME'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%{
    function GetOperator1(operator, op1) {
        operator = operator.toLowerCase();
        return [operator, op1];
    }

    function GetOperator2(operator, op1, op2) {
        operator = operator.toLowerCase();
        var result = [operator];
        if (Array.isArray(op1) && (op1[0] === operator)) {
            for(var i=1, cnt=op1.length; i<cnt; i++) {
                result.push(op1[i]);
            }
        } else {
            result.push(op1);
        }
        if (Array.isArray(op2) && (op2[0] === operator)) {
            for(var i=1, cnt=op2.length; i<cnt; i++) {
                result.push(op2[i]);
            }
        } else {
            result.push(op2);
        }
        return result;
    }
%}

/* operator associations and precedence */

%left '=>'
%left 'VERY' 'FAIRLY'
%left 'AND'
%left 'OR'
%start expressions

%% /* language grammar */

expressions
    : varExp EOF
        {return $1;}
    | ruleExp EOF
        {return $1;}
    ;

varExp
    : NAME ':' NUMBER ',' NUMBER ',' NUMBER ',' NUMBER ',' NAME
        {
            var setName = $1, setType = $11;
            var left = Number($3), middle = Number($5), right = Number($7),
                arg0 = Number($9);
            $$ = {
                name: setName, type: setType,
                parameters: [left, middle, right, arg0],
            }
        }    
    | NAME ':' NUMBER ',' NUMBER ',' NUMBER ',' NAME
        {
            var setName = $1, setType = $9;
            var left = Number($3), middle = Number($5), right = Number($7);
            $$ = {
                name: setName, type: setType,
                parameters: [left, middle, right],
            }
        }
    | NAME ':' NUMBER ',' NUMBER ',' NUMBER
        {
            var setName = $1, setType = undefined;
            var left = Number($3), middle = Number($5), right = Number($7);
            $$ = {
                name: setName, type: setType,
                parameters: [left, middle, right],
            }
        }
    | NAME ':' NUMBER ',' NUMBER
        {
            var setName = $1, setType = undefined;
            var left = Number($3), right = Number($5), middle = (left+right)/2;
            $$ = {
                name: setName, type: setType,
                parameters: [left, middle, right],
            }
        }
    | NAME ':' NUMBER ',' NUMBER ',' NAME
        {
            var setName = $1, setType = $7;
            var left = Number($3), right = Number($5), middle = (left+right)/2;
            $$ = {
                name: setName, type: setType,
                parameters: [left, middle, right],
            }
        }
    ;

ruleExp
    : VERY ruleExp
        {            
            $$ = GetOperator1($1, $2)
        }   
    | FAIRLY ruleExp
        {            
            $$ = GetOperator1($1, $2)
        }      
    | ruleExp AND ruleExp
        {
            $$ = GetOperator2($2, $1, $3);
        }
    | ruleExp OR ruleExp
        {
            $$ = GetOperator2($2, $1, $3);
        }     
    | '(' ruleExp ')'
        {
            $$ = $2
        }   
    | ruleExp '=>' NAME
        {
            $$ = ['=>', $1, $3];
        }
    | NAME 
        {
            $$ = $1;
        } 
    ;
