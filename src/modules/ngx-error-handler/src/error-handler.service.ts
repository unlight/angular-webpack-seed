import { Injectable } from '@angular/core';

const StackTrace = require('stacktrace-js');

const style = `
body, pre, h2, h3, h4, ul {
    margin: 0;
}

#overlay {
    background: #e7e7de;
    font-family: 'segoe ui', arial, sans-serif;
    padding: 0;
    font-size: medium;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: auto;
}

#frame {
    width: 80%;
    max-width: 1200px;
    text-align: left;
    margin: 0 auto;
}

#content {
    background: #fff;
    padding: 5px 20px 20px 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}

code {
    display: block;
    padding: 5px 0 0 5px;
    color: #ff0084;
    overflow: auto;
    white-space: pre;
}

.pre-container {
    overflow: auto;
}

pre {
    padding: 5px;
    background: #ffffd3;
    line-height: 18px;
    border-radius: 5px;
}

pre span {
    display: block;
}

pre span:nth-child(even) {
    background: #ffffb9;
}

pre span.highlight {
    color: #ff0000;
    background: #ffff7f;
}

p, h1, h2, h3, h4 {
    margin: 10px 0;
    padding: 0;
}

ul {
    padding-left: 0;
    list-style-type: none;
}

`;

const template = `
<div id="overlay">
<div id="frame">
    <h1>Fatal error in senderObject.senderMethod</h1>
    <div id="content">
        <h2>{{message}}</h2>
        <!--<code>senderCode</code>-->
        <p>The error occurred on or near: <strong>{{filePath}}</strong></p>
        <!-- wil content content of file...<div class="pre-container">errorCodeTrace</div>-->
        <h3><strong>Backtrace:</strong></h3>
        <div class="pre-container"><pre>{{stackTrace}}</pre></div>
        <h3><strong>What people say?</strong></h3>
        <ul>
            <li><strong>StackOverflow:</strong> <a href="{{stackOverflowSearchLink}}" target="_blank">{{message}}</a></li>
            <li><strong>Google:</strong> <a href="{{googleSearchLink}}" target="_blank">{{message}}</a></li>
        </ul>
        <h3><strong>Additional information:</strong></h3>
        <ul>
            <li><strong>Error:</strong> {{message}}</li>
            <!--<li><strong>Application:</strong> Application</li>-->
            <li><strong>User Agent:</strong> {{userAgent}} </li>
            <li><strong>Request Uri:</strong> {{requestUri}}</li>
        </ul>
    </div>
</div>
</div>
`

@Injectable()
export class ErrorHandlerService {

    handleError(err: any) {
        StackTrace.fromError(err).then(stackFrames => {
            let [frame] = stackFrames;
            const stackTrace = stackFrames.map(s => s.toString());
            // debugger;
            let [message] = err.message.split('\n');
            document.body.innerHTML += template
                .replace(/{{stackTrace}}/g, stackTrace.join('\n'))
                .replace(/{{message}}/g, message)
                .replace(/{{filePath}}/g, `${frame.fileName}:${frame.lineNumber}`)
                .replace(/{{userAgent}}/g, `${navigator.appCodeName} ${navigator.appVersion}`)
                .replace(/{{requestUri}}/g, location.href)
                .replace(/{{googleSearchLink}}/g, `https://www.google.ru/search?q=${encodeURIComponent(message)}`)
                .replace(/{{stackOverflowSearchLink}}/g, `https://stackoverflow.com/search?q=${encodeURIComponent(message)}`)
                // TODO: escape href
                // https://github.com/sindresorhus/escape-goat
                + `<style>${style}</style>`;
        });
    }
}
