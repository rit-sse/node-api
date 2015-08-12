# Style guide

ESlint is run on every build and will result in a failed build if not followed.

The following options are enabled in our .eslintrc

## Arrow Parens

Only use arrow parens when necessary. The following will error:

```javascript
var fn = (args) => console.log(args);
```
and should be replaced with:

```javascript
var fn = args => console.log(args);
```

### Arrow Spacing

We require a space before and after arrow functions. The following will error:

```javascript
var fn = args =>console.log(args);
```
and should be replaced with:

```javascript
var fn = args => console.log(args);
```

## Brace Style

Enforce "1 true brace style"

```javascript
if (foo) {
  bar();
} else {
  baz();
}
```

## Camel Case
You will recieve a warning if you aren't using camelCase


## Curly Braces

Don't omit curly braces for one line block statements.  It will error.

## New lines at the end of file

All files must end with a new line. It will error if you don't.

## Triple equals

Prefer triple equals to double equals comparisons.

## Indent

Use 2 spaces for indentation

## Max Depth

You will recieve a warning if your depth of block nesting is greater than 3.

## Max statements

You will recieve a warning if you have more than 15 statements in a function

## Max line length

You will recieve a warning if line length is longer than 80

## No extending native types

You will get an error if you extend native types

## No extra parens

Don't use any additional parens that aren't required.  You will get an error;

## No extra semi colons

No unnecessary semi colons. The following will error:

```javascript
var x = 5;;

function foo() {
    // code
};
```

## No irregular white space

It will error if you use improper spacing

## No mixing of tabs and spaces

Don't use tabs and spaces. Honestly don't use tabs at all. Will error.

## No trailing spaces

No trailing spaces at the end of lines

## Don't use variables before they are defined

This will error for obvious reasons

## No unused variables

You will get a warning if there are any unused variables

## Use single quotes

Use single quotes unless using single quotes would require you to escape. For example

```javascript
"It's accceptable to use double quotes here"

'But this should use single'
```


## Semicolons
Always uses semicolons. Will error if you don't


## Space after keywords

Always put a space after keywords. This will error:

```javascript
if(foo){

}
```

And should be replaced with

```javascript
if (foo){

}
```


