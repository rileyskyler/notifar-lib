export interface Message {
    To: string;
    From: string;
    Body: string;
}

export interface Ping {
    key: string,
    longitude: string,
    latitude: string
}

export interface DeviceKey {
    tel: string
    key: string
}



export default Message;