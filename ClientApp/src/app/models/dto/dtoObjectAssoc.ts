
export class DtoObjectAssoc {
    id: number;
    objType: string;
    objName: string;
    objDesc: string;
    objText: string;
    active: boolean;
    child?: DtoObjectAssoc[];
}