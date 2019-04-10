function replace(data) {

    let result = data.replace(/&lt;/g, "<")
                     .replace(/&quot;/g, "\"")
                     .replace(/&gt;/g,">");
    console.log(result);
}

replace(`&lt;!DOCTYPE HTML&gt;
&lt;HTML lang=&quot;en&quot;&gt;
&lt;head&gt;
&lt;meta charset=&quot;UTF-8&quot;&gt;
&lt;title&gt;List Town&lt;/title&gt;
&lt;script src=&quot;node_modules/handlebars/dist/handlebars.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;https://code.jquery.com/jquery-3.1.1.min.js&quot;&gt;&lt;/script&gt;
&lt;link href=&quot;./style.css&quot;, type=&quot;text/css&quot; rel=&quot;stylesheet&quot;&gt;&lt;/link&gt;
&lt;script src=&quot;towns.js&quot;&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;input id=&quot;towns&quot; type=&quot;text&quot;/&gt;
&lt;button id=&quot;btnLoadTowns&quot;&gt;Load&lt;/button&gt;
&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;script&gt;
$(() =&gt; attachEvents())
&lt;/script&gt;
&lt;script type=&quot;text/x-handlebars-template&quot; id=&quot;towns-template&quot;&gt;
// TODO: Create the template here
&lt;/script&gt;
&lt;/HTML&gt;`);