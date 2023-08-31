/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b                                 return 'NUMBER'
\b0x[0-9A-Fa-f]+\b                                   return 'HEXNUMBER'
"*"                                                  return '*'
"/"                                                  return '/'
"-"                                                  return '-'
"+"                                                  return '+'
"^"                                                  return '^'
"%"                                                  return '%'
">="                                                 return ">="
"<="                                                 return "<="
">"                                                  return '>'
"<"                                                  return '<'
"=="                                                 return "=="
"!="                                                 return "!="
"||"                                                 return "||"
"&&"                                                 return "&&"
"?"                                                  return "?"
":"                                                  return ":"
"("                                                  return '('
")"                                                  return ')'
"["                                                  return '['
"]"                                                  return ']'
","                                                  return ','
"."                                                  return '.'
'true'                                               return 'true'
'false'                                              return 'false'
[^\s\*\/\-\+\^\%\>\=\<\!\|\&\?\:\(\)\[\]\,\.]+       return 'NAME'
\"(\\.|[^\"\\])*\"|\'(\\.|[^\'\\])*\'                return 'QUOTED_STRING'
<<EOF>>                                              return 'EOF'
.                                                    return 'INVALID'

/lex

%{
    function runFn(arg, ctx) {
        return (typeof(arg) === 'function')? arg(ctx) : arg;
    }

    function mapArgs(args, ctx) {
        if (args) {
            args = args.map(function(arg){ return runFn(arg, ctx); });
        }
        return args;
    }

    function runBuildInMethod(self, ctx, name, args) {
        var callback = self[name];
        return callback.apply(self, mapArgs(args, ctx));
    }

    function runMethod(self, ctx, name, args, dotMode) {
        var names;
        if (typeof(name) === 'string') {
            if (dotMode) {
                names = name.split('.');
            } else {
                names = [name];
            }
        } else {
            names = name;
        }

        var callback, scope;
        if (names.length > 1) {
            var callbackName = names.pop();
            scope = self.getDotProperty(ctx, names);
            callback = scope[callbackName];
        } else {
            callback = self.getProperty(ctx, name);
            scope = self;
        }

        if (callback == null) {
            callback = self.getProperty(ctx, 'defaultHandler');
            scope = self;
        }

        return callback.apply(scope, mapArgs(args, ctx));
    }
%}

/* operator associations and precedence */

%left '?' ':'
%left '||' '&&'
%left '>' '<' '==' '!=' '>=' '<='
%left '+' '-'
%left '%'
%left '*' '/'
%left '^'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {
            var result = $1;
            if (typeof(result) === 'function') {
                return result;
            } else {
                return function(ctx) { return result; }
            }
        }
    ;

expression_list
    : expression_list ',' e
        { $$ = $1.concat([$3]); }
    | e
        { $$ = [$1]; }
    ;

dot_name
    : dot_name '.' NAME
        { $$ = $1.concat([$3]); }
    | dot_name '[' e ']'
        { $$ = $1.concat([$3]); }
    | NAME
        { $$ = [$1]; }
    ;

e
    : e '+' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_add', [$1, $3]); };
        }
    | e '-' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_subtract', [$1, $3]); };
        }
    | e '*' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_multiply', [$1, $3]); };
        }
    | e '/' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_divide', [$1, $3]); };
        }
    | e '%' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_mod', [$1, $3]); };
        }        
    | e '^' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_pow', [$1, $3]); };
        }
    | e '>' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$1, $3]) == true; };
        }
    | e '<' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_lessThen', [$1, $3]) == true; };
        }
    | e '==' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_equalTo', [$1, $3]) == true; };
        }
    | e '!=' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_equalTo', [$1, $3]) == false; };
        }
    | e '>=' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_lessThen', [$1, $3]) == false; };
        }
    | e '<=' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_greaterThen', [$1, $3]) == false; };
        }
    | e '||' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_or', [$1, $3]) == true; };
        }
    | e '&&' e
        {
            $$ = function(ctx) { return runBuildInMethod(yy.parser, ctx, '_and', [$1, $3]) == true; };
        }        
    | '-' e %prec UMINUS
        {
            $$ = function(ctx) { return -runFn($2, ctx); };
        }
    | '(' e ')'
        {
            $$ = function(ctx) { return runFn($2, ctx); };
        }
    | '(' e ')' '?' e ':' e
        {
            $$ = function(ctx) { return runFn($2, ctx)? runFn($5, ctx) : runFn($7, ctx); };
        }
    | 'true'
        { $$ = true; }
    | 'false'
        { $$ = false; }
    | dot_name 
        {            
            $$ = function(ctx) {
                return yy.parser.getDotProperty(ctx, mapArgs($1, ctx), 0); 
            }
        }        
    | dot_name '(' ')'
        {
            $$ = function(ctx) { 
                return runMethod(yy.parser, ctx, mapArgs($1, ctx), undefined, true); 
            }
        }
    | dot_name '(' expression_list ')'
        {
            $$ = function(ctx) { 
                return runMethod(yy.parser, ctx, mapArgs($1, ctx), $3, true); 
            }
        }
    | QUOTED_STRING
        { $$ = yytext.slice(1,-1); }
    | NUMBER
        { $$ = Number(yytext); }
    | HEXNUMBER
        { $$ = parseInt(yytext, 16); }
    ;
