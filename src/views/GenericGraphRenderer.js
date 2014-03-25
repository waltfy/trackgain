/**
  @class ReportGraphView
  @author Walter
*/
GenericGraphRenderer = Ember.View.extend({
  templateName: 'partials/GenericGraphTemplate',
  graphUnstack: false,
  graphType: null,
  graphName: null,
  legendName: null,

  /**
    Initial setup. Setting view variables.
    @method init
    @author Walter
  */
  init: function () {
    this.set('legendName', this.get('graphName') + 'Legend');
  },

  /**
    As the element is inserted into the DOM, this function deals with graph rendering (and re-rendering).
    @method didInsertElement
    @author Walter
  */
  didInsertElement: function () {
    var element = "." + this.get('graphName'),
        legendContainer = '.' + this.get('legendName'),
        type = this.get('graphType'),
        graphUnstack = this.get('graphUnstack');
        palette = new Rickshaw.Color.Palette({
          scheme: "cool"
        }),
        exerciseLog = this.get('source'),
        seriesPlot = [{color: 'steelblue', data: []}];

    exerciseLog.forEach(function (exercise) {
      point = {};
      point.x = new Date(exercise.createdAt).getTime()/1000;
      point.y = exercise.weight;
      seriesPlot[0].data.push(point);
    });

    console.debug(seriesPlot.objectAt(0).data);

    var graph = new Rickshaw.Graph({
      element: document.querySelector(element),
      renderer: type,
      height: 300,
      series: seriesPlot.objectAt(0).data
    });

    // if (graphUnstack) graph.renderer.unstack = graphUnstack;
    graph.render();

    // var time = new Rickshaw.Fixtures.Time();
    // var formatted_months = time.unit('month');

    // formatted_months.formatter = function(d) {
    //   var timeFormat = d3.time.format("%b-%Y");
    //   return timeFormat(d);
    // };

    // var xAxis = new Rickshaw.Graph.Axis.Time({
    //   graph: graph,
    //   timeUnit: formatted_months
    // });

    // var yAxis = new Rickshaw.Graph.Axis.Y({
    //   graph: graph
    // });

    // xAxis.render();
    // yAxis.render();

    // var preLegend = new Rickshaw.Graph.Legend({
    //   graph: graph,
    //   element: document.querySelector(legendContainer)
    // });

    // var legend = document.querySelector(legendContainer);

    // var Hover = Rickshaw.Class.create(Rickshaw.Graph.HoverDetail, {

    //   render: function(args) {

    //     niceTime = Date.parse(args.formattedXValue);
    //     niceDate = new Date(niceTime);
    //     var timeFormat = d3.time.format("%B %Y");

    //     legend.innerHTML = '<p class="title">' + timeFormat(niceDate) + '</p>';

    //     args.detail.sort(function(a, b) {
    //       return a.order - b.order;
    //     }).forEach(function(d) {

    //       var line = document.createElement('div');
    //       line.className = 'line';

    //       var swatch = document.createElement('div');
    //       swatch.className = 'swatch';
    //       swatch.style.backgroundColor = d.series.color;

    //       var label = document.createElement('div');
    //       label.className = 'label';
    //       label.innerHTML = d.name + ": " + Math.round(d.formattedYValue);

    //       line.appendChild(swatch);
    //       line.appendChild(label);
    //       legend.appendChild(line);

    //       var dot = document.createElement('div');
    //       dot.className = 'dot';

    //       switch (type) {
    //         case 'bar':
    //           dot.style.top = graph.y(d.value.y + d.value.y0) + 'px';
    //         case 'area':
    //           dot.style.top = graph.y(d.value.y + d.value.y0) + 'px';
    //         default:
    //           dot.style.top = graph.y(d.value.y + d.value.y0) + 'px';  
    //       }
          
    //       dot.style.borderColor = d.series.color;
    //       this.element.appendChild(dot);

    //       dot.className = 'dot active';

    //       this.show();

    //     }, this);
    //   }
    // });

    // var hover = new Hover({
    //   graph: graph
    // });

    var timeout = false;
    var timer = 200;

    // Watching resizing on window
    window.addEventListener('resize', function (ev) {
      // get current time
      startedResizing = new Date();
      // if timeout is false, set it to true and we're done resizing
      if (timeout === false) {
        timeout = true;
        setTimeout(doneResizing, timer);
      }
    });

    function doneResizing() {
      // If the difference between the current time and the time we started resizing
      // is smaller than the timer set, recursively call this function as we haven't
      // finished resizing.
      if (new Date() - startedResizing < timer) {
        setTimeout(doneResizing, timer);
      } else {
        graph.configure({ width: $(".graph_container").width(), height: 300});
        graph.render();
        timeout = false;
      }               
    };

  }

});