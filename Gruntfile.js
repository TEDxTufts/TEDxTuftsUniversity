/*
  Grunt configuration file for TEDxTuftsUniversity site. 
  Grunt is used to automate tasks relevant to this site. 
  Tony Cannistra, 2015
*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-s3-config.json'),
    compass: {
      options:{
        // use existing Compass configuration
        config: "config.rb",
      }
    },
    // configure jekyll build and serve tasks
    shell : {
      jekyllBuild : {
        command: "jekyll build"
      },
      jekyllServe : {
        command: "jekyll serve"
      }
    },
    // configure aws s3 tasks
    aws_s3: {
      options : {
        accessKeyId: '<%= aws.AWSAccessKeyId %>',
        secretAccessKey: '<%= aws.AWSSecretKey %>',
        region: 'us-east-1',
      },
      deploy: {
        options : {
          bucket: '<%= aws.AWSBucketName %>',
          differential: true
        }
        files : {
          {expand: true, src: '_/site/**', dest: '.'}
        }
      },

    }
  });

  // Load the plugin that provides the "compass" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  // load shell task runner
  grunt.loadNpmTasks('grunt-shell');
  // load AWS S3 interface tasks
  grunt.loadNpmTasks('grunt-aws-s3');

  // default tasks
  grunt.registerTask('default', ['compass', 'shell:jekyllServe']);

};  