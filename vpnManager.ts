// Інтерфейс для конфігурації VPN-сервера
export interface VPNServerConfig {
  id: string;
  name: string;        // Наприклад: "Німеччина (Безкоштовний)" або "Токіо"
  countryCode: string; // "de", "jp", "nl" тощо
  configData: string;  // Сам текст конфігурації (.conf)
  isFree: boolean;
}

// Менеджер локацій та підключень
export class VPNManager {
  private servers: VPNServerConfig[] = [];
  private activeServerId: string | null = null;

  // Додати сервер до списку
  public addServer(server: VPNServerConfig): void {
    this.servers.push(server);
    console.log(`[VPN] Додано новий сервер: ${server.name}`);
  }

  // Метод для швидкого додавання сервера за текстом конфігурації (.conf)
  public importConfigFromString(id: string, name: string, countryCode: string, rawConfig: string): void {
    const newServer: VPNServerConfig = {
      id,
      name,
      countryCode,
      configData: rawConfig,
      isFree: true // Позначаємо як безкоштовний для нашого проєкту
    };
    this.addServer(newServer);
  }

  // Отримати список усіх доступних локацій для інтерфейсу
  public getServers(): VPNServerConfig[] {
    return this.servers;
  }

  // Вибрати активний сервер для підключення
  public setActiveServer(id: string): boolean {
    const server = this.servers.find(s => s.id === id);
    if (server) {
      this.activeServerId = id;
      console.log(`[VPN] Активно переключено на: ${server.name}`);
      return true;
    }
    return false;
  }
}


// --- ТЕСТОВА ПЕРЕВІРКА ---
const manager = new VPNManager();

// Додаємо тестовий безкоштовний конфіг (у майбутньому сюди підуть реальні дані)
manager.importConfigFromString(
  "server-de-1", 
  "Німеччина (Безкоштовний)", 
  "de", 
  "[Interface]\nPrivateKey = тест_ключ\n[Peer]\nPublicKey = тест_сервер"
);

// Перевіряємо, чи список видає наші сервери
console.log("Доступні сервери:", manager.getServers());