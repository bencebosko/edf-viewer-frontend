export interface EDFRecord {

    fileName: string;
    isValid: boolean;
    id?: string;
    recordDate?: Date;
    patientName?: string;
    numberOfChannels: number;
    channelNames?: string[];
    channelTypes?: string[];
    numberOfRecords: number;
    numberOfAnnotations: number;
}
