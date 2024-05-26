const loadStartTime: number = Date.now();
let loadEndTime: number;

import * as vscode from "vscode";
import {
	AzureUserInput,
	type IActionContext,
	callWithTelemetryAndErrorHandling,
	createApiProvider,
	createTelemetryReporter,
	registerCommand,
	registerUIExtensionVariables,
} from "vscode-azureextensionui";
import type { AzureExtensionApiProvider } from "vscode-azureextensionui/api";
import { registerEventSubscriptionCommands } from "./eventSubscription/registerEventSubscriptionCommands";
import { ext } from "./extensionVariables";
import { registerTopicCommands } from "./topic/registerTopicCommands";

export async function activate(
	context: vscode.ExtensionContext,
): Promise<AzureExtensionApiProvider> {
	ext.context = context;
	ext.reporter = createTelemetryReporter(context);
	ext.outputChannel = vscode.window.createOutputChannel("Azure Event Grid");
	context.subscriptions.push(ext.outputChannel);
	ext.ui = new AzureUserInput(context.globalState);
	registerUIExtensionVariables(ext);

	await callWithTelemetryAndErrorHandling(
		"azureEventGrid.activate",
		async function (this: IActionContext): Promise<void> {
			this.properties.isActivationEvent = "true";
			this.measurements.mainFileLoad =
				(loadEndTime - loadStartTime) / 1000;

			registerTopicCommands();
			registerEventSubscriptionCommands();

			registerCommand(
				"azureEventGrid.selectSubscriptions",
				async () =>
					await vscode.commands.executeCommand(
						"azure-account.selectSubscriptions",
					),
			);
		},
	);

	return createApiProvider([]);
}

// tslint:disable-next-line:no-empty
export function deactivate(): void {}

loadEndTime = Date.now();
