/*
 * @title Visual Scripts
 *
 * Author: Taner DOGAN (hello@tanerdogan.com)
 * github.com/tanerdogan | @tanerdogan
 *
 */

$(document).ready(function(){
    $(".fade").mouseenter(function () {
        $(this).fadeTo( "normal", 1);
    }).mouseleave(function(){
        $(this).fadeTo( "slow", 0.6);
    });


   // $('#panel1').jScrollPane();
});

