// ==UserScript==
// @name            OpSmarter 5.0
// @namespace       Opsmarter
// @version         5.0
// @description     Adds Opsmart links to useful places.
// @include         *://blackboard.my.salesforce.com/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==

/* Notes: Opsmarter uses Greasemonkey's xmlhttpRequest() */

(function(){
        /* <div> that holds client's ID. This is turned
               into a link later in the script for OpSmart access. */
        var div_ClientID = document.getElementById('00N70000002jOAj_ileinner');
        
        var SILink = document.getElementById('bbCasedetail:j_id1:j_id3:j_id7');
        var clientName = document.getElementById('cas4_ileinner');       // Institution name
        var complex = false;       // Is client a Complex client?
        var sdm = false;           // Is client a SDM client?
        
        var status = document.getElementById('cas7_ileinner').innerHTML;
        
        if(status == 'Closed') {
                startup();
                checkGroups();
        }
        
        /* Start-up checks. */
        function startup() {
                /* Send request to pull client data from Opsmart
                       and parse AJAX data. */
                if(div_ClientID) {
                        var clientID = document.getElementById('00N70000002jOAj_ileinner').innerHTML;
                        var OpSmartLink = '<a href="https://opsmart.blackboard.com/tracksmart/client_details.php?client=' + clientID + '" target="_blank">' + clientID + ' [Opsmart]';
                        var AjaxArray = new Array();
                        var ClientTypeFromArray = new Array();
                        div_ClientID.innerHTML = OpSmartLink + '<span class="btnCancel" style="margin: 0px 0px 6px 6px; padding-top:4px;">Checking...</span></a>';

                        GM_xmlhttpRequest({
                                method: "GET",
                                url: "https://opsmart.blackboard.com/tracksmart/client_details_client_info_ajax.php?clientid=" + clientID,
                                onload: function(response) {
                                        AjaxArray = response.responseText.split('<div id=SCType name=SCType class="Alabels">');
                                        ClientTypeFromArray = String(AjaxArray[1]).split('</div>');

                                        // The below may change as Complex/SDM becomes a single business unit
                                        if ((ClientTypeFromArray[0]=='Diamond') || (ClientTypeFromArray[0]=='SDM')) {
                                                sdm = true;
                                                complex = true;
                                        }

                                        // Decide which button type to use
                                        if (complex || sdm) {
                                                div_ClientID.innerHTML = OpSmartLink + '<span class="btnImportant" style="margin: 0px 0px 6px 6px; padding-top:4px;">SDM CLIENT</span></a>';
                                        } else {
                                                /* Possible Self-Hosted
                                                       or SaaS client. */
                                                if(ClientTypeFromArray[0] == '--') {
                                                        div_ClientID.innerHTML = OpSmartLink + '</a><span style="margin: 0px 0px 6px 6px; padding-top:4px; border-style: solid; border-width: 1px; border-radius: 5px; padding: 3px; font-size: .85em; font-weight: bold; background-image: url(\'https://raw.githubusercontent.com/allenvanderlinde/opsmarter/master/sh.png\')">Possible Self-Hosted/SaaS Client</span>';
                                                }
                                                else {       /* Silver, Gold, Platinum client. */
                                                       div_ClientID.innerHTML = OpSmartLink + '<span class="btnCancel" style="margin: 0px 0px 6px 6px; padding-top:4px;">' + String(ClientTypeFromArray[0]) + '</span></a>'; 
                                                }
                                        }
                                }
                        });
                }

                /*
                       Build a convenient link to an attached known issue's JIRA page.
                */
                if(SILink) {
                        var SINumber = document.getElementById('bbCasedetail:j_id1:j_id3:j_id7').innerHTML;
                        var newSILink = '<a href="https://jira.pd.local/browse/' + SINumber + '"target="_blank">' + SINumber + ' [JIRA]';
                        SILink.innerHTML = newSILink;
                }

                /*
                       Note: Will be comparing these and other international clients to data in a remote location to remove limitation of hard-coding their names
                */

                /* EMEA Client List -
                       currently hard-coded */
                if(clientName) {
                        var div_ClientID_EMEA = document.getElementById('cas4_ileinner').innerHTML;
                        var StringArray = new Array();
                        /* We use an array here to store the split client name string to compare to the below hard-coded array. */
                        var clientNameSplit = new Array();
                        var EMEAClientList = ["Aarhus University", "Edge Hill University", "Hanzehogeschool Groningen", "Kingston University", "Leiden University", "Saxion", "Staffordshire University", "University of Bedfordshire", "University of Bradford", "University of Groningen", "University of Johannesburg", "University of Leicester", "University of Manchester", "Universiteit Twente", "University of Sheffield", "University of Westminster", "Utrecht University", "Vrije Universiteit Amsterdam", "University of the West of England", "BPP Services Ltd", "Spiru Haret University", "Glasgow Caledonian University", "King's College London", "University College Dublin - Belfield", "Regent's University London"];
                        StringArray = div_ClientID_EMEA.split('>');
                        clientNameSplit = String(StringArray[1]).split('<');

                        if(EMEAClientList.indexOf(clientNameSplit[0]) > -1) {       // If the client name's is found in the EMEAClientList
                                var newClientLink = div_ClientID_EMEA + '<a target="_blank" href="http://wikicentral/display/MHINT/EMEA+Clients" <span class="btnImportant" style="color:red" style="margin: 0px 0px 6px 6px; padding-top:4px;">AMS Client</span></a>';
                                clientName.innerHTML = newClientLink;

                        }
                }

                /* Australian Client List -
                       currently hard-coded */
                if(clientName) {
                       var div_ClientID_AUS = document.getElementById('cas4_ileinner').innerHTML;
                       var StringArray = new Array();
                        /* We use an array here to store the split client name string to compare to the below hard-coded array. */
                       var clientNameSplit = new Array();
                       var AUSClientList = ["Charles Darwin University", "University of Western Sydney", "Swinburne University of Technology", "RMIT University Australia", "Southern Cross University", "Curtin University", "THINK Education Services Pty Ltd", "James Cook University", "Charles Sturt University", "INTI Universal Holdings Sdn Bhd", "University of Newcastle", "Griffith University"];
                       StringArray = div_ClientID_AUS.split('>');
                       clientNameSplit = String(StringArray[1]).split('<');

                       if(AUSClientList.indexOf(clientNameSplit[0]) > -1) {
                              var newClientLink = div_ClientID_AUS + '<a target="_blank" href="http://wikicentral/display/MHINT/SYD+Clients" <span class="btnImportant" style="color:red" style="margin: 0px 0px 6px 6px; padding-top:4px;">SYD Client</span></a>';
                              clientName.innerHTML = newClientLink;
                       }
                }

                /* Do Not Touch Client List -
                       currently hard-coded */
                if(clientName) {
                       var name4 = document.getElementById('cas4_ileinner').innerHTML;
                       var array3 = new Array();
                       var array4 = new Array();

                       //place list of "do not touch" Clients in brackets
                       var DNTClientList = ["Air Force Institute of Technology", "Arizona State University", "Baker College of Flint", "Bb University", "Behringer Harvard", "Bellevue University", "Best Deal Insurance", "Blackboard Coursesites End User Support", "Blackboard Learn For Salesforce", "Caesars Entertainment", "Charles Darwin University", "Charles Sturt University", "Curtin University", "Edge Hill University", "ERM Group Inc.", "Embry-Riddle Aeronautical University", "Endologix", "Fairfax County Public Schools", "George Mason University", "George Washington University", "INTI Universal Holdings Sdn Bhd", "Institute for Intergovernmental Research", "Ivy Tech Community College of Indiana", "James Cook University", "K12 Inc.", "Leiden University", "Living Social", "McGraw-Hill Companies", "McGraw-Hill Higher Education", "Ministerio de Defensa Nacional de Colombia", "Mississippi Virtual Community College", "Montgomery College ", "Nexius Solutions Inc.", "PRIMEDIA", "Philadelphia College of Osteopathic Medicine", "RMIT University Australia", "Servicio Nacional de Aprendizaje (SENA)", "ShoreTel Inc.", "South Orange County Community College District", "Southern Cross University", "Strayer University", "Swinburne University of Technology", "Tarrant County College District", "THINK Education Services Pty Ltd", "Ultimate Medical Academy", "University of Groningen", "University of Leicester", "University of Manchester", "Universiteit Twente", "University of Western Sydney", "University of Westminster", "Utrecht University", "Vrije Universiteit Amsterdam", "Watson Pharmaceuticals", "Wolters Kluwer"];
                       array3 = name4.split('>');
                       array4 = String(array3[1]).split('<');

                       if(DNTClientList.indexOf(array4[0]) > -1){
                              var content4 = name4 + '<a target="_blank" href="http://wikicentral.bbbb.net/display/CSOI/CH+-+Tier+1+Production+Environment+List" <span class="btnImportant" style="color:red" style="margin: 0px 0px 6px 6px; padding-top:4px;">Do Not Touch</span></a>';
                              clientName.innerHTML = content4;
                       }
                }
        }
        
        /*
                Compare Primary Group and Initial Case Owner
                       strings to decide whether to alert.
        */
        function checkGroups() {
                var primaryGroup = document.getElementById('00N70000002jOBk_ileinner').innerHTML;
                var initialCaseOwner = document.getElementById('00N70000002jOBI_ileinner').innerHTML;

                var queues = ["Learn - L1",
                             "Learn - L1 - Managed Hosting",
                             "Learn - L1 - Managed Hosting - Complex",
                             "Learn - L1 - Mobile",
                             "Collaborate: Tier 1 Admin",
                             "Collaborate: Tier 1 Support"];

                if(initialCaseOwner != primaryGroup) {
                        var queue_match = false;

                        for(i = 0; i < queues.length; i++) {       // Check to see if the case was created in a Tier 1 queue
                                if(initialCaseOwner == queues[i]) {
                                        queue_match = true;
                                        break;
                                }
                        }

                        if(!queue_match) {
                                return;
                        } else {
                                /* If the primary group is also
                                       found in the array, it's a mismatch. */
                                for(i = 0; i < queues.length; i++) {
                                        if(primaryGroup == queues[i]) {
                                                showPopUp();
                                                break;
                                        }
                                }
                        }
                }
        }
        
        /*
               CSS-styled alert.
        */
        function showPopUp() {
                /* Alert strings. */
                var groups_alert = 'Check for correct/matching Primary Group.<p>[X]</p>';
                
                /* Create the new div element for the alert. */
                var div = document.createElement('div');
                // Set basic properties of the div
                div.style.position = 'absolute';
                div.style.width = '60%';
                div.style.height = '80px';
                div.style.top = '0px';
                div.style.transform = 'translateX(33%)';       // Center
                
                //div.style.backgroundColor = '#B3E4FD';
                div.style.backgroundImage = 'url(\'https://raw.githubusercontent.com/allenvanderlinde/opsmarter/master/opbg.png\')';
                div.style.borderStyle = 'solid';
                div.style.borderWidth = '1px';
                //div.style.borderColor = '#0070d2';
                div.style.borderColor = '#0159a4';
                div.style.boxSizing = 'border-box';
                
                /* Text formatting. */
                div.style.textAlign = 'center';
                div.style.verticalAlign = 'middle';
                div.style.textJustify = 'center';
                div.style.fontFamily = 'arial,sans-serif';
                div.style.fontWeight = 'bold';
                div.style.fontSize = '12pt';
                div.style.letterSpacing = '-0.5px';
                div.style.color = 'white';

                // can style with CSS and concatenation here -->
                div.innerHTML = '<p style=\"position: relative;\">' + groups_alert + '</p>';
                document.body.appendChild(div);       // Add the new alert div to the page
                
                /* Register functions to elements. */
                
                // NOTE; NEED TO CLOSE ALL DIVS WHEN ??
                
                div.onclick = function() {
                        fade(div, 'out');
                }
        }
        
        /*
               Fades an element by opacity.
        */
        function fade(element, option) {
                var op;
                var timer;
                
                if(option == 'out') {
                        op = 1;
                        timer = setInterval(function() {
                                if(op <= 0.1) {
                                        clearInterval(timer);
                                        element.style.display = 'none';
                                }
                                element.style.opacity = op;
                                op -= op * 0.1;
                        }, 12);
                }
        }
        
        /* Grab elements by class code (for future use?) */
        /*
        var elements = document.getElementsByClassName('pageDescription');
        for(var i = 0; i < elements.length; ++i) {
                var item = elements[i];
                item.style.color = '#FF00FF';
        }
        */
})();