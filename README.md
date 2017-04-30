# TEDxTuftsUniversity Website
> Static web presence, built with Jekyll.

### What Is This?
This is the code that runs behind the [TEDxTuftsUniversity](http://www.tedxtuftsuniversity) website. It is a statically-generated site, built with [Foundation 5.5.3](http://foundation.zurb.com/sites/docs/v/5.5.3/) and [Jekyll](http://jekyllrb.com/docs/home/). Foundation is a wonderful grid-based {S}CSS framework that makes designing the site a breeze. The plans are for static hosting via Amazon S3, but we might look for a Tufts-hosted solution if possible. A statically-generated site is one that requires nothing more than a simple HTTP server to serve pre-generated pages. Jekyll, a powerful static site generator, allows for template reuse and simple data management, perfect for this application.

### Getting Started
We use [Grunt](http://gruntjs.com) to automate many of the tasks that go into building the website. Make sure you have Grunt [installed](http://gruntjs.com/getting-started). Make sure you have [Jekyll](https://jekyllrb.com/) installed as well. If not, you can install it by running `gem install jekyll bundler` (you might need `sudo gem install jekyll bundler` if you get an error about permissions).

1. Clone the git repository and navigate into the cloned directory.

2. Run `bower install` and `npm install` to download dependencies.

3. Run `grunt` to compile everything and start a local server.

4. If you want, you can open a new terminal window/tab and run `grunt watch` so that your SCSS files will be recompiled whenever you make a change.

5. Point your browser to `http://localhost:4000` to see the compiled site.

### How To Edit Pages
Each page on the TEDxTuftsUniversity site has its own `.html` file. To edit the content on a page (not the header or footer), open the desired `.html` file and edit the content within it. For example, to add a biography to a team member, open `team.html` and edit it. You might be thinking that these `.html` files look a little different than what you expect––that's because they use YAML, a markup language that Jekyll uses. This allows us to create clean, easy-to-maintain code for the pages without writing much HTML. Let's take the example of adding another team member. Here's some of the YAML data for `05-partners.html`, which is under `data/partners.yml`:

        levels:
         - name: Silver Tier
           sponsors:
           - name: ExCollege
             image-url: /public/sponsor_images/tufts-ex-college.png
             link-url: "http://www.excollege.tufts.edu/"
         - name: Bronze Tier
           sponsors:
           - name: Friedman School of Nutrition
             image-url: /public/sponsor_images/tufts-friedman-school.png
             link-url: "https://nutrition.tufts.edu/"
           - name: TSR
             image-url: /public/sponsor_images/TSR.png
             link-url: "http://www.tuftsstudentresources.com/"
           - name: Tufts Admissions
             image-url: /public/sponsor_images/tufts-undergrad-admissions.png
             link-url: "http://admissions.tufts.edu/"

 It describes the layout used to build the page from scratch (`layout: base`, checkout `_layouts/base.html` to see it), the page's title (`title: TEDx Team`) and the URL to the page (`permalink: /team/`). `layout`, `title`, and `permalink` are variables. I've created a new variable called `levels` which describes the multiple tiers of partners. Each level has a name and a list of sponsors. We specify that levels is a list by including dashes (`-`) to start each item, and indenting each list item the same amount. Each sponsor has its own `name`, `image-url`, and `link-url`. Because of the specification of YAML, you can only use spaces (__no tabs!__). Adding another level or sponsor in this way will format it automatically and add it to the page next time the website is built.

This works because of the HTML on the `05-partners.html` page:

    <div class="row head-row">
      <div class="large-12 small-centered columns header-cont">
        <h1 class="head-text">Thank You Partners</h1>
        <h3 id="thank-text">Thank You to Our Partners for Helping <br> Make TEDxTufts2017 Possible</h3>
      </div>
       <img class="tedx-top-img" src="/public/partners_home.jpg"/>
    </div>

    {% assign levels = site.data.partners.levels %}
    {% for level in levels %}
        <h3 class="sponsor-header">{{level.name}}</h3>
        <ul class="row sponsor-table">
            {% for sponsor in level.sponsors %}
                <li>
                    <a href="{{sponsor.link-url}}"><img class="sponsor_img" src="{{sponsor.image-url}}"></a>
                </li>
            {% endfor %}
        </ul>
    {% endfor %}

Notice the `{% assign levels = site.data.partners.levels %}` line. The Liquid templating language knows about variables, and is able to look up the data from the `partners` YAML page (referenced using Jekyll's `page` variable), and can find the `levels` variable we created. Notice the `{% for level in levels %}` lines––these are `for` loops in Liquid. Jekyll iterates over the members of levels. It does the same for the sponsors in each level, looping over each sponsor and generating HTML for each one.

Our `team.yml` data is a little more complicated. Here's a snippet:

    people:
      - id: &slide_kelly
          name: Slide Kelly
          title: Executive Organizer
          link-to: Organizers
          bio: Slide is a senior majoring in Architectural Studies from Denver, Colorado. He loves all things design, mountain sports, circus arts, and bringing out the creative spark in others.
          image-url: /public/team_images/slide_kelly.jpg

      - id: &akshat_rajan
          name: Akshat Rajan
          title: Curator
          bio: Akshat is a second year, from Bombay, India, who will probably major in International Relations. He's been involved with TEDx for 4 years and loves theatre, people and traveling.
          image-url: /public/team_images/akshat_rajan.jpg

We create a `people` list, and each person has an id that starts with an `&`, as well as a bunch of other data. Since we specify an id for each person, we are then able to reference the data from that person in separate YML variables:

    groups:
      - name: Organizers
        people:
          - person: *slide_kelly
          - person: *akshat_rajan
          - person: *mika_sanger
          - person: *kate_sienko
          - person: *stephanie_kim
          - person: *ramone_brown
          - person: *cat_armistead
          - person: *taylor_fasolo
          - person: *rachael_robinson

We reference the person's id using a `*`. This way, we are able to put people into multiple groups without having to copy and paste their personal information multiple times.

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

If you need CSS, please look through the `scss` directory beforehand. Many styles there might suit you. To write your own styles, create a new file in `scss` with `<html-file-name>.scss`, matching the HTML file you just created. __Always use the Foundation Grid when designing your page!!!__ It's beautiful and works wonders on mobile. If you don't know what I mean, check out the [docs](http://foundation.zurb.com/sites/docs/v/5.5.3/components/grid.html).

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
