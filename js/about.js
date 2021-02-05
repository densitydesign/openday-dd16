
let body = d3.select('.content-about_right .row');

d3.csv("js/people.csv").then(data => {
    
    body.selectAll('.id')
    .data(data)
    .enter()
    .append("div").classed("id",true)
    .append('image')
    .attr("href", function(d) {
      return d.img;
    })
    
     body.selectAll('.id')
    .data(data)
    .append('p')
    .text(function(d) {
      return d.name;
    })
    

});
                             
                             
                              