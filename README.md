# TEDxTuftsUniversity Website
> Static web presence, built with Jekyll.

### What Is This?
This is the code that runs behind the [TEDxTuftsUniversity](http://www.tedxtuftsuniversity) website. It is a statically-generated site, built with [Foundation](http://foundation.zurb.com/docs/) and [Jekyll](http://jekyllrb.com/docs/home/). Foundation is a wonderful grid-based {S}CSS framework that makes designing the site a breeze. The plans are for static hosting via Amazon S3, but we might look for a Tufts-hosted solution if possible. A statically-generated site is one that requires nothing more than a simple HTTP server to serve pre-generated pages. Jekyll, a powerful static site generator, allows for template reuse and simple data management, perfect for this application.

### Getting Started
We use [Grunt](http://gruntjs.com) to automate many of the tasks that go into building the website. Make sure you have Grunt [installed](http://gruntjs.com/getting-started). Make sure you have [Jekyll](https://jekyllrb.com/) installed as well. If not, you can install it by running `gem install jekyll bundler` (you might need `sudo gem install jekyll bundler` if you get an error about permissions).

1. Clone the git repository and navigate into the cloned directory.

2. Run `bower install` and `npm install` to download dependencies.

3. Run `grunt` to compile everything and start a local server.

4. If you want, you can open a new terminal window/tab and run `grunt watch` so that your SCSS files will be recompiled whenever you make a change.

5. Point your browser to http://localhost:4000 to see the compiled site.

### How To Edit Pages
Each page on the TEDxTuftsUniversity site has its own `.html` file. To edit the content on a page (not the header or footer), open the desired `.html` file and edit the content within it. For example, to add a biography to a team member, open `team.html` and edit it. You might be thinking that these `.html` files look a little different than what you expect––that's because they use YAML, a markup language that Jekyll uses. This allows us to create clean, easy-to-maintain code for the pages without writing much HTML. Let's take the example of adding another team member. Here's the YAML portion of `team.html`:

        ---
        layout: base
        title: TEDx Team
        permalink: /team/

        people:
         - name: John Smith
           title: Curator
           bio: He's a cool person.
           image-url: http://placehold.it/400
        ---

The YAML portion of the page is in between the `---` lines, and the HTML (written using Liquid templates) comes after. It describes the layout used to build the page from scratch (`layout: base`, checkout `_layouts/base.html` to see it), the page's title (`title: TEDx Team`) and the URL to the page (`permalink: /team/`). `layout`, `title`, and `permalink` are variables. I've created a new variable called `people` which describes the people on the TEDx Team. Each person in people starts with ` - name: <name>`. Because of the specification of YAML, you can only use spaces (__no tabs!__). Adding another person in this way will format it automatically and add it to the page next time the website is built.

This works because of the HTML below the YAML:

    <div class="row" id="team-container" data-equalizer>
        <div class="large-2 columns show-for-large-up" id="team-list" data-equalizer-watch>
            {% for person in page.people %}
            <p><a href="#{{person.name | slugify }}">{{person.name}}</a></p>
            {% endfor %}
        </div>
        <div class="large-10 columns" data-equalizer-watch>
            {% for person in page.people %}
            <div class="row">
                <div class="small-4 columns">
                    <img src="{{person.image-url}}" alt="" id="team-image">
                </div>
                <a class="anchor" id="{{person.name | slugify}}"></a>
                <div class="small-8 columns">
                    <h3> {{ person.name }} <small>{{person.title}}</small></h3>
                    <p> {{person.bio}} </p>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>

Notice the `{% for person in page.people %}` lines––these are `for` loops in the Liquid templating language. Jekyll looks up the `people` variable in the YAML (referenced using Jekyll's `page` variable) and iterates over its members.

Make sure to use `git` to make your changes persistent across all versions of the site's repository.

### How to Add Pages
Adding pages is easy. All you have to do is create a new `.html` file in the root directory of this repository. To make a Contact Us page, for example, make a `contactus.html` file. In this file, place the following YAML:

    ---
    layout: base
    title: Contact Us
    permalink: /contact/
    ---

This tells Jekyll to use the `base` layout (which contains the header, footer, and a place for content), to give the page a title `Contact Us`, and to create a URL for the page at `http://www.tedxtuftsuniversity.com/contact/`. Doing this also adds a link to the new page you've just created to the navigation bar on all pages (see `_layouts/header.html` for details on how that works).

Underneath the final `---`, write the HTML for the page as desired. You can write straight HTML--it will get inserted between the header and the footer. To make your life easier, use the YAML format for any data items you might need to reference. This is not required.

Please familiarize yourself with the other HTML files I've written in this repository to get a feel for how Jekyll works. You can read documentation on Jekyll templating [here](http://jekyllrb.com/docs/templates/).

If you need CSS, please look through the `scss` directory beforehand. Many styles there might suit you. To write your own styles, create a new file in `scss` with `<html-file-name>.scss`, matching the HTML file you just created. __Always use the Foundation Grid when designing your page!!!__ It's beautiful and works wonders on mobile. If you don't know what I mean, check out the [docs](http://foundation.zurb.com/docs/components/grid.html).

To see your developments, run `grunt` or `grunt build` and navigate to `http://localhost:4000`. If you're changing styles, you'll need to run `grunt build` each time you change a style. If you're just changing the HTML file, `grunt build` will rebuild the site with each file change--just reload your browser to see your HTML/YAML changes.

### How to make your changes live on the Internet!
> Note: this is an advanced feature, and using it has the potential to accrue significant storage and server costs. Yes, *money!* If you're unfamiliar with Amazon Web Services, Grunt, JSON, and the Simple Storage Service, ask for some assistance.

Currently, Grunt is setup to deploy the static site to Amazon Web Services' Simple Storage Service. It supports staging and production environments, each of which represents an S3 bucket with static website hosting enabled (with `index.html` as root). To do this, you first must create the bucket via the S3 console, enable static website hosting, and set permissions as appropriate for a world-accessible site. Then, in this repository's root, create a file named `aws-s3-config.json`. Place the following within it:

    {
        "AWSAccessKeyId": "<access-key>",
        "AWSSecretKey": "<secret-key>",
        "AWSBucketName_staging": "<your-staging-bucket>",
        "AWSBucketName_production": "<your-production-bucket>"
    }

Running `grunt deploy:staging` or `grunt deploy:production` will compile the `scss`, build the Jekyll site into `_site`, and update the designated bucket with the contents of `_site`. These file transfers use a differential strategy, so only files that have changed between the local `_site` and the bucket will be transferred. Files that do not exist locally are deleted on the S3 bucket. Navigate to `http://<your-bucket>.s3-website-<your-region>.amazonaws.com/` to see your site live.

### What (The Important) Files Mean
*	`<name>.html`:  In Jekyll, each `.html` file (or `.md` filepre, but we're not getting too crazy) in the root directory of the site represents a _page_. `index.html` is the root page, the one that gets loaded when someone visits the site. Creating pages is as simple (and complicated) as creating a new `.html` file (more on this below).
*	`_layouts`: the directory that currently only contains the base template (`base.html`), built with Foundation. it is the template that all future pages should be constructed with, and contains a header and footer only. It is not advisable to edit files in the `_layouts` directory.
*	`_includes/`: a directory that contains the header and footer portions of the site. The header is dynamically generated and should be generally left alone. The footer is up in the air currently, edit `_includes/footer.html` to edit the footer. Both use Foundation.
*	`tedxtufts.css`: I need to get rid of this. We're using the SCSS implementation of Foundation, so this file is breaking our design abstraction. I'll do it sometime. -TC
*	`public`: a poorly-named directory that contains the image assets for the site. All new images should go in here.
*	`scss`: this is where all of the important design files go. If you're not familiar with SCSS, it's basically just a compiled superset of CSS which allows for smart things to happen (like variables and functions––fancy that). There are several files in here worth mentioning:
	*	`home.scss`: supporting styles for the base template, a poorly named file.
	*	`parallax.scss`: not currently employed but provides parallax animation if needed in the future (found it online, credit should be in the file)
	*	`fade.scss`: used to animate the loading of the TEDxTuftsUniversity logo on index.html.
	*	`_settings.scss`: Foundation default overrides. Use with extreme care. To override a Foundation variable, uncomment it. Look for uncommented lines to see what I've overridden.
	*	`app.scss`: the main scss file, which does nothing except `@import` scss files.
