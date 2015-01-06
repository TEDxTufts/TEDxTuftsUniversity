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
    compass: {                  // Task
        dev: {                    // Another target
          options: {
            sassDir: 'scss',
            cssDir: 'stylesheets'
          }
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
      deploy_staging : {
        options : {
          bucket : '<%= aws.AWSBucketName_staging %>',
          differential: true
        },  
        files : [
          { expand: true, cwd: '_site/', src: "**", dest: "/", action: 'upload'}
        ]
      },
      deploy_production : {
        options : {
          bucket : '<%= aws.AWSBucketName_production %>',
          differential: true
        },  
        files : [
          { expand: true, cwd: '_site/', src: "**", dest: "/", action: 'upload'}
        ]
      },

    }
  });

  // Load the plugin that provides the "compass" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  // load shell task runner
  grunt.loadNpmTasks('grunt-shell');
  // load AWS S3 interface tasks
  grunt.loadNpmTasks('grunt-aws-s3');
  // create deployment task (above AWS abstraction)
  grunt.registerTask('deploy', "Deploy site to AWS S3", function(type){
    if(type == "staging" || type == "production"){
      grunt.task.run(['compass', 'shell:jekyllBuild', 'aws_s3:deploy_' + type]);
    } else {
      grunt.log.writeln("Specify 'staging' or 'production'");
    }
  });

  // default tasks
  grunt.registerTask('default', ['compass', 'shell:jekyllServe']);


};  