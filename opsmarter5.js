// ==UserScript==
// @name            OpSmarter 5.0
// @namespace       Opsmarter
// @version         5.0
// @description     Adds opsmart links to useful places.
// @include         *://blackboard.my.salesforce.com/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==

/*
        Notes:
        
*/
(function(){
        /* <div> that holds client's ID. This is turned into a link later in the script for OpSmart access. */
        var div_ClientID = document.getElementById('00N70000002jOAj_ileinner');
        
        var SILink = document.getElementById('bbCasedetail:j_id1:j_id3:j_id7');
        var clientName = document.getElementById('cas4_ileinner');       // Institution name
        var complex = false;       // Is client a Complex client?
        var sdm = false;           // Is client a SDM client?

        /*
               Primary request to grab Ajax data which describes client. We grab and parse the type here, which lets us know
               which kind of button to use and which kind of label to give it.
        */
        if(div_ClientID) {
                var clientID = document.getElementById('00N70000002jOAj_ileinner').innerHTML;
                var OpSmartLink = '<a href="https://opsmart.blackboard.com/tracksmart/client_details.php?client=' + clientID + '" target="_blank">' + clientID + ' [Opsmart]';
                var AjaxArray = new Array();
                var ClientTypeFromArray = new Array();
                div_ClientID.innerHTML = OpSmartLink + '<span class="btnCancel" style="margin: 0px 0px 6px 6px; padding-top:4px;">Checking...</span></a>';

                GM_xmlhttpRequest({
                        method: "GET",
                        url: "https://opsmart.blackboard.com/tracksmart/client_details_client_info_ajax.php?clientid="+clientID,
                        onload: function(response) {
                                AjaxArray = response.responseText.split('<div id=SCType name=SCType class="Alabels">');
                                ClientTypeFromArray = String(AjaxArray[1]).split('</div>');
                                // The below may change as Complex/SDM becomes a single business unit
                                if (ClientTypeFromArray[0]=='Diamond'){
                                        complex = true;
                                }

                                if (ClientTypeFromArray[0]=='SDM'){
                                        sdm = true;
                                }
                                
                                // Decide which button type to use
                                if (complex || sdm) {
                                        div_ClientID.innerHTML = OpSmartLink + '<span class="btnImportant" style="margin: 0px 0px 6px 6px; padding-top:4px;">SDM CLIENT</span></a>';
                                }
                                /*else if (sdm) {
                                        div_ClientID.innerHTML = OpSmartLink + '<span class="btnImportant" style="margin: 0px 0px 6px 6px; padding-top:4px;">SDM COMPLEX CLIENT</span></a>';
                                } */
                                else {
                                        div_ClientID.innerHTML = OpSmartLink + '<span class="btnCancel" style="margin: 0px 0px 6px 6px; padding-top:4px;">' + String(ClientTypeFromArray[0]) + '</span></a>'; 
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
        
        /*
               Compare Primary Group and Initial Case Owner strings to decide whether to alert.
        */
        /* Rough copy. */
        var alertString = "Alternate Group needs to be changed.";
        var primaryGroup = document.getElementById('00N70000002jOBk_ileinner').innerHTML;
        var initialCaseOwner = document.getElementById('00N70000002jOBI_ileinner').innerHTML;
        //if(primaryGroup != initialCaseOwner) {
        if(primaryGroup == initialCaseOwner) {
                var alert = "Primary Group: " + primaryGroup + "\nInitial Case Owner: " + initialCaseOwner + "\n\n" + alertString;
                showPopUp();
        }
        
        /* CSS-styled alert. */
        function showPopUp() {
                var div = document.createElement('div');       // Create the new div element for the alert
                // Set basic properties of the div
                div.style.position = 'absolute';
                div.style.width = '60%';
                div.style.height = '120px';
                div.style.top = '10px';
                div.style.transform = 'translateX(33%)';       // Center
                
                //div.style.backgroundColor = '#B3E4FD';
                div.style.backgroundImage = 'url(\'https://raw.githubusercontent.com/allenvanderlinde/opsmarter/master/opbg.png\')';
                div.style.borderStyle = 'solid';
                div.style.borderWidth = '1px';
                div.style.borderColor = '#0070d2';
                
                /* Text formatting. */
                div.style.textAlign = 'center';
                div.style.verticalAlign = 'middle';
                div.style.textJustify = 'center';
                div.style.fontFamily = 'arial,sans-serif';

                // can style with CSS and concatenation here -->
                div.innerHTML = alertString;       // Append the string to the div

                document.body.appendChild(div);       // Add the new alert div to the page
                // Remove the div when clicked
                div.onclick = function() {
                        div.style.display = 'none';
                        document.body.removeChild(div);
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
        
        // jQuery -->
})();
//opens webpage in new tab
//<a target="_blank" href="http://wikicentral.bbbb.net/display/CSOI/CH+-+Tier+1+Production+Environment+List"