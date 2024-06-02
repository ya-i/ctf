import { Report } from '../../lib/report';
import { Repository } from '../../lib/repository';

class ReportRepository extends Repository<Report> {
  async fetch(id: number): Promise<Report | null> {
    const json = await super.fetch(id);
    return json ? Report.fromJSON(json) : null;
  }

  update(id: number, value: Report) {
    return super.update(id, value.toJSON());
  }
}

export const reports = new ReportRepository();
