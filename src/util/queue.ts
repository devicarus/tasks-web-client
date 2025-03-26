export class Queue<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T {
    return this.items.shift()!;
  }

  front(): T | undefined {
    return this.items[0];
  }

  empty(): boolean {
    return this.items.length === 0;
  }

  length(): number {
    return this.items.length;
  }
}
