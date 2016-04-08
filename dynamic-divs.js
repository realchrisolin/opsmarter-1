/*
    Check for keywords in the case subject and description and create
    notifications about the possible context of the case.
*/

/* NOTE: This is meant to dynamically create divs from groups of keywords to report
    the possible context of a case. This is unfinished as I'm unable to apply the fade
    function to the divs dynamically.

    Status: Future Reference. */

function read() {
        var subject = document.getElementById('cas14_ileinner').innerHTML;
        var description = document.getElementById('cas15_ileinner').innerHTML;
        var keywords = ["users"];
        var s, d;
        var divs = [];
        read.hits = 0;

        for(i = 0; i < keywords.length; i++) {
                s = subject.toLowerCase().indexOf(keywords[i]);
                d = description.toLowerCase().indexOf(keywords[i]);
                if((s > 0) || (d > 0)) {
                        read.hits++;
                        //+82px
                        var div = document.createElement('div');                                
                                
                        div.style.position = 'absolute';
                        div.style.width = '60%';
                        div.style.height = '30px';                                
                        div.style.transform = 'translateX(33%)';
                        div.style.borderStyle = 'solid';
                        div.style.borderWidth = '1px';
                                
                        div.style.boxSizing = 'border-box';

                        div.style.fontFamily = 'arial,sans-serif';
                        div.style.fontSize = '10pt';
                        div.style.color = 'white';
                                
                        // needs to increase per keyword for biz unit hit
                        // div.style.top = '82px';
                        // div.style.backgroundColor = '#58105C';
                        div.style.backgroundColor = 'blue';
                                
                        div.style.borderColor = div.style.backgroundColor;
                                
                        /* Determine
                                placement. */
                        if(read.hits > 1) {
                                // 82 = the height of the group notification div
                                //var placement = 82 + ((30 * (read.hits - 1)) + 2));       // Use the height of the div to calculate this
                                var placement = (30 * (read.hits - 1)) + 80;
                                placement += (read.hits * 2);       // space between divs
                                        
                                div.style.top = placement.toString() + 'px';
                        }
                        else if(read.hits == 1)
                                div.style.top = '82px';

                        divs.push(div);                                
                 
                        //document.body.appendChild(divs[i]);
                }
        }
                
        //window.alert(read.hits);
                
        for(j = 0; j < read.hits; j++) {                        
                document.body.appendChild(divs[j]);                      
                //divs[j].onclick = function() { fade(divs[j], 'out'); }                        
        }
                
        //window.alert(divs[j].getAttribute('style'));
}