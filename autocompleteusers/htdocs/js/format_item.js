function formatItem(row) {
  var firstLine = (row[2]) ? row[0] + " (" + row[2] + ")" : row[0];
  return "<div class=\"name\">" + firstLine + "</div>"
    + (row[1] ? "<div class=\"mail\">" + row[1] + "</div>" : '');
}
function formatCustomer(row) {
    return "<div class=\"name\">" + row + "</div>";
}

function formatSelectOptions(data, selected_value) {
    var options = '';
    var option ='';
    var dataS =data;
     if ($.browser.msie)  dataS= data.split("");

        $.each(dataS, function(i, val) {
            if (val==String.fromCharCode(10)) {
                option= $.trim(option);
                options += formatOption(option,selected_value);
                option='';
            }
            else option+=val;
        });
       options += formatOption(option,selected_value);
    return options;
}

function formatOption(option,selected_value){
    if (option== selected_value)
        return '<option selected="selected" value="'+option+'">'+option+'</option>';
    else
        return '<option value="'+option+'">'+option+'</option>';
}