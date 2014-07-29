var convertTableToList = function(table){

    var listString = '',
    dts = [],
    dds = [],
    titles = [],
    className = '',
    colsCount = false,
    thead = ( $(table).find('thead').length > 0 ) ? true : false,
    tfoot = ( $(table).find('tfoot').length > 0 ) ? true : false;


    if (thead){
        $.each( $(table).find('thead th'), function(index, value){
            if( index > 0){
                var pushValue = !$(value).hasClass('ignore') ? $(value).html() : '';
                dts.push( pushValue );
            }
        });
    }

    $.each( $(table).find('tbody tr:not(.ignore)'), function(j, row){

        // if cols count not set, set it now
        colsCount = (!colsCount) ? $(row).find('td').length : colsCount;

        $.each( $(row).find('td'), function(i, td){
            if(i === 0){
                titles.push( $(td).html() );
                dds.push(new Array());
            }else{
                dds[j].push( $(td).html() );
            }
        });
    });

    for(var i = 0; i < titles.length; i ++){

        if(thead){
            listString += '<h3>'+titles[i]+'</h3>';
            listString += '<dl class="mobile-table-replace">';

            for(var j = 0; j < dts.length; j ++){ 
                className = (j % 2) ? ' class="odd"' : '';
                listString += '<dt'+className+'>'+dts[j]+'</dt>';
                listString += '<dd'+className+'>'+dds[i][j]+'</dd>';

            }

            listString += '</dl>';
        }else{
            listString += '<ul class="mobile-table-replace">';

            listString += '<li class="title">'+titles[i]+'</li>';

            for(var j = 0; j < colsCount-1; j ++){
                className = (j % 2) ? ' class="odd"' : '';
                listString += '<li'+className+'>'+dds[i][j]+'</li>';
            }

            listString += '</ul>';
        }
    }

    // Add the table footer if applicable
    if (tfoot){

        listString += '<dl class="mobile-table-replace foot">';

        $.each( $(table).find('tfoot tr'), function(j, row){
            listString += '<dt>' + $(row).find('th').html() + '</dt>';
            listString += '<dd>' + $(row).find('td').html() + '</dd>';

        });

        listString += '</dl>';
    }



    $(table).replaceWith(listString);

}
