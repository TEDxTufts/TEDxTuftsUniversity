# TEDxTuftsUniversity Website
> Static web presence, built with Jekyll.

## What is this?
This is the code that runs behind the [TEDxTuftsUniversity](http://www.tedxtuftsuniversity) website. It is a statically-generated site, built with [Foundation](#) and [Jekyll](http://jekyllrb.com/docs/home/). Foundation is a wonderful grid-based {S}CSS framework that makes designing the site a breeze. The plans are for static hosting via Amazon S3, but we might look for a Tufts-hosted solution if possible. A statically-generated site is one that requires nothing more than a simple HTTP server to serve pre-generated pages. Jekyll, a powerful static site generator, allows for template reuse and simple data management, perfect for this application. 

## What (the important) The Files Mean
*	`<name>.html`:  In Jekyll, each `.html` file (or `.md` filepre, but we're not getting too crazy) in the root directory of the site represents a _page_. `index.html` is the root page, the one that gets loaded when someone visits the site. Creating pages is as simple (and complicated) as creating a new `.html` file (more on this below).
*	`_layouts`: the directory that currently only contains the base template (`base.html`), built with Foundation. it is the template that all future pages should be constructed with, and contains a header and footer only. It is not advisable to edit files in the `_layouts` directory.
*	`_includes/`: a directory that contains the header and footer portions of the site. The header is dynamically generated and should be generally left alone. The footer is up in the air currently, edit `_includes/footer.html` to edit the footer. Both use Foundation.
*	`_site`: this is the rendered version of the site. No files in here are editable. 
*	`tedxtufts.css`: I need to get rid of this. We're using the SCSS implementation of Foundation, so this file is breaking our design abstraction. I'll do it sometime. -TC
*	`public`: a poorly-named directory that contains the image assets for the site. All new images should go in here. 
*	`scss`: this is where all of the important design files go. If you're not familiar with SCSS, it's basically just a compiled superset of CSS which allows for smart things to happen (like variables and functions––fancy that). There are several files in here worth mentioning:
	*	`home.scss`: supporting styles for the base template, a poorly named file. 
	*	`parallax.scss`: not currently employed but provides parallax animation if needed in the future (found it online, credit should be in the file)
	*	`fade.scss`: used to animate the loading of the TEDxTuftsUniversity logo on index.html.
	*	`_settings.scss`: Foundation default overrides. Use with extreme care. To override a Foundation variable, uncomment it. Look for uncommented lines to see what I've overridden.
	*	`app.scss`: the main scss file, which does nothing except `@import` scss files.


## How To Edit Pages
_coming soon._ It's easy I promise!

## How to Add Pages
_coming soon._ It's easy I promise!

## How to make your changes live on the Internet!
_coming soon._ It's...sorta easy!
