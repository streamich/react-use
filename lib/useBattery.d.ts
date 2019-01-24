export interface BatterySensorState {
    charging: boolean;
    level: number;
    chargingTime: number;
    dischargingTime: number;
}
declare const useBattery: () => {};
export default useBattery;
