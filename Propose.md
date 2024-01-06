# Code Evaluation Service - Web APIs

## Summary
Provide interactive web service APIs to evaluate software programming source
code and snippets.

## Goals
The web service APIs will provide a stateful JavaScript interface to
interactively evaluate declarations, statements, and expressions of
programming languages.

## Non-Goals
Perform the evaluation is not the goal.  This project will focus on the
JavaScript interface designing and implementation.  The actual source code
and snippets evaluation will be performed in a remote web service.

Source code and snippets edition is not the goal.  Applications may provide
an interactive editor like notebook for documentation or education purposes.

## Motivation
Immediate evaluation is important when learning a programming language and
the libraries.  It would be helpful if the evaluation could happen in a web
page and have documentation and tutorials inlined with evaluable examples.

Programming language and libraries keep going forward, but documentation and
tutorials may fall behind.  If the inlined source code and snippets in a
documentation or tutorial could be evaluated or validated in an effective
way, it would be helpful for documentation and tutorials to catch up with
the development of Programming language and libraries.

## Description
### Functionality
#### Multiple Evaluations
The web service APIs should support a single snippet or multiple snippets
evaluation on the same session.  The evaluation result of a snippet depends
on the previous snippets evaluation states.

A single snippet evaluation may look like:

    Code snippet:
        System.out.println("Hello world");
    
    Evaluation result:
        Hello world!

A multiple snippets evaluation may look like:

    1st code snippet:
        String helloWorld = "Hello world";

    1st evaluation result:
        helloWorld ==> "Hello world"

    2nd code snippet:
        System.out.println(helloWorld);

    2nd evaluation result:
        Hello world!

#### One Direction Evaluation
The evaluation is a one direction process.  The evaluation of the following
snippets should not impact the previous snippets evaluation result.

In the following example, the 3rd evaluation should not change the previous
evaluation result.

    1st code snippet:
        String helloWorld = "Hello world";

    1st evaluation result:
        helloWorld ==> "Hello world"

    2nd code snippet:
        System.out.println(helloWorld);

    2nd evaluation result:
        Hello world!

    3rd code snippet (update the 1st snippet):
        String helloWorld = "Hello World!";

    3rd evaluation result:
        helloWorld ==> "Hello World!"

Applications may update a snippet for further evaluation, but it is not
necessary for evaluation service to identify the update in its implementation.
Instead, the updated snippet may be treated as one more general snippet
during the evaluation.  If an application want to see the impact on previous
snippets, it could run the previous snippets again.

    1st code snippet:
        String helloWorld = "Hello world";

    1st evaluation result:
        helloWorld ==> "Hello world"

    2nd code snippet:
        System.out.println(helloWorld);

    2nd evaluation result:
        Hello world

    3rd code snippet (update the 1st snippet):
        String helloWorld = "Hello World!";

    3rd evaluation result:
        helloWorld ==> "Hello World!"

    4th evaluation result (run the 2nd code snippet again):
        Hello World!

#### Interactive Evaluation
Even for the same snippet set, different users may use different evaluation
processes, and result in different evaluation result. The evaluation service
implementation should be able to support personalized evaluation processes.

For example, there are two snippets in one web page.

    1st code snippet:
        String helloWorld = "Hello world";

    2nd code snippet:
        System.out.println(helloWorld);


A user could evaluate the snippets in order as displayed, or update one or more
snippets for further evaluation.

#### Multiple Programming languages
The web service APIs should support multiple programming languages.  For each
programming language, the web service APIs should support multiple releases.

For example, the following code snippet should use Java programming language
and Oracle JDK 21.

    Code snippet (Programming Language: Java;  Release: Oracle JDK 21):
        System.out.println("Hello world");

### Messages
#### Request body
    {
        "language": "string",
        "version": "string",
        "context": "string",
        "code": "string",
    }

#### Response body
    {
        "status": "string",
        "message": "string",
    }

#### Javascript function
```javascript
function run(dictionary) {
    // return dictionary
}

const evaluation = await codev.run({
    language: "java",
    version: "21",
    context: "",
    code: "System.out.println("Hello world");"
});

console.log(evaluation.status);
console.log(evaluation.message);
```
