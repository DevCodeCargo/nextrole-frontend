const STORAGE_KEY = 'NR';

export class StorageHelper {

  //#region Session Storage

  static setSession(key: string, value: any): void {

    const data = this.getSessionAll();

    data[key] = value;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }

  static getSession<T = any>(key: string): T | null {

    const data = this.getSessionAll();

    return data[key] ?? null;
  }

  static removeSession(key: string): void {

    const data = this.getSessionAll();

    delete data[key];

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }

  private static getSessionAll(): Record<string, any> {

    const data = sessionStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : {};
  }

  //#endregion


  //#region Local Storage

  static setLocal(key: string, value: any): void {

    const data = this.getLocalAll();

    data[key] = value;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }

  static getLocal<T = any>(key: string): T | null {

    const data = this.getLocalAll();

    return data[key] ?? null;
  }

  static removeLocal(key: string): void {

    const data = this.getLocalAll();

    delete data[key];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );
  }

  private static getLocalAll(): Record<string, any> {

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : {};
  }

  //#endregion

}