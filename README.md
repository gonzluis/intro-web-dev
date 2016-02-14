# CS290-webdev
Used for class at Oregon State University, CS290 Web Development

This weeks assignment is going to be graded as an assignment. It will be pass/fail based on effort. This is not to imply that it is not important. This material is absolutely critical and you will not be able to do much in the next portion of class if you are unable to write this kind of program.

However, it is also quite challenging and it is not uncommon to not get it working all the way within a week the first time you are doing it.

Deliverables:

You should submit a zip file with one or two html pages and as many js or css files as you need.

Requirements:

The HTML page(s) should have two forms. The first is the form you will construct in the activites that connects to Open Weather Map, lets a user input a city or a zip code and asynchronously shows the weather information retrieved from Open Weather Map.

The other should be a form that submits to http://httpbin.org/post.

This from should submit asynchronously via a POST. It needs to send a content-type of application/json (you can also experiment with other content-types like applcation/x-www-form-urlencoded). You should display the data you get back (which should match the data you send). It will be stored as a string in the data field of the JSON encoded string returned from the server.

If you run into trouble you can use a tool like: https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo (Links to an external site.)

which will let you submit data manually via a GUI to check what the output looks like.
