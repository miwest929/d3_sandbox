#!/usr/bin/env ruby

d3html = %Q(<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href='css/app.css'>
    <link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css" rel="stylesheet">
  </head>
  <body>
    <script src="js/lib/jquery-2.0.3.min.js"></script>
    <script src="js/svg_utils.js"></script>
    <script src='js/lib/d3.min.js'></script>
    <script src='js/#{ARGV[0]}.js'></script>
  </body>
</html>
)

File.open("#{ARGV[0]}.html", 'w') do |f|
  f.write(d3html)
end

puts "Created #{ARGV[0]}.html!"
