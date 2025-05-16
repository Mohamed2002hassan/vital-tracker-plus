
// خدمة الاتصال بالأجهزة الطبية عبر البلوتوث

export interface BluetoothDevice {
  id: string;
  name: string;
}

export interface BluetoothReading {
  type: "heartRate" | "temperature" | "oxygenLevel";
  value: number;
  timestamp: Date;
}

class BluetoothService {
  device: BluetoothDevice | null = null;
  server: any = null;
  isConnected = false;
  onReadingCallback: ((reading: BluetoothReading) => void) | null = null;

  // تحقق إذا كان البلوتوث مدعوماً في المتصفح
  isSupported(): boolean {
    return navigator.bluetooth !== undefined;
  }

  // البحث عن الأجهزة الطبية المتاحة
  async scanForDevices(): Promise<BluetoothDevice[]> {
    if (!this.isSupported()) {
      throw new Error("البلوتوث غير مدعوم في هذا المتصفح");
    }
    
    try {
      const device = await navigator.bluetooth.requestDevice({
        // يمكن تحديد خصائص الأجهزة الطبية هنا
        filters: [
          { services: ['heart_rate'] },
          { services: ['health_thermometer'] },
          { namePrefix: 'Medical' },
          { namePrefix: 'Vital' },
        ],
        optionalServices: ['heart_rate', 'health_thermometer', 'blood_pressure', 'oxygen_saturation']
      });
      
      if (device) {
        return [{
          id: device.id,
          name: device.name || "جهاز طبي"
        }];
      }
      
      return [];
    } catch (error) {
      console.error("خطأ في البحث عن الأجهزة:", error);
      throw error;
    }
  }

  // الاتصال بجهاز محدد
  async connectToDevice(deviceId: string): Promise<boolean> {
    if (!this.isSupported() || !this.device) {
      return false;
    }

    try {
      const gatt = await (this.device as any).gatt.connect();
      this.server = gatt;
      this.isConnected = true;
      
      // يبدأ الاستماع للقراءات من الجهاز
      this.startNotifications();
      
      return true;
    } catch (error) {
      console.error("خطأ في الاتصال بالجهاز:", error);
      return false;
    }
  }

  // قطع الاتصال
  disconnect(): void {
    if (this.server && this.isConnected) {
      this.server.disconnect();
      this.isConnected = false;
      this.server = null;
    }
  }

  // تسجيل دالة الاستجابة لاستقبال القراءات
  onReading(callback: (reading: BluetoothReading) => void): void {
    this.onReadingCallback = callback;
  }

  // بدء الإخطارات للحصول على القراءات من الجهاز
  private async startNotifications() {
    if (!this.server || !this.isConnected) {
      return;
    }

    try {
      // استقبال معدل ضربات القلب
      const heartRateService = await this.server.getPrimaryService('heart_rate');
      const heartRateChar = await heartRateService.getCharacteristic('heart_rate_measurement');
      await heartRateChar.startNotifications();

      heartRateChar.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = event.target.value;
        const heartRate = value.getUint8(1);
        
        if (this.onReadingCallback) {
          this.onReadingCallback({
            type: "heartRate",
            value: heartRate,
            timestamp: new Date()
          });
        }
      });
      
      // يمكن إضافة استقبال لدرجة الحرارة ومستوى الأكسجين بطريقة مماثلة
      
    } catch (error) {
      console.error("خطأ في استقبال القراءات:", error);
    }
  }
}

export default new BluetoothService();
