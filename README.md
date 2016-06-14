# Stylescribe

[Stylescribe] is a CSS documentation generator. It's goal is to produce a reference document that can be used to create quickly build user interfaces or websites without having to dive into the inner workings of a projects CSS.

CSS authors annotate their stylesheets using simple markdown-style comments which Stylescribe uses to produce a HTML document containing implementation details, code samples and accompanying previews.

## Stylescribe is useful for..

* Documenting how to build interfaces in teams with varying levels of CSS knowledge.
* Helping CSS authors create standlone, resuable components that work outside the context of a specific use-case or project.
* For creating CSS test suites. By creating additional CSS files that only contain Stylescribe comments, I can generate a document full of examples to test complex implementations and edge cases without polluting the main documentation.
* Code reviews and CI, by automating screen captures of the document and diffing it against master.

### Example


```
/* =========================================================

Buttons

Styles for styling elements as buttons in various colours
and sizes.

Elements
---------
btn__icon         An optional icon


Modifiers
---------
btn--primary      Button matching branding primary colour
btn--secondary    Button matching branding secondary colour
btn--large        Large button, useful for CTAs
btn--small        Smaller button

Example
-------
<button class="btn">Click me</button>

Example: Applying to different elements
---------------------------------------
This example demonstrates that any element can be styled to
look like a button.

  <button class="btn">Click me</button>
  <a class="btn">Click me</a>
  <input type="submit" class="btn" value="Click me">

========================================================= */
```

For full comment documentation, please see the [stylescribe] repo.


## Installation

```
npm install -g https://github.com/keithclark/stylescribe-cli.git
```

### Basic use

```
stylescribe example.css
```

By default, stylescribe will create a `build.html` file in the current directory. If you'd like to specify a different output path you can use the `--output` option:
```
stylescribe example.css --output path/to/my-styleguide.html
```

### Multiple source files
Stylescribe can create a document from multiple CSS files:
```
stylescribe example1.css example2.css
```

### Automatic rebuilds
Stylescribe can watch your source files for changes, automatically rebuilding your documentation as you work.

```
stylescribe example1.css --watch
```

### Custom document templates

Stylescribe uses the [handlebars] templating engine to generate documents. A default template is included but, if you want to create your own, you can reference it with the `--template` option:

```
stylescribe example.css --template my-template.html.bhs
```

For details on the template format and data, please see the [template documentation][stylescribe-templates] in the [Stylescribe] repo.


[stylescribe]: https://github.com/keithclark/stylescribe  "Stylescribe github repository"
[stylescribe-templates]: https://github.com/keithclark/stylescribe  "Stylescribe template documentation"
[handlebars]: http://handlebarsjs.com/ "Handlebars website"
