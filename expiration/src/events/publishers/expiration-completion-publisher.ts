import {
  BasePublisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@ticketing-rv/common';

export class ExpirationCompletedPublisher extends BasePublisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
