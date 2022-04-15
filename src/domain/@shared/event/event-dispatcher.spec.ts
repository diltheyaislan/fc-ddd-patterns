import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLogWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/send-console-log-when-customer-address-is-changed.handler";
import SendConsoleLogWhenCustomerIsCreated1Handler from "../../customer/event/handler/send-console-log-when-customer-is-created-1.handler";
import SendConsoleLogWhenCustomerIsCreated2Handler from "../../customer/event/handler/send-console-log-when-customer-is-created-1.handler copy";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

	it("should notify all customer created event handlers", () => {
    
		const eventDispatcher = new EventDispatcher();
    const customCreatedEventHandler1 = new SendConsoleLogWhenCustomerIsCreated1Handler();
    const customCreatedEventHandler2 = new SendConsoleLogWhenCustomerIsCreated2Handler();
    const spyEventHandler = jest.spyOn(customCreatedEventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(customCreatedEventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", customCreatedEventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", customCreatedEventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(customCreatedEventHandler1);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(customCreatedEventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
			id: "123",
      name: "Customer 1"
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

	it("should notify event handlers when customer address changes", () => {
    const eventDispatcher = new EventDispatcher();
    const customerAddressChangedEventHandler = new SendConsoleLogWhenCustomerAddressIsChangedHandler();
    const spyEventHandler = jest.spyOn(customerAddressChangedEventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", customerAddressChangedEventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(customerAddressChangedEventHandler);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: '123',
      name: "Customer 1",
      address: {
        street: 'Street 1',
        number: 1,
        zip: 'Zip Code 1',
        city: 'City 1'
      }
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
