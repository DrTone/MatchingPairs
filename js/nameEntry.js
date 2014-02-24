/**
 * Created by DrTone on 18/02/14.
 */

//Get player names
function onNameEntered() {
    console.log('Name entered');
    var p1Name = $('#nameInput').val();

    if(p1Name.length != 0) {
        $('#player1Name').text(p1Name);
    }

    $('#nameInput').val('');
}
//Execute when DOM ready
$(document).ready(function() {
    //Get player name

});