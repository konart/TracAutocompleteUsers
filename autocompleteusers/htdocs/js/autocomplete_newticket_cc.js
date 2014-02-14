$.extend( $.ui.autocomplete.prototype, {
    _renderItem: function( ul, item ) {
        var term = this.element.val();
        var regexp = new RegExp(term, "ig");
        html = item.label.replace( regexp, "<b><u>$&</u></b>" );
        return $( "<li></li>" )
            .data( "item.autocomplete", item )
            .append( $("<a></a>").html(html) )
            .appendTo( ul );
    }
});

jQuery(document).ready(function ($) {

  $("select#field-activity_group").css('max-width','499px');
  $("#field-activity_group").html('<option value=""></option>');

  $.ajax({
    url: "subjects?activity=1",
    dataType : "text",
    success: function (data, textStatus) {
     $("#field-activity").html(formatSelectOptions(data,''));
     $("#field-activity").change(function(){
        $.ajax({
            url: "subjects?activity_group=1&activity="+ encodeURI($("#field-activity").val()),
            dataType : "text",
            success: function (data, textStatus) {
              var selectActivity_group = $("#field-activity_group").val()
              $("#field-activity_group").html(formatSelectOptions(data,selectActivity_group));
            }
        });
        });
     }
  });



  $("#field-cc").old_autocomplete("subjects", {
    multiple: true,
    formatItem: formatItem,
    delay: 100
  });

  $("input:text#field-reporter").old_autocomplete("subjects", {
    formatItem: formatItem
  });

    $("input:text#field-customer").autocomplete({
        source: "subjects?customers=1",
        minLength: 0
    }).click(function(){
        $(this).autocomplete("search");
    });

    $("input:text#field-customer").change(function(){
        $("input:text#field-customer_order").val("");
    });

    $("input:text#field-customer").focusout(function(){
        $("input:text#field-customer_order").autocomplete({
            source: "subjects?customer_orders=1&customer="+encodeURIComponent($("input:text#field-customer").val()),
            minLength: 0,
            minChars: 0
        })
    });


    $("input:text#field-customer_order").click(function(){
        $(this).autocomplete("search");
    });

});
