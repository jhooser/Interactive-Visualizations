

function buildCharts(sample) { 
  d3.json("samples.json").then((data) => {
    var sampleData = data.samples;
    sampleData.forEach(data =>{
      if (data.id === sample){
      var currentSample = data.id
      var trace1 = {
        x:data.sample_value,
        y:data.otu_ids,
        type: "bar"
        };
    
        var data = [trace1];
    
        var layout = {
        title: currentSample,
        xaxis: { title: "Bacteria"},
        yaxis: { title: "Number of Cultures"}
        };
    
        Plotly.newPlot("bar", data, layout);
      }
    })
  });
};


function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metaData = data.metadata;
    metaData.forEach(data =>{
      if (data.id === sample){
      var demoGraph = d3.select('#panel-body')
      var currentSample = data.id
      var ethni = data.ethnicity
      var gender = data.gender
      var age = data.age
      var location = data.location
      var buttontype = data.bbtype
      var wfreq = data.wfreq
      
      var arrival = demoGraph.append("h5")
      arrival.text("Ethnicity:${ethni}")
      }
     })
  });
};

function init() {
    
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);

      // Loop through sampleNames to add "option" elements to the selector
      //TODO:
      
      sampleNames.forEach(name => {
          var selections = selector.append("option");
          selections.text(name);
      });
    })
};
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();