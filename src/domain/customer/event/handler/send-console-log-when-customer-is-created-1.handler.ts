import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogWhenCustomerIsCreated1Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    
	handle(event: CustomerCreatedEvent): void {
		console.log('Esse é o primeiro log do evento: Customercreated');
	}
}