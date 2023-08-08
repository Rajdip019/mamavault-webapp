import { Timestamp } from "firebase/firestore";
import { IDocuments } from "./document";

//The types that have question mark are not required
export interface IUser{
    uid : string,
    name : string,
    email : string,
    image : string,
    age : string,
    blood_group : string,
    date_of_pregnancy ? : Timestamp,
    complications_description ? : string,
    medicines? : string[],
    diseases ? : string[],
    allegies ? : string[],
    account_created : Timestamp;
}

export interface ISharedDoc{
    "documents" : IDocuments[]
    "userData" : IUser
}