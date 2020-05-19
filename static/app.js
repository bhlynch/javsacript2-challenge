function plot(id) {
    
    d3.json('samples.json').then((data)=> {

        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        var values = samples.sample_values.slice(0,10).reverse();

        var otuIDs = samples.otu_ids.slice(0,10).reverse().map(d => 'OTU ' + d);

        var labels =  samples.otu_labels.slice(0,10).reverse();

        var trace = {
            x: values,
            y: otuIDs,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: 'bar',
            orientation: 'h'

        };
        var data = [trace];

        var structure = {
            title: 'Top OTU',
            yaxis:{
                tickmode: 'linear'
            },
            margins: {
                    l: 75,
                    r: 400,
                    t: 150,
                    b: 25
            }
        };

        Plotly.newPlot('bar',data,structure);
    });
}

function bubbles(id) {

    d3.json('samples.json').then((data)=> {

        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples)

        var values = samples.sample_values;

        var otuIDs = samples.otu_ids;

        var labels =  samples.otu_labels;

        var trace = {
                x: otuIDs,
                y: values,
                mode: 'markers',
                marker: {
                    size: values,
                    color: otuIDs
                },
                text: labels
        };

        var bubbleStructure = {
            xaxis:{title:'OTU ID'},
            hieght: 750,
            width: 1000
        };

        var bubbles = [trace];

        Plotly.newPlot('bubble', bubbles, bubbleStructure);

    });
}

function info(id) {

    d3.json('samples.json').then((data)=> {
        
        var metadata = data.metadata

        var metaFilter = metadata.filter(meta=> meta.id.toString() === id)[0];

        var ex =  d3.select('#sample-metadata');
        
        ex.html("");

        Object.entries(metaFilter).forEach((i) => {
            ex.append('h5').text(i[0].toUpperCase() + ': ' + i[1] + '\n');
        });

    });        
}

function optionChanged(id) {
    plot(id);
    bubbles(id);
    info(id);
}

function init() {

    var dropdown = d3.select('#selDataset');

    d3.json('samples.json').then((data)=> {

        data.names.forEach(function(names) {
            dropdown.append('option').text(names).property('value');
        });

        plot(data.names[0]);
        bubbles(data.names[0]);
        info(data.names[0]);
    });
}

init();
