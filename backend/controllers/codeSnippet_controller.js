// Dummy code snippets for different languages
export const codeSnippets = {
  html: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
</body>
</html>`,
  css: `body {
  background-color: lightblue;
}
h1 {
  color: white;
  text-align: center;
}
p {
  font-family: verdana;
  font-size: 20px;
}`,
  javascript: `console.log("Hello, World!");`,
  python: `print("Hello, World!")`,
  java: `public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`,
  c: `#include <stdio.h>
int main() {
  printf("Hello World!");
  return 0;
}`,
  csharp: `using System;
namespace HelloWorld
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Hello World!");    
    }
  }
}`,
  react: `import React from 'react';
import ReactDOM from 'react-dom/client';
function Hello(props) {
  return <h1>Hello World!</h1>;
}
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<Hello />);`,
  jquery: `$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});`,
  xml: `<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`,
  django: `<ul>
  {% for x in mymembers %}
    <li>{{ x.firstname }}</li>
  {% endfor %}
</ul>`,
  nodejs: `var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(8080);`,
  cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  php: `<!DOCTYPE html>
<html>
<body>
<?php
echo "My first PHP script!";
?>
</body>
</html>`,
  ruby: `puts "Hello, World!"`,
  go: `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  typescript: `console.log("Hello, World!");`,
  swift: `import Swift
print("Hello, World!")`,
  kotlin: `fun main() {
    println("Hello, World!")
}`,
};

// Controller to handle language-based code snippet generation
export const generateSnippet = (req, res) => {
  // Extract the language parameter from the request
  const { language } = req.params;

  // Log the received language parameter for debugging
  // console.log(`Received language parameter: "${language}"`);

  // Normalize the language to lowercase for matching
  const normalizedLanguage = language.trim().toLowerCase();

  // // Log the normalized language for debugging
  // console.log(`Normalized language: "${normalizedLanguage}"`);

  // // Find the corresponding code snippet
  const snippet = codeSnippets[normalizedLanguage];

  // Log the lookup result for debugging
  // console.log(`Looking up snippet for: "${normalizedLanguage}"`);
  // console.log(`Snippet found: ${snippet}`);

  // Return the snippet if found, otherwise return an error
  if (snippet) {
    return res.status(200).json({
      language: language,
      code: snippet,
    });
  } else {
  
    return res.status(404).json({
      error: "Code snippet for the requested language is not available.",
    });
  }
};
