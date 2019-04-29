function replace(data) {

    let result = data.replace(/&lt;/g, "<")
                     .replace(/&quot;/g, "\"")
                     .replace(/&gt;/g,">");
    console.log(result);
}

replace(`&lt;span class=&quot;head&quot;&gt;Confirm purchase&lt;/span&gt;
&lt;div class=&quot;purchase-info&quot;&gt;
&lt;span&gt;{name}&lt;/span&gt;
&lt;span&gt;{qty} x {price}&lt;/span&gt;
&lt;span&gt;Total: {qty * price} lv&lt;/span&gt;
&lt;input type=&quot;button&quot; value=&quot;Confirm&quot;&gt;
&lt;/div&gt;`);