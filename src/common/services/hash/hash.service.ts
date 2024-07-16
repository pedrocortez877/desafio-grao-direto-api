export abstract class HashService {
  abstract hash(text: string): Promise<string>;
  abstract compare(text: string, hashedtext: string): Promise<boolean>;
}
