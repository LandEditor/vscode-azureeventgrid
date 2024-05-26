/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { EventSubscription } from "azure-arm-eventgrid/lib/models";
import type {
	IRelatedNameWizardContext,
	ISubscriptionWizardContext,
} from "vscode-azureextensionui";
import type { IEndpointUrlWizardContext } from "./IEndpointUrlWizardContext";
import type { TopicType } from "./TopicTypeStep";

export interface IEventSubscriptionWizardContext
	extends ISubscriptionWizardContext,
		IRelatedNameWizardContext,
		IEndpointUrlWizardContext {
	eventSubscription?: EventSubscription;

	newEventSubscriptionName?: string;
	topicType?: TopicType;
}
