// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const didChangeEmitter = new vscode.EventEmitter<void>();
    const disposable  = vscode.commands.registerCommand('mcp-extension.RegisterMCPProviders', () => {
        context.subscriptions.push(vscode.lm.registerMcpServerDefinitionProvider('vehicle-information-extension', {
            onDidChangeMcpServerDefinitions: didChangeEmitter.event,
            provideMcpServerDefinitions: async () => {
                let servers: vscode.McpServerDefinition[] = [];

                // Example of an HTTP server definition
                servers.push(new vscode.McpHttpServerDefinition(
                    'REMOTESERVERNAME',
                    vscode.Uri.parse('https://YOURREMOTESERVERURL'),
                    {}
                    ));
                return servers;
            },
            resolveMcpServerDefinition: async (server: vscode.McpServerDefinition) => {

                if (server.label === 'REMOTESERVERNAME') {
                    // Get the API key from the user, e.g. using vscode.window.showInputBox
                    // Update the server definition with the API key
                }

                // Return undefined to indicate that the server should not be started or throw an error
                // If there is a pending tool call, the editor will cancel it and return an error message
                // to the language model.
                return server;
            }
        }));
    });
    context.subscriptions.push(disposable);


	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mcp-extension" is now active!');
}

// This method is called when your extension is deactivated
export function deactivate() {}