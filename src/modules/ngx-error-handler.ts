import { Directive, Input, TemplateRef, ViewContainerRef, Injectable, EventEmitter, NgModule, ComponentFactoryResolver, Component } from '@angular/core';

const { mapStackTrace } = require('sourcemapped-stacktrace');

const style = `
body {
    background: #e7e7de;
    font-family: 'segoe ui', arial, sans-serif;
    margin: 0;
    padding: 0;
    font-size: small;
}

#Frame {
    width: 80%;
    max-width: 1200px;
    text-align: left;
    margin: 0 auto;
}

#Content {
    background: #fff;
    padding: 0 20px 20px 20px;
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

.PreContainer {
    overflow: auto;
}

pre {
    margin: 0;
    padding: 2px;
    background: #ffffd3;
    line-height: 18px;
    border-radius: 2px;
}

pre span {
    display: block;
}

pre span:nth-child(even) {
    background: #ffffb9;
}

pre span.Highlight {
    color: #ff0000;
    background: #ffff7f;
}

a, a:link, a:active{
    color: #0063dc;
    text-decoration: none;
}

a:visited {
    color: #ff0084;
}

a:hover {
    color: #ffffff !important;
    background: #0063dc !important;
}

p {
    margin: 5px 0;
    padding: 0;
}

h2 {
    margin: 0;
    padding: 20px 0 0 0;
}

h3 {
    margin: 0;
    padding: 20px 0 5px 0;
    font-weight: normal;
}

h4 {
    margin: 0;
    padding: 0;
    font-weight: normal;
}

ul {
    margin: 0;
    padding: 10px 20px 0 20px;
}

ul li {
    line-height: 160%;
}
`;

const template = `
<div id="Frame">
    <h1>Fatal error in senderObject.senderMethod</h1>
    <div id="Content">
        <h2>{{header}}</h2>
        <code>senderCode</code>
        <h3>The error occurred on or near: <strong>filePath</strong></h3>
        <div class="PreContainer">errorCodeTrace</div>
        <h3><strong>Backtrace:</strong></h3>
        <div class="PreContainer"><pre>{{stackTrace}}</pre></div>
        <h3><strong>Variables in local scope:</strong></h3>
        <h3><strong>Queries:</strong></h3>
        <h3>Need Help?</h3>
        <p>If you are a user of this website, you can report this message to a website administrator.</p>
        <h3><strong>Additional information:</strong></h3>
        <ul>
            <li><strong>Error:</strong> message</li>
            <li><strong>Application:</strong> Application</li>
            <li><strong>Operating System:</strong> os.platform</li>
            <li><strong>User Agent:</strong> ?</li>
            <li><strong>Request Uri:</strong> ?</li>
        </ul>
    </div>
</div>
`

@Injectable()
export class ErrorHandlerService {

    errorEvent = new EventEmitter();

    handleError(err: any) {
        mapStackTrace(err.stack, (stackTrace) => {
            document.body.innerHTML = template
                .replace('{{stackTrace}}', stackTrace.join('\n'))
                .replace('{{header}}', err.message);
            document.head.innerHTML += `<style>${style}</style>`;
        });
    }
}

@NgModule({
    declarations: [
        // ErrorHandlerDirective,
        // ErrorHandlerCompoment,
    ],
    providers: [
        ErrorHandlerService,
    ],
    exports: [
        // ErrorHandlerDirective,
        // ErrorHandlerCompoment,
    ],
    entryComponents: []
})
export class ErrorHandlerModule { }
