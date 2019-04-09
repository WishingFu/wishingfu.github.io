# Markdown Syntax

## Heading
```
To create a heading, add number signs (#) in front of a word or phrase.
```

## Paragraph
```
To create paragraphs, use a blank line to separate one or more lines of text.

To create a line break (<br>), end a line with two or more spaces, and then type return.
```

## Font style
```
Bold: To bold text, add two asterisks or underscores before and after a word or phrase.

Italic: To italicize text, add one asterisk or underscore before and after a word or phrase.

Both: To emphasize text with bold and italics at the same time, add three asterisks or underscores before and after a word or phrase.
```

## Blockquote
```
To create a blockquote, add a > in front of a paragraph.
```

## List
```
Ordered list: To create an ordered list, add line items with numbers followed by periods. 

Unordered list: To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items. 
```

## Code
```
To denote a word or phrase as code, enclose it in tick marks (`).
```

## Horizontal Rules
```
To create a horizontal rule, use three or more asterisks (***), dashes (---), or underscores (___) on a line by themselves.
```

## Links
```
To create a link, enclose the link text in brackets (e.g., [Duck Duck Go]) and then follow it immediately with the URL in parentheses (e.g., (https://duckduckgo.com)).
```

## Adding Titles
```
You can optionally add a title for a link. This will appear as a tooltip when the user hovers over the link. To add a title, enclose it in parentheses after the URL.
```

## URLs and Email Addresses
```
To quickly turn a URL or email address into a link, enclose it in angle brackets.
```

## Formatting Links
```
To emphasize links, add asterisks before and after the brackets and parentheses.
```

## Images
```
To add an image, add an exclamation mark (!), followed by alt text in brackets, and the path or URL to the image asset in parentheses. You can optionally add a title after the URL in the parentheses.
```

## Linking Images
```
To add a link to an image, enclose the Markdown for the image in brackets, and then add the link in parentheses.
```

# showDown.js options

##  Setting options

Options can be set:
##  Globally

Setting a "global" option affects all instances of showdown

showdown.setOption('optionKey', 'value');

##  Locally

Setting a "local" option only affects the specified Converter object. Local options can be set:

### through the constructor

    var converter = new showdown.Converter({optionKey: 'value'});

### through the setOption() method

    var converter = new showdown.Converter();
    converter.setOption('optionKey', 'value');

### Getting an option

Showdown provides 2 methods (both local and global) to retrieve previous set options.

    getOption()

    // Global
    var myOption = showdown.getOption('optionKey');

    //Local
    var myOption = converter.getOption('optionKey');

    getOptions()

    // Global
    var showdownGlobalOptions = showdown.getOptions();

    //Local
    var thisConverterSpecificOptions = converter.getOptions();

Retrieve the default options

You can get showdown's default options with:

    var defaultOptions =  showdown.getDefaultOptions();

### Valid Options

    omitExtraWLInCodeBlocks: (boolean) [default false] Omit the trailing newline in a code block. Ex:

    This:

    <code><pre>var foo = 'bar';
    </pre></code>

    Becomes this:

    <code><pre>var foo = 'bar';</pre></code>

    noHeaderId: (boolean) [default false] Disable the automatic generation of header ids. Setting to true overrides prefixHeaderId

    customizedHeaderId: (boolean) [default false] Use text in curly braces as header id. (since v1.7.0) Example:

    ## Sample header {real-id}     will use real-id as id

    ghCompatibleHeaderId: (boolean) [default false] Generate header ids compatible with github style (spaces are replaced with dashes and a bunch of non alphanumeric chars are removed) (since v1.5.5)

    prefixHeaderId: (string/boolean) [default false] Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section' prefix.

    rawPrefixHeaderId: (boolean) [default false] Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix). Has no effect if prefixHeaderId is set to false. (since v 1.7.3)

    rawHeaderId: (boolean) [default false] Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids (since v1.7.3)

    headerLevelStart: (integer) [default 1] Set the header starting level. For instance, setting this to 3 means that

    # foo

    will be parsed as

    <h3>foo</h3>

    parseImgDimensions: (boolean) [default false] Enable support for setting image dimensions from within markdown syntax. Examples:

    ![foo](foo.jpg =100x80)     simple, assumes units are in px
    ![bar](bar.jpg =100x*)      sets the height to "auto"
    ![baz](baz.jpg =80%x5em)  Image with width of 80% and height of 5em

    simplifiedAutoLink: (boolean) [default false] Turning this option on will enable automatic linking to urls. This means that:

    some text www.google.com

    will be parsed as

    <p>some text <a href="www.google.com">www.google.com</a>

    excludeTrailingPunctuationFromURLs: (boolean) [default false] This option excludes trailing punctuation from autolinking urls. Punctuation excluded: . ! ? ( ). Only applies if simplifiedAutoLink option is set to true.

    literalMidWordUnderscores: (boolean) [default false] Turning this on will stop showdown from interpreting underscores in the middle of words as <em> and <strong> and instead treat them as literal underscores.

    Example:

    some text with__underscores__in middle

    will be parsed as

    <p>some text with__underscores__in middle</p>

    literalMidWordAsterisks: (boolean) [default false] Turning this on will stop showdown from interpreting asterisks in the middle of words as <em> and <strong> and instead treat them as literal asterisks.

    strikethrough: (boolean) [default false] Enable support for strikethrough syntax. ~~strikethrough~~ as <del>strikethrough</del>

    tables: (boolean) [default false] Enable support for tables syntax. Example:

    | h1    |    h2   |      h3 |
    |:------|:-------:|--------:|
    | 100   | [a][1]  | ![b][2] |
    | *foo* | **bar** | ~~baz~~ |

    See the wiki for more info

    tablesHeaderId: (boolean) [default false] If enabled adds an id property to table headers tags.

    ghCodeBlocks: (boolean) [default true] Enable support for GFM code block style.

    tasklists: (boolean) [default false] Enable support for GFM tasklists. Example:

     - [x] This task is done
     - [ ] This is still pending

    smoothLivePreview: (boolean) [default false] Prevents weird effects in live previews due to incomplete input

    smartIndentationFix: (boolean) [default false] Tries to smartly fix indentation problems related to es6 template strings in the midst of indented code.

    disableForced4SpacesIndentedSublists: (boolean) [default false] Disables the requirement of indenting sublists by 4 spaces for them to be nested, effectively reverting to the old behavior where 2 or 3 spaces were enough. (since v1.5.0)

    simpleLineBreaks: (boolean) [default false] Parses line breaks as <br>, without needing 2 spaces at the end of the line (since v1.5.1)

    a line  
    wrapped in two

    turns into:

    <p>a line<br>
    wrapped in two</p>

    requireSpaceBeforeHeadingText: (boolean) [default false] Makes adding a space between # and the header text mandatory (since v1.5.3)

    ghMentions: (boolean) [default false] Enables github @mentions, which link to the username mentioned (since v1.6.0)

    ghMentionsLink: (string) [default https://github.com/{u}] Changes the link generated by @mentions. Showdown will replace {u} with the username. Only applies if ghMentions option is enabled. Example: @tivie with ghMentionsOption set to //mysite.com/{u}/profile will result in <a href="//mysite.com/tivie/profile">@tivie</a>

    encodeEmails: (boolean) [default true] Enable e-mail addresses encoding through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities. (since v1.6.1)

    NOTE: Prior to version 1.6.1, emails would always be obfuscated through dec and hex encoding.

    openLinksInNewWindow: (boolean) [default false] Open all links in new windows (by adding the attribute target="_blank" to <a> tags) (since v1.7.0)

    backslashEscapesHTMLTags: (boolean) [default false] Support for HTML Tag escaping. ex: \<div>foo\</div> (since v1.7.2)

    emoji: (boolean) [default false] Enable emoji support. Ex: this is a :smile: emoji For more info on available emojis, see https://github.com/showdownjs/showdown/wiki/Emojis (since v.1.8.0)

    underline: (boolean) [default false] EXPERIMENTAL FEATURE Enable support for underline. Syntax is double or triple underscores ex: __underlined word__. With this option enabled, underscores are no longer parses into <em> and <strong>.

    completeHTMLDocument: (boolean) [default false] Outputs a complete html document, including <html>, <head> and <body> tags' instead of an HTML fragment. (since v.1.8.5)

    metadata: (boolean) [default false] Enable support for document metadata (defined at the top of the document between ««« and »»» or between --- and ---). (since v.1.8.5)

    var conv = new showdown.Converter({metadata: true});
    var html = conv.makeHtml(someMd);
    var metadata = conv.getMetadata(); // returns an object with the document metadata

    splitAdjacentBlockquotes: (boolean) [default false] Split adjacent blockquote blocks.(since v.1.8.6)

NOTE: Please note that until version 1.6.0, all of these options are DISABLED by default in the cli tool.
Flavors

You can also use flavors or presets to set the correct options automatically, so that showdown behaves like popular markdown flavors.

Currently, the following flavors are available:

    original - original markdown flavor as in John Gruber's spec
    vanilla - showdown base flavor (as from v1.3.1)
    github - GFM (GitHub Flavored Markdown)

## Global

showdown.setFlavor('github');

## Instance

converter.setFlavor('github');







