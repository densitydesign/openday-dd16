const infopoems = './js/infopoems.tsv';

let container = d3.select(".content-infopoetry_left");
let infopoint = d3.select(".info-card");

infopoint.style("visibility", "hidden");

d3.tsv(infopoems).then(data => {
  console.log(data)

  container.selectAll("div")
  .enter()
  .data(data)
  .join("div")
  .classed("blank", true)
  .append("img")
  .attr("src", d => {
    return `../images/infopoetry-covers/${d.image}`
  })
  .on("click", d => {
    infopoint.style("visibility", "visible");

    d3.select("#title").text(d.title)
    d3.select("#author").text(d.author)
    d3.select("#preview").attr("src", `./images/infopoetry-covers/${d.image}`)
    d3.select("#desc").text(d.desc)
    d3.select("#link").attr("href", d.link)
  });
});
