/** 
 * Application launcher.
 */

// check browser support
dwv.browser.check();
// main application
var app = new dwv.App();

// launch when page is loaded
$(document).ready( function()
{
    // Add required loaders to the loader list
    //dwv.io.loaders = {};
    //dwv.io.loaders.file = dwv.io.File;
    //dwv.io.loaders.url = dwv.io.Url;

    // append load container HTML
    // dwv.gui.appendLoadboxHtml();
    // append loaders HTML
    //dwv.gui.appendFileLoadHtml();
    //dwv.gui.appendUrlLoadHtml();
    //dwv.gui.displayFileLoadHtml(true);

    // Add tools to the tool list
    dwv.tool.tools = {};
    dwv.tool.tools["Window/Level"] = new dwv.tool.WindowLevel(app);
    dwv.tool.tools["Zoom/Pan"] = new dwv.tool.ZoomAndPan(app);
    dwv.tool.tools.scroll = new dwv.tool.Scroll(app);
    //dwv.tool.tools.draw = new dwv.tool.Draw(app);
    //dwv.tool.tools.livewire = new dwv.tool.Livewire(app);
    //dwv.tool.tools.filter = new dwv.tool.Filter(app);

    // Add filters to the filter list for the filter tool
    dwv.tool.filters = {};
    dwv.tool.filters.threshold = new dwv.tool.filter.Threshold(app);
    dwv.tool.filters.sharpen = new dwv.tool.filter.Sharpen(app);
    dwv.tool.filters.sobel = new dwv.tool.filter.Sobel(app);

    // Add shapes to the shape list for the draw tool
    dwv.tool.shapes = {};
    dwv.tool.shapes.line = dwv.tool.DrawLineCommand;
    dwv.tool.shapes.rectangle = dwv.tool.DrawRectangleCommand;
    dwv.tool.shapes.roi = dwv.tool.DrawRoiCommand;
    dwv.tool.shapes.circle = dwv.tool.DrawCircleCommand;

    // append tool container HTML
    dwv.gui.appendToolboxHtml();
    // append tools HTML
    dwv.gui.appendWindowLevelHtml();
    dwv.gui.appendZoomAndPanHtml();
    dwv.gui.appendScrollHtml();
    dwv.gui.appendDrawHtml();
    dwv.gui.appendLivewireHtml();
    
    // append filter container HTML
    dwv.gui.appendFilterHtml();
    // append filters HTML
    dwv.gui.filter.appendThresholdHtml();
    dwv.gui.filter.appendSharpenHtml();
    dwv.gui.filter.appendSobelHtml();
    
    // append help HTML
    dwv.gui.appendHelpHtml(true);
    dwv.gui.appendVersionHtml();
    dwv.gui.appendUndoHtml();

    // initialise the application
    app.init();



    $('#studies').on('change', function() {
        changeurl(this.value);
    });

    
    $(document).on('change', '#toolSelect', function(e){
        changetool(this.value);
    });

});

var socket = io.connect();

socket.on('changeurl', function(url) {
    window.location = url;
    return false;
});

socket.on('changetool', function(tool) {
    $("#toolSelect-button span").html(tool);
    app.getToolBox().setSelectedTool(tool);
});

socket.on('incermentslice', function() {
    app.getView().incrementSliceNb();
});

socket.on('decrementslice', function() {
    app.getView().decrementSliceNb();
});

socket.on('zoom', function(data) {
   app.getImageLayer().zoom(data.step, data.step, data.cx, data.cy);
});

socket.on('zoom2', function(data) {
   app.getDrawLayer().zoom(data.step, data.step, data.cx, data.cy);
});

socket.on('translate', function(data) {
   app.getImageLayer().translate(data.tx, data.ty);
});

socket.on('translate2', function(data) {
   app.getDrawLayer().translate(data.tx, data.ty);
});

socket.on('windowlevel', function(data) {
   app.getView().setWindowLevel(data.wc,data.ww);
});



function changeurl(url){  
    socket.emit('changeurl', url);
}

function changetool(tool){  
    socket.emit('changetool', tool);
}

