import * as debug from '../../util/debug';
import * as storageService from '../storage/storage_service';

export interface Message {
  type: string;
  payload: unknown;
}

export function handle(message: Message) {
  switch (message.type) {
    case 'fetchReport':
      return fetchReport(message.payload as number);
    default:
      debug.never(`Unexpected message type "${message.type}"`);
  }
}

function fetchReport(tabId: number) {
  return storageService.reports
    .fetch(tabId)
    .then((report) => (report ? report.toJSON() : null));
}
