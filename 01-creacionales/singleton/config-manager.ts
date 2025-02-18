//* Singleton pero con un objeto de configuración que permite almacenar y obtener 
//* valores de configuración.
class ConfigManager {
  private config: Record<string, string> = {};

  public setConfig(key: string, value: string): void {
    this.config[key] = value;
  }

  public getConfig(key: string): string {
    return this.config[key];
  }

  public getAllConfig(): Record<string, string> {
    return this.config;
  }
}

export const configManager = new ConfigManager();
