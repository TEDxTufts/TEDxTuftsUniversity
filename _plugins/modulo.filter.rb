
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
# Modulo filter for Jekyll
#
# Adds modulo functionality to Jekyll. It's already in the Liquid core, but that
# version doesn't appear to be in Jekyll.
#
# That's about it.
 
module Jekyll
  module ModuloFilter
 
    # Returns the modulo of the input based on the supplied modulus
    # Called 'mod' to avoid conflict with newer Liquid's 'modulo' filter
    def mod(input, modulus)
      input.to_i % modulus.to_i
    end
 
  end
end
 
Liquid::Template.register_filter(Jekyll::ModuloFilter)
