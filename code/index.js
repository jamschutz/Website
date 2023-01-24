async function onNavClick() {
    // get displayed page
    // var metaTags = document.getElementById('main-frame');//.getElementsByTagName('meta');
    var headers = document.getElementsByTagName('head');
    console.log(headers);
    
    // var headerText = "JOEY SCHUTZ DOT COM";
    // for(let i = 0; i < metaTags.length; i++) {
    //     console.log('looking at: ' + metaTags[i].getAttribute('name'));
    //     if(metaTags[i].getAttribute('name') === 'header') {
    //         headerText = metaTags[i].getAttribute('content');
    //         break;
    //     }
    // }

    // console.log(headerText);

    // if(displayedPage == 'miscellaneous/void.html') setHeader('Welcome');
    // else if(displayedPage == 'writing/baba_is_you.html') setHeader('Baba Is You');
    // else if(displayedPage == 'info/about.html') setHeader('About');
    // else setHeader('Joey Schutz Dot Com');
}



function setHeader(headerText) {
    // var header = frames['header'].document.getElementById('headerTextField');
    // console.log('header: ' + header);
    // document.getElementById('headerTextField').textContent = headerText;

    var headerHtml = `
        <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0" />
        
        <div id="headerTextField">
            <b><i>. . . . . . . . . . . . . . . . . . . . . . . ${headerText} . . . . . . . . . . . . . . . . . . . . . . .</i></b>
        </div>
    `.trim();

    // var newIFrame = document.createElement('frame');
    // newIFrame.src = 'data:text/html;charset=utf-8,' + encodeURI(headerHtml);
    // console.log(newIFrame);
    // document.body.appendChild(newIFrame);

    var headerHtmlElement = 'data:text/html;charset=utf-8,' + encodeURI(headerHtml);
    

    document.getElementById('header-frame').setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURI(headerHtml));
}



window.addEventListener("message", function(e) {
    let navUrl = location.href.substring(0,location.href.lastIndexOf('/')) + '/nav.html';
    console.log('got message!!!!');
    // // ensure origin
    // if(e.origin !== navUrl) return;

    // this.alert(e.data);
}, false);