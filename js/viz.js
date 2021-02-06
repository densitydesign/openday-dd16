var cod
var next
var next1
var next2
var next3
var next4

let ch = window.innerHeight / 100;
let cw = window.innerWidth / 100;
let height = 80 * ch;
let width = 70 * cw;
let padding = window.innerWidth * 0.05;
let svg = d3.select('#my_dataviz').append('svg')
  .attr('width', width)
  .attr('height', height)
let data_setX = "group";







let x = d3.scaleOrdinal()
  .domain(["phase1", "phase2", "phase3"])
  .range([0 + padding+20, ((width/3)*3) + padding,((width/3)*1.5) + padding]);

let x1 = d3.scaleOrdinal()
  .domain(["Group1", "Group2", "Group3", "Group4", "Group5", "Group6", "Group7", "Group8", "Group9"])
  .range([cw*5+20, cw*80, cw*20, cw*30, cw*40, cw*50, cw*60, cw*70, cw*10]);




let y1 = d3.scaleOrdinal()
  .domain(["Group1", "Group2", "Group3", "Group4", "Group5", "Group6", "Group7", "Group8", "Group9"])
  .range([10*ch*3-20,30*ch+30,20*ch*2,10*ch*3,20*ch*2,30*ch,10*ch*3+150,20*ch*2+50,30*ch]);


let y = d3.scaleOrdinal()
  .domain(["phase1", "phase2", "phase3"])
  .range([height/2,height/2,height/2]);









var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip");





// Parse dataset
d3.csv("js/density.csv").then(data => {

  // dichiarare asse x e asse y

  // start ticks for animations and transitions

  function tick() {

    d3.selectAll('.circ')
      .attr('x', function(d) {
        // console.log(d.x)
        return d.x
      })
      .attr('y', function(d) {

        return d.y
      })


  };
  x.domain(d3.extent(data, function(d) {
    // console.log(d.phase)
    return d.phase;
  }));

  x1.domain(d3.extent(data, function(d) {
    // console.log(d.group)
    return d.group;
  }));

  // Draw circles

  svg.selectAll('.circ')
    .data(data)
    .enter()
    .append('image').classed('circ', true)
    .attr('width', 60)
    .attr('height', 60)
    .attr('x', function(d) {
      // console.log(x(d.phase))
      return x1(d.group) - 20;
    })
    .attr('y', function(d) {
      return y1(d.group) - 20
    })
    .attr("href", function(d) {
      return d.img;
    })
    .attr("id",function(d){
      return d.id;
  })
    .call(d3.drag() // call specific function when circle is dragged
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

    d3.selectAll(".circ")
    .on("mouseover", function(d) {
        d3.select(this).attr("href",d.imgHover)
        d3.selectAll(".circ").transition().style("opacity",.5)
        d3.select(this).transition().style("opacity",1)
      
//       
     
        cod = d.id
        next =  cod.slice(1)
        if (next < 10){

        next=parseInt(next)
         next1 = next + 9;
         next2 = next + 18;
                             
        next3 = "#p"+next1;
         next4 = "#p"+next2;

        
           console.log(next)
        d3.select(next3).attr("href","images/imgH"+next1+".png")
        
        d3.select(next4).attr("href","images/imgH"+next2+".png")}
        else if ((next < 19)&&(next > 9))
        {
        next =  cod.slice(1)
        next=parseInt(next)
        next1 = next - 9;
        next2 = next + 9;
        next3 = "#p"+next1;
        next4 = "#p"+next2;
        console.log(next)
        d3.select(next3).attr("href","images/imgH"+next1+".png") 
        d3.select(next4).attr("href","images/imgH"+next2+".png")
        }
            
        else {
                  next =  cod.slice(1)
        next=parseInt(next)
         next1 = next - 9;
         next2 = next - 18;
                             
        next3 = "#p"+next1;
         next4 = "#p"+next2;

        
           console.log(next)
        d3.select(next3).attr("href","images/imgH"+next1+".png")
            
        
        d3.select(next4).attr("href","images/imgH"+next2+".png")}
            
            
        
    tooltip.html( "<p>Titolo: "+d.title+"</p><p>Team: "+d.group+"</p> <p>"+d.phase+"</p>")
       
      .style("left", (d3.event.pageX) +20 + "px")
      .style("top", (d3.event.pageY ) + "px")
      .style("opacity", 100);
        
  })
  .on("mouseout", function(d) {
         d3.select(this).attr("href",d.img)
         d3.select(next3).attr("href","images/img"+next1+".png")
        d3.selectAll(".circ").transition().style("opacity",1)
        d3.select(next4).attr("href","images/img"+next2+".png")
    tooltip.style("opacity", 0);
  })
.on("click",function(d){
          window.open(
      d.link,
      '_blank' // <- This is what makes it open in a new window.
    );
    })


    
    
    
  // Start force layout
  let simulation = d3.forceSimulation(data)
    .force('x', d3.forceX(function(d) {
      // console.log("x " + x(d[data_setX]))
      // console.log("d " + d[data_setX])
      // console.log("val " + data_setX)


      return x1(d.group)
    }).strength(0.99))
    .force('y', d3.forceY(function(d) {
      return y1(d.group)
    }).strength(0.80))
    .force('collide', d3.forceCollide(30)
      .iterations(32))
    .alphaDecay(0)
    .alpha(0.1)
    .on('tick', tick)

  let init_decay;
  init_decay = setTimeout(function() {
    console.log('init alpha decay')
    simulation.alphaDecay(0.1);
  }, 5000);



  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }

  d3.selectAll('.bottone').on('click', function() {
    // console.log("But he's coming for you, yeah, he's coming for you")
      d3.selectAll('.bottone').classed("filter-active",false)
      d3.select(this).classed("filter-active",true)


    data_setX = this.id;



    simulation.force('y', d3.forceY(function(d) {

      if (data_setX === "phase") {
        return y(d.phase)
      } else {
        return y1(d.group)
      }
    }))

    simulation.force('x', d3.forceX(function(d) {
      if (data_setX == "phase") {
        //   console.log("All the other kids with the pumped up kicks")
        return x(d.phase)

      } else {
        //   console.log("You better run, better run, outrun my gun")

        return x1(d.group)
      }
    }))

    simulation
      .alphaDecay(0)
      .alpha(0.5)
      .restart()
  })

})




var chartDiv = d3.select(".visualizzazione");

function redraw(){
console.log("ridisegno")
        // Extract the width and height that was computed by CSS.
        var width2 = chartDiv.clientWidth;
        var height2 = chartDiv.clientHeight;

        // Use the extracted size to set the size of an SVG element.
        svg
          .attr("width", width2)
          .attr("height", height2);

        // Draw an X to show that the size is correct.

      }

 redraw();

      // Redraw based on the new size whenever the browser window is resized.
      window.addEventListener("resize", redraw);
