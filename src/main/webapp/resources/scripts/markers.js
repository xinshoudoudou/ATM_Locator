var markers = [];


//Adding marker to map
function addMarker(atm) {
    console.log(atm);
    var icon = (atm.type=="IS_ATM" ? atm.bank.iconAtm : atm.bank.iconOffice);
    var markerPos = new google.maps.LatLng(atm.geoPosition.latitude, atm.geoPosition.longitude);
    var marker = new RichMarker({
        id: atm.id,
        position: markerPos,
        map: map,
        draggable: false,
        flat: true,
        anchorPoint: {x: 0, y: -32},
        content: '<div style="position:relative" id="' + atm.id + '" class="favorite_marker">' +
        '<img src="' + getHomeUrl() + 'resources/images/' + icon + '" width="32" height="32" alt=""  oncontextmenu="markerMenu(event, ' + atm.id + ')"/>' +
        '</div>'
    });

    var tollTipContent = '<strong>' + atm.bank.name + '</strong><br>'+
        '<div>' + atm.address + '</div><br>';
    if(atm.commentsCount > 0){
        tollTipContent += '<div><a href="#" atmid="' + atm.id + '" id="showComments">Comments(' + atm.commentsCount + ')...</a></div>'
    }

    google.maps.event.addListener(marker, 'click', function(event){
        if(infowindow != undefined) {
            infowindow.close();
        }
        infowindow = new google.maps.InfoWindow({
            content: tollTipContent,
            maxWidth: 135
        });
        infowindow.open(map, marker);
        initCommentsClick();
    });

    markers.push(marker);
}

//Deleting marker from map
function deleteMarker(marker) {
    if (marker != null) {
        marker.setMap(null);
    }
    ;
}

//delete all ATM markers from map
function deleteMarkers() {
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

//add marker menu in position x, y
function markerMenu(event, ATMId) {
    var x = event.pageX;
    var y = event.pageY;
    $("#defaultMarkerMenu").attr("atmid", ATMId);
    $("#defaultMarkerMenu")
        .css({top: y + "px", left: x + "px"})
        .show();
}

//hide marker menu
function hideMenu() {
    $(".popup-menu").hide();
}

document.onclick = function () {
    hideMenu();
}
