/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { Topic } from "azure-arm-eventgrid/lib/models";
import type { IResourceGroupWizardContext } from "vscode-azureextensionui";

export interface ITopicWizardContext extends IResourceGroupWizardContext {
	topic?: Topic;

	newTopicName?: string;
}
