export class Repository<T> {
  async fetch(id: number): Promise<T | null> {
    const key = id.toString();
    const result: Record<string, T> = await browser.storage.session.get([key]);
    return result[key] ?? null;
  }

  update(id: number, value: unknown) {
    return browser.storage.session.set({ [id]: value });
  }

  remove(id: number) {
    return browser.storage.session.remove(id.toString());
  }
}
